import React, { useState, useRef } from 'react';
import { Upload, AlertTriangle, CheckCircle, FileText, Download, Briefcase, Shield, DollarSign } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

interface ContractAnalysis {
  overallRating: 'excellent' | 'good' | 'concerning' | 'poor';
  riskScore: number;
  issues: {
    severity: 'high' | 'medium' | 'low';
    category: 'payment' | 'termination' | 'liability' | 'scope' | 'rights';
    title: string;
    description: string;
    recommendation: string;
  }[];
  positivePoints: string[];
  recommendations: string[];
}

const ContractSafe: React.FC = () => {
  const { t } = useLanguage();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [contractType, setContractType] = useState<'employment' | 'freelance' | 'nda' | 'other'>('employment');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contractTypes = [
    { id: 'employment', name: 'Employment Contract', icon: Briefcase },
    { id: 'freelance', name: 'Freelance Agreement', icon: FileText },
    { id: 'nda', name: 'NDA/Non-Compete', icon: Shield },
    { id: 'other', name: 'Other Contract', icon: FileText }
  ];

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    setAnalysis(null);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileUpload(files[0]);
    }
  };

  const analyzeContract = () => {
    setIsAnalyzing(true);
    
    // Simulate contract analysis
    setTimeout(() => {
      const mockAnalysis: ContractAnalysis = {
        overallRating: 'concerning',
        riskScore: 35, // out of 100, lower is better
        issues: [
          {
            severity: 'high',
            category: 'payment',
            title: 'Salary Forfeiture Clause',
            description: 'Contract states that entire month salary will be forfeited if employee resigns without 3 months notice, which is illegal under Indian labour laws.',
            recommendation: 'Remove forfeiture clause. Maximum notice period should be 1 month for positions below management level.'
          },
          {
            severity: 'high',
            category: 'termination',
            title: 'Unreasonable Notice Period',
            description: 'Contract requires 3 months notice period for all employees, including junior positions.',
            recommendation: 'Notice period should be proportionate to role - 1 month for junior roles, maximum 3 months for senior management.'
          },
          {
            severity: 'medium',
            category: 'liability',
            title: 'Excessive Liability Clause',
            description: 'Employee is liable for any company losses due to their actions, with no upper limit specified.',
            recommendation: 'Add reasonable liability cap or limit liability to cases of gross negligence or misconduct.'
          },
          {
            severity: 'medium',
            category: 'scope',
            title: 'Vague Job Description',
            description: 'Job responsibilities are not clearly defined, allowing for potential scope creep.',
            recommendation: 'Request detailed job description with clear boundaries and escalation process for additional duties.'
          },
          {
            severity: 'low',
            category: 'rights',
            title: 'Missing Grievance Procedure',
            description: 'No clear process mentioned for addressing workplace issues or disputes.',
            recommendation: 'Request addition of grievance handling procedure and escalation matrix.'
          }
        ],
        positivePoints: [
          'Clear compensation structure mentioned',
          'PF and medical insurance benefits included',
          'Reasonable working hours (9 hours including break)',
          'Annual leave entitlement as per law (21 days)'
        ],
        recommendations: [
          'Negotiate to reduce notice period to 1 month',
          'Remove salary forfeiture clause completely',
          'Add liability cap of 1 month salary maximum',
          'Request detailed job description document',
          'Add clause for annual salary review',
          'Include work from home policy if applicable',
          'Add clause about overtime compensation'
        ]
      };
      
      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'concerning': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRatingBg = (rating: string) => {
    switch (rating) {
      case 'excellent': return 'bg-green-50 border-green-200';
      case 'good': return 'bg-blue-50 border-blue-200';
      case 'concerning': return 'bg-yellow-50 border-yellow-200';
      case 'poor': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const downloadAnalysis = () => {
    if (!analysis) return;
    
    const report = `
CONTRACTSAFE ANALYSIS REPORT
Generated by NyayaSetu AI Legal Assistant
Date: ${new Date().toLocaleDateString()}
Document: ${uploadedFile?.name}
Contract Type: ${contractType}

OVERALL RATING: ${analysis.overallRating.toUpperCase()}
RISK SCORE: ${analysis.riskScore}/100 (Lower is Better)

ISSUES IDENTIFIED:
${analysis.issues.map((issue, index) => `
${index + 1}. ${issue.title} (${issue.severity.toUpperCase()} RISK - ${issue.category.toUpperCase()})
   Description: ${issue.description}
   Recommendation: ${issue.recommendation}
`).join('')}

POSITIVE ASPECTS:
${analysis.positivePoints.map((point, index) => `${index + 1}. ${point}`).join('\n')}

RECOMMENDATIONS:
${analysis.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

---
This analysis is AI-generated and should be reviewed by a legal expert.
For contract negotiation, consult with qualified employment lawyer.
`;
    
    const element = document.createElement('a');
    const file = new Blob([report], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `ContractSafe_Analysis_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">ContractSafe - Employment Contract Analyzer</h2>
        <p className="text-gray-600">Analyze job offers, freelance agreements, and NDAs for exploitative clauses and legal compliance</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upload and Analysis Section */}
        <div className="space-y-6">
          {/* Contract Type Selection */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contract Type</h3>
            <div className="grid grid-cols-2 gap-3">
              {contractTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setContractType(type.id as any)}
                  className={`
                    p-3 border-2 rounded-lg text-left transition-all flex items-center space-x-3
                    ${contractType === type.id
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <type.icon size={20} />
                  <span className="font-medium text-sm">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* File Upload */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Upload Contract</h3>
            
            <div
              className={`
                border-2 border-dashed rounded-xl p-6 text-center transition-all
                ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
              />
              
              {uploadedFile ? (
                <div className="space-y-3">
                  <FileText size={40} className="text-green-500 mx-auto" />
                  <div>
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Change File
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Upload size={40} className="text-gray-400 mx-auto" />
                  <div>
                    <p className="font-medium text-gray-900">Drop contract here</p>
                    <p className="text-sm text-gray-500 mb-3">PDF, DOC, DOCX, TXT files</p>
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      Select File
                    </button>
                  </div>
                </div>
              )}
            </div>

            {uploadedFile && (
              <button
                onClick={analyzeContract}
                disabled={isAnalyzing}
                className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analyzing Contract...</span>
                  </>
                ) : (
                  <>
                    <Shield size={20} />
                    <span>Analyze for Issues</span>
                  </>
                )}
              </button>
            )}
          </div>

          {/* What We Check */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="text-blue-500 mr-2" size={20} />
              What We Analyze
            </h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign size={14} className="text-green-600" />
                <span>Payment terms & salary protection</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle size={14} className="text-red-600" />
                <span>Termination & notice periods</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield size={14} className="text-blue-600" />
                <span>Non-compete & confidentiality</span>
              </div>
              <div className="flex items-center space-x-2">
                <Briefcase size={14} className="text-purple-600" />
                <span>Job scope & responsibilities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Analysis Results</h3>

          {analysis ? (
            <div className="space-y-6">
              {/* Overall Rating */}
              <div className={`p-4 rounded-xl border-2 ${getRatingBg(analysis.overallRating)}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className={`text-xl font-bold ${getRatingColor(analysis.overallRating)} capitalize`}>
                      {analysis.overallRating} Contract
                    </div>
                    <div className="text-sm text-gray-600">
                      Risk Score: {analysis.riskScore}/100 (Lower is better)
                    </div>
                  </div>
                  <div className={`text-3xl font-bold ${getRatingColor(analysis.overallRating)}`}>
                    {analysis.riskScore}
                  </div>
                </div>
              </div>

              {/* Issues */}
              <div className="space-y-4">
                <h4 className="font-bold text-gray-900">Issues Found:</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {analysis.issues.map((issue, index) => (
                    <div
                      key={index}
                      className={`
                        p-3 rounded-lg border-l-4 text-sm
                        ${issue.severity === 'high' ? 'border-red-500 bg-red-50' :
                          issue.severity === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                          'border-blue-500 bg-blue-50'}
                      `}
                    >
                      <div className="flex items-start space-x-2">
                        <AlertTriangle 
                          size={16} 
                          className={`mt-0.5 ${
                            issue.severity === 'high' ? 'text-red-500' :
                            issue.severity === 'medium' ? 'text-yellow-500' :
                            'text-blue-500'
                          }`} 
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{issue.title}</p>
                          <p className="text-gray-700 mt-1">{issue.description}</p>
                          <p className="text-gray-900 mt-2 font-medium">💡 {issue.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Positive Points */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900">Positive Aspects:</h4>
                <div className="space-y-2">
                  {analysis.positivePoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="text-green-500 mt-0.5" size={14} />
                      <span className="text-gray-700">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3 pt-4 border-t border-gray-200">
                <button
                  onClick={downloadAnalysis}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={16} />
                  <span>Download Analysis</span>
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Get Legal Advice
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <Briefcase size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Upload a contract to see detailed analysis</p>
              <p className="text-sm text-gray-400">We'll identify potential issues and suggest improvements</p>
            </div>
          )}
        </div>
      </div>

      {/* Educational Section */}
      <div className="mt-8 bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-2xl text-white">
        <h3 className="text-xl font-bold mb-4">🎓 Know Your Employment Rights</h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2">Notice Period Rights</h4>
            <p>Maximum notice period should not exceed 3 months for senior positions, 1 month for junior roles.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Salary Protection</h4>
            <p>Employers cannot withhold full salary as penalty for early resignation - only pro-rata deduction allowed.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Non-Compete Limits</h4>
            <p>Non-compete clauses must be reasonable in scope, geography, and time duration to be enforceable.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSafe;