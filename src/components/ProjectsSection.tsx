import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { AlertCircle, Github, ExternalLink } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  githubUrl?: string;
  liveUrl?: string;
  tags?: string[];
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const hoverVariants = {
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

const projects: Project[] = [
  {
    id: '1',
    title: 'VFX & Code Showcase',
    description: 'Demonstration of visual effects and programming skills integration',
    videoUrl: 'https://youtu.be/6w6AY9s8Abg',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    tags: ['React', 'Three.js', 'GSAP']
  },
  {
    id: '2',
    title: 'Arma3 AI System',
    description: 'Advanced AI behavior system for Arma 3 simulations',
    videoUrl: 'https://youtu.be/6w6AY9s8Abg',
    githubUrl: 'https://github.com',
    tags: ['SQF', 'AI', 'Game Dev']
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'This responsive portfolio built with modern web technologies',
    videoUrl: 'https://youtu.be/6w6AY9s8Abg',
    githubUrl: 'https://github.com',
    liveUrl: 'https://collyn.netlify.app',
    tags: ['React', 'TypeScript', 'Tailwind']
  }
];

const ProjectsSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      id="projects" 
      className="py-24 bg-background-light dark:bg-background-dark"
      ref={ref}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              My <span className="heading-gradient">Projects</span>
            </h2>
            <p className="text-text-secondary dark:text-text-secondary-dark">
              Featured work and case studies
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-4xl mx-auto mb-12">
            <div className="card p-6 bg-accent-primary/10 border border-accent-primary/20 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-accent-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">More Projects Coming Soon!</h3>
                  <p className="text-text-secondary dark:text-text-secondary-dark">
                    Currently working on new projects that will be showcased here.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-16">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="max-w-4xl mx-auto"
                whileHover="hover"
                whileTap="tap"
              >
                <motion.div
                  variants={hoverVariants}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="card overflow-hidden bg-gradient-to-br from-background-light to-background-dark dark:from-background-dark dark:to-background-darker border border-accent-subtle rounded-lg shadow-lg"
                >
                  <div className="aspect-video mb-6">
                    <iframe
                      src={project.videoUrl}
                      title={`${project.title} Video`}
                      className="w-full h-full rounded-t-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>

                  <div className="p-6">
                    <motion.h3 
                      className="text-2xl md:text-3xl font-bold text-center mb-4 heading-gradient"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {project.title}
                    </motion.h3>

                    <motion.p 
                      className="text-text-secondary dark:text-text-secondary-dark text-center mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {project.description}
                    </motion.p>

                    {project.tags && (
                      <div className="flex flex-wrap justify-center gap-2 mt-4 mb-6">
                        {project.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-3 py-1 bg-accent-primary/10 text-accent-primary rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-center gap-4 mt-6">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
                        >
                          <Github size={18} />
                          Code
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-primary/90 transition-colors"
                        >
                          <ExternalLink size={18} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;