import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NyayaQA from './components/NyayaQA';
import DocGen from './components/DocGen';
import RentGuard from './components/RentGuard';
import ContractSafe from './components/ContractSafe';
import LanguageProvider from './components/LanguageProvider';

type Module = 'dashboard' | 'nyayaqa' | 'docgen' | 'rentguard' | 'contractsafe';

function App() {
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case 'nyayaqa':
        return <NyayaQA />;
      case 'docgen':
        return <DocGen />;
      case 'rentguard':
        return <RentGuard />;
      case 'contractsafe':
        return <ContractSafe />;
      default:
        return <Dashboard onModuleSelect={setActiveModule} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
        <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <div className="flex">
          <Sidebar 
            isOpen={sidebarOpen}
            activeModule={activeModule}
            onModuleSelect={setActiveModule}
            onClose={() => setSidebarOpen(false)}
          />
          
          <main className="flex-1 transition-all duration-300 ease-in-out">
            <div className="container mx-auto px-4 py-6 max-w-7xl">
              {renderModule()}
            </div>
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}

export default App;