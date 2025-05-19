import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send, Loader2, Mail, ExternalLink, MessageCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import SocialLinks from './SocialLinks';
import VisitorCounter from './VisitorCounter';

const ContactSection: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await emailjs.sendForm(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        formRef.current!,
        'YOUR_PUBLIC_KEY'
      );

      if (result.text === 'OK') {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('EmailJS Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const glowAnimation = {
    initial: { boxShadow: '0 0 0 rgba(79, 70, 229, 0)' },
    hover: { 
      boxShadow: '0 0 30px rgba(79, 70, 229, 0.6)',
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };

  const gradients = [
    "from-blue-500 via-indigo-500 to-purple-500",
    "from-purple-500 via-pink-500 to-red-500"
  ];

  return (
    <section id="contact" className="py-24 bg-background-dark relative overflow-hidden" ref={ref}>
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute top-0 -right-40 w-96 h-96 bg-accent-primary rounded-full filter blur-[100px]"
          animate={{
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-0 -left-40 w-96 h-96 bg-accent-secondary rounded-full filter blur-[100px]"
          animate={{
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </motion.div>

      <Toaster position="top-right" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            variants={item} 
            className="text-center mb-12"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="heading-gradient animate-pulse">Touch</span>
            </h2>
            <p className="text-text-secondary">Let's work together</p>
          </motion.div>

          <motion.div 
            variants={container}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            <motion.div variants={item}>
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${gradients[0]} opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300 rounded-xl`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div 
                  className="card backdrop-blur-sm bg-background-dark/50 relative z-10 border-0 h-full flex flex-col justify-between"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 heading-gradient">Contact Information</h3>
                    <motion.div 
                      className="flex items-center mb-4 text-accent-primary"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Mail className="mr-2" size={20} />
                      <a 
                        href="mailto:collyn.klueck@gmail.com"
                        className="hover:text-accent-secondary transition-colors duration-300"
                      >
                        collyn.klueck@gmail.com
                      </a>
                    </motion.div>
                    <motion.div 
                      className="flex items-center mb-6 text-accent-primary"
                      whileHover={{ x: 10, scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <MessageCircle className="mr-2" size={20} />
                      <span className="hover:text-accent-secondary transition-colors duration-300">
                        mr.oogway.1
                      </span>
                    </motion.div>
                    <div className="space-y-4 text-text-secondary mb-8">
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        I'm currently available for game development projects and web development opportunities. Whether you need help with Roblox development or web applications, I'm here to help!
                      </motion.p>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        My pricing is flexible and project-based. I believe in delivering value and can adjust my rates based on project scope and requirements. For certain projects, I may offer discounts or even free services if I find them particularly interesting or beneficial for portfolio growth.
                      </motion.p>
                    </div>
                  </div>
                  
                  <SocialLinks />
                  <VisitorCounter />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div variants={item}>
              <motion.div 
                className="relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${gradients[1]} opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300 rounded-xl`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                />
                <motion.form 
                  ref={formRef}
                  onSubmit={handleSubmit} 
                  className="card backdrop-blur-sm bg-background-dark/50 relative z-10 border-0"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-accent-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary transition-all duration-500"
                      placeholder="Your name"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">Email</label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-accent-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary transition-all duration-500"
                      placeholder="your.email@example.com"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">Subject</label>
                    <motion.input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-accent-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary transition-all duration-500"
                      placeholder="What's this about?"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">Message</label>
                    <motion.textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-accent-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary resize-none transition-all duration-500"
                      placeholder="Your message..."
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="btn-primary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(79, 70, 229, 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                  >
                    <span className="inline-flex items-center">
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin mr-2" size={18} />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="ml-2 animate-pulse" size={18} />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;