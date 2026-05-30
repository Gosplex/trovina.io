import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ui/ThemeToggle';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/#pricing', label: 'Pricing' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

export default function Navbar({ onOpenForm }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 z-50 w-full transition-shadow duration-300 glass-nav ${
        scrolled ? 'shadow-soft' : ''
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-8">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <NavLink to="/" className="flex items-center gap-3" aria-label="Trovina.io home">
            <div className="relative">
              <img
                src="/logo.png"
                alt="Trovina Web Studio Logo"
                className="h-11 w-11 rounded-full object-contain sm:h-12 sm:w-12"
              />
              <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-border" />
            </div>
            <span className="text-xl font-bold text-gradient md:text-2xl">Trovina.io</span>
          </NavLink>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((item) =>
            item.path.includes('#') ? (
              <Link
                key={item.path}
                to={item.path}
                className="relative text-sm font-medium text-muted transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  isActive
                    ? 'relative text-sm font-semibold text-foreground'
                    : 'relative text-sm font-medium text-muted transition-colors hover:text-foreground'
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-brand-gradient"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ),
          )}

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenForm}
              className="btn-primary"
            >
              Book a Call <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-foreground"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map((item) =>
                item.path.includes('#') ? (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3 text-center font-medium text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-xl px-4 py-3 text-center font-medium transition-colors ${
                        isActive ? 'bg-surface-2 text-foreground' : 'text-muted hover:bg-surface-2 hover:text-foreground'
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
              <button
                onClick={() => {
                  setOpen(false);
                  onOpenForm?.();
                }}
                className="btn-primary mt-3 w-full"
              >
                Book a Call <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
