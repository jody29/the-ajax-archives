import { motion } from 'framer-motion';
import { Children, ReactNode } from 'react';

export interface StaggerProps {
  /** Duration in seconds */
  duration?: number;
  /** Delay in seconds */
  staggerDelay?: number;
  children?: ReactNode;
}

export function Stagger({ children, duration = 2, staggerDelay = 0.15 }: StaggerProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const item = {
    hidden: { translateY: -10, opacity: 0 },
    show: { translateY: 0, opacity: 1 },
  };

  return (
    <motion.div
      transition={{
        duration,
      }}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {Children.map(children, (child, index) => (
        <motion.div key={index} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
