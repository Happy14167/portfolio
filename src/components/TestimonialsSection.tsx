import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, Send, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  created_at: string;
}

const TestimonialsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to load testimonials');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([{
          name: formData.name,
          role: formData.role,
          content: formData.content,
          rating: formData.rating
        }]);

      if (error) throw error;

      toast.success('Thank you for your testimonial! It will be reviewed and added soon.');
      setFormData({
        name: '',
        role: '',
        content: '',
        rating: 5
      });
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Failed to submit testimonial. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingHover = (rating: number) => {
    setHoveredRating(rating);
  };

  const handleRatingLeave = () => {
    setHoveredRating(null);
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const displayedTestimonials = showAllTestimonials ? testimonials : testimonials.slice(0, 3);

  return (
    <section className="py-24 bg-background-dark relative overflow-hidden" ref={ref}>
      <Toaster position="top-right" />
      <motion.div 
        className="absolute inset-0 opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-20 blur-3xl"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
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
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={item} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Client <span className="heading-gradient">Testimonials</span>
            </h2>
            <p className="text-text-secondary">What others say about my work</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8"
            variants={container}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loader"
                  className="col-span-3 flex justify-center items-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Loader2 className="w-8 h-8 animate-spin text-accent-primary" />
                </motion.div>
              ) : testimonials.length === 0 ? (
                <motion.div
                  key="no-testimonials"
                  className="col-span-3 text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <p className="text-text-secondary text-lg">No testimonials yet. Be the first to share your experience!</p>
                </motion.div>
              ) : (
                displayedTestimonials.map((testimonial) => (
                  <motion.div
                    key={testimonial.id}
                    variants={item}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-50 blur-xl group-hover:opacity-75 transition-opacity duration-300 rounded-xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                    />
                    <motion.div
                      className="card backdrop-blur-sm bg-background-dark/50 relative z-10 border-0"
                      whileHover={{ y: -5 }}
                    >
                      <Quote className="text-accent-primary mb-4 w-10 h-10" />
                      <p className="text-text-secondary mb-6">{testimonial.content}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-sm text-text-secondary">{testimonial.role}</p>
                        </div>
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5 text-yellow-400 fill-current"
                            />
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>

          {testimonials.length > 3 && (
            <motion.div 
              variants={item}
              className="flex justify-center mb-16"
            >
              <motion.button
                onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                className="btn-secondary flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAllTestimonials ? (
                  <>
                    Show Less
                    <ChevronUp className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    See All Testimonials ({testimonials.length})
                    <ChevronDown className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </motion.div>
          )}

          <motion.div
            variants={item}
            className="max-w-2xl mx-auto"
          >
            <div className="card backdrop-blur-sm bg-background-dark/50 border border-accent-primary/20">
              <h3 className="text-2xl font-bold mb-6 text-center">Share Your Experience</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-accent-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-text-secondary mb-2">Role</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-accent-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary"
                    placeholder="e.g., Client, Developer, Student"
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-text-secondary mb-2">Your Testimonial</label>
                  <textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-accent-subtle rounded-md focus:outline-none focus:ring-2 focus:ring-accent-primary text-text-primary resize-none"
                    placeholder="Share your experience working with me..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <motion.button
                        key={rating}
                        type="button"
                        onClick={() => handleRatingClick(rating)}
                        onHoverStart={() => handleRatingHover(rating)}
                        onHoverEnd={handleRatingLeave}
                        className="focus:outline-none rating-star transition-transform"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Star
                          className={`w-8 h-8 transition-colors duration-200 ${
                            rating <= (hoveredRating ?? formData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-400'
                          }`}
                        />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary w-full flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin mr-2" size={18} />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Testimonial
                      <Send className="ml-2" size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;