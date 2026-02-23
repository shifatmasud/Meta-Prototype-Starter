import React, { useState, useEffect } from 'react';
import agent from '../../services/agent';

const RealtimeRenderer = () => {
  const [component, setComponent] = useState(null);

  useEffect(() => {
    const getComponent = async () => {
      const response = await agent.sendCommand('getComponent');
      loadComponent(response.component);
    };
    getComponent();
  }, []);

  const loadComponent = async (componentName) => {
    try {
      const { default: LoadedComponent } = await import(`./components/${componentName}.tsx`);
      setComponent(() => <LoadedComponent />);
    } catch (error) {
      console.error(`Error loading component: ${componentName}`, error);
      setComponent(() => <div>Error loading component: {componentName}</div>);
    }
  };

  return (
    <div>
      <h2>Real-time Renderer is active</h2>
      {component}
    </div>
  );
};

export default RealtimeRenderer;
