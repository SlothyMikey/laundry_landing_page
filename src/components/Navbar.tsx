import React, { useEffect, useMemo, useState } from 'react';
import Logo from '@/components/ui/Logo';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useDarkMode from '@/hooks/useDarkMode';

const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isAtTop, setIsAtTop] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { dark, toggle } = useDarkMode();

  const navItems = useMemo(
    () => [
      { id: 'home', label: 'Home' },
      { id: 'services', label: 'Services' },
      { id: 'pricing', label: 'Pricing' },
      { id: 'faq', label: 'FAQ' },
      { id: 'contact', label: 'Contact' },
    ],
    [],
  );

  useEffect(() => {
    const getNavbarHeight = (): number => {
      const nav = document.querySelector('nav');
      if (nav) return (nav as HTMLElement).offsetHeight;
      return 0;
    };

    const handleScroll = () => {
      const offset = getNavbarHeight() + 8; // small buffer below sticky navbar
      let currentId = navItems[0]?.id ?? 'home';

      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top - offset <= 0) {
          currentId = item.id;
        }
      });

      setActiveSection(currentId);
      setIsAtTop(window.scrollY < 4);
    };

    // Initialize and bind listeners
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [navItems]);

  return (
    <nav
      className={
        'fixed top-0 left-0 right-0 z-50 text-text-primary w-full transition-colors duration-300 text-txt-primary' +
        (isAtTop
          ? ' bg-transparent'
          : ' backdrop-blur-sm bg-bg-light/60 shadow-md')
      }
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between py-4 px-10">
        <div className="flex items-center gap-2 text-txt-highlight">
          <Logo className="w-8 h-8 " />
          <span className="text-xl font-bold tracking-wide">Laver Savon</span>
        </div>

        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={
                    'relative text-sm transition-colors' +
                    (isActive
                      ? ' underline underline-offset-8 decoration-2'
                      : ' hover:underline underline-offset-4')
                  }
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <IconButton
          onClick={toggle}
          color="inherit"
          aria-label="Toggle dark mode"
          sx={{ display: { xs: 'none', md: 'inline-flex' } }}
        >
          {dark ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        {/* Mobile menu button */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-txt-primary/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-txt-primary"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-bg-light border-t border-txt-primary/10">
          <ul className="px-4 py-4 space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={
                      'block py-2 px-3 rounded-md text-base transition-colors' +
                      (isActive
                        ? ' bg-bg-highlight text-light font-semibold'
                        : ' hover:bg-txt-primary/5')
                    }
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="px-4 pb-4 flex items-center justify-between border-t border-txt-primary/10 pt-4">
            <span className="text-sm text-txt-muted">Theme</span>
            <IconButton
              onClick={toggle}
              color="inherit"
              aria-label="Toggle dark mode"
              size="small"
            >
              {dark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
