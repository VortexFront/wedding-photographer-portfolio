import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: string) => void;
}

const Pricing = ({ onSelectPlan }: PricingProps) => {
  const plans = [
    {
      name: 'Essential',
      price: '50,000₸',
      description: 'Идеально для небольших камерных свадеб',
      features: [
        '6 часов съемки',
        '300+ фото в авторской обработке',
        'Онлайн-галерея на 3 месяца',
        'Срок отдачи: до 3 недель',
      ]
    },
    {
      name: 'Premium',
      price: '85,000₸',
      description: 'Самый популярный выбор для полного дня',
      features: [
        '10 часов съемки',
        '600+ фото в авторской обработке',
        'Онлайн-галерея на 1 год',
        'Печать 30 лучших фото',
        'Срок отдачи: до 2 недель',
      ],
      popular: true
    },
    {
      name: 'Deluxe',
      price: '120,000₸',
      description: 'Максимальный комфорт и внимание к деталям',
      features: [
        'Весь свадебный день (до 14 часов)',
        '800+ фото в авторской обработке',
        'Свадебная фотокнига (Premium)',
        'Фотокнига для родителей (мини)',
        'Срок отдачи: до 1 недели',
      ]
    }
  ];

  return (
    <section id="pricing" className="section-padding bg-bg-secondary">
      <div className="container">
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.2em] text-xs text-muted mb-4 block"
          >
            Стоимость услуг
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl"
          >
            Инвестиции в Ваши <span className="italic">Воспоминания</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative bg-white p-10 flex flex-col items-center text-center transition-transform hover:-translate-y-2 duration-500 shadow-sm ${
                plan.popular ? 'border-t-4 border-accent shadow-md' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent px-4 py-1 text-[10px] uppercase tracking-widest font-bold">
                  Популярный выбор
                </div>
              )}
              
              <h3 className="text-2xl mb-2">{plan.name}</h3>
              <div className="text-3xl font-light mb-4">{plan.price}</div>
              <p className="text-sm text-muted mb-8 italic">{plan.description}</p>
              
              <div className="w-full h-[1px] bg-bg-secondary mb-8" />
              
              <ul className="flex-grow flex flex-col gap-4 mb-10 text-left w-full">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-4 text-sm text-muted">
                    <Check size={16} className="text-accent flex-shrink-0 mt-1" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={() => onSelectPlan(plan.name)}
                className="w-full py-4 border border-text-main text-xs uppercase tracking-widest font-semibold hover:bg-text-main hover:text-white transition-all duration-300"
              >
                Забронировать дату
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
