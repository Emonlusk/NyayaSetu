import React from 'react';
import { 
  MessageCircle, 
  FileText, 
  Home, 
  Briefcase, 
  ArrowRight,
  Zap,
  TrendingUp,
  Users,
  Clock
} from 'lucide-react';
import { useLanguage } from './LanguageProvider';

type Module = 'dashboard' | 'nyayaqa' | 'docgen' | 'rentguard' | 'contractsafe';

interface DashboardProps {
  onModuleSelect: (module: Module) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onModuleSelect }) => {
  const { t } = useLanguage();

  const modules = [
    {
      id: 'nyayaqa',
      title: t('chatWithAI'),
      description: 'Get instant answers about Indian law, rights, and procedures',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50'
    },
    {
      id: 'docgen',
      title: t('generateDocs'),
      description: 'Create RTI applications, legal notices, and affidavits',
      icon: FileText,
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50'
    },
    {
      id: 'rentguard',
      title: t('analyzeRental'),
      description: 'Check rental contracts for illegal clauses and disputes',
      icon: Home,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50'
    },
    {
      id: 'contractsafe',
      title: t('reviewContracts'),
      description: 'Analyze job offers and freelance agreements for fairness',
      icon: Briefcase,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50'
    }
  ];

  const stats = [
    { label: 'Legal Questions Answered', value: '50,000+', icon: MessageCircle },
    { label: 'Documents Generated', value: '25,000+', icon: FileText },
    { label: 'Contracts Analyzed', value: '15,000+', icon: TrendingUp },
    { label: 'Active Users', value: '100,000+', icon: Users }
  ];

  const recentActivities = [
    { action: 'RTI Application generated', time: '2 minutes ago', type: 'docgen' },
    { action: 'Rental agreement analyzed', time: '5 minutes ago', type: 'rentguard' },
    { action: 'Labor law query resolved', time: '10 minutes ago', type: 'nyayaqa' },
    { action: 'Employment contract reviewed', time: '15 minutes ago', type: 'contractsafe' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t('welcomeTitle')}
        </h1>
        <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
          {t('welcomeSubtitle')}
        </p>
        <p className="text-gray-500 max-w-2xl mx-auto">
          {t('getStarted')}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-blue-500 rounded-lg">
                <stat.icon size={20} className="text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Module Cards */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {modules.map((module) => (
          <div
            key={module.id}
            className={`${module.bgColor} p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer group`}
            onClick={() => onModuleSelect(module.id as Module)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-4 bg-gradient-to-r ${module.color} rounded-xl`}>
                <module.icon size={28} className="text-white" />
              </div>
              <ArrowRight 
                size={20} 
                className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" 
              />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
            <p className="text-gray-600">{module.description}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <Zap size={20} className="text-orange-500 mr-2" />
            {t('quickActions')}
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span>{t('askQuestion')}</span>
              <ArrowRight size={16} className="text-gray-400" />
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span>{t('uploadDocument')}</span>
              <ArrowRight size={16} className="text-gray-400" />
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span>{t('generateRTI')}</span>
              <ArrowRight size={16} className="text-gray-400" />
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between">
              <span>{t('legalNotice')}</span>
              <ArrowRight size={16} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Clock size={20} className="text-blue-500 mr-2" />
              {t('recentActivity')}
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700">{t('viewAll')}</button>
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;