import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.title = "Collyn | Developer Portfolio";

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen bg-background-dark text-text-primary font-poppins overflow-hidden scroll-container">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App