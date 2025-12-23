import { motion } from 'framer-motion';

const Portfolio = () => {
  const photos = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
      category: 'Церемония',
      size: 'large'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=800',
      category: 'Портрет',
      size: 'small'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?auto=format&fit=crop&q=80&w=800',
      category: 'Детали',
      size: 'small'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1000',
      category: 'Сборы',
      size: 'medium'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1522673607200-1648832cee98?auto=format&fit=crop&q=80&w=800',
      category: 'Прогулка',
      size: 'medium'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1000',
      category: 'Вечер',
      size: 'large'
    }
  ];

  return (
    <section id="portfolio" className="section-padding bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="uppercase tracking-[0.2em] text-xs text-muted mb-4 block">Портфолио</span>
            <h2 className="text-4xl md:text-5xl">Избранные Истории Любви</h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md text-muted"
          >
            Каждая свадьба — это уникальная история. Я стремлюсь запечатлеть не только события, 
            но и чувства, которые делают этот день незабываемым.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative overflow-hidden group cursor-pointer ${
                photo.size === 'large' ? 'md:row-span-2' : ''
              }`}
            >
              <img 
                src={photo.url} 
                alt={photo.category}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center p-6 bg-white/10 backdrop-blur-sm border border-white/20 scale-90 group-hover:scale-100 transition-transform duration-500">
                  <span className="text-white uppercase tracking-widest text-xs font-semibold">
                    {photo.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
