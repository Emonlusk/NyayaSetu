import React from 'react';
import { 
  X, 
  LayoutDashboard, 
  MessageCircle, 
  FileText, 
  Home, 
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';

type Module = 'dashboard' | 'nyayaqa' | 'docgen' | 'rentguard' | 'contractsafe';

interface SidebarProps {
  isOpen: boolean;
  activeModule: Module;
  onModuleSelect: (module: Module) => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeModule, onModuleSelect, onClose }) => {
  const { t } = useLanguage();

  const modules = [
    { id: 'dashboard', name: t('dashboard'), icon: LayoutDashboard, color: 'text-blue-600' },
    { id: 'nyayaqa', name: t('nyayaQA'), icon: MessageCircle, color: 'text-green-600' },
    { id: 'docgen', name: t('docGen'), icon: FileText, color: 'text-purple-600' },
    { id: 'rentguard', name: t('rentGuard'), icon: Home, color: 'text-orange-600' },
    { id: 'contractsafe', name: t('contractSafe'), icon: Briefcase, color: 'text-red-600' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl border-r border-gray-200
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">{t('menu')}</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => {
                  onModuleSelect(module.id as Module);
                  onClose();
                }}
                className={`
                  w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200
                  ${activeModule === module.id 
                    ? 'bg-gradient-to-r from-orange-500 to-blue-500 text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <module.icon 
                    size={20} 
                    className={activeModule === module.id ? 'text-white' : module.color} 
                  />
                  <span className="font-medium">{module.name}</span>
                </div>
                <ChevronRight 
                  size={16} 
                  className={`transition-transform ${activeModule === module.id ? 'rotate-90' : ''}`}
                />
              </button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-4 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-1">{t('needHelp')}</h3>
              <p className="text-sm text-gray-600 mb-3">{t('helpDescription')}</p>
              <button className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:shadow-md transition-all">
                {t('contactSupport')}
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;