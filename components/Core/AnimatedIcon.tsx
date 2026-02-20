/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Theme';

interface AnimatedIconProps {
  paths: string[];
  size?: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ paths, size = 24 }) => {
  const { theme } = useTheme();

  const iconVariants = {
    hidden: {
      pathLength: 0,
      fill: 'rgba(0, 0, 0, 0)',
    },
    visible: {
      pathLength: 1,
      fill: 'rgba(0, 0, 0, 0)',
      transition: {
        default: { duration: 1.5, ease: 'easeInOut' },
      },
    },
  };

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      initial="hidden"
      animate="visible"
      style={{ marginRight: theme.spacing['Space.M'], flexShrink: 0 }}
    >
      {paths.map((path, index) => (
        <motion.path
          key={index}
          d={path}
          variants={iconVariants}
          stroke={theme.Color.Base.Content.P}
          strokeWidth="16"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </motion.svg>
  );
};

export default AnimatedIcon;
