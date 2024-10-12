import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">{t('aboutUs')}</h3>
            <p>{t('footerAboutText')}</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">{t('quickLinks')}</h3>
            <ul>
              <li><a href="/listings">{t('listings')}</a></li>
              <li><a href="/about">{t('about')}</a></li>
              <li><a href="/contact">{t('contact')}</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">{t('contact')}</h3>
            <p>{t('address')}: 123 Real Estate St, City, Country</p>
            <p>{t('phone')}: +1 234 567 8900</p>
            <p>{t('email')}: info@realestate.com</p>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p>&copy; 2024 {t('siteName')}. {t('allRightsReserved')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;