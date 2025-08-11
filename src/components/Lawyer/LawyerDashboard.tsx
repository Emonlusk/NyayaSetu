import React, { useState } from 'react';
import { Users, Clock, CheckCircle, DollarSign, Calendar, MessageCircle, FileText, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Case } from '../../types';

const LawyerDashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'assigned' | 'completed' | 'all'>('assigned');

  // Mock data for demonstration
  const cases: Case[] = [
    {
      id: 'case-1',
      title: 'Landlord Harassment Issue',
      description: 'Client facing eviction threats without proper notice',
      category: 'rent',
      status: 'in_progress',
      priority: 'high',
      citizenId: 'citizen-1',
      lawyerId: user?.id || '',
      documents: [],
      messages: [],
      hearingDates: [
        {
          id: 'hearing-1',
          date: new Date('2024-02-15'),
          court: 'Rent Control Court, Delhi',
          purpose: 'Initial hearing',
          status: 'scheduled'
        }
      ],
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: 'case-2',
      title: 'Employment Contract Dispute',
      description: 'Salary withholding and illegal termination clauses',
      category: 'employment',
      status: 'assigned',
      priority: 'medium',
      citizenId: 'citizen-2',
      lawyerId: user?.id || '',
      documents: [],
      messages: [],
      hearingDates: [],
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-25')
    }
  ];

  const upcomingHearings = [
    {
      id: '1',
      case: 'Landlord Harassment Issue',
      date: new Date('2024-02-15'),
      time: '10:30 AM',
      court: 'Rent Control Court, Delhi',
      client: 'Rahul Kumar'
    },
    {
      id: '2',
      case: 'Property Dispute',
      date: new Date('2024-02-18'),
      time: '2:00 PM',
      court: 'Civil Court, Mumbai',
      client: 'Priya Sharma'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'assigned': return 'text-blue-600 bg-blue-50';
      case 'in_progress': return 'text-orange-600 bg-orange-50';
      case 'resolved': return 'text-green-600 bg-green-50';
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

  const filteredCases = cases.filter(case_ => {
    if (activeTab === 'assigned') return case_.status === 'assigned';
    if (activeTab === 'completed') return case_.status === 'resolved';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Welcome, {user?.name}</h1>
            <p className="text-blue-100">Bar Council ID: {user?.barCouncilId}</p>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="text-yellow-400" size={16} />
                <span className="text-sm">{user?.rating}/5.0</span>
              </div>
              <div className="text-sm">{user?.experience} years experience</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{cases.length}</div>
            <div className="text-blue-100">Active Cases</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="text-blue-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {cases.filter(c => c.status === 'assigned').length}
              </div>
              <div className="text-sm text-gray-600">New Cases</div>
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
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="text-green-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="text-purple-600" size={20} />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">₹45,000</div>
              <div className="text-sm text-gray-600">This Month</div>
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
            <div className="flex space-x-2">
              {['assigned', 'completed', 'all'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredCases.map((case_) => (
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
                        {case_.priority.toUpperCase()}
                      </span>
                      <span className="text-gray-500">
                        {case_.category.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">
                      Assigned: {case_.createdAt.toLocaleDateString()}
                    </div>
                    {case_.hearingDates.length > 0 && (
                      <div className="text-xs text-orange-600 font-medium">
                        Hearing: {case_.hearingDates[0].date.toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    Client ID: {case_.citizenId}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center space-x-1">
                      <MessageCircle size={14} />
                      <span>Chat</span>
                    </button>
                    <button className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center space-x-1">
                      <FileText size={14} />
                      <span>Documents</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Upcoming Hearings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="text-orange-500 mr-2" size={20} />
              Upcoming Hearings
            </h3>
            <div className="space-y-3">
              {upcomingHearings.map((hearing) => (
                <div key={hearing.id} className="p-3 bg-orange-50 rounded-lg">
                  <div className="font-medium text-gray-900 text-sm">{hearing.case}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {hearing.date.toLocaleDateString()} at {hearing.time}
                  </div>
                  <div className="text-xs text-gray-500">{hearing.court}</div>
                  <div className="text-xs text-orange-700 font-medium">Client: {hearing.client}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice Areas */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Practice Areas</h3>
            <div className="flex flex-wrap gap-2">
              {user?.practiceAreas?.map((area, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <div className="font-medium text-blue-900">Update Case Status</div>
                <div className="text-xs text-blue-700">Mark progress on cases</div>
              </button>
              <button className="w-full text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <div className="font-medium text-green-900">Upload Documents</div>
                <div className="text-xs text-green-700">Share with clients</div>
              </button>
              <button className="w-full text-left p-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
                <div className="font-medium text-purple-900">Schedule Hearing</div>
                <div className="text-xs text-purple-700">Add court dates</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LawyerDashboard;