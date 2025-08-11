import React, { useState } from 'react';
import { Plus, MessageCircle, FileText, Clock, AlertCircle, CheckCircle, User, Phone, Mail } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Case } from '../../types';

const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);

  // Mock data for demonstration
  const cases: Case[] = [
    {
      id: 'case-1',
      title: 'Landlord Harassment Issue',
      description: 'My landlord is threatening eviction without proper notice',
      category: 'rent',
      status: 'assigned',
      priority: 'high',
      citizenId: user?.id || '',
      lawyerId: 'lawyer-1',
      documents: [],
      messages: [],
      hearingDates: [],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: 'case-2',
      title: 'Salary Dispute with Employer',
      description: 'Company is withholding my salary for 3 months',
      category: 'employment',
      status: 'in_progress',
      priority: 'medium',
      citizenId: user?.id || '',
      lawyerId: 'lawyer-2',
      documents: [],
      messages: [],
      hearingDates: [
        {
          id: 'hearing-1',
          date: new Date('2024-02-15'),
          court: 'Labour Court, Delhi',
          purpose: 'Initial hearing',
          status: 'scheduled'
        }
      ],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-25')
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'assigned': return 'text-blue-600 bg-blue-50';
      case 'in_progress': return 'text-orange-600 bg-orange-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      case 'closed': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-600';
      case 'high': return 'text-orange-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-500 to-blue-500 p-6 rounded-2xl text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-orange-100">Track your legal cases and get expert assistance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="text-blue-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{cases.length}</div>
              <div className="text-sm text-gray-600">Total Cases</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Clock className="text-orange-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {cases.filter(c => c.status === 'in_progress').length}
              </div>
              <div className="text-sm text-gray-600">Active Cases</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {cases.filter(c => c.status === 'resolved').length}
              </div>
              <div className="text-sm text-gray-600">Resolved</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="text-red-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {cases.filter(c => c.priority === 'urgent' || c.priority === 'high').length}
              </div>
              <div className="text-sm text-gray-600">Urgent</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cases List */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">My Cases</h2>
            <button
              onClick={() => setShowNewCaseModal(true)}
              className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>New Case</span>
            </button>
          </div>

          <div className="space-y-4">
            {cases.map((case_) => (
              <div key={case_.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1">{case_.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{case_.description}</p>
                    <div className="flex items-center space-x-4 text-xs">
                      <span className={`px-2 py-1 rounded-full ${getStatusColor(case_.status)}`}>
                        {case_.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`font-medium ${getPriorityColor(case_.priority)}`}>
                        {case_.priority.toUpperCase()} PRIORITY
                      </span>
                      <span className="text-gray-500">
                        {case_.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">
                      Created: {case_.createdAt.toLocaleDateString()}
                    </div>
                    {case_.hearingDates.length > 0 && (
                      <div className="text-xs text-orange-600 font-medium">
                        Next Hearing: {case_.hearingDates[0].date.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    {case_.lawyerId ? (
                      <>
                        <User size={14} />
                        <span>Assigned to Lawyer</span>
                      </>
                    ) : (
                      <>
                        <Clock size={14} />
                        <span>Awaiting Assignment</span>
                      </>
                    )}
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                    <MessageCircle size={14} />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Your Profile</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="text-gray-400" size={16} />
                <span className="text-sm text-gray-700">{user?.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" size={16} />
                <span className="text-sm text-gray-700">{user?.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400" size={16} />
                <span className="text-sm text-gray-700">{user?.phone}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors">
              Edit Profile
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                <div className="font-medium text-orange-900">File New Case</div>
                <div className="text-xs text-orange-700">Get legal assistance</div>
              </button>
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="font-medium text-blue-900">Chat with AI</div>
                <div className="text-xs text-blue-700">Quick legal guidance</div>
              </button>
              <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="font-medium text-green-900">Generate Documents</div>
                <div className="text-xs text-green-700">RTI, notices, etc.</div>
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Case assigned to lawyer</div>
                  <div className="text-xs text-gray-500">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">New message received</div>
                  <div className="text-xs text-gray-500">1 day ago</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Hearing date scheduled</div>
                  <div className="text-xs text-gray-500">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CitizenDashboard;