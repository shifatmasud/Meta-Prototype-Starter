# Meta Prototype - AI Co-Creator

This application is a design engineering playground where the Gemini AI agent has full read/write access to the codebase.

## Architecture (IPO)
- **Input**: User natural language requests via the AI Panel.
- **Process**: Gemini Agent analyzes the request, reads existing code using FS tools, generates new components or updates state, and writes files back to the codebase.
- **Output**: Real-time UI updates in the Staging area and persistent code changes in the repository.

## Features
- **Intent-Aware Agent**: Distinguishes between chat and code generation.
- **Full-Stack FS Access**: Backend API for reading/writing files.
- **Design System Integration**: Agent is trained on the specific design tokens and engineering rules of the project.
- **Staging Area**: Immediate preview of generated components.

## Engineering Rules
- No Tailwind (JS style objects only).
- Framer Motion for animations.
- Phosphor Icons.
- 4pt base system.
