import React from 'react';
import { motion } from 'motion/react';

interface ScrollZoomSectionProps {
  children: React.ReactNode;
  className?: string;
  zoomScaleStart?: number;
  zoomScaleEnd?: number;
}

export const ScrollZoomSection: React.FC<ScrollZoomSectionProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`max-w-full overflow-hidden ${className}`}
    >
      {children}
    </motion.div>
  );
};
