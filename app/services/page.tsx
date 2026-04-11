import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Classic Countertops LLC offers laminate, quartz, solid surface, and granite countertop fabrication and installation in Akron, Ohio — plus expert countertop repair.',
};

const services = [
  {
    id: 'laminate',
    name: 'Laminate Countertops',
    tagline: 'Versatile, durable, and beautifully affordable',
    description:
      "Laminate has come a long way. Today's options include highly realistic stone, marble, and wood patterns that deliver the look you want without the price tag of natural stone. Our laminate countertops are precision-fabricated for a clean, seamless fit and are available in hundreds of colors and textures from top manufacturers.",
    features: [
      'Hundreds of colors, patterns, and finishes',
      'Budget-friendly without sacrificing style',
      'Durable and easy to clean',
      'Available in matte, gloss, and textured surfaces',
      'Custom edge profiles available',
      'Quick turnaround time',
    ],
    ideal: 'Kitchens, rental properties, commercial spaces, and budget-conscious renovations.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'quartz',
    name: 'Quartz Countertops',
    tagline: 'The best of beauty and durability — engineered to impress',
    description:
      "Quartz countertops are engineered from natural quartz crystals bound with resins, creating a surface that is harder, more uniform, and virtually maintenance-free compared to natural stone. They resist scratches, stains, and bacteria without the need for sealing — making them one of the most practical premium countertop options available.",
    features: [
      'Non-porous — resists stains and bacteria',
      'No sealing required',
      'Scratch and chip resistant',
      'Consistent color and pattern throughout',
      'Available in hundreds of colors and designs',
      'Ideal for high-traffic kitchens',
    ],
    ideal: 'High-use kitchens, family homes, and anyone who wants a premium look with minimal maintenance.',
    image: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'solid-surface',
    name: 'Solid Surface Countertops',
    tagline: 'Seamless beauty with unmatched versatility',
    description:
      "Solid surface countertops (brands like Corian®) offer a unique advantage: seamless integration. Because seams can be made virtually invisible and the material is completely uniform throughout, solid surface is the top choice for built-in sinks, curved designs, and complex custom shapes. They can also be repaired and refinished if scratched.",
    features: [
      'Seamless joins and integrated sink options',
      'Completely repairable — scratches can be sanded out',
      'Non-porous and hygienic',
      'Ideal for complex custom shapes',
      'Wide range of colors and finishes',
      'Matte, satin, and high-gloss options',
    ],
    ideal: 'Custom kitchen designs, healthcare environments, and commercial applications.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'granite',
    name: 'Granite Countertops',
    tagline: 'Nature\'s masterpiece — permanently beautiful',
    description:
      "Granite is one of the hardest natural stones on earth, making it an ideal countertop material that withstands heat, scratches, and the test of time. Each granite slab is unique — no two are alike — giving your kitchen a one-of-a-kind natural work of art. Properly sealed and maintained, granite countertops will look stunning for decades.",
    features: [
      'Naturally heat resistant',
      'Each slab is a unique work of natural art',
      'Extremely hard and durable',
      'Adds significant resale value',
      'Available in hundreds of stone varieties',
      'Requires periodic sealing',
    ],
    ideal: 'Luxury kitchens, homeowners investing in long-term value, and lovers of natural stone.',
    image: 'https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=800&q=80&auto=format&fit=crop',
  },
  {
    id: 'repair',
    name: 'Countertop Repair',
    tagline: 'Restore — don\'t replace. Save thousands.',
    description:
      "Before spending thousands on full countertop replacement, call us for a repair consultation. Our technicians have repaired chips, cracks, burns, delamination, and water damage in laminate, solid surface, and stone countertops. A proper repair can restore both the appearance and function of your countertops at a fraction of the replacement cost.",
    features: [
      'Chip, crack, and burn repair',
      'Delamination re-bonding',
      'Surface refinishing and polishing',
      'Seam repair and re-joining',
      'Water damage restoration',
      'Honest assessment — we tell you when repair beats replacement',
    ],
    ideal: 'Homeowners with damaged countertops who want to save money without sacrificing quality.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format&fit=crop',
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative pt-40 pb-24 bg-[#1C1C1C] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=1400&q=60&auto=format&fit=crop')` }}
        />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
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

          {/* Quick nav */}
          <div className="flex flex-wrap gap-3 mt-12">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-5 py-2 border border-white/20 text-white/60 text-xs tracking-wide hover:border-[#800020] hover:text-[#800020] transition-colors"
              >
                {s.name.split(' ')[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE SECTIONS ── */}
      <div>
        {services.map((service, i) => {
          const isEven = i % 2 === 0;
          return (
            <section
              key={service.id}
              id={service.id}
              className={`py-28 scroll-mt-20 ${isEven ? 'bg-[#FAFAF8]' : 'bg-white'}`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <AnimatedSection direction={isEven ? 'left' : 'right'} className={!isEven ? 'lg:order-2' : ''}>
                    <div className="relative">
                      <div
                        className="aspect-[3/2] bg-cover bg-center"
                        style={{ backgroundImage: `url('${service.image}')` }}
                      />
                      {/* Number badge */}
                      <div className="absolute -top-5 -left-5 w-16 h-16 bg-[#800020] flex items-center justify-center">
                        <span className="text-white text-2xl font-bold" style={{ fontFamily: 'var(--font-playfair)' }}>
                          0{i + 1}
                        </span>
                      </div>
                    </div>
                  </AnimatedSection>

                  {/* Text */}
                  <AnimatedSection direction={isEven ? 'right' : 'left'} className={`space-y-6 ${!isEven ? 'lg:order-1' : ''}`}>
                    <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium">{service.tagline}</p>
                    <h2 className="text-[#1C1C1C] text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-playfair)' }}>
                      {service.name}
                    </h2>
                    <div className="divider-gold-left" />
                    <p className="text-[#6B6B6B] leading-relaxed">{service.description}</p>

                    <div>
                      <h4 className="text-[#1C1C1C] font-semibold text-sm mb-4 tracking-wide uppercase">Key Features</h4>
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

                    <Link
                      href={`/contact?service=${service.id}`}
                      className="btn-primary inline-flex"
                    >
                      Get a {service.id === 'repair' ? 'Repair' : 'Fabrication'} Quote
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </AnimatedSection>
                </div>
              </div>
            </section>
          );
        })}
      </div>

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
              { step: '01', title: 'Free Consultation', desc: 'Tell us your vision. We assess your space, recommend materials, and answer every question — no obligation.' },
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
                  <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
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
