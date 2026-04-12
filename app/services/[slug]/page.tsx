import type { Metadata } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import AnimatedSection from '@/components/AnimatedSection';
import MaterialGraphic from '@/components/MaterialGraphic';
import { services } from '../data';

const ThreeCountertopHero = dynamic(() => import('@/components/ThreeCountertopHero'), { ssr: false });

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) return {};
  return {
    title: `${service.name} | Classic Countertops`,
    description: `${service.tagline}. ${service.description.slice(0, 120)}...`,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);
  if (!service) notFound();

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
            <div className="flex items-center gap-3 mb-4">
              <Link href="/services" className="text-white/70 text-xs tracking-[0.2em] uppercase hover:text-[#800020] transition-colors">
                Services
              </Link>
              <span className="w-4 h-px bg-white/30" />
              <span className="text-[#800020] text-xs tracking-[0.2em] uppercase font-medium">{service.name.split(' ')[0]}</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              {service.name}
            </h1>
            <p className="text-[#800020] text-sm tracking-widest uppercase mb-6">{service.tagline}</p>
            <div className="divider-gold-left" />
          </AnimatedSection>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Material graphic */}
            <AnimatedSection direction="left">
              <div className="relative">
                <MaterialGraphic serviceId={service.id} />
                <div className="absolute -bottom-5 -right-5 bg-[#800020] px-8 py-5">
                  <p className="text-white text-xs tracking-[0.25em] uppercase font-medium">Classic Countertops</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Details */}
            <AnimatedSection direction="right" className="space-y-8">
              <div>
                <h2 className="text-[#1C1C1C] text-3xl md:text-4xl mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {['laminate', 'solid-surface', 'quartz', 'granite'].includes(service.id) ? 'About this Material' : 'About This Service'}
                </h2>
                <p className="text-[#6B6B6B] leading-relaxed text-lg">{service.description}</p>
              </div>

              <div>
                <h3 className="text-[#1C1C1C] font-semibold text-sm mb-5 tracking-wide uppercase">Key Features</h3>
                <ul className="space-y-3">
                  {service.features.map((f) => (
                    <li key={f} className="flex gap-3 text-sm text-[#6B6B6B]">
                      <svg className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-l-2 border-[#800020] pl-5 py-2">
                <p className="text-xs text-[#6B6B6B] uppercase tracking-widest mb-1 font-medium">Ideal For</p>
                <p className="text-[#1C1C1C] text-sm">{service.ideal}</p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href={`/contact?service=${service.id}`}
                  className="btn-primary inline-flex"
                >
                  Get a {service.id === 'repair' ? 'Repair' : 'Fabrication'} Quote
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link href="/services" className="btn-outline border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white">
                  All Services
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── SUPPLIERS ── */}
      {service.suppliers && service.suppliers.length > 0 && (
        <section className="py-20 bg-[#1C1C1C]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <AnimatedSection className="mb-12">
              <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">Our Partners</p>
              <h2 className="text-white text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-playfair)' }}>
                Trusted Suppliers
              </h2>
              <div className="divider-gold-left mt-6" />
            </AnimatedSection>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.suppliers.map((supplier, i) => (
                <AnimatedSection key={supplier.name} delay={i * 0.08}>
                  <div className="border border-white/10 p-6 h-full">
                    <h3 className="text-white font-semibold text-lg mb-3">{supplier.name}</h3>
                    {supplier.description && (
                      <p className="text-white/60 text-sm leading-relaxed">{supplier.description}</p>
                    )}
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── OTHER SERVICES ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <h2 className="text-[#1C1C1C] text-3xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              Other Services and Materials
            </h2>
            <div className="divider-gold-left mt-4" />
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services
              .filter((s) => s.id !== service.id)
              .map((s) => (
                <AnimatedSection key={s.id}>
                  <Link href={`/services/${s.id}`} className="group block border border-[#E8E0D8] p-6 hover:border-[#800020] transition-colors h-full">
                    <p className="text-[#800020] text-xs tracking-[0.2em] uppercase font-medium mb-2">{s.tagline}</p>
                    <h3 className="text-[#1C1C1C] text-lg mb-3 group-hover:text-[#800020] transition-colors" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {s.name}
                    </h3>
                    <span className="text-[#800020] text-xs tracking-wide flex items-center gap-1">
                      Learn More
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </Link>
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
