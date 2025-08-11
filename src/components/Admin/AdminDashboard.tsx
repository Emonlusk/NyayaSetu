import React, { useState } from 'react';
import { Users, UserCheck, AlertTriangle, TrendingUp, Eye, Check, X, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { LawyerApplication } from '../../types';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'lawyers' | 'users' | 'analytics'>('overview');

  // Mock data for demonstration
  const pendingApplications: LawyerApplication[] = [
    {
      id: 'app-1',
      name: 'Advocate Priya Sharma',
      email: 'priya.sharma@lawyer.com',
      phone: '+91 9876543210',
      barCouncilId: 'DL/12345/2020',
      practiceAreas: ['Civil Law', 'Criminal Law', 'Family Law'],
      experience: 8,
      documents: [],
      status: 'pending',
      appliedAt: new Date('2024-01-15')
    },
    {
      id: 'app-2',
      name: 'Advocate Rajesh Kumar',
      email: 'rajesh.kumar@lawyer.com',
      phone: '+91 9876543211',
      barCouncilId: 'MH/67890/2018',
      practiceAreas: ['Corporate Law', 'Labour Law'],
      experience: 12,
      documents: [],
      status: 'pending',
      appliedAt: new Date('2024-01-18')
    }
  ];

  const stats = {
    totalUsers: 15420,
    activeLawyers: 1250,
    pendingApplications: pendingApplications.length,
    totalCases: 8930,
    resolvedCases: 6780,
    monthlyGrowth: 12.5
  };

  const handleApplicationAction = (applicationId: string, action: 'approve' | 'reject') => {
    console.log(`${action} application ${applicationId}`);
    // In real app, this would make API call
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{stats.totalUsers.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Total Users</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserCheck className="text-green-600" size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{stats.activeLawyers}</div>
              <div className="text-xs text-gray-600">Active Lawyers</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="text-orange-600" size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{stats.pendingApplications}</div>
              <div className="text-xs text-gray-600">Pending Apps</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <AlertTriangle className="text-purple-600" size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{stats.totalCases.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Total Cases</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="text-green-600" size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{stats.resolvedCases.toLocaleString()}</div>
              <div className="text-xs text-gray-600">Resolved</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <TrendingUp className="text-indigo-600" size={20} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">+{stats.monthlyGrowth}%</div>
              <div className="text-xs text-gray-600">Growth</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Recent User Registrations</h3>
          <div className="space-y-3">
            {[
              { name: 'Rahul Kumar', type: 'Citizen', time: '2 hours ago' },
              { name: 'Priya Sharma', type: 'Lawyer Application', time: '4 hours ago' },
              { name: 'Amit Singh', type: 'Citizen', time: '6 hours ago' },
              { name: 'Neha Gupta', type: 'Citizen', time: '1 day ago' }
            ].map((user, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.type}</div>
                </div>
                <div className="text-xs text-gray-500">{user.time}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">AI Services</span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Response Time</span>
              <span className="text-sm font-medium text-gray-900">245ms</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderLawyerApplications = () => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
      <h3 className="font-bold text-gray-900 mb-6">Pending Lawyer Applications</h3>
      <div className="space-y-4">
        {pendingApplications.map((application) => (
          <div key={application.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{application.name}</h4>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Email:</span> {application.email}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {application.phone}
                  </div>
                  <div>
                    <span className="font-medium">Bar Council ID:</span> {application.barCouncilId}
                  </div>
                  <div>
                    <span className="font-medium">Experience:</span> {application.experience} years
                  </div>
                </div>
                <div className="mt-3">
                  <span className="font-medium text-sm text-gray-700">Practice Areas:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {application.practiceAreas.map((area, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-2">
                  Applied: {application.appliedAt.toLocaleDateString()}
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                  Pending Review
                </span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm">
                <Eye size={14} />
                <span>View Documents</span>
              </button>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleApplicationAction(application.id, 'reject')}
                  className="flex items-center space-x-2 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  <X size={14} />
                  <span>Reject</span>
                </button>
                <button
                  onClick={() => handleApplicationAction(application.id, 'approve')}
                  className="flex items-center space-x-2 bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                >
                  <Check size={14} />
                  <span>Approve</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-purple-100">Welcome back, {user?.name}. Manage the NyayaSetu platform.</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200">
        <div className="flex space-x-2">
          {[
            { id: 'overview', name: 'Overview', icon: TrendingUp },
            { id: 'lawyers', name: 'Lawyer Applications', icon: UserCheck },
            { id: 'users', name: 'User Management', icon: Users },
            { id: 'analytics', name: 'Analytics', icon: TrendingUp }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={16} />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'lawyers' && renderLawyerApplications()}
      {activeTab === 'users' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">User Management</h3>
          <p className="text-gray-600">User management features coming soon...</p>
        </div>
      )}
      {activeTab === 'analytics' && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-4">Platform Analytics</h3>
          <p className="text-gray-600">Analytics dashboard coming soon...</p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;