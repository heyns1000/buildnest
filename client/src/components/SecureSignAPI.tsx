import { useState } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  location: string;
  status: 'Active' | 'Revoked';
  usage: number;
}

interface NDASubmission {
  companyName: string;
  contactEmail: string;
  projectDescription: string;
  ndaFile?: File;
  agreementType: 'Standard' | 'Custom' | 'Mutual';
  jurisdiction: string;
  termsAccepted: boolean;
}

const initialApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production SecureSign',
    key: 'ss_live_9x8k7j6h5g4f3d2s1a0z9y8x7w6v5u4t',
    created: '2024-12-15',
    location: 'Global Production',
    status: 'Active',
    usage: 1247
  },
  {
    id: '2',
    name: 'Development Testing',
    key: 'ss_test_m3n4b5v6c7x8z9a0s1d2f3g4h5j6k7l8',
    created: '2024-12-10',
    location: 'Development Environment',
    status: 'Active',
    usage: 456
  },
  {
    id: '3',
    name: 'Legacy Integration',
    key: 'ss_legacy_p9o8i7u6y5t4r3e2w1q0a9s8d7f6g5h4',
    created: '2024-11-20',
    location: 'Legacy Systems',
    status: 'Revoked',
    usage: 892
  }
];

export default function SecureSignAPI() {
  const [activeTab, setActiveTab] = useState('overview');
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [ndaSubmission, setNdaSubmission] = useState<NDASubmission>({
    companyName: '',
    contactEmail: '',
    projectDescription: '',
    agreementType: 'Standard',
    jurisdiction: 'US',
    termsAccepted: false
  });
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const metrics = [
    { label: 'Active NDAs', value: '47', icon: 'fas fa-file-signature', color: 'text-green-400' },
    { label: 'API Calls (24h)', value: '1,892', icon: 'fas fa-chart-line', color: 'text-blue-400' },
    { label: 'Security Score', value: '99.8%', icon: 'fas fa-shield-alt', color: 'text-purple-400' },
    { label: 'Active Keys', value: '8', icon: 'fas fa-key', color: 'text-yellow-400' }
  ];

  const jurisdictions = [
    { code: 'US', name: 'United States' },
    { code: 'EU', name: 'European Union' },
    { code: 'UK', name: 'United Kingdom' },
    { code: 'CA', name: 'Canada' },
    { code: 'AU', name: 'Australia' },
    { code: 'SG', name: 'Singapore' },
    { code: 'JP', name: 'Japan' }
  ];

  const generateApiKey = () => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: `ss_${Math.random().toString(36).substring(2)}`,
      created: new Date().toISOString().split('T')[0],
      location: 'Global',
      status: 'Active',
      usage: 0
    };
    setApiKeys([...apiKeys, newKey]);
    showNotification('New API key generated successfully!');
  };

  const revokeApiKey = (id: string) => {
    setApiKeys(prev => prev.map(key => 
      key.id === id ? { ...key, status: 'Revoked' as const } : key
    ));
    showNotification('API key has been revoked.');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showNotification('API key copied to clipboard!');
  };

  const showNotification = (message: string) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000);
  };

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      setUploadedFile(file);
      setNdaSubmission(prev => ({ ...prev, ndaFile: file }));
      showNotification(`File "${file.name}" uploaded successfully!`);
    } else {
      showNotification('Please upload a PDF file only.');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const submitNDA = () => {
    if (!ndaSubmission.companyName || !ndaSubmission.contactEmail || !ndaSubmission.termsAccepted) {
      showNotification('Please fill in all required fields and accept the terms.');
      return;
    }

    // Simulate submission
    setTimeout(() => {
      showNotification('🎉 NDA submitted successfully! You will receive a confirmation email shortly.');
      setNdaSubmission({
        companyName: '',
        contactEmail: '',
        projectDescription: '',
        agreementType: 'Standard',
        jurisdiction: 'US',
        termsAccepted: false
      });
      setUploadedFile(null);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">
          <span className="text-white">Fruitful Global | </span>
          <span className="text-yellow-500">SecureSign™</span>
        </h1>
        <p className="text-gray-400 text-lg">
          Digital signature and NDA management for secure business operations
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: 'overview', name: 'Overview', icon: 'fas fa-home' },
          { id: 'nda-portal', name: 'NDA Portal', icon: 'fas fa-file-signature' },
          { id: 'api-keys', name: 'API Keys', icon: 'fas fa-key' },
          { id: 'security', name: 'Security', icon: 'fas fa-shield-alt' },
          { id: 'analytics', name: 'Analytics', icon: 'fas fa-chart-bar' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            <i className={`${tab.icon} mr-2`}></i>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">{metric.label}</p>
                    <p className="text-2xl font-bold mt-1">{metric.value}</p>
                  </div>
                  <i className={`${metric.icon} text-2xl ${metric.color}`}></i>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-6 text-yellow-500">
              <i className="fas fa-clock mr-2"></i>
              Recent Activity
            </h3>
            <div className="space-y-4">
              {[
                { time: '2 hours ago', event: 'NDA signed by TechCorp Inc.', type: 'success' },
                { time: '4 hours ago', event: 'API key generated for Development', type: 'info' },
                { time: '1 day ago', event: 'Security audit completed', type: 'success' },
                { time: '2 days ago', event: 'Legacy API key revoked', type: 'warning' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'success' ? 'bg-green-400' :
                      activity.type === 'warning' ? 'bg-yellow-400' :
                      'bg-blue-400'
                    }`} />
                    <span>{activity.event}</span>
                  </div>
                  <span className="text-gray-400 text-sm">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* NDA Portal Tab */}
      {activeTab === 'nda-portal' && (
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 p-8 rounded-xl">
            <h3 className="text-2xl font-bold mb-6 text-yellow-500">
              <i className="fas fa-file-signature mr-2"></i>
              Submit New NDA
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Company Name *</label>
                <input
                  type="text"
                  value={ndaSubmission.companyName}
                  onChange={(e) => setNdaSubmission(prev => ({ ...prev, companyName: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="Enter company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Contact Email *</label>
                <input
                  type="email"
                  value={ndaSubmission.contactEmail}
                  onChange={(e) => setNdaSubmission(prev => ({ ...prev, contactEmail: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                  placeholder="contact@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Agreement Type</label>
                <select
                  value={ndaSubmission.agreementType}
                  onChange={(e) => setNdaSubmission(prev => ({ ...prev, agreementType: e.target.value as any }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  <option value="Standard">Standard NDA</option>
                  <option value="Custom">Custom Agreement</option>
                  <option value="Mutual">Mutual NDA</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Jurisdiction</label>
                <select
                  value={ndaSubmission.jurisdiction}
                  onChange={(e) => setNdaSubmission(prev => ({ ...prev, jurisdiction: e.target.value }))}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                >
                  {jurisdictions.map(jurisdiction => (
                    <option key={jurisdiction.code} value={jurisdiction.code}>
                      {jurisdiction.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Project Description</label>
              <textarea
                value={ndaSubmission.projectDescription}
                onChange={(e) => setNdaSubmission(prev => ({ ...prev, projectDescription: e.target.value }))}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white"
                rows={4}
                placeholder="Describe your project and confidentiality requirements..."
              />
            </div>

            {/* File Upload */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Upload Custom NDA (Optional)</label>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                  dragOver
                    ? 'border-yellow-400 bg-yellow-400 bg-opacity-10'
                    : uploadedFile
                    ? 'border-green-400 bg-green-400 bg-opacity-10'
                    : 'border-gray-600 bg-gray-700 bg-opacity-50'
                }`}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('nda-file-input')?.click()}
              >
                <i className={`fas fa-cloud-upload-alt text-4xl mb-4 ${
                  uploadedFile ? 'text-green-400' : 'text-gray-400'
                }`}></i>
                <p className="text-lg mb-2">
                  {uploadedFile ? uploadedFile.name : 'Drag & Drop your NDA PDF here or Click to Upload'}
                </p>
                <p className="text-sm text-gray-500">
                  PDF files only, maximum 10MB
                </p>
                <input
                  id="nda-file-input"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Terms Acceptance */}
            <div className="flex items-start gap-3 mb-6">
              <input
                type="checkbox"
                checked={ndaSubmission.termsAccepted}
                onChange={(e) => setNdaSubmission(prev => ({ ...prev, termsAccepted: e.target.checked }))}
                className="w-5 h-5 mt-1 bg-gray-700 border border-gray-600 rounded"
              />
              <label className="text-sm text-gray-300 leading-relaxed">
                I acknowledge that this NDA submission will be processed through SecureSign™ protocols 
                and agree to the <a href="#" className="text-yellow-400 hover:underline">Terms of Service</a> and 
                <a href="#" className="text-yellow-400 hover:underline ml-1">Privacy Policy</a>.
              </label>
            </div>

            <button
              onClick={submitNDA}
              disabled={!ndaSubmission.termsAccepted}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-file-signature mr-2"></i>
              Submit NDA for Processing
            </button>
          </div>
        </div>
      )}

      {/* API Keys Tab */}
      {activeTab === 'api-keys' && (
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-yellow-500">
                <i className="fas fa-key mr-2"></i>
                API Key Management
              </h3>
              <button
                onClick={generateApiKey}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Generate New Key
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="px-4 py-3 text-left font-medium">Name</th>
                    <th className="px-4 py-3 text-left font-medium">Key</th>
                    <th className="px-4 py-3 text-left font-medium">Created</th>
                    <th className="px-4 py-3 text-left font-medium">Location</th>
                    <th className="px-4 py-3 text-left font-medium">Usage</th>
                    <th className="px-4 py-3 text-left font-medium">Status</th>
                    <th className="px-4 py-3 text-left font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map(key => (
                    <tr key={key.id} className="border-t border-gray-700 hover:bg-gray-700">
                      <td className="px-4 py-3">{key.name}</td>
                      <td className="px-4 py-3">
                        <code className="text-xs text-gray-300 bg-gray-900 px-2 py-1 rounded">
                          {key.key.substring(0, 20)}...
                        </code>
                      </td>
                      <td className="px-4 py-3">{key.created}</td>
                      <td className="px-4 py-3 text-sm text-gray-400">{key.location}</td>
                      <td className="px-4 py-3">{key.usage.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-sm ${
                          key.status === 'Active' ? 'text-green-400' : 'text-red-400'
                        }`}>
                          ● {key.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => copyToClipboard(key.key)}
                            className="px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                          >
                            Copy
                          </button>
                          {key.status === 'Active' && (
                            <button
                              onClick={() => revokeApiKey(key.id)}
                              className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-red-900 bg-opacity-30 border border-red-600 p-6 rounded-xl">
            <h4 className="font-bold text-red-400 mb-2">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              Security Notice
            </h4>
            <p className="text-red-300 text-sm">
              API keys provide full access to SecureSign™ services. Store them securely and never share them publicly. 
              Revoke any compromised keys immediately.
            </p>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="space-y-6">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-6 text-yellow-500">
              <i className="fas fa-shield-alt mr-2"></i>
              Security Status
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Encryption Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Data Encryption:</span>
                    <span className="text-green-400">AES-256 ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transit Security:</span>
                    <span className="text-green-400">TLS 1.3 ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Key Management:</span>
                    <span className="text-green-400">HSM Protected ✓</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-lg">Compliance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>SOC 2 Type II:</span>
                    <span className="text-green-400">Certified ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GDPR Compliance:</span>
                    <span className="text-green-400">Compliant ✓</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ISO 27001:</span>
                    <span className="text-green-400">Certified ✓</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl max-w-md w-full mx-4">
            <div className="text-center">
              <i className="fas fa-check-circle text-4xl text-green-400 mb-4"></i>
              <p className="text-lg">{modalMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}