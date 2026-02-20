import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../Theme.tsx';

interface TabbedPanelProps {
  panels: {
    id: string;
    title: string;
    icon?: React.ReactNode;
    content: React.ReactNode;
  }[];
}

const TabbedPanel: React.FC<TabbedPanelProps> = ({ panels }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(panels[0].id);

  const tabContainerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    padding: `${theme.spacing['Space.S']} 0`,
    borderBottom: `1px solid ${theme.Color.Base.Surface[2]}`,
  };

  const segmentedControlStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: theme.Color.Base.Surface[2],
    borderRadius: theme.radius['Radius.Full'],
    padding: theme.spacing['Space.XS'],
    position: 'relative',
  };

  const tabStyle: React.CSSProperties = {
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing['Space.S'],
    padding: `0 ${theme.spacing['Space.M']}`,
    height: '32px',
    zIndex: 2,
    color: theme.Color.Base.Content[2],
    transition: `color ${theme.time['Time.2x']} ease`,
  };

  const activeIndicatorStyle: React.CSSProperties = {
    position: 'absolute',
    top: '4px',
    bottom: '4px',
    backgroundColor: theme.Color.Base.Surface[1],
    borderRadius: theme.radius['Radius.Full'],
    boxShadow: theme.effects['Effect.Shadow.Drop.1'],
    zIndex: 1,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={tabContainerStyle}>
        <div style={segmentedControlStyle}>
          {panels.map(panel => (
            <motion.div
              key={panel.id}
              style={{
                ...tabStyle,
                color: activeTab === panel.id ? theme.Color.Base.Content[1] : theme.Color.Base.Content[2],
              }}
              onClick={() => setActiveTab(panel.id)}
              animate={{ 
                width: activeTab === panel.id ? 'auto' : 32,
                opacity: activeTab === panel.id ? 1 : 0.7
              }}
              transition={{ type: 'spring', damping: 20, stiffness: 250 }}
            >
              {activeTab === panel.id && (
                <motion.div 
                  style={activeIndicatorStyle}
                  layoutId="activePill"
                  transition={{ type: 'spring', damping: 18, stiffness: 250 }}
                />
              )}
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: theme.spacing['Space.S'] }}>
                {panel.icon}
                <AnimatePresence>
                  {activeTab === panel.id && (
                    <motion.span
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -5 }}
                      transition={{ delay: 0.1 }}
                      style={{ whiteSpace: 'nowrap', fontSize: theme.Type.Readable.Label.S.fontSize }}
                    >
                      {panel.title}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: theme.spacing['Space.L'] }}>
        {panels.map(panel => (
          activeTab === panel.id && <div key={panel.id}>{panel.content}</div>
        ))}
      </div>
    </div>
  );
};

export default TabbedPanel;
