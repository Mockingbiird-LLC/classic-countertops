'use client';

import dynamic from 'next/dynamic';

const ThreeCountertopHero = dynamic(() => import('@/components/ThreeCountertopHero'), { ssr: false });

export default ThreeCountertopHero;
