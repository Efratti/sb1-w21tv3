import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex items-center justify-center">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">{t('welcomeMessage')}</h1>
        <p className="text-xl mb-8">{t('findYourDreamHome')}</p>
        <div className="bg-white rounded-full p-2 flex items-center max-w-md mx-auto">
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            className="flex-grow px-4 py-2 rounded-full focus:outline-none text-gray-800"
          />
          <button className="bg-blue-600 text-white p-2 rounded-full">
            <Search />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;