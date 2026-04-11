'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollProgressBar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    return scrollY.on('change', (y) => setVisible(y > 50));
  }, [scrollY]);

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width,
        background: 'linear-gradient(90deg, #800020, #9B0026)',
        borderRadius: '0 2px 2px 0',
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  );
}
