import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/skills';
import * as LucideIcons from 'lucide-react';

const SkillsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const gradients = [
    "from-blue-500 via-indigo-500 to-purple-500",
    "from-green-500 via-teal-500 to-cyan-500",
    "from-red-500 via-pink-500 to-purple-500",
    "from-yellow-500 via-orange-500 to-red-500",
    "from-purple-500 via-violet-500 to-indigo-500",
    "from-pink-500 via-rose-500 to-red-500",
    "from-cyan-500 via-blue-500 to-indigo-500",
    "from-emerald-500 via-green-500 to-teal-500"
  ];

  return (
    <section id="skills" className="py-24 bg-background-dark" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="heading-gradient">Skills</span>
            </h2>
            <p className="text-text-secondary">Technologies I work with</p>
          </motion.div>

          <motion.div 
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {skills.map((skill, index) => {
              const IconComponent = (LucideIcons as any)[skill.icon];
              const gradient = gradients[index % gradients.length];
              
              return (
                <motion.div 
                  key={index}
                  variants={item}
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300 rounded-xl`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.div
                    className="card backdrop-blur-sm bg-background-dark/50 relative z-10 border-0"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <motion.div
                        className={`p-3 rounded-lg bg-gradient-to-r ${gradient} mr-3`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        {IconComponent && (
                          <IconComponent className="text-white" size={24} />
                        )}
                      </motion.div>
                      <h3 className={`text-xl font-semibold bg-gradient-to-r ${gradient} [background-clip:text] [-webkit-background-clip:text] text-transparent`}>
                        {skill.name}
                      </h3>
                    </div>
                    
                    <div className="mb-4">
                      <div className="relative h-2 bg-accent-subtle rounded-full overflow-hidden">
                        <motion.div 
                          className={`absolute h-full bg-gradient-to-r ${gradient} rounded-full`}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.proficiency}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                        />
                      </div>
                      <div className="flex justify-between text-sm mt-2">
                        <span className="text-text-secondary">Proficiency</span>
                        <span className={`font-medium bg-gradient-to-r ${gradient} [background-clip:text] [-webkit-background-clip:text] text-transparent`}>
                          {skill.proficiency}%
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-text-secondary text-sm">{skill.description}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;