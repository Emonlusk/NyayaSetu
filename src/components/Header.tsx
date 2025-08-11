import React from 'react';
import { Menu, Scale, Globe, Bell } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="bg-gradient-to-r from-orange-600 to-blue-600 shadow-lg border-b border-orange-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-white hover:bg-white/10 transition-colors"
            >
              <Menu size={24} />
            </button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-white/20 p-2 rounded-xl">
                <Scale className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">NyayaSetu</h1>
                <p className="text-orange-100 text-sm">{t('tagline')}</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors">
              <Bell size={20} />
            </button>
            
            <div className="flex items-center space-x-2 bg-white/10 rounded-lg px-3 py-2">
              <Globe size={16} className="text-white" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
                className="bg-transparent text-white text-sm outline-none cursor-pointer"
              >
                <option value="en" className="text-gray-900">English</option>
                <option value="hi" className="text-gray-900">हिंदी</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;