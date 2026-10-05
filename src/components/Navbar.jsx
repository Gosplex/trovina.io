import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';

const NAV_LINKS = [
  { path: '/services', label: 'Services' },
  { path: '/#work', label: 'Work' },
  { path: '/#pricing', label: 'Pricing' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

const linkBase = 'text-sm transition-colors';

export default function Navbar({ onOpenForm }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'glass-nav' : 'border-b border-transparent bg-background/0'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-[72px] lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Trovina.io home">
          <img src="/logo-mark.png" alt="" width="34" height="34" className="h-[34px] w-[34px] object-contain" />
          <span className="text-lg font-semibold tracking-tight text-foreground">Trovina</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((item) => (
              <li key={item.path}>
                {item.path.includes('#') ? (
                  <Link to={item.path} className={`${linkBase} text-muted hover:text-foreground`}>
                    {item.label}
                  </Link>
                ) : (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${linkBase} ${isActive ? 'font-medium text-foreground' : 'text-muted hover:text-foreground'}`
                    }
                  >
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button type="button" onClick={onOpenForm} className="btn-primary">
              Start a project
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 64px)' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-background md:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-8 pt-4">
              <ul className="flex flex-col">
                {[{ path: '/', label: 'Home' }, ...NAV_LINKS].map((item) => (
                  <li key={item.path} className="border-b border-border">
                    <Link
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className="block py-4 text-2xl font-medium tracking-tight text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onOpenForm?.();
                }}
                className="btn-primary btn-lg mt-auto w-full"
              >
                Start a project
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
