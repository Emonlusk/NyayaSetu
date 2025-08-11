import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import NyayaQA from './components/NyayaQA';
import DocGen from './components/DocGen';
import RentGuard from './components/RentGuard';
import ContractSafe from './components/ContractSafe';
import LanguageProvider from './components/LanguageProvider';
import LoginModal from './components/Auth/LoginModal';
import RegisterModal from './components/Auth/RegisterModal';
import CitizenDashboard from './components/Citizen/CitizenDashboard';
import LawyerDashboard from './components/Lawyer/LawyerDashboard';
import AdminDashboard from './components/Admin/AdminDashboard';

type Module = 'dashboard' | 'nyayaqa' | 'docgen' | 'rentguard' | 'contractsafe';

function AppContent() {
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState<Module>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const renderModule = () => {
    // If user is not logged in, show public modules
    if (!user) {
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
    }

    // Role-based dashboard rendering
    if (activeModule === 'dashboard') {
      switch (user.role) {
        case 'citizen':
          return <CitizenDashboard />;
        case 'lawyer':
          return <LawyerDashboard />;
        case 'admin':
          return <AdminDashboard />;
        default:
          return <Dashboard onModuleSelect={setActiveModule} />;
      }
    }

    // Other modules
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
        return user.role === 'citizen' ? <CitizenDashboard /> :
               user.role === 'lawyer' ? <LawyerDashboard /> :
               user.role === 'admin' ? <AdminDashboard /> :
               <Dashboard onModuleSelect={setActiveModule} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <Header 
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onLoginClick={() => setShowLoginModal(true)}
        onRegisterClick={() => setShowRegisterModal(true)}
      />
      
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

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;