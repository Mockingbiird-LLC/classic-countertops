import type { Metadata } from 'next';
import Link from 'next/link';
import AnimatedSection from '@/components/AnimatedSection';
import ThreeCountertopHero from '@/components/ThreeCountertopHeroClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: "Learn about Classic Countertops LLC: Akron, Ohio's trusted countertop fabrication and installation company serving Northeast Ohio for over 20 years.",
};

const values = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: 'Quality First',
    desc: 'We use only premium materials and proven fabrication techniques. Every edge, every seam: done right.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Local Expertise',
    desc: "We're Northeast Ohio neighbors. We know this community and take pride in the work we leave behind.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Honest Pricing',
    desc: 'No hidden fees, no bait-and-switch. We quote accurately and deliver on budget, every time.',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: 'Customer Care',
    desc: "Your countertops are an investment. We treat your home with the same care we'd give our own.",
  },
];

const team = [
  {
    name: 'Steven',
    role: 'Fabrication Specialist',
    bio: 'Brings precision and dedication to every countertop project, ensuring every cut and edge meets the highest standard.',
  },
  {
    name: 'Jon',
    role: 'Installation Expert',
    bio: 'Meticulous attention to detail and years of hands-on experience make every installation seamless and built to last.',
  },
  {
    name: 'Dustin',
    role: 'Craftsman',
    bio: 'Committed to quality and customer satisfaction, Dustin takes pride in the finished product left in every home.',
  },
  {
    name: 'Kevin',
    role: 'Lead Technician',
    bio: 'Experienced in all aspects of countertop fabrication and repair, Kevin ensures every project is delivered on time and on budget.',
  },
];

export default function AboutPage() {
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
              <span className="inline-block bg-white text-[#800020] text-xs tracking-[0.25em] uppercase font-medium px-3 py-1">Our Story</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Built on Craft,<br />Driven by Community
            </h1>
            <p className="text-white/60 text-xl max-w-2xl leading-relaxed">
              For over 20 years, Classic Countertops LLC has served Akron and Northeast Ohio with expert fabrication, honest pricing, and workmanship that lasts.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <div className="relative">
                <div className="aspect-square overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps?q=1519+Kenmore+Blvd,+Akron,+Ohio+44314&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, display: 'block' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Classic Countertops LLC — 1519 Kenmore Blvd, Akron, Ohio"
                  />
                </div>
                {/* Decorative accent bars */}
                <div className="absolute top-0 -left-4 w-1 h-32 bg-[#800020]" />
                <div className="absolute bottom-0 -right-4 w-1 h-32 bg-[#800020]" />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="space-y-6">
              <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium">Who We Are</p>
              <h2 className="text-[#1C1C1C] text-4xl leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
                Akron&apos;s Trusted Countertop Experts
              </h2>
              <div className="divider-gold-left" />
              <p className="text-[#6B6B6B] text-lg leading-relaxed">
                Classic Countertops LLC was founded with a single belief: that homeowners deserve premium-quality countertops without the big-box store runaround. Based at 1519 Kenmore Blvd in Akron, Ohio, we&apos;ve built our reputation one kitchen at a time.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                We fabricate and install laminate, quartz, solid surface, and granite countertops for kitchens, bathrooms, and commercial spaces across Northeast Ohio. Beyond installation, our repair consultation service has saved countless homeowners thousands of dollars: sometimes a fix beats a full replacement.
              </p>
              <p className="text-[#6B6B6B] leading-relaxed">
                We&apos;re not a franchise. We&apos;re not a big-box contractor. We&apos;re your neighbors and we treat every project as if it were our own home.
              </p>
              <div className="flex gap-4 pt-4">
                <Link href="/contact" className="btn-primary">Get a Free Quote</Link>
                <Link href="/services" className="btn-outline">Our Services</Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">What We Stand For</p>
            <h2 className="text-[#1C1C1C] text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              Our Core Values
            </h2>
            <div className="divider-gold mt-6" />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <AnimatedSection key={v.title} delay={i * 0.1} className="bg-white border border-[#E8E4DC] p-8">
                <div className="w-12 h-12 border border-[#800020] flex items-center justify-center text-[#800020] mb-6">
                  {v.icon}
                </div>
                <h3 className="text-[#1C1C1C] font-semibold text-lg mb-3">{v.title}</h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{v.desc}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">The People Behind the Work</p>
            <h2 className="text-[#1C1C1C] text-4xl md:text-5xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              Meet Our Team
            </h2>
            <div className="divider-gold mt-6" />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1} className="border border-[#E8E4DC] bg-white p-10">
                <div className="w-16 h-16 bg-[#800020] flex items-center justify-center text-white text-xl font-semibold mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                  {member.name[0]}
                </div>
                <h3 className="text-[#1C1C1C] font-semibold text-xl mb-1">{member.name}</h3>
                <p className="text-[#800020] text-xs tracking-wider uppercase mb-4">{member.role}</p>
                <div className="w-8 h-px bg-[#800020] mb-5" />
                <p className="text-[#6B6B6B] text-sm leading-relaxed">{member.bio}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICE AREA ── */}
      <section className="py-24 bg-[#1C1C1C]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection>
              <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">Where We Work</p>
              <h2 className="text-white text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
                Serving Northeast Ohio
              </h2>
              <div className="divider-gold-left mb-8" />
              <p className="text-white/60 leading-relaxed mb-8">
                Based in Akron, we serve homeowners and businesses across the greater Northeast Ohio area including Akron, Fairlawn, Cuyahoga Falls, Bath, Stow, Hudson, Medina, and surrounding communities.
              </p>
              <div className="flex flex-wrap gap-3">
                {['Akron', 'Fairlawn', 'Cuyahoga Falls', 'Bath', 'Stow', 'Hudson', 'Medina', 'Barberton', 'Norton'].map((city) => (
                  <span key={city} className="px-4 py-2 border border-white/20 text-white/60 text-sm">
                    {city}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="border border-white/10 p-10 space-y-6">
                <h3 className="text-white font-semibold text-xl mb-6">Get In Touch</h3>
                <div className="space-y-4 text-sm text-white/60">
                  <div className="flex gap-4">
                    <svg className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>1519 Kenmore Blvd, Akron, Ohio 44314</span>
                  </div>
                  <div className="flex gap-4">
                    <svg className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <a href="tel:3308824220" className="hover:text-[#800020] transition-colors">(330) 882-4220</a>
                  </div>
                  <div className="flex gap-4">
                    <svg className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <a href="mailto:bill@classiccountertops.net" className="hover:text-[#800020] transition-colors">bill@classiccountertops.net</a>
                  </div>
                  <div className="flex gap-4">
                    <svg className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>Mon–Fri: 8:00 AM – 5:00 PM (By Appointment)</span>
                  </div>
                </div>
                <Link href="/contact" className="btn-primary w-full justify-center mt-4">
                  Schedule a Consultation
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
