import { Instagram, Facebook, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-white pt-20 pb-10 border-t border-bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20 text-center md:text-left">
          {/* Logo/Brand */}
          <div className="flex flex-col items-center md:items-start">
            <div className="text-3xl font-serif tracking-widest uppercase mb-4">
              Elena <span className="font-light italic">Art</span>
            </div>
            <p className="text-muted text-sm max-w-xs">
              Запечатлею Вашу любовь в самом красивом свете. Живу и снимаю вдохновляющие истории по всему миру.
            </p>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg uppercase tracking-widest mb-6 font-semibold text-xs">Контакты</h4>
            <div className="flex flex-col gap-4 text-muted">
              <a href="tel:+79991234567" className="flex items-center gap-3 hover:text-text-main transition-colors">
                <Phone size={18} />
                <span>+7 (999) 123-45-67</span>
              </a>
              <a href="mailto:hello@elenaart.com" className="flex items-center gap-3 hover:text-text-main transition-colors">
                <Mail size={18} />
                <span>hello@elenaart.com</span>
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-lg uppercase tracking-widest mb-6 font-semibold text-xs">Социальные сети</h4>
            <div className="flex gap-6">
              <a href="#" className="w-12 h-12 rounded-full border border-bg-secondary flex items-center justify-center hover:bg-bg-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-bg-secondary flex items-center justify-center hover:bg-bg-secondary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-bg-secondary gap-4">
          <p className="text-[10px] uppercase tracking-widest text-muted">
            © 2025 Elena Art Photography. Все права защищены.
          </p>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-muted">
            <a href="#" className="hover:text-text-main">Политика конфиденциальности</a>
            <a href="#" className="hover:text-text-main">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
