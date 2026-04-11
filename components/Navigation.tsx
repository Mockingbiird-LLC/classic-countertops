'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { services } from '@/app/services/data';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Get a Quote' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navBg = scrolled || !isHome
    ? 'bg-[#1C1C1C] shadow-lg'
    : 'bg-transparent';

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 border-2 border-[#800020] flex items-center justify-center group-hover:bg-[#800020] transition-colors duration-300">
                <span className="text-[#800020] group-hover:text-white font-bold text-sm transition-colors duration-300">CC</span>
              </div>
              <div>
                <div className="text-white font-semibold text-sm tracking-widest uppercase leading-none">Classic</div>
                <div className="text-[#800020] font-light text-xs tracking-[0.2em] uppercase leading-none mt-0.5">Countertops</div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const isQuote = link.href === '/contact';
                if (isQuote) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="btn-primary text-xs"
                    >
                      {link.label}
                    </Link>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative text-xs font-medium tracking-widest uppercase transition-colors duration-200 border-animate pb-1 ${
                      isActive
                        ? 'text-[#800020]'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#800020]"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col gap-1.5 p-2 group"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white origin-center transition-colors"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-6 h-0.5 bg-white"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="block w-6 h-0.5 bg-white origin-center"
              />
            </button>
          </div>
        </div>

        {/* Phone bar */}
        <div className={`hidden md:flex justify-end px-8 pb-2 transition-all duration-300 ${scrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>
          <a href="tel:3308824220" className="text-[#800020] text-xs tracking-wider hover:text-[#9B0026] transition-colors">
            ✆ (330) 882-4220 — Mon–Fri 8AM–5PM
          </a>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#1C1C1C] pt-24 px-8"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const isServices = link.href === '/services';
                const isActive = pathname === link.href || (isServices && pathname.startsWith('/services'));
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    {isServices ? (
                      <div>
                        <div className="flex items-center justify-between">
                          <Link
                            href={link.href}
                            className={`text-2xl font-light tracking-wide ${isActive ? 'text-[#800020]' : 'text-white'}`}
                          >
                            {link.label}
                          </Link>
                          <button
                            onClick={() => setServicesExpanded(!servicesExpanded)}
                            className="p-2 text-white/60 hover:text-white"
                            aria-label="Toggle services menu"
                          >
                            <motion.svg
                              animate={{ rotate: servicesExpanded ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </motion.svg>
                          </button>
                        </div>
                        <AnimatePresence>
                          {servicesExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-3 ml-4 flex flex-col gap-3 border-l border-[#800020]/40 pl-4">
                                {services.map((s) => (
                                  <Link
                                    key={s.id}
                                    href={`/services/${s.id}`}
                                    className={`text-base font-light tracking-wide ${
                                      pathname === `/services/${s.id}` ? 'text-[#800020]' : 'text-white/70 hover:text-white'
                                    }`}
                                  >
                                    {s.name}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className={`block text-2xl font-light tracking-wide ${
                          pathname === link.href ? 'text-[#800020]' : 'text-white'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>
            <div className="mt-12 pt-8 border-t border-white/10">
              <a href="tel:3308824220" className="text-[#800020] text-lg">(330) 882-4220</a>
              <p className="text-white/70 text-sm mt-1">Mon–Fri, 8AM–5PM</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
