'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

export default function ScrollToTopButton() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (y) => {
      setVisible(y > window.innerHeight);
    });
  }, [scrollY]);

  return (
    <motion.button
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 12 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      whileHover={{ background: '#9B0026', boxShadow: '0 4px 12px rgba(128,0,32,0.4)' }}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '1.5rem',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: '#800020',
        border: 'none',
        cursor: 'pointer',
        zIndex: 9998,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: visible ? 'auto' : 'none',
        boxShadow: '0 2px 8px rgba(128,0,32,0.3)',
      }}
      aria-label="Scroll to top"
    >
      <svg width="20" height="20" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </motion.button>
  );
}
