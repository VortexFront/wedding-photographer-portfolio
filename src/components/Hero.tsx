import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Hero Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=90&w=2000')`,
          transform: 'scale(1.1)' 
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-white/80 uppercase tracking-[0.3em] text-[10px] md:text-sm mb-6 block font-light">
            Профессиональный свадебный фотограф
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl text-white mb-8 leading-tight">
            Сохраняя Ваши <br /> 
            <span className="italic font-serif">Искренние</span> Моменты
          </h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <a 
              href="#portfolio"
              className="inline-block px-8 py-3 md:px-10 md:py-4 bg-white text-text-main uppercase tracking-widest text-[10px] md:text-xs font-bold hover:bg-transparent hover:text-white border border-white transition-all duration-300"
            >
              Смотреть портфолио
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
