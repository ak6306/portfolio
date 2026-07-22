import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT = [0.16, 1, 0.3, 1];

export function Reveal({ children, as = 'div', delay = 0, y = 20, className, ...props }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const PlainTag = as;
    return (
      <PlainTag className={className} {...props}>
        {children}
      </PlainTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
