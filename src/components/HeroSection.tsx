import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
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

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 h-64 w-64 bg-accent-primary rounded-full filter blur-[120px] opacity-20"></div>
        <div className="absolute bottom-20 left-10 h-64 w-64 bg-accent-secondary rounded-full filter blur-[120px] opacity-20"></div>
      </div>

      <div className="container-section relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={item} className="mb-4 inline-block">
            <Code2 className="inline-block text-accent-primary animate-float mb-2" size={48} />
          </motion.div>
          
          <motion.h1 
            variants={item} 
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
          >
            Hi, I'm <span className="heading-gradient animate-glow">Collyn</span>
          </motion.h1>
          
          <motion.p 
            variants={item} 
            className="text-xl md:text-2xl text-text-secondary mb-8"
          >
            16 years old, Lua expert and Windows enthusiast from Germany
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <motion.a 
              href="#about" 
              className="btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              About Me
            </motion.a>
            <motion.a 
              href="#contact" 
              className="btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in Touch
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-text-primary"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          delay: 1.5,
          duration: 0.5,
          y: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }
        }}
      >
        <ChevronDown size={32} />
      </motion.a>
    </section>
  );
};

export default HeroSection;