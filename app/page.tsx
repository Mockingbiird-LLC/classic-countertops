'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';

const ThreeCountertopHero = dynamic(() => import('@/components/ThreeCountertopHero'), { ssr: false });

/* ─── Animated counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(start);
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const serviceCards = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    title: 'Laminate',
    desc: 'Durable, budget-friendly options in hundreds of patterns — including realistic stone and wood looks.',
    href: '/services#laminate',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
      </svg>
    ),
    title: 'Quartz',
    desc: 'Engineered stone combining beauty with exceptional durability — virtually maintenance-free.',
    href: '/services#quartz',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
      </svg>
    ),
    title: 'Solid Surface',
    desc: 'Seamless, repairable, and endlessly customizable — ideal for kitchens that demand perfection.',
    href: '/services#solid-surface',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: 'Granite',
    desc: 'Naturally beautiful and one-of-a-kind. Each slab is unique — a timeless investment in your home.',
    href: '/services#granite',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Repair',
    desc: 'Restore damaged countertops and save thousands. Expert repair consultations — same trusted team.',
    href: '/services#repair',
  },
];

const testimonials = [
  {
    quote: "Classic Countertops transformed our entire kitchen. The quality is outstanding and the team was professional from start to finish.",
    author: "Jennifer M.",
    location: "Akron, OH",
  },
  {
    quote: "We were about to replace our countertops entirely — they repaired them instead and saved us over $3,000. Incredible service.",
    author: "David R.",
    location: "Fairlawn, OH",
  },
  {
    quote: "The quartz they installed is absolutely beautiful. Months later and it still looks brand new. Highly recommend.",
    author: "Sarah T.",
    location: "Cuyahoga Falls, OH",
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 180]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[620px] max-h-[900px] overflow-hidden flex items-center">
        {/* Three.js 3D countertop scene */}
        <ThreeCountertopHero />
        {/* Subtle dark vignette at bottom */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(14,10,10,0.45) 0%, rgba(14,10,10,0.15) 40%, rgba(14,10,10,0.7) 100%)',
        }} />
        <div className="absolute inset-0 opacity-4 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(128,0,32,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(128,0,32,0.3) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div style={{ opacity: heroOpacity }} className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="w-10 h-px bg-[#800020]" />
              <span className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium">
                Akron&apos;s Premier Countertop Fabrication
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-white text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-8"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              Surfaces That<br />
              <span className="gold-text">Elevate</span> Every<br />
              Living Space
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-white/70 text-lg leading-relaxed max-w-xl mb-10"
            >
              Expert countertop fabrication and installation in Akron, Ohio. Laminate, quartz, solid surface, granite, and repair — crafted to last a lifetime.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/contact" className="btn-primary">
                Get a Free Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/services" className="btn-outline border-white/60 text-white hover:bg-white hover:text-[#1C1C1C]">
                View Our Services
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-white/40 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent"
          />
        </motion.div>
      </section>

      {/* ── INTRO BAND ── */}
      <section className="bg-[#800020] py-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white">
            {['Free Quotes', 'Local Akron Experts', 'Premium Materials', 'Repair Specialists'].map((label) => (
              <span key={label} className="flex items-center gap-2 font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {label}
              </span>
            ))}
            <a href="tel:3308824220" className="font-semibold tracking-wide hover:underline">
              ✆ (330) 882-4220
            </a>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">What We Offer</p>
            <h2 className="text-[#1C1C1C] text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Craftsmanship in Every Surface
            </h2>
            <div className="divider-gold" />
            <p className="text-[#6B6B6B] text-lg max-w-2xl mx-auto mt-6">
              We fabricate and install premium countertops for kitchens, bathrooms, and commercial spaces across Northeast Ohio.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {serviceCards.map((card, i) => (
              <AnimatedSection key={card.title} delay={i * 0.08}>
                <Link href={card.href} className="group block bg-white border border-[#E8E4DC] p-8 hover:border-[#800020] hover:shadow-lg transition-all duration-300 h-full">
                  <div className="w-14 h-14 border border-[#E8E4DC] group-hover:border-[#800020] flex items-center justify-center text-[#800020] mb-6 transition-colors duration-300">
                    {card.icon}
                  </div>
                  <h3 className="text-[#1C1C1C] font-semibold text-lg mb-3 group-hover:text-[#800020] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-sm leading-relaxed">{card.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-[#800020] text-xs font-semibold tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn More
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <Link href="/services" className="btn-primary">
              Explore All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 bg-[#1C1C1C] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, #800020 0%, transparent 50%), radial-gradient(circle at 80% 50%, #800020 0%, transparent 50%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 text-center">
            {[
              { value: 500, suffix: '+', label: 'Projects Completed' },
              { value: 20, suffix: '+', label: 'Years Experience' },
              { value: 100, suffix: '%', label: 'Satisfaction Guarantee' },
              { value: 5, suffix: ' Star', label: 'Rated Service' },
            ].map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1} className="border border-white/10 p-8">
                <div className="text-[#800020] text-5xl font-bold mb-3" style={{ fontFamily: 'var(--font-playfair)' }}>
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-white/60 text-sm tracking-wider uppercase">{stat.label}</div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CLASSIC ── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div
                  className="aspect-[4/5] bg-cover bg-center"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=900&q=80&auto=format&fit=crop')` }}
                />
                <div className="absolute -bottom-6 -right-6 bg-[#800020] p-8 text-white">
                  <div className="text-4xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>20+</div>
                  <div className="text-xs tracking-widest uppercase mt-1">Years Serving<br />Northeast Ohio</div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-8">
              <div>
                <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">Why Classic Countertops</p>
                <h2 className="text-[#1C1C1C] text-4xl md:text-5xl leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                  We Stand Behind<br />Our Work
                </h2>
                <div className="divider-gold-left mt-6" />
              </div>
              <p className="text-[#6B6B6B] text-lg leading-relaxed">
                For over two decades, Classic Countertops LLC has been Akron&apos;s trusted name in countertop fabrication and installation. Our team brings precision craftsmanship and honest pricing to every project.
              </p>
              <ul className="space-y-5">
                {[
                  { title: 'Vast Material Selection', desc: 'Access to hundreds of colors, patterns, and stones through our extensive supplier network.' },
                  { title: 'Expert Repair Consultations', desc: 'Save thousands with our repair services — we restore what others would replace.' },
                  { title: 'Local, Family-Run Business', desc: 'You work directly with our team. No subcontractors, no middlemen.' },
                  { title: 'Guaranteed Satisfaction', desc: 'We measure twice, cut once, and stand by every installation we complete.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 border border-[#800020] flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-[#800020]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-[#1C1C1C] font-semibold text-sm mb-1">{item.title}</h4>
                      <p className="text-[#6B6B6B] text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <Link href="/about" className="btn-primary">Our Story</Link>
                <Link href="/contact" className="btn-outline">Get a Quote</Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">What Customers Say</p>
            <h2 className="text-[#1C1C1C] text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              Trusted by Homeowners<br />Across Northeast Ohio
            </h2>
            <div className="divider-gold mt-6" />
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.author} delay={i * 0.1} className="bg-white p-10 border border-[#E8E4DC] relative">
                <div className="absolute top-6 right-8 text-[#800020]/15 text-8xl font-serif leading-none select-none">&ldquo;</div>
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-[#800020]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[#1C1C1C] text-base leading-relaxed mb-8 relative z-10">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-6 border-t border-[#E8E4DC]">
                  <div className="w-10 h-10 bg-[#800020] flex items-center justify-center text-white font-semibold text-sm">
                    {t.author[0]}
                  </div>
                  <div>
                    <div className="text-[#1C1C1C] font-semibold text-sm">{t.author}</div>
                    <div className="text-[#6B6B6B] text-xs">{t.location}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── NORTH EAST OHIO SERVICE AREA ── */}
      <section className="py-28 bg-[#1C1C1C] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: 'radial-gradient(circle at 70% 50%, #800020 0%, transparent 55%)',
        }} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <AnimatedSection direction="left" className="space-y-6">
              <div>
                <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">Where We Work</p>
                <h2 className="text-white text-4xl md:text-5xl leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                  Proudly Serving<br />North East Ohio
                </h2>
                <div className="w-14 h-0.5 bg-[#800020] mt-6" />
              </div>
              <p className="text-white/60 text-lg leading-relaxed">
                Classic Countertops LLC serves homeowners and businesses throughout North East Ohio — from Akron and the surrounding Summit County communities to Cleveland, Canton, Massillon, Medina, and beyond.
              </p>
              <ul className="grid grid-cols-2 gap-3">
                {[
                  'Akron', 'Cleveland', 'Canton', 'Massillon',
                  'Medina', 'Cuyahoga Falls', 'Fairlawn', 'Barberton',
                ].map((city) => (
                  <li key={city} className="flex items-center gap-2 text-white/70 text-sm">
                    <svg className="w-3.5 h-3.5 text-[#800020] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {city}
                  </li>
                ))}
              </ul>
              <p className="text-white/40 text-sm">
                Not sure if we cover your area? <a href="tel:3308824220" className="text-[#800020] hover:text-[#9B0026] underline transition-colors">(330) 882-4220</a>
              </p>
            </AnimatedSection>

            {/* NEO Map graphic */}
            <AnimatedSection direction="right" className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-[#800020]/10 blur-2xl rounded-full" />
                <svg
                  viewBox="0 0 420 380"
                  className="relative w-full drop-shadow-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Ohio state outline */}
                  <path
                    d="M60,30 L370,30 L390,80 L390,240 L340,300 L320,340 L280,350 L240,320 L200,340 L160,330 L100,300 L60,250 L30,200 L30,100 Z"
                    fill="#1a1010"
                    stroke="#800020"
                    strokeWidth="2"
                    opacity="0.7"
                  />
                  {/* NEO region highlight */}
                  <path
                    d="M180,30 L370,30 L390,80 L390,180 L320,220 L260,210 L200,230 L160,200 L150,140 L160,80 Z"
                    fill="#800020"
                    opacity="0.25"
                  />
                  <path
                    d="M180,30 L370,30 L390,80 L390,180 L320,220 L260,210 L200,230 L160,200 L150,140 L160,80 Z"
                    fill="none"
                    stroke="#800020"
                    strokeWidth="1.5"
                    strokeDasharray="6 3"
                    opacity="0.6"
                  />

                  {/* City dots */}
                  {[
                    { x: 240, y: 110, label: 'Cleveland', major: true },
                    { x: 210, y: 155, label: 'Akron', major: true },
                    { x: 270, y: 185, label: 'Canton', major: false },
                    { x: 175, y: 145, label: 'Medina', major: false },
                    { x: 215, y: 135, label: 'C. Falls', major: false },
                  ].map((city) => (
                    <g key={city.label}>
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={city.major ? 6 : 4}
                        fill={city.major ? '#800020' : '#9B0026'}
                        opacity={city.major ? 1 : 0.8}
                      />
                      {city.major && (
                        <circle cx={city.x} cy={city.y} r={10} fill="none" stroke="#800020" strokeWidth="1" opacity="0.4" />
                      )}
                      <text
                        x={city.x + (city.major ? 10 : 8)}
                        y={city.y + 4}
                        fill="white"
                        fontSize={city.major ? 11 : 9}
                        fontFamily="sans-serif"
                        opacity={city.major ? 0.9 : 0.65}
                      >
                        {city.label}
                      </text>
                    </g>
                  ))}

                  {/* Compass rose */}
                  <g transform="translate(355, 305)">
                    <circle cx="0" cy="0" r="18" fill="#0e0a0a" stroke="#800020" strokeWidth="1" opacity="0.8" />
                    <text x="0" y="-6" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif" opacity="0.8">N</text>
                    <line x1="0" y1="-14" x2="0" y2="14" stroke="#800020" strokeWidth="1" opacity="0.5" />
                    <line x1="-14" y1="0" x2="14" y2="0" stroke="#800020" strokeWidth="1" opacity="0.5" />
                  </g>

                  {/* "North East Ohio" label */}
                  <text x="290" y="68" textAnchor="middle" fill="#800020" fontSize="10" fontFamily="sans-serif" fontWeight="600" letterSpacing="2" opacity="0.9">
                    NORTH EAST OHIO
                  </text>
                  <text x="210" y="305" textAnchor="middle" fill="white" fontSize="9" fontFamily="sans-serif" opacity="0.3">
                    Ohio
                  </text>
                </svg>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── REPAIR CTA ── */}
      <section className="py-24 bg-[#1C1C1C] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=60&auto=format&fit=crop')` }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">Before You Replace</p>
            <h2 className="text-white text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Have Damaged Countertops?
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
              Repair consultations can save you thousands of dollars and weeks of renovation time. Our experts assess your countertops honestly — no upselling, just solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?service=repair" className="btn-primary">Book a Repair Consultation</Link>
              <a href="tel:3308824220" className="btn-outline border-white/40 text-white hover:bg-white hover:text-[#1C1C1C]">
                Call (330) 882-4220
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CONTACT STRIP ── */}
      <section className="py-20 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-1">
            {[
              {
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
                label: 'Visit Us',
                value: '1519 Kenmore Blvd, Akron, OH 44314',
                href: 'https://maps.google.com/?q=1519+Kenmore+Blvd+Akron+Ohio+44314',
              },
              {
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
                label: 'Call Us',
                value: '(330) 882-4220',
                href: 'tel:3308824220',
              },
              {
                icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                label: 'Hours',
                value: 'Mon–Fri: 8:00 AM – 5:00 PM',
                href: null,
              },
            ].map((item) => (
              <AnimatedSection key={item.label}>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="group flex items-center gap-5 bg-white border border-[#E8E4DC] p-8 hover:border-[#800020] transition-colors">
                    <div className="w-12 h-12 border border-[#E8E4DC] group-hover:border-[#800020] flex items-center justify-center text-[#800020] shrink-0 transition-colors">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-1">{item.label}</div>
                      <div className="text-[#1C1C1C] font-medium text-sm">{item.value}</div>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-center gap-5 bg-white border border-[#E8E4DC] p-8">
                    <div className="w-12 h-12 border border-[#E8E4DC] flex items-center justify-center text-[#800020] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-1">{item.label}</div>
                      <div className="text-[#1C1C1C] font-medium text-sm">{item.value}</div>
                    </div>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
