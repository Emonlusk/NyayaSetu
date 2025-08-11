import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    tagline: "India's Legal Rights Operating System",
    dashboard: "Dashboard",
    nyayaQA: "NyayaQA",
    docGen: "DocGen",
    rentGuard: "RentGuard",
    contractSafe: "ContractSafe",
    menu: "Menu",
    needHelp: "Need Help?",
    helpDescription: "Connect with legal experts",
    contactSupport: "Contact Support",
    welcomeTitle: "Welcome to NyayaSetu",
    welcomeSubtitle: "Your comprehensive legal assistant powered by AI",
    getStarted: "Choose a module to get started with your legal needs",
    chatWithAI: "Chat with AI Legal Assistant",
    generateDocs: "Generate Legal Documents",
    analyzeRental: "Analyze Rental Agreements",
    reviewContracts: "Review Employment Contracts",
    recentActivity: "Recent Activity",
    quickActions: "Quick Actions",
    askQuestion: "Ask a Legal Question",
    uploadDocument: "Upload Document for Analysis",
    generateRTI: "Generate RTI Application",
    legalNotice: "Create Legal Notice",
    viewAll: "View All",
    startChat: "Start New Chat",
    uploadFile: "Upload File",
    generate: "Generate",
    analyze: "Analyze"
  },
  hi: {
    tagline: "भारत का कानूनी अधिकार प्रणाली",
    dashboard: "डैशबोर्ड",
    nyayaQA: "न्यायक्यूए",
    docGen: "डॉकजेन",
    rentGuard: "रेंटगार्ड",
    contractSafe: "कॉन्ट्रैक्टसेफ",
    menu: "मेनू",
    needHelp: "मदद चाहिए?",
    helpDescription: "कानूनी विशेषज्ञों से जुड़ें",
    contactSupport: "सहायता संपर्क",
    welcomeTitle: "न्यायसेतु में आपका स्वागत है",
    welcomeSubtitle: "आपका व्यापक कानूनी सहायक एआई द्वारा संचालित",
    getStarted: "अपनी कानूनी आवश्यकताओं के लिए एक मॉड्यूल चुनें",
    chatWithAI: "एआई कानूनी सहायक से चैट करें",
    generateDocs: "कानूनी दस्तावेज़ बनाएं",
    analyzeRental: "किराया समझौतों का विश्लेषण करें",
    reviewContracts: "रोजगार अनुबंधों की समीक्षा करें",
    recentActivity: "हाल की गतिविधि",
    quickActions: "त्वरित क्रियाएं",
    askQuestion: "कानूनी प्रश्न पूछें",
    uploadDocument: "विश्लेषण के लिए दस्तावेज़ अपलोड करें",
    generateRTI: "आरटीआई आवेदन बनाएं",
    legalNotice: "कानूनी नोटिस बनाएं",
    viewAll: "सभी देखें",
    startChat: "नई चैट शुरू करें",
    uploadFile: "फ़ाइल अपलोड करें",
    generate: "बनाएं",
    analyze: "विश्लेषण करें"
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;