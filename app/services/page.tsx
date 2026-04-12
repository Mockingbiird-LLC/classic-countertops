import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AnimatedSection from '@/components/AnimatedSection';
import { services } from './data';

const ThreeCountertopHero = dynamic(() => import('@/components/ThreeCountertopHero'), { ssr: false });

export const metadata: Metadata = {
  title: 'Services',
  description: 'Classic Countertops LLC offers laminate, quartz, solid surface, and granite countertop fabrication and installation in Akron, Ohio, plus expert countertop repair.',
};

export default function ServicesPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative pt-40 pb-24 bg-[#0e0a0a] overflow-hidden">
        {/* Three.js countertop animation background */}
        <div className="absolute inset-0 bg-[#0e0a0a]">
          <ThreeCountertopHero />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(14,10,10,0.55) 0%, rgba(14,10,10,0.45) 60%, rgba(14,10,10,0.7) 100%)'
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#800020]" />
              <span className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium">What We Do</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Services
            </h1>
            <p className="text-white/60 text-xl max-w-2xl leading-relaxed">
              From budget-friendly laminate to luxury granite, we fabricate and install countertops that fit your style, your kitchen, and your budget. Plus expert repair when you need it.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-16">
            <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">All Services</p>
            <h2 className="text-[#1C1C1C] text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              Choose Your Surface
            </h2>
            <div className="divider-gold-left mt-6" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.08}>
                <Link href={`/services/${service.id}`} className="group block h-full">
                  <div className="relative overflow-hidden">
                    <div
                      className="aspect-[4/3] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${service.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1C]/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <p className="text-[#800020] text-xs tracking-[0.2em] uppercase font-medium mb-1">{service.tagline}</p>
                      <h3 className="text-white text-2xl" style={{ fontFamily: 'var(--font-playfair)' }}>{service.name}</h3>
                    </div>
                  </div>
                  <div className="border border-[#E8E0D8] border-t-0 p-6 group-hover:border-[#800020] transition-colors">
                    <p className="text-[#6B6B6B] text-sm leading-relaxed mb-5 line-clamp-3">{service.description}</p>
                    <span className="text-[#800020] text-xs tracking-wide flex items-center gap-2 font-medium">
                      Learn More
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="py-28 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">How It Works</p>
            <h2 className="text-white text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Process
            </h2>
            <div className="divider-gold mt-6" />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '01', title: 'Free Consultation', desc: 'Tell us your vision. We assess your space, recommend materials, and answer every question. No obligation.' },
              { step: '02', title: 'Material Selection', desc: 'Browse our extensive selection of materials, colors, and finishes with our guidance.' },
              { step: '03', title: 'Precision Templating', desc: 'We measure your space with precision to ensure a perfect fit every time.' },
              { step: '04', title: 'Expert Installation', desc: 'Our experienced team fabricates and installs your countertops with care and attention to detail.' },
            ].map((step, i) => (
              <AnimatedSection key={step.step} delay={i * 0.1} className="relative">
                <div className="border border-white/10 p-8 h-full">
                  <div className="text-[#800020]/30 text-6xl font-bold mb-6 leading-none" style={{ fontFamily: 'var(--font-playfair)' }}>
                    {step.step}
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 w-8 items-center justify-center text-[#800020]/40 z-10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#800020]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-white text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Ready to Get Started?
            </h2>
            <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
              Contact us today for your free, no-obligation quote. We&apos;ll help you find the perfect countertop solution for your space and budget.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-[#800020]">
                Request a Free Quote
              </Link>
              <a href="tel:3308824220" className="btn-outline border-white/60 text-white hover:bg-white/10">
                Call (330) 882-4220
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
