import React, { useState } from 'react';
import { FileText, Download, Eye, Sparkles, Globe, Send } from 'lucide-react';
import { useLanguage } from './LanguageProvider';

type DocumentType = 'rti' | 'legal_notice' | 'affidavit' | 'complaint' | 'agreement';

interface FormData {
  documentType: DocumentType;
  applicantName: string;
  address: string;
  phoneNumber: string;
  email: string;
  department?: string;
  informationSought?: string;
  respondentName?: string;
  issueDescription?: string;
  language: 'en' | 'hi';
}

const DocGen: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    documentType: 'rti',
    applicantName: '',
    address: '',
    phoneNumber: '',
    email: '',
    department: '',
    informationSought: '',
    respondentName: '',
    issueDescription: '',
    language: 'en'
  });
  const [generatedDocument, setGeneratedDocument] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const documentTypes = [
    { id: 'rti', name: 'RTI Application', description: 'Right to Information request' },
    { id: 'legal_notice', name: 'Legal Notice', description: 'Formal legal warning or demand' },
    { id: 'affidavit', name: 'Affidavit', description: 'Sworn statement of facts' },
    { id: 'complaint', name: 'Police Complaint', description: 'FIR or complaint application' },
    { id: 'agreement', name: 'Agreement Draft', description: 'Contract or agreement template' }
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const generateDocument = async () => {
    setIsGenerating(true);
    
    // Simulate document generation
    setTimeout(() => {
      let document = '';
      
      if (formData.documentType === 'rti') {
        document = generateRTIDocument();
      } else if (formData.documentType === 'legal_notice') {
        document = generateLegalNotice();
      } else if (formData.documentType === 'affidavit') {
        document = generateAffidavit();
      } else if (formData.documentType === 'complaint') {
        document = generateComplaint();
      }
      
      setGeneratedDocument(document);
      setShowPreview(true);
      setIsGenerating(false);
    }, 2000);
  };

  const generateRTIDocument = () => {
    return `To,
The Public Information Officer,
${formData.department}

Subject: Application under Right to Information Act, 2005

Respected Sir/Madam,

I, ${formData.applicantName}, a citizen of India, hereby request information under the Right to Information Act, 2005.

Personal Details:
Name: ${formData.applicantName}
Address: ${formData.address}
Phone: ${formData.phoneNumber}
Email: ${formData.email}

Information Sought:
${formData.informationSought}

I am enclosing herewith application fees of Rs. 10/- as required under the RTI Act.

I request you to provide the above information within the stipulated time period as per RTI Act, 2005.

If the information sought is not available with your office, kindly transfer this application to the concerned PIO under Section 6(3) of the RTI Act and inform me accordingly.

Thanking you,

Yours faithfully,
${formData.applicantName}
Date: ${new Date().toLocaleDateString('en-IN')}

---
Note: This document has been generated using NyayaSetu AI Legal Assistant.
Please review and modify as needed before submission.`;
  };

  const generateLegalNotice = () => {
    return `LEGAL NOTICE

To,
${formData.respondentName}

Subject: Legal Notice under Section 80 of Civil Procedure Code, 1908

Sir/Madam,

TAKE NOTICE that my client, ${formData.applicantName}, hereby calls upon you to address the following matter within 30 days from the receipt of this notice:

Matter of Dispute:
${formData.issueDescription}

TAKE FURTHER NOTICE that if you fail to comply with the above demand within the stipulated time, my client will be constrained to initiate appropriate legal proceedings against you for recovery of the amount along with interest and costs, and you will be solely responsible for all consequences thereof.

This notice is served upon you under Section 80 of the Civil Procedure Code, 1908, and other applicable provisions of law.

Yours faithfully,

${formData.applicantName}
Through Legal Advisor

Address: ${formData.address}
Phone: ${formData.phoneNumber}
Email: ${formData.email}
Date: ${new Date().toLocaleDateString('en-IN')}

---
Generated using NyayaSetu AI Legal Assistant`;
  };

  const generateAffidavit = () => {
    return `AFFIDAVIT

I, ${formData.applicantName}, aged [Age] years, son/daughter of [Father's Name], resident of ${formData.address}, do hereby solemnly affirm and declare as under:

1. That I am the deponent herein and I am competent to swear to this affidavit.

2. That the facts stated herein below are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom.

3. That ${formData.issueDescription}

4. That I am making this affidavit to place the true facts on record and for all legal purposes.

DEPONENT

Verification:
I, the above named deponent, do verify that the contents of paragraphs 1 to 4 of this affidavit are true and correct to the best of my knowledge and belief and nothing material has been concealed therefrom.

Verified at [Place] on this ${new Date().getDate()} day of ${new Date().toLocaleDateString('en-IN', { month: 'long' })}, ${new Date().getFullYear()}.

DEPONENT

---
Generated using NyayaSetu AI Legal Assistant`;
  };

  const generateComplaint = () => {
    return `COMPLAINT APPLICATION

To,
The Station House Officer,
[Police Station Name]

Subject: Complaint regarding ${formData.issueDescription}

Respected Sir,

I, ${formData.applicantName}, resident of ${formData.address}, hereby lodge this complaint regarding the following incident:

Complainant Details:
Name: ${formData.applicantName}
Address: ${formData.address}
Phone: ${formData.phoneNumber}
Email: ${formData.email}

Details of Incident:
${formData.issueDescription}

I request you to register my complaint and take necessary action as per law.

I hereby declare that the above information is true to the best of my knowledge and belief.

Yours faithfully,

${formData.applicantName}
Date: ${new Date().toLocaleDateString('en-IN')}
Place: [Place Name]

---
Generated using NyayaSetu AI Legal Assistant`;
  };

  const downloadDocument = () => {
    const element = document.createElement('a');
    const file = new Blob([generatedDocument], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${formData.documentType}_${formData.applicantName.replace(' ', '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">DocGen - Legal Document Generator</h2>
        <p className="text-gray-600">Generate professional legal documents powered by AI in English or Hindi</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Sparkles className="text-orange-500 mr-2" size={24} />
            Document Details
          </h3>

          <div className="space-y-6">
            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Document Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documentTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleInputChange('documentType', type.id as DocumentType)}
                    className={`
                      p-4 border-2 rounded-xl text-left transition-all
                      ${formData.documentType === type.id
                        ? 'border-orange-500 bg-orange-50 text-orange-900'
                        : 'border-gray-200 hover:border-gray-300'
                      }
                    `}
                  >
                    <div className="font-medium">{type.name}</div>
                    <div className="text-sm text-gray-600">{type.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleInputChange('language', 'en')}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all
                    ${formData.language === 'en'
                      ? 'border-blue-500 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <Globe size={16} />
                  <span>English</span>
                </button>
                <button
                  onClick={() => handleInputChange('language', 'hi')}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all
                    ${formData.language === 'hi'
                      ? 'border-orange-500 bg-orange-50 text-orange-900'
                      : 'border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <Globe size={16} />
                  <span>हिंदी</span>
                </button>
              </div>
            </div>

            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  value={formData.applicantName}
                  onChange={(e) => handleInputChange('applicantName', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="+91 9876543210"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Complete Address *</label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                rows={3}
                placeholder="Enter your complete address with pin code"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Conditional Fields */}
            {formData.documentType === 'rti' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Government Department *</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Ministry of Education, Delhi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Information Sought *</label>
                  <textarea
                    value={formData.informationSought}
                    onChange={(e) => handleInputChange('informationSought', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={4}
                    placeholder="Describe the information you are seeking under RTI..."
                  />
                </div>
              </>
            )}

            {(formData.documentType === 'legal_notice' || formData.documentType === 'complaint') && (
              <>
                {formData.documentType === 'legal_notice' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Respondent Name *</label>
                    <input
                      type="text"
                      value={formData.respondentName}
                      onChange={(e) => handleInputChange('respondentName', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Name of person/entity to serve notice"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.documentType === 'legal_notice' ? 'Issue/Dispute Description *' : 'Incident Description *'}
                  </label>
                  <textarea
                    value={formData.issueDescription}
                    onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={5}
                    placeholder={formData.documentType === 'legal_notice' 
                      ? "Describe the dispute, demands, and legal basis..." 
                      : "Describe the incident in detail with date, time, and location..."
                    }
                  />
                </div>
              </>
            )}

            {formData.documentType === 'affidavit' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statement/Facts *</label>
                <textarea
                  value={formData.issueDescription}
                  onChange={(e) => handleInputChange('issueDescription', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows={5}
                  placeholder="State the facts you want to affirm under oath..."
                />
              </div>
            )}

            <button
              onClick={generateDocument}
              disabled={isGenerating || !formData.applicantName || !formData.address}
              className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white py-3 px-6 rounded-lg font-medium hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Generating Document...</span>
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Generate Document</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Eye className="text-blue-500 mr-2" size={24} />
            Document Preview
          </h3>

          {showPreview ? (
            <div className="space-y-4">
              <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-gray-200 max-h-96 overflow-y-auto">
                <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800 leading-relaxed">
                  {generatedDocument}
                </pre>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={downloadDocument}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download size={16} />
                  <span>Download</span>
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Send size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Fill the form and click "Generate Document" to see preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocGen;