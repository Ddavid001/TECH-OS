import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Footer Component
 */
export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/tech-os-logo.png" 
              alt="TechOS Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">TechOS</span>
          </div>
          
          {/* Copyright */}
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

