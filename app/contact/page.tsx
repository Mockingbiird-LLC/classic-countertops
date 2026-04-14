'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/AnimatedSection';
import { Suspense } from 'react';

function ContactForm() {
  const searchParams = useSearchParams();
  const defaultService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: defaultService,
    projectType: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const services = [
    { value: 'laminate', label: 'Laminate Countertops' },
    { value: 'quartz', label: 'Quartz Countertops' },
    { value: 'solid-surface', label: 'Solid Surface Countertops' },
    { value: 'granite', label: 'Granite Countertops' },
    { value: 'repair', label: 'Countertop Repair' },
    { value: 'other', label: 'Not Sure Yet' },
  ];

  const projectTypes = [
    { value: 'kitchen', label: 'Kitchen' },
    { value: 'bathroom', label: 'Bathroom' },
    { value: 'laundry', label: 'Laundry / Utility' },
    { value: 'commercial', label: 'Commercial Space' },
    { value: 'other', label: 'Other' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // mailto fallback — in production this would be an API route
    const subject = encodeURIComponent(`Quote Request from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:bill@classiccountertops.net?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus('success'), 500);
  };

  const inputClass = 'w-full bg-white border border-[#E8E4DC] px-4 py-3 text-[#1C1C1C] text-sm placeholder-[#9B9B9B] focus:outline-none focus:border-[#800020] transition-colors';
  const labelClass = 'block text-xs font-semibold tracking-widest uppercase text-[#6B6B6B] mb-2';

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Form */}
      <AnimatedSection direction="left" className="bg-white border border-[#E8E4DC] p-10">
        <h2 className="text-[#1C1C1C] text-2xl mb-2" style={{ fontFamily: 'var(--font-playfair)' }}>
          Request a Free Quote
        </h2>
        <p className="text-[#6B6B6B] text-sm mb-8">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 border-2 border-[#800020] flex items-center justify-center text-[#800020] mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-[#1C1C1C] text-xl font-semibold mb-3">Message Sent!</h3>
              <p className="text-[#6B6B6B] text-sm">
                Your email client should have opened. We&apos;ll respond as soon as possible.
                <br />You can also reach us directly at{' '}
                <a href="tel:3308824220" className="text-[#800020] hover:underline">(330) 882-4220</a>.
              </p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(330) 555-0000"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={inputClass}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Service Interested In</label>
                  <select name="service" value={formData.service} onChange={handleChange} className={inputClass}>
                    <option value="">Select a service</option>
                    {services.map((s) => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Project Type</label>
                  <select name="projectType" value={formData.projectType} onChange={handleChange} className={inputClass}>
                    <option value="">Select type</option>
                    {projectTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass}>Tell Us About Your Project</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your project, timeline, or any questions you have..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-primary w-full justify-center"
              >
                {status === 'submitting' ? 'Sending...' : 'Send My Request'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <p className="text-[#6B6B6B] text-xs text-center">
                Or call us directly: <a href="tel:3308824220" className="text-[#800020] hover:underline">(330) 882-4220</a>
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </AnimatedSection>

      {/* Contact info sidebar */}
      <AnimatedSection direction="right" className="space-y-8">
        <div>
          <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">Get In Touch</p>
          <h2 className="text-[#1C1C1C] text-4xl leading-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
            We&apos;d Love to Hear<br />About Your Project
          </h2>
          <div className="divider-gold-left mt-6" />
        </div>
        <p className="text-[#6B6B6B] leading-relaxed">
          Whether you&apos;re planning a full kitchen renovation or need a quick repair consultation, our team is ready to help. We respond to every inquiry as soon as possible.
        </p>

        <div className="space-y-6">
          {[
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>,
              label: 'Address',
              content: '1519 Kenmore Blvd\nAkron, Ohio 44314',
              href: 'https://maps.google.com/?q=1519+Kenmore+Blvd+Akron+Ohio+44314',
            },
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>,
              label: 'Phone',
              content: '(330) 882-4220',
              href: 'tel:3308824220',
            },
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>,
              label: 'Email',
              content: 'bill@classiccountertops.net',
              href: 'mailto:bill@classiccountertops.net',
            },
            {
              icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
              label: 'Hours',
              content: 'Monday – Friday\n8am – 2:30pm\nAvailable 2:30 – 5pm\nSaturday by appointment',
              href: null,
            },
          ].map((item) => (
            <div key={item.label} className="flex gap-4 group">
              <div className="w-11 h-11 border border-[#E8E4DC] flex items-center justify-center text-[#800020] shrink-0 mt-0.5">
                {item.icon}
              </div>
              <div>
                <p className="text-[#6B6B6B] text-xs tracking-widest uppercase mb-1">{item.label}</p>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith('http') ? '_blank' : undefined}
                    rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-[#1C1C1C] text-sm font-medium hover:text-[#800020] transition-colors whitespace-pre-line"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-[#1C1C1C] text-sm font-medium whitespace-pre-line">{item.content}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Map embed placeholder */}
        <div className="border border-[#E8E4DC] overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-81.5201!3d41.0534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8830e6a5b3a9e3a3%3A0x0!2s1519+Kenmore+Blvd%2C+Akron%2C+OH+44314!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Classic Countertops LLC Location"
          />
        </div>
      </AnimatedSection>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="relative pt-40 pb-24 bg-[#0e0a0a] overflow-hidden">
        {/* CSS pattern background */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: [
            'radial-gradient(circle at 50% 45%, rgba(128,0,32,0.22) 0%, transparent 55%)',
            'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
          ].join(', '),
          backgroundSize: 'auto, 22px 22px',
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-10 h-px bg-[#800020]" />
              <span className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium">Start Your Project</span>
            </div>
            <h1 className="text-white text-5xl md:text-6xl leading-tight mb-6" style={{ fontFamily: 'var(--font-playfair)' }}>
              Contact Us
            </h1>
            <p className="text-white/60 text-xl max-w-2xl leading-relaxed">
              Get your free, no-obligation quote today. We respond as soon as possible.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ── FORM SECTION ── */}
      <section className="py-28 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Suspense fallback={<div className="animate-pulse h-96 bg-[#E8E4DC] rounded" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-white border-t border-[#E8E4DC]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <p className="text-[#800020] text-xs tracking-[0.25em] uppercase font-medium mb-4">Common Questions</p>
            <h2 className="text-[#1C1C1C] text-3xl md:text-4xl" style={{ fontFamily: 'var(--font-playfair)' }}>
              Frequently Asked Questions
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {[
              {
                q: 'How long does a countertop installation take?',
                a: 'Most residential installations are completed in 1–2 days after templating and fabrication. The full process from consultation to installation is typically 1–2 weeks depending on material availability and scheduling.',
              },
              {
                q: 'Do you offer repair services for all countertop materials?',
                a: 'We repair laminate, solid surface, and some natural stone countertops. During your free consultation, we\'ll assess your countertops and give you an honest recommendation: repair or replace.',
              },
              {
                q: 'Do I need an appointment to visit your location?',
                a: 'Yes, we operate by appointment only. Call us at (330) 882-4220 or submit the form above to schedule your consultation at 1519 Kenmore Blvd, Akron.',
              },
              {
                q: 'What areas do you serve?',
                a: 'We serve Akron and the greater Northeast Ohio area including Fairlawn, Cuyahoga Falls, Bath, Stow, Hudson, Medina, Barberton, and surrounding communities. Contact us if you\'re outside this area; we may still be able to help.',
              },
              {
                q: 'Can you match my existing countertops for a partial replacement?',
                a: 'In many cases, yes, especially with laminate and solid surface materials where we have access to a large library of colors. For natural stone, matching can be more challenging due to the natural variation in each slab.',
              },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.06} className="border border-[#E8E4DC] p-6">
                <h3 className="text-[#1C1C1C] font-semibold mb-3 flex gap-3">
                  <span className="text-[#800020] shrink-0">Q.</span>
                  {item.q}
                </h3>
                <p className="text-[#6B6B6B] text-sm leading-relaxed pl-6">{item.a}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
