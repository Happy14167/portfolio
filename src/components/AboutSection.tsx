import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Terminal, Braces, FileCode, Tally1 as Ball, Gamepad, Users, Bot, AppWindow as Windows, Boxes, Globe, Star, Trophy, Rocket } from 'lucide-react';

const AboutSection: React.FC = () => {
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

  const hobbies = [
    { icon: Ball, text: "Playing Soccer", description: "Active member of a soccer club", color: "text-green-400", gradient: "from-green-500 to-emerald-500" },
    { icon: Code2, text: "Programming", description: "Creating software and learning new technologies", color: "text-blue-400", gradient: "from-blue-500 to-cyan-500" },
    { icon: Users, text: "Meeting Friends", description: "Spending quality time with friends", color: "text-purple-400", gradient: "from-purple-500 to-pink-500" },
    { icon: Gamepad, text: "Gaming", description: "Enjoying various video games", color: "text-red-400", gradient: "from-red-500 to-orange-500" },
    { icon: Bot, text: "Discord Servers", description: "Setting up and managing Discord communities", color: "text-indigo-400", gradient: "from-indigo-500 to-violet-500" },
  ];

  const expertise = [
    {
      icon: Boxes,
      title: "Roblox Development",
      description: "Expert in Roblox Studio with extensive experience in game development and system creation.",
      gradient: "from-violet-500 via-purple-500 to-blue-500"
    },
    {
      icon: Windows,
      title: "Windows 11 Expert",
      description: "Proficient in Windows 11 environment, optimizing workflow and development processes.",
      gradient: "from-fuchsia-500 via-pink-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Web Development",
      description: "Creating modern, responsive web applications with the latest technologies.",
      gradient: "from-cyan-500 via-teal-500 to-blue-500"
    },
    {
      icon: FileCode,
      title: "Game Development",
      description: "Specialized in Roblox game systems, mechanics, and optimization using Lua.",
      gradient: "from-amber-500 via-orange-500 to-red-500"
    }
  ];

  return (
    <section id="about" className="py-24 bg-background-light relative overflow-hidden" ref={ref}>
      <motion.div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-64 h-64 rounded-full bg-gradient-to-r ${
              i % 2 === 0 
                ? 'from-purple-500 via-pink-500 to-red-500' 
                : 'from-blue-500 via-cyan-500 to-teal-500'
            } opacity-20 blur-3xl`}
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About <span className="heading-gradient">Me</span>
            </h2>
            <p className="text-text-secondary">Get to know me better</p>
          </motion.div>

          <motion.div variants={item} className="mb-12">
            <motion.div 
              className="card mb-8 relative overflow-hidden backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute -inset-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500 rounded-xl z-0"
                animate={{
                  background: [
                    'linear-gradient(to right, #8B5CF6, #EC4899, #06B6D4)',
                    'linear-gradient(to right, #06B6D4, #8B5CF6, #EC4899)',
                    'linear-gradient(to right, #EC4899, #06B6D4, #8B5CF6)',
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <div className="relative bg-background-dark p-6 rounded-xl z-10">
                <p className="text-lg leading-relaxed mb-4">
                  I'm a 16-year-old developer from Germany with a deep expertise in Lua programming, particularly in Roblox Studio development. My journey in software development has been focused on creating efficient, clean, and creative solutions, especially in game development and web development.
                </p>
                <p className="text-lg leading-relaxed">
                  I work primarily with Windows 11 as my development environment, leveraging the full potential of Roblox Studio and VSCode for coding. My strong foundation in Lua (98% proficiency) and web technologies allows me to create sophisticated games, systems, and modern web applications.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-center heading-gradient">My Hobbies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${hobby.gradient} opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300 rounded-xl`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.div
                    className="card backdrop-blur-sm bg-background-dark/50 relative z-10 border-0"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col items-center text-center p-4">
                      <motion.div
                        className={`p-3 rounded-lg bg-gradient-to-r ${hobby.gradient} mb-3`}
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.8 }}
                      >
                        <hobby.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <h4 className={`text-lg font-semibold mb-2 bg-gradient-to-r ${hobby.gradient} [background-clip:text] [-webkit-background-clip:text] text-transparent`}>
                        {hobby.text}
                      </h4>
                      <p className="text-text-secondary text-sm">{hobby.description}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={item} className="mb-16">
            <h3 className="text-2xl font-semibold mb-8 text-center heading-gradient">My Expertise</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {expertise.map((item, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300 rounded-xl`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                  />
                  <motion.div
                    className="card backdrop-blur-sm bg-background-dark/50 relative z-10 border-0"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="p-6">
                      <div className="flex items-start">
                        <motion.div
                          className={`mr-4 p-3 rounded-lg bg-gradient-to-r ${item.gradient}`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.8 }}
                        >
                          <item.icon className="w-6 h-6 text-white" />
                        </motion.div>
                        <div>
                          <motion.h4 
                            className={`text-xl font-semibold mb-2 bg-gradient-to-r ${item.gradient} [background-clip:text] [-webkit-background-clip:text] text-transparent`}
                            whileHover={{ x: 5 }}
                            transition={{ duration: 0.3 }}
                          >
                            {item.title}
                          </motion.h4>
                          <p className="text-text-secondary">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;