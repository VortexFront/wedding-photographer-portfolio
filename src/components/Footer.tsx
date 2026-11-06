import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-white pt-24 pb-12 border-t border-bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20 text-center md:text-left">
          {/* Logo/Brand */}
          <div className="flex flex-col items-center md:items-start lg:col-span-1">
            <div className="text-3xl font-serif tracking-widest uppercase mb-6">
              Elena <span className="font-light italic lowercase">Art</span>
            </div>
            <p className="text-muted text-[13px] max-w-xs leading-relaxed">
              Учебный сайт вымышленного фотографа. Все пакеты и контактные примеры демонстрационные; услуги не оказываются.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-8 font-bold text-text-main">Навигация</h4>
            <div className="flex flex-col gap-4 text-muted text-sm">
              <a href="#home" className="hover:text-text-main transition-colors">Главная</a>
              <a href="#portfolio" className="hover:text-text-main transition-colors">Портфолио</a>
              <a href="#about" className="hover:text-text-main transition-colors">Обо мне</a>
              <a href="#pricing" className="hover:text-text-main transition-colors">Прайс</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-8 font-bold text-text-main">Примеры контактов · не для связи</h4>
            <div className="flex flex-col gap-5 text-muted text-sm">
              <span className="flex items-center gap-3">
                <Phone size={16} className="text-accent group-hover:scale-110 transition-transform" />
                <span>+7 (000) 000-00-00</span>
              </span>
              <span className="flex items-center gap-3">
                <Mail size={16} className="text-accent group-hover:scale-110 transition-transform" />
                <span>demo@example.invalid</span>
              </span>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[11px] uppercase tracking-[0.2em] mb-8 font-bold text-text-main">Социальные сети</h4>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                aria-label="Instagram — внешний сайт, не профиль фотографа"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-bg-secondary flex items-center justify-center hover:bg-text-main hover:text-white hover:border-text-main transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://facebook.com" 
                aria-label="Facebook — внешний сайт, не профиль фотографа"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full border border-bg-secondary flex items-center justify-center hover:bg-text-main hover:text-white hover:border-text-main transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-bg-secondary gap-6">
          <p className="text-[10px] uppercase tracking-widest text-muted/60">
            Elena Art · UI-демо Максима Асатурова · фотографии Unsplash
          </p>
          <div className="flex gap-10 text-[10px] uppercase tracking-widest text-muted/60">
            <a href="#about" className="hover:text-text-main">О демонстрации</a>
            <a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="hover:text-text-main">Лицензия фотографий</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
