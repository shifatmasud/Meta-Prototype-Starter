
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../Theme';
import * as Icons from 'phosphor-react';

export const Container: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing['Space.M'],
        gap: theme.spacing['Space.S'],
        ...style
      }}
    >
      {children}
    </motion.div>
  );
};

export const Text: React.FC<{ content: string; variant?: string; style?: React.CSSProperties }> = ({ content, variant = 'Body.M', style }) => {
  const { theme } = useTheme();
  
  // Resolve variant
  const getVariantStyles = () => {
    const parts = variant.split('.');
    let current: any = theme.Type;
    // Check Expressive vs Readable
    if (variant.startsWith('Display') || variant.startsWith('Headline') || variant === 'Quote' || variant === 'Data') {
      current = theme.Type.Expressive;
    } else {
      current = theme.Type.Readable;
    }

    // Navigate to the specific variant
    parts.forEach(part => {
      if (current[part]) current = current[part];
    });

    return current || theme.Type.Readable.Body.M;
  };

  const variantStyles = getVariantStyles();

  return (
    <span style={{ 
      ...variantStyles, 
      color: theme.Color.Base.Content[1],
      ...style 
    }}>
      {content}
    </span>
  );
};

export const Button: React.FC<{ label: string; onClickAction?: string; style?: React.CSSProperties }> = ({ label, onClickAction, style }) => {
  const { theme } = useTheme();
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      style={{
        padding: `${theme.spacing['Space.S']} ${theme.spacing['Space.M']}`,
        backgroundColor: theme.Color.Accent.Surface[1],
        color: theme.Color.Accent.Content[1],
        border: 'none',
        borderRadius: theme.radius['Radius.M'],
        fontFamily: theme.Type.Readable.Label.M.fontFamily,
        fontSize: theme.Type.Readable.Label.M.fontSize,
        fontWeight: theme.Type.Readable.Label.M.fontWeight,
        cursor: 'pointer',
        ...style
      }}
      onClick={() => {
        if (onClickAction) {
          console.log("Executing action:", onClickAction);
          // In a real app, this would trigger an event bus or store action
        }
      }}
    >
      {label}
    </motion.button>
  );
};

export const Icon: React.FC<{ name: string; size?: number; color?: string; style?: React.CSSProperties }> = ({ name, size = 24, color, style }) => {
  const { theme } = useTheme();
  const IconComp = (Icons as any)[name] || Icons.Question;
  return <IconComp size={size} color={color || theme.Color.Base.Content[1]} style={style} />;
};

export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode }> = ({ style, children }) => {
  const { theme } = useTheme();
  return (
    <motion.div
      style={{
        backgroundColor: theme.Color.Base.Surface[2],
        borderRadius: theme.radius['Radius.L'],
        padding: theme.spacing['Space.L'],
        boxShadow: theme.effects['Effect.Shadow.Drop.1'],
        ...style
      }}
    >
      {children}
    </motion.div>
  );
};
