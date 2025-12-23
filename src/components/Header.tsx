import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Facebook } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: () => void;
}

const Header = ({ onOpenBooking }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Обо мне', href: '#about' },
    { name: 'Прайс', href: '#pricing' },
    { name: 'Контакты', href: '#contact' },
  ];

  const variants = {
    top: {
      open: { rotate: 45, y: 10 },
      closed: { rotate: 0, y: 0 }
    },
    middle: {
      open: { opacity: 0, x: -10 },
      closed: { opacity: 1, x: 0 }
    },
    bottom: {
      open: { rotate: -45, y: -10 },
      closed: { rotate: 0, y: 0 }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
        isScrolled 
          ? 'py-4 glass border-white/10 shadow-sm' 
          : 'py-6 lg:py-8 bg-transparent border-transparent'
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl md:text-2xl font-serif tracking-[0.2em] uppercase cursor-pointer whitespace-nowrap z-[70] relative"
          style={{ color: (isMobileMenuOpen || isScrolled) ? 'var(--text-main)' : '#ffffff' }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Elena <span className="font-light italic lowercase">Art</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 xl:gap-12">
          <nav className="flex gap-8 xl:gap-10">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative text-[11px] uppercase tracking-[0.2em] font-medium transition-colors"
                style={{ color: isScrolled ? 'var(--text-main)' : '#ffffff' }}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${
                  isScrolled ? 'bg-text-main' : 'bg-white'
                }`} />
              </motion.a>
            ))}
          </nav>

          <div className="flex items-center gap-6 border-l border-white/20 pl-8" style={{ borderColor: isScrolled ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.2)' }}>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className={`transition-colors hover:scale-110 ${isScrolled ? 'text-text-main' : 'text-white'}`}>
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className={`transition-colors hover:scale-110 ${isScrolled ? 'text-text-main' : 'text-white'}`}>
                <Facebook size={18} />
              </a>
            </div>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onOpenBooking}
              className={`px-8 py-3 text-[10px] uppercase tracking-[0.2em] font-bold border transition-all duration-300 ${
                isScrolled 
                  ? 'bg-text-main text-white border-text-main hover:bg-transparent hover:text-text-main' 
                  : 'bg-white/10 text-white border-white/40 backdrop-blur-sm hover:bg-white hover:text-text-main hover:border-white'
              }`}
            >
              Бронировать
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center z-[70]">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex flex-col justify-center items-center gap-[6px] w-12 h-12 p-2"
            aria-label="Toggle Menu"
          >
            <motion.span 
              variants={variants.top}
              animate={isMobileMenuOpen ? "open" : "closed"}
              className={`w-6 h-[2px] block rounded-full transition-colors ${
                (isMobileMenuOpen || isScrolled) ? 'bg-text-main' : 'bg-white'
              }`}
            />
            <motion.span 
              variants={variants.middle}
              animate={isMobileMenuOpen ? "open" : "closed"}
              className={`w-6 h-[2px] block rounded-full transition-colors ${
                (isMobileMenuOpen || isScrolled) ? 'bg-text-main' : 'bg-white'
              }`}
            />
            <motion.span 
              variants={variants.bottom}
              animate={isMobileMenuOpen ? "open" : "closed"}
              className={`w-6 h-[2px] block rounded-full transition-colors ${
                (isMobileMenuOpen || isScrolled) ? 'bg-text-main' : 'bg-white'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-[60] lg:hidden flex flex-col pt-32 px-10"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-4xl font-serif tracking-tight text-text-main"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex justify-center gap-8"
            >
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-text-main p-3 border border-bg-secondary rounded-full">
                <Instagram size={24} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-text-main p-3 border border-bg-secondary rounded-full">
                <Facebook size={24} />
              </a>
            </motion.div>
            
            <div className="mt-auto mb-10 text-center">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-5 bg-text-main text-white uppercase tracking-[0.2em] text-xs font-bold"
              >
                Забронировать дату
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
