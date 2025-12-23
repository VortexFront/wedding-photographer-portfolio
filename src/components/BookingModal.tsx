import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName?: string;
}

const BookingModal = ({ isOpen, onClose, planName }: BookingModalProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
      }, 4000);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-white shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8 md:p-12 relative">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-muted hover:text-text-main transition-colors p-2"
              >
                <X size={20} />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-10 text-center">
                    <h3 className="text-3xl font-serif mb-3">Забронировать дату</h3>
                    <p className="text-muted text-xs uppercase tracking-widest font-medium">
                      {planName ? `Выбран пакет: ${planName}` : 'Обсудим вашу историю?'}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted mb-2 block group-focus-within:text-accent transition-colors">Ваше имя</label>
                      <input 
                        required
                        type="text" 
                        className="w-full border-b border-bg-secondary py-2 text-text-main focus:border-accent outline-none transition-colors bg-transparent placeholder:text-muted/50"
                        placeholder="Имя Фамилия"
                      />
                    </div>
                    
                    <div className="group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted mb-2 block group-focus-within:text-accent transition-colors">Телефон</label>
                      <input 
                        required
                        type="tel" 
                        className="w-full border-b border-bg-secondary py-2 text-text-main focus:border-accent outline-none transition-colors bg-transparent placeholder:text-muted/50"
                        placeholder="+7 (999) 000-00-00"
                      />
                    </div>

                    <div className="group">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-muted mb-2 block group-focus-within:text-accent transition-colors">Дата события</label>
                      <input 
                        required
                        type="date" 
                        className="w-full border-b border-bg-secondary py-2 text-text-main focus:border-accent outline-none transition-colors bg-transparent"
                      />
                    </div>

                    <div className="mt-8">
                      <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-5 bg-text-main text-white uppercase tracking-[0.2em] text-xs font-bold hover:bg-black transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70"
                      >
                        {isLoading ? (
                          <span>Отправка...</span>
                        ) : (
                          <>
                            <span>Отправить заявку</span>
                            <Send size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-12 text-center flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-serif mb-4">Заявка отправлена!</h3>
                  <p className="text-muted text-sm max-w-xs mx-auto leading-relaxed">
                    Спасибо за доверие. Я свяжусь с вами в ближайшее время для подтверждения деталей.
                  </p>
                </motion.div>
              )}
            </div>
            
            {/* Decorative bottom bar */}
            <div className="h-1 w-full bg-gradient-to-r from-transparent via-accent to-transparent opacity-20" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
