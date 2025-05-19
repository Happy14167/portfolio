import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-background-dark border-t border-accent-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-text-secondary flex items-center">
              Designed with <Heart className="mx-2 text-red-500" size={16} /> by Collyn
            </p>
          </div>
          
          <div className="text-sm text-text-secondary">
            <div className="flex space-x-6">
              <a 
                href="#" 
                className="hover:text-accent-primary transition-colors duration-300"
              >
                Imprint
              </a>
              <a 
                href="#" 
                className="hover:text-accent-primary transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <span>© {currentYear} Collyn</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;