import { useState, useEffect } from 'react';

interface Project {
  id: string;
  name: string;
  type: string;
  status: 'Active' | 'Draft' | 'Archived';
  lastModified: string;
  description: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  location: string;
  status: 'Active' | 'Revoked';
}

interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  previewUrl: string;
}

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'VaultMesh Core',
    type: 'Web Application',
    status: 'Active',
    lastModified: '2 hours ago',
    description: 'Primary vault mesh application with real-time synchronization'
  },
  {
    id: '2', 
    name: 'LoopPay Integration',
    type: 'Payment Gateway',
    status: 'Draft',
    lastModified: '1 day ago',
    description: 'Payment processing integration for sovereign transactions'
  },
  {
    id: '3',
    name: 'SecureSign API',
    type: 'API Service',
    status: 'Active', 
    lastModified: '3 hours ago',
    description: 'Digital signature and NDA management system'
  }
];

const initialApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API',
    key: 'faa_live_7x9k2m3n4p5q6r7s8t9u0v1w2x3y4z5',
    created: '2024-12-15',
    location: 'Global',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Development API',
    key: 'faa_test_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6',
    created: '2024-12-10',
    location: 'Development',
    status: 'Active'
  }
];

const templates: Template[] = [
  {
    id: '1',
    name: 'FAA Corporate Site',
    category: 'Corporate',
    description: 'Professional corporate website template with FAA branding',
    previewUrl: '/templates/corporate'
  },
  {
    id: '2',
    name: 'Payment Portal',
    category: 'Financial',
    description: 'Secure payment processing portal with LoopPay integration',
    previewUrl: '/templates/payment'
  },
  {
    id: '3',
    name: 'Dashboard Interface',
    category: 'Admin',
    description: 'Advanced dashboard interface for system management',
    previewUrl: '/templates/dashboard'
  }
];

