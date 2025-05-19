import React from 'react';
import { motion } from 'framer-motion';
import { Github, MessageCircle } from 'lucide-react';

const SocialLinks: React.FC = () => {
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
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
  };

  const socialLinks = [
    { platform: 'GitHub', url: 'https://github.com', icon: Github },
    { platform: 'Discord', username: 'mr.oogway.1', icon: MessageCircle }
  ];

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col space-y-4"
    >
      {socialLinks.map((link, index) => (
        <motion.div
          key={index}
          variants={item}
          whileHover={{ y: -5, scale: 1.05 }}
          className="flex items-center space-x-3"
        >
          <div className="p-3 bg-accent-subtle rounded-full text-accent-primary">
            <link.icon size={20} />
          </div>
          <div className="text-text-secondary">
            {link.platform === 'Discord' ? (
              <span>{link.username}</span>
            ) : (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent-primary transition-colors duration-300"
              >
                {link.platform}
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SocialLinks;