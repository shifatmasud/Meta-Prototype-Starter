/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../Theme';
import { systemSpecData, systemSpecMarkdown } from '../../data/systemSpecData';
import { Clipboard, CheckCircle } from 'phosphor-react';
import AnimatedIcon from '../Core/AnimatedIcon';
import { specIcons } from '../../data/specIcons';

const SystemSpecPanel = () => {
  const { theme } = useTheme();
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(systemSpecMarkdown.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <div style={{ padding: theme.spacing['Space.M'], color: theme.Color.Base.Content.P, fontFamily: theme.Type.Readable.Body.M.fontFamily, fontSize: theme.Type.Readable.Body.M.fontSize, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing['Space.L'], flexShrink: 0 }}>
        <h2 style={{ fontFamily: theme.Type.Expressive.Display.S.fontFamily, fontSize: theme.Type.Expressive.Display.S.fontSize, margin: 0 }}>System Spec</h2>
        <button onClick={handleCopy} style={{ display: 'flex', alignItems: 'center', gap: theme.spacing['Space.S'], background: 'none', border: 'none', color: theme.Color.Base.Content.P, cursor: 'pointer', fontFamily: theme.Type.Readable.Label.M.fontFamily }}>
          {copied ? <CheckCircle size={16} color={theme.Color.Feedback.Success.P} /> : <Clipboard size={16} />}
          {copied ? 'Copied!' : 'Copy Markdown'}
        </button>
      </div>
      <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          {systemSpecData.map((section) => (
            <motion.div key={section.title} variants={itemVariants} style={{ marginBottom: theme.spacing['Space.XL'] }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: theme.spacing['Space.M'] }}>
                <AnimatedIcon paths={specIcons[section.title]} />
                <h3 style={{ fontFamily: theme.Type.Expressive.Headline.S.fontFamily, fontSize: theme.Type.Expressive.Headline.S.fontSize, borderBottom: `1px solid ${theme.Color.Base.Surface[3]}`, paddingBottom: theme.spacing['Space.S'], flexGrow: 1, margin: 0 }}>{section.title}</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {section.rules.map((rule, index) => (
                  <motion.li key={index} variants={itemVariants} style={{ marginBottom: theme.spacing['Space.M'] }}>
                    {typeof rule === 'string' ? (
                      <p style={{ margin: 0 }}>{rule}</p>
                    ) : (
                      <div>
                        {rule.subtitle && <h4 style={{ margin: '0 0 8px 0', opacity: 0.8, fontSize: theme.Type.Readable.Label.S.fontSize }}>{rule.subtitle}</h4>}
                        <ul style={{ listStyle: 'disc', paddingLeft: theme.spacing['Space.L'], margin: 0 }}>
                          {rule.items.map((item, itemIndex) => (
                            <motion.li key={itemIndex} variants={itemVariants} style={{ marginBottom: theme.spacing['Space.S'] }}>{item}</motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default SystemSpecPanel;
