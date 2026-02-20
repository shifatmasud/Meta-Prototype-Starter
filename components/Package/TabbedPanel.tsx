import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const tabContainerStyle: React.CSSProperties = {
    display: 'flex',
    padding: `0 ${theme.spacing['Space.M']}`,
    gap: theme.spacing['Space.S'],
    borderBottom: `1px solid ${theme.Color.Base.Surface[3]}`,
    backgroundColor: theme.Color.Base.Surface[1],
  };

  const tabStyle: React.CSSProperties = {
    padding: `${theme.spacing['Space.M']} ${theme.spacing['Space.L']}`,
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    color: theme.Color.Base.Content[2],
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing['Space.S'],
    fontSize: theme.Type.Readable.Label.M.fontSize,
    fontWeight: theme.Type.Readable.Label.M.fontWeight,
    transition: `color ${theme.time['Time.2x']} ease`,
    borderRadius: `${theme.radius['Radius.M']} ${theme.radius['Radius.M']} 0 0`,
  };

  const activeTabStyle: React.CSSProperties = {
    color: theme.Color.Base.Content[1],
  };

  const hoverTabStyle: React.CSSProperties = {
    color: theme.Color.Base.Content[1],
    backgroundColor: theme.Color.Base.Surface[2],
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={tabContainerStyle}>
        {panels.map(panel => (
          <div 
            key={panel.id} 
            style={{
              ...tabStyle, 
              ...(activeTab === panel.id ? activeTabStyle : {}),
              ...(hoveredTab === panel.id && activeTab !== panel.id ? hoverTabStyle : {})
            }} 
            onClick={() => setActiveTab(panel.id)}
            onMouseEnter={() => setHoveredTab(panel.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            {panel.icon && (
              <span style={{ display: 'flex', alignItems: 'center', opacity: activeTab === panel.id ? 1 : 0.6 }}>
                {panel.icon}
              </span>
            )}
            <span>{panel.title}</span>
            {activeTab === panel.id && (
              <motion.div 
                style={{ 
                  position: 'absolute', 
                  bottom: '-1px', 
                  left: 0, 
                  right: 0, 
                  height: '2px', 
                  backgroundColor: theme.Color.Accent.Surface[1],
                  zIndex: 1
                }} 
                layoutId="underline" 
              />
            )}
          </div>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {panels.map(panel => (
          activeTab === panel.id && <div key={panel.id} style={{ height: '100%' }}>{panel.content}</div>
        ))}
      </div>
    </div>
  );
};

export default TabbedPanel;
