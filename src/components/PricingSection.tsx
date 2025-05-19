import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { DollarSign, Euro, Gamepad, Check, Zap, Star, Trophy, Rocket } from 'lucide-react';

const PricingSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const plans = [
    {
      name: "Normal",
      icon: Star,
      price: { usd: 20, eur: 18, robux: 2000 },
      features: [
        "Simple game mechanics",
        "Basic UI elements",
        "Standard optimization",
        "1 revision round",
        "3-day delivery"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      name: "Professional",
      icon: Trophy,
      price: { usd: 50, eur: 45, robux: 7000 },
      features: [
        "Complex game systems",
        "Advanced UI/UX design",
        "Performance optimization",
        "3 revision rounds",
        "5-day delivery",
        "Source code documentation",
        "And much more ..."
      ],
      popular: true,
      color: "from-purple-500 to-purple-600"
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: { usd: 100, eur: 95, robux: 15000 },
      features: [
        "Full game development",
        "Custom systems & mechanics",
        "Premium UI/UX design",
        "Advanced optimization",
        "Unlimited revisions",
        "Priority support",
        "Detailed documentation",
        "3-day delivery"
      ],
      color: "from-teal-500 to-teal-600"
    }
  ];

  const [selectedCurrency, setSelectedCurrency] = useState<'usd' | 'eur' | 'robux'>('usd');

  const currencyIcons = {
    usd: DollarSign,
    eur: Euro,
    robux: Gamepad
  };

  const currencySymbols = {
    usd: '$',
    eur: '€',
    robux: 'R$'
  };

  return (
    <section id="pricing" className="py-24 bg-background-light" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Flexible <span className="heading-gradient">Pricing</span>
            </h2>
            <p className="text-text-secondary">Choose the perfect plan for your needs</p>
          </motion.div>

          <motion.div variants={item} className="flex justify-center mb-12">
            <div className="bg-background-dark rounded-lg p-2 inline-flex space-x-2">
              {Object.entries(currencyIcons).map(([currency, Icon]) => (
                <motion.button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency as 'usd' | 'eur' | 'robux')}
                  className={`flex items-center px-4 py-2 rounded-md transition-all duration-300 ${
                    selectedCurrency === currency 
                      ? 'bg-accent-primary text-white' 
                      : 'text-text-secondary hover:text-white'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon size={18} className="mr-2" />
                  {currency.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={item}
                className={`card relative ${
                  plan.popular ? 'border-2 border-accent-primary' : ''
                }`}
                whileHover={{ 
                  y: -10,
                  boxShadow: '0 10px 30px -15px rgba(79, 70, 229, 0.3)'
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent-primary text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <plan.icon className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-r ${plan.color} rounded-lg p-2 text-white`} />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                </div>

                <div className="text-center mb-6">
                  <p className="text-4xl font-bold">
                    {currencySymbols[selectedCurrency]}{plan.price[selectedCurrency]}
                  </p>
                  <p className="text-text-secondary">per project</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: featureIndex * 0.1 }}
                    >
                      <Check className="text-accent-primary mr-2 flex-shrink-0" size={18} />
                      <span className="text-text-secondary">{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.a
                  href="#contact"
                  className={`btn-primary w-full text-center ${
                    plan.popular ? 'bg-accent-primary' : ''
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <Zap className="inline ml-2" size={18} />
                </motion.a>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;