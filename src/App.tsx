import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | undefined>(undefined);

  const openBooking = (plan?: string) => {
    setSelectedPlan(plan);
    setIsBookingOpen(true);
  };

  return (
    <main className="relative">
      <Header onOpenBooking={() => openBooking()} />
      
      <Hero />

      {/* About Section - Brief Intro */}
      <section id="about" className="section-padding bg-bg-primary overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1000" 
                  alt="Иллюстративный портрет из Unsplash; не автор проекта"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-text-secondary">Иллюстрация Unsplash. На фото не автор проекта.</p>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="uppercase tracking-[0.2em] text-xs text-muted mb-6 block font-medium">О вымышленном персонаже</span>
              <h2 className="text-4xl md:text-5xl mb-10 leading-tight">
                Елена — персонаж <br />
                демонстрационного сайта.
              </h2>
              <div className="space-y-6 text-muted max-w-lg">
                <p>
                  Этот учебный проект показывает интерфейс портфолио свадебного фотографа:
                  галерею, пакеты съёмки и демонстрацию выбора пакета.
                </p>
                <p>
                  Фотографии используются как иллюстрации из Unsplash. Они не являются
                  работами разработчика и не изображают его клиентов. Услуги на этом сайте не оказываются.
                </p>
              </div>
              
              <div className="mt-12 flex items-center gap-10">
                <div>
                  <div className="text-3xl font-serif">UI demo</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted mt-1">Учебное портфолио</div>
                </div>
                <div>
                  <div className="text-3xl font-serif">Без сервера</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted mt-1">Без реальных заявок</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Portfolio />
      
      <Pricing onSelectPlan={openBooking} />

      {/* CTA Section */}
      <section className="section-padding bg-text-main text-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
           <img 
             src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=2000" 
             className="w-full h-full object-cover opacity-10" 
             alt=""
           />
        </div>
        <div className="container relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl text-white mb-10">Посмотрите пример <br /> выбора пакета</h2>
            <p className="text-white/60 mb-12 max-w-2xl mx-auto uppercase tracking-widest text-xs">Демо не проверяет доступность дат и не отправляет сообщения</p>
            <button 
              onClick={() => openBooking()}
              className="inline-block px-12 py-5 bg-white text-text-main uppercase tracking-widest text-xs font-bold hover:bg-accent transition-colors"
            >
              Открыть демо-бронирование
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        planName={selectedPlan}
      />
    </main>
  );
}

export default App;
