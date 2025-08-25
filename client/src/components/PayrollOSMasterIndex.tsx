import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  salary: number;
  status: 'Active' | 'Inactive';
  joinDate: string;
}

interface PayrollStats {
  totalEmployees: number;
  totalPayroll: number;
  pendingPayments: number;
  completedPayments: number;
  averageSalary: number;
  departmentCount: number;
}

export default function PayrollOSMasterIndex() {
  const [activeSection, setActiveSection] = useState('dashboard-overview');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  
  const [payrollStats, setPayrollStats] = useState<PayrollStats>({
    totalEmployees: 2847,
    totalPayroll: 45782000,
    pendingPayments: 156,
    completedPayments: 2691,
    averageSalary: 85420,
    departmentCount: 24
  });

  const [employees] = useState<Employee[]>([
    { id: '1', name: 'Sarah Chen', department: 'Engineering', position: 'Senior Developer', salary: 120000, status: 'Active', joinDate: '2022-03-15' },
    { id: '2', name: 'Marcus Johnson', department: 'Design', position: 'UI/UX Designer', salary: 95000, status: 'Active', joinDate: '2023-01-10' },
    { id: '3', name: 'Elena Rodriguez', department: 'Marketing', position: 'Marketing Manager', salary: 85000, status: 'Active', joinDate: '2021-11-05' },
    { id: '4', name: 'David Kim', department: 'Sales', position: 'Account Executive', salary: 78000, status: 'Active', joinDate: '2023-06-20' },
    { id: '5', name: 'Anna Petrov', department: 'HR', position: 'HR Specialist', salary: 65000, status: 'Inactive', joinDate: '2020-09-12' },
  ]);

  const [operationLogs, setOperationLogs] = useState<string[]>([
    "[12:00:00] ✓ FAA™ Payroll OS Master Index initialized",
    "[12:00:01] ℹ Loading employee database...",
    "[12:00:02] ✓ 2,847 employees loaded successfully", 
    "[12:00:03] ℹ Initializing payroll calculations...",
    "[12:00:04] ✓ Payroll system ready - $45.78M total",
    "[12:00:05] ℹ Global compliance checks passed",
    "[12:00:06] ✓ All systems operational"
  ]);

  const navigationItems = [
    { id: 'dashboard-overview', label: 'Dashboard Overview', icon: '📊' },
    { id: 'employee-management', label: 'Employee Management', icon: '👥' },
    { id: 'payroll-processing', label: 'Payroll Processing & Sync', icon: '💳' },
    { id: 'reporting-analytics', label: 'Reporting & Analytics', icon: '📈' },
    { id: 'admin-settings', label: 'Admin & Settings', icon: '⚙️' },
    { id: 'hat-book-index', label: 'HAT Book Index: UI Elements', icon: '📚' },
    { id: 'global-brands', label: 'FAA Global Brands', icon: '🌐' },
    { id: 'api-integrations', label: 'API Key Integrations & Sovereign Bridges', icon: '🔗' },
    { id: 'payroll-master-index', label: 'Payroll Master Index', icon: '🧬' },
    { id: 'payroll-portal-landing', label: 'Payroll Core Portal', icon: '🪙' },
    { id: 'payroll-welcome-dashboard', label: 'Client Dashboard', icon: '📊' },
    { id: 'payroll-features', label: 'Payroll Features', icon: '🍇' },
    { id: 'payroll-products-services', label: 'Products & Services', icon: '🧰' }
  ];

  const complianceData = [
    { region: 'North America', compliance: 98.5, employees: 856, regulations: 47 },
    { region: 'Europe', compliance: 97.2, employees: 743, regulations: 62 },
    { region: 'Asia Pacific', compliance: 96.8, employees: 912, regulations: 38 },
    { region: 'Latin America', compliance: 94.3, employees: 336, regulations: 29 }
  ];

  const departmentBreakdown = [
    { name: 'Engineering', employees: 485, budget: 12800000, avgSalary: 98500 },
    { name: 'Sales', employees: 312, budget: 7200000, avgSalary: 76200 },
    { name: 'Marketing', employees: 156, budget: 4100000, avgSalary: 82400 },
    { name: 'Operations', employees: 243, budget: 5900000, avgSalary: 71200 },
    { name: 'Design', employees: 128, budget: 3400000, avgSalary: 89600 },
    { name: 'HR', employees: 89, budget: 2200000, avgSalary: 68300 }
  ];

  // Live data simulation
  useEffect(() => {
    if (isLiveMode) {
      const interval = setInterval(() => {
        setPayrollStats(prev => ({
          ...prev,
          pendingPayments: Math.max(0, prev.pendingPayments + Math.floor((Math.random() - 0.7) * 10)),
          completedPayments: prev.completedPayments + Math.floor(Math.random() * 5)
        }));

        const timestamp = new Date().toLocaleTimeString();
        setOperationLogs(prev => [
          ...prev.slice(-15),
          `[${timestamp}] ℹ Live sync: ${Math.floor(Math.random() * 50)} payroll records updated`
        ]);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isLiveMode]);

  const renderDashboardOverview = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-yellow-400">FAA™ Payroll OS Dashboard</h2>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Employees</p>
              <p className="text-3xl font-bold">{payrollStats.totalEmployees.toLocaleString()}</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Total Payroll</p>
              <p className="text-3xl font-bold">${(payrollStats.totalPayroll / 1000000).toFixed(1)}M</p>
            </div>
            <div className="text-4xl">💰</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-orange-600 to-red-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Pending Payments</p>
              <p className="text-3xl font-bold">{payrollStats.pendingPayments}</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-600 to-cyan-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Completed Payments</p>
              <p className="text-3xl font-bold">{payrollStats.completedPayments.toLocaleString()}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-600 to-pink-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Average Salary</p>
              <p className="text-3xl font-bold">${(payrollStats.averageSalary / 1000).toFixed(0)}K</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-teal-600 to-green-700 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Departments</p>
              <p className="text-3xl font-bold">{payrollStats.departmentCount}</p>
            </div>
            <div className="text-4xl">🏢</div>
          </div>
        </motion.div>
      </div>

      {/* Global Compliance Matrix */}
      <div className="bg-black/70 rounded-xl p-6 border border-yellow-500/30">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">🌍 Global Compliance Matrix</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceData.map((region, index) => (
            <motion.div
              key={region.region}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-lg p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-yellow-400">{region.region}</h4>
                <span className="text-green-400 font-bold">{region.compliance}%</span>
              </div>
              <div className="space-y-1 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>Employees:</span>
                  <span>{region.employees.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Regulations:</span>
                  <span>{region.regulations}</span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                <motion.div
                  className="bg-green-400 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${region.compliance}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderEmployeeManagement = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-yellow-400">Employee Management</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg font-bold text-black"
          onClick={() => setShowModal(true)}
        >
          + Add Employee
        </motion.button>
      </div>

      <div className="bg-black/70 rounded-xl p-6 border border-yellow-500/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-yellow-500/30">
                <th className="pb-3 text-yellow-400">Name</th>
                <th className="pb-3 text-yellow-400">Department</th>
                <th className="pb-3 text-yellow-400">Position</th>
                <th className="pb-3 text-yellow-400">Salary</th>
                <th className="pb-3 text-yellow-400">Status</th>
                <th className="pb-3 text-yellow-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, index) => (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border-b border-slate-700 hover:bg-slate-800/50"
                >
                  <td className="py-3">{employee.name}</td>
                  <td className="py-3">{employee.department}</td>
                  <td className="py-3">{employee.position}</td>
                  <td className="py-3">${employee.salary.toLocaleString()}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      employee.status === 'Active' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-600 text-gray-300'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-yellow-400 hover:text-yellow-300"
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      View Details
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Department Breakdown */}
      <div className="bg-black/70 rounded-xl p-6 border border-yellow-500/30">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">Department Budget Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {departmentBreakdown.map((dept, index) => (
            <motion.div
              key={dept.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800 rounded-lg p-4"
            >
              <h4 className="font-bold text-yellow-400 mb-2">{dept.name}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Employees:</span>
                  <span className="font-semibold">{dept.employees}</span>
                </div>
                <div className="flex justify-between">
                  <span>Budget:</span>
                  <span className="font-semibold">${(dept.budget / 1000000).toFixed(1)}M</span>
                </div>
                <div className="flex justify-between">
                  <span>Avg Salary:</span>
                  <span className="font-semibold">${(dept.avgSalary / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const renderPayrollProcessing = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-yellow-400">Payroll Processing & Sync</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Status */}
        <div className="bg-black/70 rounded-xl p-6 border border-yellow-500/30">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">🔄 Processing Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Weekly Payroll Run</span>
              </div>
              <span className="text-green-400 font-bold">Complete</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                <span>Benefit Calculations</span>
              </div>
              <span className="text-yellow-400 font-bold">Processing</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span>Tax Withholdings</span>
              </div>
              <span className="text-blue-400 font-bold">Queued</span>
            </div>
          </div>
        </div>

        {/* Integration Status */}
        <div className="bg-black/70 rounded-xl p-6 border border-yellow-500/30">
          <h3 className="text-xl font-bold text-yellow-400 mb-4">🔗 System Integrations</h3>
          <div className="space-y-3">
            {['SAP SuccessFactors', 'Deel Global Payroll', 'Sage HRMS', 'ADP Workforce Now', 'Workday HCM'].map((system, index) => (
              <motion.div
                key={system}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-2 bg-slate-800 rounded"
              >
                <span className="text-sm">{system}</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-400">Connected</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Processing Controls */}
      <div className="bg-black/70 rounded-xl p-6 border border-yellow-500/30">
        <h3 className="text-xl font-bold text-yellow-400 mb-4">💳 Payment Processing</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-green-600 hover:bg-green-700 p-4 rounded-lg font-bold text-center"
          >
            <div className="text-2xl mb-2">▶️</div>
            <div>Run Payroll</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg font-bold text-center"
          >
            <div className="text-2xl mb-2">📊</div>
            <div>Generate Reports</div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg font-bold text-center"
          >
            <div className="text-2xl mb-2">🔄</div>
            <div>Sync All Systems</div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard-overview':
        return renderDashboardOverview();
      case 'employee-management':
        return renderEmployeeManagement();
      case 'payroll-processing':
        return renderPayrollProcessing();
      default:
        return renderDashboardOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        className="w-80 bg-slate-800 p-6 flex flex-col shadow-lg border-r border-yellow-500/20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold mb-8 text-yellow-400"
        >
          🧬 FAA™ Payroll OS
        </motion.div>
        
        <nav className="space-y-2 flex-grow">
          {navigationItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                activeSection === item.id 
                  ? 'bg-yellow-600 text-black font-bold' 
                  : 'hover:bg-slate-700 text-yellow-200'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-left text-sm">{item.label}</span>
            </motion.button>
          ))}
        </nav>

        {/* Live Mode Toggle */}
        <div className="mt-6 pt-4 border-t border-slate-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsLiveMode(!isLiveMode)}
            className={`w-full p-3 rounded-lg font-bold transition-all ${
              isLiveMode 
                ? 'bg-green-600 text-white' 
                : 'bg-slate-700 text-yellow-400 hover:bg-slate-600'
            }`}
          >
            {isLiveMode ? '🟢 Live Mode ON' : '⚪ Live Mode OFF'}
          </motion.button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>

        {/* Operations Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-black/70 rounded-xl p-6 border border-yellow-500/30"
        >
          <h3 className="text-xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
            📋 System Operations Log
            {isLiveMode && (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-3 h-3 bg-green-500 rounded-full"
              />
            )}
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 max-h-64 overflow-y-auto">
            {operationLogs.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className="text-sm text-green-400 font-mono mb-1"
              >
                {log}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 p-6 rounded-xl max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-yellow-400 mb-4">Add New Employee</h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full bg-slate-700 border border-yellow-500/30 rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Department"
                  className="w-full bg-slate-700 border border-yellow-500/30 rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="text"
                  placeholder="Position"
                  className="w-full bg-slate-700 border border-yellow-500/30 rounded-lg px-3 py-2 text-white"
                />
                <input
                  type="number"
                  placeholder="Annual Salary"
                  className="w-full bg-slate-700 border border-yellow-500/30 rounded-lg px-3 py-2 text-white"
                />
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 py-2 rounded-lg font-bold text-black"
                  >
                    Add Employee
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-slate-600 hover:bg-slate-700 py-2 rounded-lg font-bold"
                  >
                    Cancel
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}