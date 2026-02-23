
import React from 'react';
import { ComponentSpec } from '../../store/stageStore';
import * as Core from '../Core/BaseComponents';

const ComponentMap: Record<string, React.FC<any>> = {
  Container: Core.Container,
  Text: Core.Text,
  Button: Core.Button,
  Icon: Core.Icon,
  Card: Core.Card,
};

export const StageRenderer: React.FC<{ components: ComponentSpec[] }> = ({ components }) => {
  const renderComponent = (spec: ComponentSpec) => {
    const Component = ComponentMap[spec.type];
    if (!Component) return null;

    return (
      <Component key={spec.id} {...spec.props} style={spec.style}>
        {spec.children?.map(child => renderComponent(child))}
      </Component>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
      {components.map(spec => renderComponent(spec))}
    </div>
  );
};
