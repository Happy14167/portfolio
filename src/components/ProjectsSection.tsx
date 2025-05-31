import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, CheckCircle, Zap, Code2, AlertCircle } from 'lucide-react';

const ProjectsSection = () => {
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

  return (
    <section id="projects" className="py-24 bg-background-light" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="heading-gradient">Projects</span>
            </h2>
            <p className="text-text-secondary">Featured work</p>
          </motion.div>

          <motion.div variants={item} className="max-w-4xl mx-auto mb-12">
            <div className="card p-6 bg-accent-primary/10 border border-accent-primary/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-accent-primary mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">Project Updates Coming Soon!</h3>
                  <p className="text-text-secondary">
                    Due to an unexpected data loss, I'm currently in the process of rebuilding my project portfolio. 
                    Stay tuned for new and exciting projects that will be showcased here soon!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project 1 */}
          <motion.div 
            variants={item} 
            className="max-w-4xl mx-auto mb-16"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="card overflow-hidden bg-gradient-to-br from-background-light to-background-dark border border-accent-subtle">
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe
                  src="https://www.youtube.com/embed/6w6AY9s8Abg"
                  title="Portfolio Video"
                  className="w-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <motion.h3 
                className="text-3xl font-bold text-center mb-4 heading-gradient"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Featured Project
              </motion.h3>

              <motion.p 
                className="text-text-secondary text-center mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Check out this showcase of my recent work and coding abilities
              </motion.p>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            variants={item} 
            className="max-w-4xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="card overflow-hidden bg-gradient-to-br from-background-light to-background-dark border border-accent-subtle">
              <div className="aspect-w-16 aspect-h-9 mb-6">
                <iframe
                  src="https://www.youtube.com/embed/ca-1BZM6X2o"
                  title="Second Project Video"
                  className="w-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <motion.h3 
                className="text-3xl font-bold text-center mb-4 heading-gradient"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Second Project
              </motion.h3>

              <motion.p 
                className="text-text-secondary text-center mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Another demonstration of my skills and creativity — watch now!
              </motion.p>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;