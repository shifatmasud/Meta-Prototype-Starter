
import { GoogleGenAI, Type } from "@google/genai";
import { ComponentSpec, useStageStore } from "../store/stageStore";

const SYSTEM_INSTRUCTION = `
You are an Integrated AI Agent for a Meta Prototype system.
Your goal is to create and manage custom React components following a strict design system.

DESIGN SYSTEM RULES:
- Typography: Bebas Neue (Hero/Display), Inter (Body/Readable), Victor Mono (Data), Comic Neue (Quotes).
- Grid: 4pt base system (all spacing/radius should be multiples of 4).
- Colors: Use semantic tokens (e.g., Color.Base.Surface.1, Color.Accent.Surface.1).
- No Tailwind. Use JS style objects for styling.
- No CSS keyframes. Use Framer Motion for animations.
- Mobile-first: Max width 400px, Max height 600px.

AVAILABLE COMPONENTS:
- Container: { children: ComponentSpec[], style: CSSProperties }
- Text: { content: string, variant: 'Display.L' | 'Display.M' | 'Body.M' | 'Label.S' | 'Quote' | 'Data', style: CSSProperties }
- Button: { label: string, onClickAction: string, style: CSSProperties }
- Icon: { name: string, size: number, color: string }
- Card: { children: ComponentSpec[], style: CSSProperties }

CAPABILITIES:
- You can read the current stage state.
- You can add, update, or remove components.
- You can chat with the user to clarify intent.

RESPONSE FORMAT:
You must return a JSON object with the following structure:
{
  "thought": "Your reasoning process",
  "chat": "Message to the user",
  "actions": [
    { "type": "ADD", "component": ComponentSpec },
    { "type": "UPDATE", "id": "string", "updates": Partial<ComponentSpec> },
    { "type": "REMOVE", "id": "string" },
    { "type": "CLEAR" }
  ]
}
`;

export const processAgentRequest = async (userInput: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const store = useStageStore.getState();
  
  const currentStage = JSON.stringify(store.components);

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      { role: 'user', parts: [{ text: `Current Stage: ${currentStage}\n\nUser Request: ${userInput}` }] }
    ],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          thought: { type: Type.STRING },
          chat: { type: Type.STRING },
          actions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, enum: ["ADD", "UPDATE", "REMOVE", "CLEAR"] },
                id: { type: Type.STRING },
                component: { type: Type.OBJECT },
                updates: { type: Type.OBJECT }
              }
            }
          }
        },
        required: ["thought", "chat", "actions"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    
    // Execute actions
    result.actions.forEach((action: any) => {
      switch (action.type) {
        case 'ADD':
          store.addComponent(action.component);
          break;
        case 'UPDATE':
          store.updateComponent(action.id, action.updates);
          break;
        case 'REMOVE':
          store.removeComponent(action.id);
          break;
        case 'CLEAR':
          store.clearStage();
          break;
      }
    });

    return result;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    return { chat: "I encountered an error processing your request.", actions: [] };
  }
};
