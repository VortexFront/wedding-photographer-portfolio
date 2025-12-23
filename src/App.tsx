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
                  alt="Photographer" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/20 -z-10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="uppercase tracking-[0.2em] text-xs text-muted mb-6 block font-medium">Обо мне</span>
              <h2 className="text-4xl md:text-5xl mb-10 leading-tight">
                Привет, я Елена. <br />
                Я вижу красоту в простых вещах.
              </h2>
              <div className="space-y-6 text-muted max-w-lg">
                <p>
                  Уже более 8 лет я занимаюсь свадебной фотографией. Для меня это не просто работа, 
                  а возможность сохранить самые важные мгновения вашей жизни, чтобы вы могли возвращаться к ним снова и снова.
                </p>
                <p>
                  Я предпочитаю естественный свет, искренние эмоции и минимальное вмешательство в процесс. 
                  Моя цель — чтобы на снимках вы видели себя настоящими.
                </p>
              </div>
              
              <div className="mt-12 flex items-center gap-10">
                <div>
                  <div className="text-3xl font-serif">200+</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted mt-1">Проведенных свадеб</div>
                </div>
                <div>
                  <div className="text-3xl font-serif">8 лет</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted mt-1">В индустрии</div>
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
            <h2 className="text-4xl md:text-6xl text-white mb-10">Ваш Самый Важный День <br /> Начинается Здесь</h2>
            <p className="text-white/60 mb-12 max-w-2xl mx-auto uppercase tracking-widest text-xs">узнайте, свободна ли ваша дата</p>
            <button 
              onClick={() => openBooking()}
              className="inline-block px-12 py-5 bg-white text-text-main uppercase tracking-widest text-xs font-bold hover:bg-accent transition-colors"
            >
              Связаться со мной
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
