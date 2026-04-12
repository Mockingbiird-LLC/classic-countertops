'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const services = [
  { name: 'Laminate Countertops', href: '/services/laminate' },
  { name: 'Quartz Countertops', href: '/services/quartz' },
  { name: 'Solid Surface', href: '/services/solid-surface' },
  { name: 'Granite Countertops', href: '/services/granite' },
  { name: 'Countertop Repair', href: '/services/repair' },
];

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Get a Quote' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1C] text-white">
      {/* CTA Band */}
      <div className="bg-[#800020]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-white text-xl font-semibold">Ready to transform your space?</h3>
            <p className="text-white/80 text-sm mt-1">Get your free quote today, no obligation.</p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-white text-white font-semibold tracking-widest uppercase text-xs hover:bg-white hover:text-[#800020] transition-all duration-300 shrink-0"
          >
            Request a Free Quote
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 border-2 border-[#800020] flex items-center justify-center">
                <span className="text-[#800020] font-bold text-sm">CC</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm tracking-widest uppercase">Classic</div>
                <div className="text-[#800020] font-light text-xs tracking-[0.2em] uppercase">Countertops</div>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Akron&apos;s premier countertop fabrication and installation company. Quality craftsmanship since day one.
            </p>
            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/70 hover:border-[#800020] hover:text-[#800020] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
<a href="#" className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/70 hover:border-[#800020] hover:text-[#800020] transition-colors" aria-label="LinkedIn">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/70 text-sm hover:text-[#800020] transition-colors flex items-center gap-2">
                    <span className="w-3 h-px bg-[#800020] shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="text-white/70 text-sm hover:text-[#800020] transition-colors flex items-center gap-2">
                    <span className="w-3 h-px bg-[#800020] shrink-0" />
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white text-xs font-semibold tracking-widest uppercase mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-white/70">
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>1519 Kenmore Blvd<br/>Akron, Ohio 44314</span>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:3308824220" className="hover:text-[#800020] transition-colors">(330) 882-4220</a>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <a href="mailto:bill@classiccountertops.net" className="hover:text-[#800020] transition-colors">bill@classiccountertops.net</a>
              </li>
              <li className="flex gap-3">
                <svg className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Mon-Fri: 8:00 AM to 5:00 PM<br/><em className="text-white/60">By Appointment</em></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} Classic Countertops LLC. All rights reserved.</p>
          <p>1519 Kenmore Blvd, Akron, Ohio 44314</p>
        </div>
      </div>
    </footer>
  );
}
