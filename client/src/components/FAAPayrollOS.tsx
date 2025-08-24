import { useState, useEffect } from 'react';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  salary: number;
  status: 'Active' | 'Inactive' | 'On Leave';
  startDate: string;
  email: string;
  socialInsurance: string;
  taxId: string;
}

interface PayrollMetric {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

interface WorkflowStep {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'completed';
  assignee: string;
  dueDate: string;
}

interface GlobalBrand {
  id: string;
  name: string;
  region: string;
  status: 'Active' | 'Pending' | 'Maintenance';
  revenue: string;
  employees: number;
  logo: string;
}

const initialEmployees: Employee[] = [
  {
    id: 'emp-001',
    name: 'Zhang Wei',
    department: 'Engineering',
    position: 'Senior Developer',
    salary: 95000,
    status: 'Active',
    startDate: '2023-01-15',
    email: 'zhang.wei@faa.zone',
    socialInsurance: '310115199001011234',
    taxId: 'TAX001234567'
  },
  {
    id: 'emp-002',
    name: 'Li Mei',
    department: 'Marketing',
    position: 'Brand Manager',
    salary: 78000,
    status: 'Active',
    startDate: '2023-03-20',
    email: 'li.mei@faa.zone',
    socialInsurance: '310115199205152345',
    taxId: 'TAX002345678'
  },
  {
    id: 'emp-003',
    name: 'Wang Jun',
    department: 'Finance',
    position: 'Senior Accountant',
    salary: 82000,
    status: 'On Leave',
    startDate: '2022-11-10',
    email: 'wang.jun@faa.zone',
    socialInsurance: '310115198907083456',
    taxId: 'TAX003456789'
  }
];

const payrollMetrics: PayrollMetric[] = [
  {
    label: 'Total Employees',
    value: '2,847',
    change: '+12% this month',
    icon: 'fas fa-users',
    color: 'text-blue-400'
  },
  {
    label: 'Monthly Payroll',
    value: '¥24.8M',
    change: '+8.5% increase',
    icon: 'fas fa-money-bill-wave',
    color: 'text-green-400'
  },
  {
    label: 'Benefits Cost',
    value: '¥3.2M',
    change: '+2.1% savings',
    icon: 'fas fa-heart',
    color: 'text-purple-400'
  },
  {
    label: 'Tax Compliance',
    value: '99.7%',
    change: 'Optimal level',
    icon: 'fas fa-shield-alt',
    color: 'text-yellow-400'
  }
];

const workflowSteps: WorkflowStep[] = [
  {
    id: 'step-1',
    name: '数据收集 (Data Collection)',
    status: 'completed',
    assignee: 'HR Team',
    dueDate: '2024-12-20'
  },
  {
    id: 'step-2',
    name: '工资计算 (Salary Calculation)',
    status: 'active',
    assignee: 'Payroll System',
    dueDate: '2024-12-22'
  },
  {
    id: 'step-3',
    name: '税务处理 (Tax Processing)',
    status: 'pending',
    assignee: 'Finance Team',
    dueDate: '2024-12-23'
  },
  {
    id: 'step-4',
    name: '银行转账 (Bank Transfer)',
    status: 'pending',
    assignee: 'Banking API',
    dueDate: '2024-12-25'
  }
];

const globalBrands: GlobalBrand[] = [
  {
    id: 'brand-001',
    name: 'VaultMesh™ 中国',
    region: 'China',
    status: 'Active',
    revenue: '¥158M',
    employees: 847,
    logo: '🔐'
  },
  {
    id: 'brand-002',
    name: 'CodeNest™ Global',
    region: 'Global',
    status: 'Active',
    revenue: '$67M',
    employees: 1204,
    logo: '💻'
  },
  {
    id: 'brand-003',
    name: 'CrateDance™ APAC',
    region: 'Asia Pacific',
    status: 'Pending',
    revenue: '$23M',
    employees: 456,
    logo: '📦'
  }
];

export default function FAAPayrollOS() {
  const [activeSection, setActiveSection] = useState('dashboard-overview');
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});
  const [chartInstance, setChartInstance] = useState<any>(null);

  // Initialize Chart.js when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Chart && activeSection === 'dashboard-overview') {
      const Chart = (window as any).Chart;
      
      // Destroy existing chart
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = document.getElementById('payrollChart') as HTMLCanvasElement;
      if (ctx) {
        const newChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
              label: 'Monthly Payroll (¥M)',
              data: [22.1, 23.5, 24.2, 23.8, 24.8, 25.2],
              backgroundColor: 'rgba(59, 130, 246, 0.8)',
              borderColor: 'rgba(59, 130, 246, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: '#cbd5e1' }
              }
            },
            scales: {
              x: { ticks: { color: '#cbd5e1' } },
              y: { ticks: { color: '#cbd5e1' } }
            }
          }
        });
        setChartInstance(newChart);
      }
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [activeSection]);

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addEmployee = () => {
    if (newEmployee.name && newEmployee.department && newEmployee.position) {
      const employee: Employee = {
        id: `emp-${Date.now()}`,
        name: newEmployee.name || '',
        department: newEmployee.department || '',
        position: newEmployee.position || '',
        salary: newEmployee.salary || 0,
        status: 'Active',
        startDate: new Date().toISOString().split('T')[0],
        email: newEmployee.email || '',
        socialInsurance: newEmployee.socialInsurance || '',
        taxId: newEmployee.taxId || ''
      };
      setEmployees([...employees, employee]);
      setNewEmployee({});
      setShowAddModal(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-400';
      case 'Inactive': return 'text-red-400';
      case 'On Leave': return 'text-yellow-400';
      case 'Pending': return 'text-orange-400';
      case 'Maintenance': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getWorkflowStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      case 'active': return 'border-blue-500 bg-blue-50 dark:bg-blue-900/20';
      case 'pending': return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
      default: return 'border-gray-300 bg-gray-50 dark:bg-gray-800';
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard-overview':
        return (
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">🧬 FAA™ Payroll OS — Master Dashboard</h1>
              <p className="text-gray-400">Global payroll enterprise system with cultural harmony</p>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {payrollMetrics.map((metric, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{metric.label}</p>
                      <p className="text-2xl font-bold mt-1">{metric.value}</p>
                      <p className={`text-sm mt-1 ${metric.color}`}>{metric.change}</p>
                    </div>
                    <i className={`${metric.icon} text-2xl ${metric.color}`}></i>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart Section */}
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-blue-400">Monthly Payroll Trends</h3>
              <div className="chart-container h-80">
                <canvas id="payrollChart"></canvas>
              </div>
            </div>

            {/* Cultural Integration Notice */}
            <div className="bg-gradient-to-r from-red-900/20 to-yellow-900/20 border border-red-600/30 p-6 rounded-xl">
              <h4 className="font-bold text-red-400 mb-2 text-lg">
                <i className="fas fa-yin-yang mr-2"></i>
                文化和谐系统 (Cultural Harmony System)
              </h4>
              <p className="text-red-300">
                Confucian ethical modeling active: 群体优先 (collective over individual), 和为贵 (harmony-based conflict resolution). 
                Lunar calendar integration for Spring Festival (春节) payroll adjustments.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-400">社保 (Social Insurance)</p>
                  <p className="text-lg font-bold text-yellow-400">五险一金 Active</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">个税 (Personal Tax)</p>
                  <p className="text-lg font-bold text-green-400">Auto Calculated</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-400">劳动合同法 Compliance</p>
                  <p className="text-lg font-bold text-blue-400">99.7%</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'employee-management':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">👥 Employee Management</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <i className="fas fa-plus mr-2"></i>
                Add Employee
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400"
              />
              <i className="fas fa-search absolute right-4 top-3.5 text-gray-400"></i>
            </div>

            {/* Employee Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map(employee => (
                <div
                  key={employee.id}
                  onClick={() => setSelectedEmployee(employee)}
                  className="bg-gray-800 border border-gray-700 p-6 rounded-xl cursor-pointer hover:border-blue-500 transition-colors"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold text-lg">{employee.name}</h4>
                    <span className={`text-sm ${getStatusColor(employee.status)}`}>
                      ● {employee.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      <i className="fas fa-building mr-2"></i>
                      {employee.department}
                    </p>
                    <p className="text-gray-400">
                      <i className="fas fa-briefcase mr-2"></i>
                      {employee.position}
                    </p>
                    <p className="text-green-400 font-bold">
                      <i className="fas fa-dollar-sign mr-2"></i>
                      ¥{employee.salary.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'payroll-processing':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">💳 Payroll Processing & Sync</h2>
            
            {/* Integration Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                <h4 className="font-bold mb-4 text-blue-400">
                  <i className="fas fa-database mr-2"></i>
                  SAP Integration
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-400">● Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Sync:</span>
                    <span className="text-gray-400">2 mins ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Records:</span>
                    <span className="text-yellow-400">2,847</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                <h4 className="font-bold mb-4 text-purple-400">
                  <i className="fas fa-globe mr-2"></i>
                  Deel Integration
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-green-400">● Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contractors:</span>
                    <span className="text-gray-400">456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Countries:</span>
                    <span className="text-yellow-400">23</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                <h4 className="font-bold mb-4 text-green-400">
                  <i className="fas fa-calculator mr-2"></i>
                  Sage Integration
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-yellow-400">● Syncing</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Local Payroll:</span>
                    <span className="text-gray-400">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Compliance:</span>
                    <span className="text-green-400">99.8%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Steps */}
            <div className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-yellow-400">Current Payroll Workflow</h3>
              <div className="space-y-4">
                {workflowSteps.map(step => (
                  <div
                    key={step.id}
                    className={`border-l-4 p-4 rounded-lg ${getWorkflowStatusColor(step.status)}`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{step.name}</h4>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">{step.assignee}</span>
                        <span className="text-sm text-gray-500">{step.dueDate}</span>
                        <span className={`text-sm font-medium ${
                          step.status === 'completed' ? 'text-green-600' :
                          step.status === 'active' ? 'text-blue-600' :
                          'text-gray-600'
                        }`}>
                          {step.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'global-brands':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">🌐 FAA Global Brands</h2>
            
            {/* Brand Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {globalBrands.map(brand => (
                <div key={brand.id} className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-3xl">{brand.logo}</div>
                    <span className={`text-sm ${getStatusColor(brand.status)}`}>
                      ● {brand.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{brand.name}</h4>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      <i className="fas fa-map-marker-alt mr-2"></i>
                      {brand.region}
                    </p>
                    <p className="text-green-400 font-bold">
                      <i className="fas fa-chart-line mr-2"></i>
                      {brand.revenue}
                    </p>
                    <p className="text-blue-400">
                      <i className="fas fa-users mr-2"></i>
                      {brand.employees} employees
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAA 9000 Omni Brands System */}
            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-600/30 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 text-purple-400">
                <i className="fas fa-gem mr-2"></i>
                FAA 9000 Omni Brands Intelligence Stack
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <h5 className="font-bold text-blue-400">L1: Enterprise</h5>
                  <p className="text-sm text-gray-400 mt-2">SAP, Oracle, Salesforce</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <h5 className="font-bold text-green-400">L2: AI Models</h5>
                  <p className="text-sm text-gray-400 mt-2">GPT, ERNIE, Claude</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <h5 className="font-bold text-purple-400">L3: Creative</h5>
                  <p className="text-sm text-gray-400 mt-2">Adobe, Canva, RunwayML</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <h5 className="font-bold text-yellow-400">L4: Commerce</h5>
                  <p className="text-sm text-gray-400 mt-2">Shopify, Alibaba, TikTok</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-lg">
                  <h5 className="font-bold text-red-400">L5: China-Native</h5>
                  <p className="text-sm text-gray-400 mt-2">WeChat, Douyin, Alipay</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api-integrations':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">🔗 API Key Integrations & Sovereign Bridges</h2>
            
            {/* API Status Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { name: 'OpenAI GPT API', status: 'Active', requests: '847K', key: 'sk-***************************' },
                { name: 'Baidu ERNIE API', status: 'Active', requests: '234K', key: 'bd-***************************' },
                { name: 'WeChat API', status: 'Pending', requests: '0', key: 'wx-***************************' },
                { name: 'SAP SuccessFactors', status: 'Active', requests: '1.2M', key: 'sf-***************************' }
              ].map((api, index) => (
                <div key={index} className="bg-gray-800 border border-gray-700 p-6 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-bold">{api.name}</h4>
                    <span className={`text-sm ${getStatusColor(api.status)}`}>
                      ● {api.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-400">
                      <i className="fas fa-chart-bar mr-2"></i>
                      {api.requests} requests/month
                    </p>
                    <p className="text-gray-400 font-mono text-sm">
                      <i className="fas fa-key mr-2"></i>
                      {api.key}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                      Test
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                      Regenerate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-gray-400">Select a section from the navigation</h3>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Menu */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'dashboard-overview', name: 'Dashboard', icon: '📊' },
            { id: 'employee-management', name: 'Employees', icon: '👥' },
            { id: 'payroll-processing', name: 'Payroll Sync', icon: '💳' },
            { id: 'global-brands', name: 'Global Brands', icon: '🌐' },
            { id: 'api-integrations', name: 'API Keys', icon: '🔗' }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <span className="mr-2">{section.icon}</span>
              {section.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        {renderContent()}
      </div>

      {/* Add Employee Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add New Employee</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={newEmployee.name || ''}
                onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
              <input
                type="text"
                placeholder="Department"
                value={newEmployee.department || ''}
                onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
              <input
                type="text"
                placeholder="Position"
                value={newEmployee.position || ''}
                onChange={(e) => setNewEmployee({...newEmployee, position: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
              <input
                type="number"
                placeholder="Salary"
                value={newEmployee.salary || ''}
                onChange={(e) => setNewEmployee({...newEmployee, salary: Number(e.target.value)})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmployee.email || ''}
                onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
              <div className="flex gap-4">
                <button
                  onClick={addEmployee}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Add Employee
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 max-w-lg w-full mx-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{selectedEmployee.name}</h3>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="text-gray-400 hover:text-white"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Department</p>
                  <p className="font-medium">{selectedEmployee.department}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Position</p>
                  <p className="font-medium">{selectedEmployee.position}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Salary</p>
                  <p className="font-medium text-green-400">¥{selectedEmployee.salary.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Status</p>
                  <p className={`font-medium ${getStatusColor(selectedEmployee.status)}`}>
                    {selectedEmployee.status}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Start Date</p>
                  <p className="font-medium">{selectedEmployee.startDate}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="font-medium">{selectedEmployee.email}</p>
                </div>
              </div>
              <div className="border-t border-gray-700 pt-4">
                <p className="text-gray-400 text-sm mb-2">Social Insurance ID</p>
                <p className="font-mono text-sm">{selectedEmployee.socialInsurance}</p>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Edit Employee
                </button>
                <button className="flex-1 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
                  View Payroll
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}