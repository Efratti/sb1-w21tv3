import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Home, Search, User } from 'lucide-react';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center text-2xl font-bold text-blue-600">
          <Home className="mr-2" />
          {t('siteName')}
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to="/listings" className="flex items-center"><Search className="mr-1" /> {t('listings')}</Link></li>
            <li><Link to="/admin" className="flex items-center"><User className="mr-1" /> {t('admin')}</Link></li>
          </ul>
        </nav>
        <div className="flex space-x-2">
          <button onClick={() => changeLanguage('en')} className="px-2 py-1 rounded bg-gray-200">EN</button>
          <button onClick={() => changeLanguage('el')} className="px-2 py-1 rounded bg-gray-200">EL</button>
          <button onClick={() => changeLanguage('tr')} className="px-2 py-1 rounded bg-gray-200">TR</button>
          <button onClick={() => changeLanguage('ar')} className="px-2 py-1 rounded bg-gray-200">AR</button>
        </div>
      </div>
    </header>
  );
};

export default Header;