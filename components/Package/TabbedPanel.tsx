import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Theme.tsx';

interface TabbedPanelProps {
  panels: {
    id: string;
    title: string;
    content: React.ReactNode;
  }[];
}

const TabbedPanel: React.FC<TabbedPanelProps> = ({ panels }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(panels[0].id);

  const tabContainerStyle: React.CSSProperties = {
    display: 'flex',
    borderBottom: `1px solid ${theme.Color.Base.Surface[3]}`,
  };

  const tabStyle: React.CSSProperties = {
    padding: `${theme.spacing['Space.M']} ${theme.spacing['Space.L']}`,
    cursor: 'pointer',
    userSelect: 'none',
    position: 'relative',
    color: theme.Color.Base.Content[2],
  };

  const activeTabStyle: React.CSSProperties = {
    color: theme.Color.Base.Content[1],
  };

  return (
    <div>
      <div style={tabContainerStyle}>
        {panels.map(panel => (
          <div 
            key={panel.id} 
            style={{...tabStyle, ...(activeTab === panel.id && activeTabStyle)}} 
            onClick={() => setActiveTab(panel.id)}
          >
            {panel.title}
            {activeTab === panel.id && (
              <motion.div 
                style={{ 
                  position: 'absolute', 
                  bottom: '-1px', 
                  left: 0, 
                  right: 0, 
                  height: '2px', 
                  backgroundColor: theme.Color.Accent.Surface[1] 
                }} 
                layoutId="underline" 
              />
            )}
          </div>
        ))}
      </div>
      <div>
        {panels.map(panel => (
          activeTab === panel.id && <div key={panel.id}>{panel.content}</div>
        ))}
      </div>
    </div>
  );
};

export default TabbedPanel;