export default function CodeNestDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(initialApiKeys);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectType, setNewProjectType] = useState('Web Application');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [editorCode, setEditorCode] = useState(`// Welcome to CodeNest™ Editor
const faaSystem = {
  name: "FAA.zone™ MONSTER OMNI™",
  version: "2.0.0",
  deploy: () => {
    console.log("Deploying to global network...");
    return "Deployment successful!";
  }
};

export default faaSystem;`);

  const companies = [
    { id: 'faa', name: 'FAA.zone™', logo: '🌱', description: 'Primary global entity' },
    { id: 'fruitful', name: 'Fruitful Global', logo: '🍎', description: 'Innovation division' },
    { id: 'vaultmesh', name: 'VaultMesh™', logo: '🔐', description: 'Security protocols' },
    { id: 'banimal', name: 'Banimal™', logo: '🦍', description: 'Creative platform' }
  ];

  const metrics = [
    { label: 'Active Projects', value: '12', icon: 'fas fa-project-diagram' },
    { label: 'API Calls (24h)', value: '47.2K', icon: 'fas fa-chart-line' },
    { label: 'Deploy Success', value: '99.8%', icon: 'fas fa-check-circle' },
    { label: 'Global Nodes', value: '8', icon: 'fas fa-globe' }
  ];

  const createProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      type: newProjectType,
      status: 'Draft',
      lastModified: 'Just now',
      description: newProjectDescription || 'New project created with CodeNest™'
    };
    
    setProjects([...projects, newProject]);
    setNewProjectName('');
    setNewProjectDescription('');
  };

  const deleteProject = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const generateApiKey = () => {
    const newKey: ApiKey = {
      id: Date.now().toString(),
      name: 'New API Key',
      key: `faa_${Math.random().toString(36).substring(2)}`,
      created: new Date().toISOString().split('T')[0],
      location: 'Global',
      status: 'Active'
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'Draft': return 'text-yellow-400';
      case 'Archived': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 ${
        isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">
                <span className="text-blue-500">Fruitful</span>
                <span className="text-yellow-500 ml-2">CodeNest™</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-full ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', name: 'Overview', icon: 'fas fa-home' },
            { id: 'projects', name: 'Projects', icon: 'fas fa-project-diagram' },
            { id: 'templates', name: 'Templates', icon: 'fas fa-layer-group' },
            { id: 'api-keys', name: 'API Keys', icon: 'fas fa-key' },
            { id: 'editor', name: 'Code Editor', icon: 'fas fa-code' },
            { id: 'companies', name: 'Companies', icon: 'fas fa-building' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <div key={index} className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {metric.label}
                      </p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                    </div>
                    <i className={`${metric.icon} text-2xl text-blue-500`}></i>
                  </div>
                </div>
              ))}
            </div>

            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <h3 className="text-xl font-bold mb-4">
                <i className="fas fa-chart-line mr-2 text-yellow-500"></i>
                System Status
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-green-400 text-2xl mb-2">●</div>
                  <p className="font-medium">All Systems</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Operational
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 text-2xl mb-2">●</div>
                  <p className="font-medium">API Gateway</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Responding
                  </p>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 text-2xl mb-2">●</div>
                  <p className="font-medium">Deploy Queue</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    3 pending
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <h3 className="text-xl font-bold mb-4">
                <i className="fas fa-plus mr-2 text-green-500"></i>
                Create New Project
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className={`px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <select
                  value={newProjectType}
                  onChange={(e) => setNewProjectType(e.target.value)}
                  className={`px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option>Web Application</option>
                  <option>API Service</option>
                  <option>Payment Gateway</option>
                  <option>Security Module</option>
                </select>
              </div>
              <textarea
                placeholder="Project Description"
                value={newProjectDescription}
                onChange={(e) => setNewProjectDescription(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg border mb-4 ${
                  isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                rows={3}
              />
              <button
                onClick={createProject}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create Project
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border`}>
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-bold text-lg">{project.name}</h4>
                    <span className={`text-sm ${getStatusColor(project.status)}`}>
                      ● {project.status}
                    </span>
                  </div>
                  <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.type}
                  </p>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {project.description}
                  </p>
                  <p className={`text-xs mb-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Modified: {project.lastModified}
                  </p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                      Open
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                      Settings
                    </button>
                    <button
                      onClick={() => deleteProject(project.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {templates.map(template => (
                <div key={template.id} className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border`}>
                  <h4 className="font-bold text-lg mb-2">{template.name}</h4>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded mb-3">
                    {template.category}
                  </span>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {template.description}
                  </p>
                  <div className={`w-full h-32 rounded-lg mb-4 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-200'
                  } flex items-center justify-center`}>
                    <i className="fas fa-image text-4xl text-gray-500"></i>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Use Template
                    </button>
                    <button className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* API Keys Tab */}
        {activeTab === 'api-keys' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  <i className="fas fa-key mr-2 text-yellow-500"></i>
                  API Keys
                </h3>
                <button
                  onClick={generateApiKey}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Generate New Key
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Key</th>
                      <th className="px-4 py-2 text-left">Created</th>
                      <th className="px-4 py-2 text-left">Location</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiKeys.map(key => (
                      <tr key={key.id} className={`border-t ${
                        isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'
                      }`}>
                        <td className="px-4 py-3">{key.name}</td>
                        <td className="px-4 py-3">
                          <code className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {key.key.substring(0, 20)}...
                          </code>
                        </td>
                        <td className="px-4 py-3">{key.created}</td>
                        <td className="px-4 py-3">{key.location}</td>
                        <td className="px-4 py-3">
                          <span className={key.status === 'Active' ? 'text-green-400' : 'text-red-400'}>
                            ● {key.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="px-2 py-1 bg-blue-600 text-white text-xs rounded mr-2 hover:bg-blue-700 transition-colors">
                            Copy
                          </button>
                          <button className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors">
                            Revoke
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Code Editor Tab */}
        {activeTab === 'editor' && (
          <div className="space-y-6">
            <div className={`rounded-xl border ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <div className={`px-6 py-4 border-b ${
                isDarkMode ? 'border-gray-700 bg-gray-750' : 'border-gray-200 bg-gray-50'
              }`}>
                <h3 className="text-xl font-bold">
                  <i className="fas fa-code mr-2 text-purple-500"></i>
                  CodeNest™ Editor
                </h3>
              </div>
              <div className="p-6">
                <textarea
                  value={editorCode}
                  onChange={(e) => setEditorCode(e.target.value)}
                  className={`w-full h-96 p-4 font-mono text-sm rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-900 border-gray-600 text-green-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                  placeholder="Write your code here..."
                />
                <div className="flex gap-4 mt-4">
                  <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <i className="fas fa-play mr-2"></i>
                    Run Code
                  </button>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <i className="fas fa-save mr-2"></i>
                    Save
                  </button>
                  <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    <i className="fas fa-rocket mr-2"></i>
                    Deploy
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Companies Tab */}
        {activeTab === 'companies' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {companies.map(company => (
                <div
                  key={company.id}
                  onClick={() => setSelectedCompany(company.id)}
                  className={`p-6 rounded-xl border cursor-pointer transition-all ${
                    selectedCompany === company.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                      : isDarkMode
                      ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="text-3xl">{company.logo}</div>
                    <div>
                      <h4 className="font-bold text-lg">{company.name}</h4>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {company.description}
                      </p>
                    </div>
                  </div>
                  {selectedCompany === company.id && (
                    <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600">
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        ✓ Selected for deployment
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}