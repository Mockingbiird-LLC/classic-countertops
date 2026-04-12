'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import reviewsData from '../data/reviews.json';
import { ohioCounties } from '../data/ohio-counties';
import { Layers, Gem, RectangleHorizontal, Mountain, Wrench, ClipboardList, MapPin, LayoutGrid, Home, ShieldCheck, Phone } from 'lucide-react';

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
    icon: <Layers className="w-7 h-7" strokeWidth={1.5} />,
    title: 'Laminate',
    desc: 'Durable, budget-friendly options in hundreds of patterns, including realistic stone and wood looks.',
    href: '/services/laminate',
  },
  {
    icon: <Gem className="w-7 h-7" strokeWidth={1.5} />,
    title: 'Quartz',
    desc: 'Engineered stone combining beauty with exceptional durability, virtually maintenance-free.',
    href: '/services/quartz',
  },
  {
    icon: <RectangleHorizontal className="w-7 h-7" strokeWidth={1.5} />,
    title: 'Solid Surface',
    desc: 'Seamless, repairable, and endlessly customizable, ideal for kitchens that demand perfection.',
    href: '/services/solid-surface',
  },
  {
    icon: <Mountain className="w-7 h-7" strokeWidth={1.5} />,
    title: 'Granite',
    desc: 'Naturally beautiful and one-of-a-kind. Each slab is unique: a timeless investment in your home.',
    href: '/services/granite',
  },
  {
    icon: <Wrench className="w-7 h-7" strokeWidth={1.5} />,
    title: 'Repair',
    desc: 'Restore damaged countertops and save thousands. Expert repair consultations with the same trusted team.',
    href: '/services/repair',
  },
];

