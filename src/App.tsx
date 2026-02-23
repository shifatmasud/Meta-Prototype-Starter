
import React from 'react';
import { useTheme } from '../Theme';
import { useStageStore } from './store/stageStore';
import { StageRenderer } from './components/Stage/StageRenderer';
import { AgentUI } from './components/Agent/AgentUI';

export const App: React.FC = () => {
  const { theme } = useTheme();
  const components = useStageStore((state) => state.components);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: theme.Color.Base.Surface[1],
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Stage Area */}
      <div style={{
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing['Space.XL'],
      }}>
        {components.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: theme.spacing['Space.M'],
            opacity: 0.5,
          }}>
            <h1 style={{ 
              fontFamily: theme.Type.Expressive.Display.M.fontFamily,
              fontSize: theme.Type.Expressive.Display.M.fontSize,
              color: theme.Color.Base.Content[1],
              margin: 0
            }}>
              EMPTY STAGE
            </h1>
            <p style={{
              fontFamily: theme.Type.Readable.Body.M.fontFamily,
              fontSize: theme.Type.Readable.Body.M.fontSize,
              color: theme.Color.Base.Content[2],
              margin: 0
            }}>
              Ask the Meta Agent to build something.
            </p>
          </div>
        ) : (
          <StageRenderer components={components} />
        )}
      </div>

      {/* Agent UI */}
      <AgentUI />
    </div>
  );
};
