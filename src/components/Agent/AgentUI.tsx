
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../Theme';
import { ChatCircle, PaperPlaneRight, X, Robot } from 'phosphor-react';
import { processAgentRequest } from '../../services/aiAgentService';
import { useStageStore } from '../../store/stageStore';

export const AgentUI: React.FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'agent'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const result = await processAgentRequest(userMsg);
      setMessages(prev => [...prev, { role: 'agent', text: result.chat }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'agent', text: "Sorry, I hit a snag." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: theme.spacing['Space.L'],
          right: theme.spacing['Space.L'],
          width: 56,
          height: 56,
          borderRadius: theme.radius['Radius.Full'],
          backgroundColor: theme.Color.Accent.Surface[1],
          color: theme.Color.Accent.Content[1],
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: theme.effects['Effect.Shadow.Drop.3'],
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        {isOpen ? <X size={24} weight="bold" /> : <ChatCircle size={24} weight="bold" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{
              position: 'fixed',
              bottom: 80,
              right: theme.spacing['Space.L'],
              width: 'calc(100vw - 32px)',
              maxWidth: 360,
              height: 500,
              backgroundColor: theme.Color.Base.Surface[1],
              borderRadius: theme.radius['Radius.XL'],
              boxShadow: theme.effects['Effect.Shadow.Drop.3'],
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              zIndex: 1000,
              border: `1px solid ${theme.Color.Base.Surface[3]}`,
            }}
          >
            {/* Header */}
            <div style={{
              padding: theme.spacing['Space.M'],
              backgroundColor: theme.Color.Base.Surface[2],
              borderBottom: `1px solid ${theme.Color.Base.Surface[3]}`,
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing['Space.S'],
            }}>
              <Robot size={24} color={theme.Color.Accent.Surface[1]} />
              <span style={{ 
                fontFamily: theme.Type.Expressive.Headline.S.fontFamily,
                fontSize: theme.Type.Expressive.Headline.S.fontSize,
                color: theme.Color.Base.Content[1]
              }}>
                META AGENT
              </span>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: theme.spacing['Space.M'],
              display: 'flex',
              flexDirection: 'column',
              gap: theme.spacing['Space.S'],
            }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  padding: theme.spacing['Space.S'],
                  borderRadius: theme.radius['Radius.M'],
                  backgroundColor: msg.role === 'user' ? theme.Color.Accent.Surface[1] : theme.Color.Base.Surface[2],
                  color: msg.role === 'user' ? theme.Color.Accent.Content[1] : theme.Color.Base.Content[1],
                  fontFamily: theme.Type.Readable.Body.M.fontFamily,
                  fontSize: theme.Type.Readable.Body.M.fontSize,
                }}>
                  {msg.text}
                </div>
              ))}
              {isTyping && (
                <div style={{ color: theme.Color.Base.Content[3], fontSize: 12 }}>Agent is thinking...</div>
              )}
            </div>

            {/* Input */}
            <div style={{
              padding: theme.spacing['Space.M'],
              borderTop: `1px solid ${theme.Color.Base.Surface[3]}`,
              display: 'flex',
              gap: theme.spacing['Space.S'],
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me to build something..."
                style={{
                  flex: 1,
                  padding: theme.spacing['Space.S'],
                  borderRadius: theme.radius['Radius.M'],
                  border: `1px solid ${theme.Color.Base.Surface[3]}`,
                  backgroundColor: theme.Color.Base.Surface[2],
                  color: theme.Color.Base.Content[1],
                  outline: 'none',
                }}
              />
              <button
                onClick={handleSend}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: theme.radius['Radius.M'],
                  backgroundColor: theme.Color.Accent.Surface[1],
                  color: theme.Color.Accent.Content[1],
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <PaperPlaneRight size={20} weight="fill" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