export default function HomePage() {
  const [googleReviews, setGoogleReviews] = useState<typeof reviewsData>(reviewsData);
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const ohioSvgRef = useRef<SVGSVGElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const whyClassicRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const { scrollYProgress: whyClassicProgress } = useScroll({
    target: whyClassicRef,
    offset: ['start end', 'end start'],
  });
  const imageParallax = useTransform(whyClassicProgress, [0, 1], ['0px', '-30px']);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setGoogleReviews(data);
        }
      })
      .catch(() => {/* keep static fallback */});
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[620px] max-h-[900px] overflow-hidden flex items-center bg-[#0e0a0a]" style={{ backgroundColor: '#0e0a0a' }}>
        {/* Three.js 3D countertop scene */}
        <div className="absolute inset-0 bg-[#0e0a0a]">
          <ThreeCountertopHero />
        </div>
        {/* Subtle dark vignette */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(14,10,10,0.5) 0%, rgba(14,10,10,0.2) 40%, rgba(14,10,10,0.75) 100%)',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div style={{ opacity: heroOpacity }} className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-3 bg-white px-5 py-2.5 shadow-md">
                <span className="w-8 h-px bg-[#800020]" />
                <span className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium">
                  Akron&apos;s Premier Countertop Fabricators
                </span>
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
              Expert countertop fabrication and installation in Akron, Ohio. Laminate, quartz, solid surface, granite, and repair, crafted to last a lifetime.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap gap-4 justify-center md:justify-start"
            >
              <Link href="/contact" className="btn-primary">
                Get a Free Estimate
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link href="/services" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white font-semibold tracking-widest uppercase text-xs hover:bg-white hover:text-[#1C1C1C] transition-all duration-300">
                View Our Specialties
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
          <span className="text-white/70 text-xs tracking-widest uppercase">Scroll</span>
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
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-between sm:gap-4 text-sm text-white">
            {[
              { label: 'Free Estimates', icon: <ClipboardList className="w-4 h-4" strokeWidth={1.5} /> },
              { label: 'Serving Northeast Ohio', icon: <MapPin className="w-4 h-4" strokeWidth={1.5} /> },
              { label: 'Premium Materials', icon: <Gem className="w-4 h-4" strokeWidth={1.5} /> },
              { label: 'Repair Specialists', icon: <Wrench className="w-4 h-4" strokeWidth={1.5} /> },
            ].map(({ label, icon }) => (
              <span key={label} className="flex items-center gap-2 font-medium">
                {icon}
                {label}
              </span>
            ))}
            <a href="tel:3308824220" className="flex w-full items-center justify-center gap-1.5 font-semibold tracking-wide hover:underline sm:w-auto">
              <Phone className="w-4 h-4" strokeWidth={1.5} />
              (330) 882-4220
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
              <AnimatedSection key={card.title} delay={i * 0.06}>
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
              { value: 1, suffix: ",000's", label: 'Customers Served' },
              { value: 20, suffix: '+', label: 'Years Experience' },
              { value: 100, suffix: '%', label: 'Locally Owned' },
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
      <section className="py-28" ref={whyClassicRef}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="aspect-[4/5] overflow-hidden relative">
                  <motion.div
                    style={{
                      y: imageParallax,
                      willChange: 'transform',
                      height: 'calc(100% + 60px)',
                      marginTop: '-30px',
                      position: 'relative',
                    }}
                  >
                    <Image
                      src="/kitchen-showcase.jpeg"
                      alt="Classic Countertops kitchen showcase"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </motion.div>
                </div>
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
                  { icon: <LayoutGrid className="w-4 h-4 text-[#800020]" strokeWidth={1.5} />, title: 'Vast Material Selection', desc: 'Access to hundreds of colors, patterns, and stones through our extensive supplier network.' },
                  { icon: <Wrench className="w-4 h-4 text-[#800020]" strokeWidth={1.5} />, title: 'Expert Repair Consultations', desc: 'Save thousands with our repair services: we restore what others would replace.' },
                  { icon: <Home className="w-4 h-4 text-[#800020]" strokeWidth={1.5} />, title: 'Local, Family-Run Business', desc: 'You work directly with our team. No subcontractors, no middlemen.' },
                  { icon: <ShieldCheck className="w-4 h-4 text-[#800020]" strokeWidth={1.5} />, title: 'Guaranteed Satisfaction', desc: 'We measure twice, cut once, and stand by every installation we complete.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 border border-[#800020] flex items-center justify-center shrink-0 mt-0.5">
                      {item.icon}
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

      {/* ── GOOGLE REVIEWS ── */}
      <section className="py-28 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">Customer Reviews</p>
            <h2 className="text-[#1C1C1C] text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Trusted by Homeowners<br />Across Northeast Ohio
            </h2>
            <div className="divider-gold" />

            {/* Google Rating Summary */}
            <div className="flex flex-col items-center mt-8 gap-3">
              <div className="flex items-center gap-3">
                {/* Google G logo */}
                <svg className="w-8 h-8" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl font-bold text-[#1C1C1C]">5.0</span>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="w-5 h-5" fill="#FBBC05" viewBox="0 0 24 24">
                          <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-[#6B6B6B] text-xs mt-0.5">Based on Google Reviews</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Review Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {googleReviews.map((review, i) => (
              <AnimatedSection key={review.name} delay={i * 0.08} withScale className="bg-white border border-[#E8E4DC] p-6 flex flex-col gap-4 hover:border-[#800020]/30 hover:shadow-md transition-all">
                {/* Reviewer info */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0"
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initial}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#1C1C1C] font-semibold text-sm truncate">{review.name}</div>
                    <div className="text-[#6B6B6B] text-xs">{review.location}</div>
                  </div>
                  {/* Google G small */}
                  <svg className="w-5 h-5 ml-auto shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>

                {/* Stars + date */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, j) => (
                      <svg key={j} className="w-4 h-4" fill="#FBBC05" viewBox="0 0 24 24">
                        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[#6B6B6B] text-xs">{review.date}</span>
                </div>

                {/* Review text */}
                <p className="text-[#1C1C1C] text-sm leading-relaxed flex-1">&ldquo;{review.review}&rdquo;</p>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-10">
            <a
              href="https://www.google.com/search?q=Classic+Countertops+LLC+Akron+Ohio+reviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#1C1C1C] text-sm font-medium hover:text-[#800020] transition-colors group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              View all our reviews on Google
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </AnimatedSection>
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
                Classic Countertops LLC serves homeowners and businesses throughout North East Ohio, from Akron and the surrounding Summit County communities to Cleveland, Canton, Massillon, Medina, and beyond.
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
              <p className="text-white/70 text-sm">
                Not sure if we cover your area? <a href="tel:3308824220" className="text-[#800020] hover:text-[#9B0026] underline transition-colors">(330) 882-4220</a>
              </p>
            </AnimatedSection>

            {/* Ohio County Map */}
            <AnimatedSection direction="right" className="flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-4 bg-[#800020]/10 blur-2xl rounded-full" />
                <svg
                  ref={ohioSvgRef}
                  viewBox="0 0 420 390"
                  className="relative w-full drop-shadow-2xl"
                  xmlns="http://www.w3.org/2000/svg"
                  onMouseLeave={() => setHoveredCounty(null)}
                >
                  <defs>
                    {/* Clip county boundaries to state interior so strokes don't cross the state edge */}
                    <clipPath id="ohio-state-clip">
                      <path d="M 25,48 C 60,47 100,46 134,46 C 160,47 185,62 207,72 C 224,76 240,73 252,71 C 264,69 280,68 294,68 C 305,63 315,55 323,50 C 342,38 360,28 372,31 L 395,22 L 395,153 C 393,162 390,172 385,179 C 381,188 379,199 377,207 C 372,225 369,240 366,251 C 344,267 322,280 305,288 C 278,308 262,322 250,332 C 242,348 238,363 231,372 C 224,369 216,365 209,361 C 200,354 192,348 183,342 C 163,345 146,347 130,347 C 121,340 115,330 109,320 C 95,320 83,320 71,320 C 63,315 57,311 52,306 C 42,312 33,326 25,338 L 25,48 Z" />
                    </clipPath>
                  </defs>

                  {/* State fill */}
                  <path
                    d="M 25,48 C 60,47 100,46 134,46 C 160,47 185,62 207,72 C 224,76 240,73 252,71 C 264,69 280,68 294,68 C 305,63 315,55 323,50 C 342,38 360,28 372,31 L 395,22 L 395,153 C 393,162 390,172 385,179 C 381,188 379,199 377,207 C 372,225 369,240 366,251 C 344,267 322,280 305,288 C 278,308 262,322 250,332 C 242,348 238,363 231,372 C 224,369 216,365 209,361 C 200,354 192,348 183,342 C 163,345 146,347 130,347 C 121,340 115,330 109,320 C 95,320 83,320 71,320 C 63,315 57,311 52,306 C 42,312 33,326 25,338 L 25,48 Z"
                    fill="#160e0e"
                  />

                  {/* Ohio county boundaries — clipped to state interior, with hover for tooltips */}
                  <g stroke="#800020" strokeWidth="0.5" opacity="0.4" fill="#160e0e" clipPath="url(#ohio-state-clip)">
                    {ohioCounties.map((county) => (
                      <path
                        key={county.name}
                        d={county.d}
                        className="cursor-pointer hover:opacity-70 hover:fill-[#1e1010]"
                        style={{ transition: 'opacity 0.15s, fill 0.15s' }}
                        onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                          if (!ohioSvgRef.current) return;
                          const rect = ohioSvgRef.current.getBoundingClientRect();
                          const x = ((e.clientX - rect.left) / rect.width) * 420;
                          const y = ((e.clientY - rect.top) / rect.height) * 390;
                          setHoveredCounty(county.name);
                          setTooltipPos({
                            x: Math.min(Math.max(x - 45, 4), 300),
                            y: Math.max(y - 28, 4),
                          });
                        }}
                        onMouseLeave={() => setHoveredCounty(null)}
                      />
                    ))}
                  </g>

                  {/* NEO service area highlight */}
                  <motion.path
                    d="M 252,71 C 264,69 280,68 294,68 C 305,63 315,55 323,50 C 342,38 360,28 372,31 L 395,22 L 395,153 L 301,153 L 301,118 L 252,118 Z"
                    fill="#800020"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  />
                  <motion.path
                    d="M 252,71 C 264,69 280,68 294,68 C 305,63 315,55 323,50 C 342,38 360,28 372,31 L 395,22 L 395,153 L 301,153 L 301,118 L 252,118 Z"
                    fill="none"
                    stroke="#800020"
                    strokeWidth="1.5"
                    strokeDasharray="5 3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.7 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  />

                  {/* Ohio state border — animates in, sits exactly on state edge */}
                  <motion.path
                    d="M 25,48 C 60,47 100,46 134,46 C 160,47 185,62 207,72 C 224,76 240,73 252,71 C 264,69 280,68 294,68 C 305,63 315,55 323,50 C 342,38 360,28 372,31 L 395,22 L 395,153 C 393,162 390,172 385,179 C 381,188 379,199 377,207 C 372,225 369,240 366,251 C 344,267 322,280 305,288 C 278,308 262,322 250,332 C 242,348 238,363 231,372 C 224,369 216,365 209,361 C 200,354 192,348 183,342 C 163,345 146,347 130,347 C 121,340 115,330 109,320 C 95,320 83,320 71,320 C 63,315 57,311 52,306 C 42,312 33,326 25,338 L 25,48 Z"
                    fill="#160e0e"
                    stroke="#800020"
                    strokeWidth="4"
                    style={{ paintOrder: 'stroke fill' }}
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                    viewport={{ once: true }}
                  />

                  {/* City dots */}
                  {[
                    { x: 294, y: 74, label: 'Cleveland', major: true },
                    { x: 309, y: 109, label: 'Akron', major: true },
                    { x: 321, y: 137, label: 'Canton', major: false },
                    { x: 279, y: 103, label: 'Medina', major: false },
                    { x: 312, y: 104, label: 'C. Falls', major: false },
                    { x: 324, y: 57, label: 'Lake', major: false },
                    { x: 360, y: 107, label: 'Mahoning', major: false },
                  ].map((city) => (
                    <motion.g
                      key={city.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={city.major ? 5 : 3}
                        fill={city.major ? '#800020' : '#9B0026'}
                        opacity={city.major ? 1 : 0.8}
                      />
                      {city.major && (
                        <circle cx={city.x} cy={city.y} r={9} fill="none" stroke="#800020" strokeWidth="1" opacity="0.4" />
                      )}
                      <text
                        x={city.x + (city.major ? 9 : 7)}
                        y={city.y + 4}
                        fill="white"
                        fontSize={city.major ? 10 : 8}
                        fontFamily="sans-serif"
                        opacity={city.major ? 0.9 : 0.6}
                      >
                        {city.label}
                      </text>
                    </motion.g>
                  ))}

                  {/* Compass */}
                  <g transform="translate(90, 240)">
                    <circle cx="0" cy="0" r="16" fill="#0e0a0a" stroke="#800020" strokeWidth="1" opacity="0.8" />
                    <text x="0" y="-5" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif" opacity="0.8">N</text>
                    <line x1="0" y1="-12" x2="0" y2="12" stroke="#800020" strokeWidth="1" opacity="0.5" />
                    <line x1="-12" y1="0" x2="12" y2="0" stroke="#800020" strokeWidth="1" opacity="0.5" />
                  </g>

                  {/* Labels */}
                  <text x="325" y="82" textAnchor="middle" fill="#800020" fontSize="8" fontFamily="sans-serif" fontWeight="600" letterSpacing="2" opacity="0.9">
                    NORTH EAST OHIO
                  </text>
                  <text x="140" y="260" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif" opacity="0.25" letterSpacing="3">
                    OHIO
                  </text>
                  <text x="140" y="272" textAnchor="middle" fill="white" fontSize="7" fontFamily="sans-serif" opacity="0.15">
                    88 Counties
                  </text>

                  {/* County name tooltip on hover */}
                  {hoveredCounty && (
                    <g transform={`translate(${tooltipPos.x}, ${tooltipPos.y})`} style={{ pointerEvents: 'none' }}>
                      <rect
                        x="0" y="0"
                        width={hoveredCounty.length * 6.5 + 16}
                        height="18"
                        rx="3"
                        fill="#1C1C1C"
                        opacity="0.92"
                      />
                      <text
                        x="8" y="13"
                        fill="white"
                        fontSize="9"
                        fontFamily="sans-serif"
                        fontWeight="500"
                      >
                        {hoveredCounty} County
                      </text>
                    </g>
                  )}
                </svg>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── REPAIR CTA ── */}
      <section className="py-24 bg-[#0e0a0a] relative overflow-hidden">
        {/* Dark CSS pattern background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: [
            'radial-gradient(circle at 60% 40%, rgba(128,0,32,0.22) 0%, transparent 55%)',
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          ].join(', '),
          backgroundSize: 'auto, 22px 22px',
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <p className="mb-4"><span className="inline-block bg-white text-[#800020] text-xs tracking-[0.25em] uppercase font-medium px-3 py-1">Before You Replace</span></p>
            <h2 className="text-white text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Have Damaged Countertops?
            </h2>
            <p className="text-white/85 text-lg max-w-2xl mx-auto mb-10">
              Repair consultations can save you thousands of dollars and weeks of renovation time. Our experts assess your countertops honestly: no upselling, just solutions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact?service=repair" className="btn-primary">Book a Repair Consultation</Link>
              <a href="tel:3308824220" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white/70 text-white font-semibold tracking-widest uppercase text-xs hover:bg-white hover:text-[#1C1C1C] transition-all duration-300">
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
