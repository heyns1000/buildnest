import { useState, useEffect } from 'react';

interface FinancialMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  changePercent: number;
  currency: string;
  icon: string;
  category: 'revenue' | 'cost' | 'profit' | 'investment';
}

interface Transaction {
  id: string;
  timestamp: string;
  type: 'income' | 'expense' | 'investment' | 'mining';
  amount: number;
  currency: string;
  description: string;
  status: 'confirmed' | 'pending' | 'failed';
}

export default function FinancialTracking() {
  const [metrics, setMetrics] = useState<FinancialMetric[]>([
    {
      id: 'total-revenue',
      name: 'Total Revenue',
      value: 1247683.45,
      change: 58234.12,
      changePercent: 4.89,
      currency: 'USD',
      icon: 'fas fa-chart-line',
      category: 'revenue'
    },
    {
      id: 'mining-income',
      name: 'Mining Income',
      value: 847392.33,
      change: 23847.67,
      changePercent: 2.89,
      currency: 'USD',
      icon: 'fas fa-coins',
      category: 'revenue'
    },
    {
      id: 'operational-costs',
      name: 'Operational Costs',
      value: 234857.89,
      change: -12483.45,
      changePercent: -5.05,
      currency: 'USD',
      icon: 'fas fa-money-bill',
      category: 'cost'
    },
    {
      id: 'energy-costs',
      name: 'Energy Costs',
      value: 156743.22,
      change: 8934.56,
      changePercent: 6.04,
      currency: 'USD',
      icon: 'fas fa-bolt',
      category: 'cost'
    },
    {
      id: 'net-profit',
      name: 'Net Profit',
      value: 856082.34,
      change: 61784.23,
      changePercent: 7.77,
      currency: 'USD',
      icon: 'fas fa-trophy',
      category: 'profit'
    },
    {
      id: 'equipment-investment',
      name: 'Equipment Investment',
      value: 2847392.78,
      change: 234891.45,
      changePercent: 8.98,
      currency: 'USD',
      icon: 'fas fa-tools',
      category: 'investment'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'tx-001',
      timestamp: '2024-12-20 14:23:45',
      type: 'mining',
      amount: 15847.33,
      currency: 'USD',
      description: 'Quantum Array Alpha - Block reward',
      status: 'confirmed'
    },
    {
      id: 'tx-002',
      timestamp: '2024-12-20 14:18:22',
      type: 'expense',
      amount: 8234.56,
      currency: 'USD',
      description: 'Energy consumption - Europe-1',
      status: 'confirmed'
    },
    {
      id: 'tx-003',
      timestamp: '2024-12-20 14:12:11',
      type: 'mining',
      amount: 23491.78,
      currency: 'USD',
      description: 'Neural Cluster Beta - Transaction fees',
      status: 'confirmed'
    },
    {
      id: 'tx-004',
      timestamp: '2024-12-20 14:07:33',
      type: 'investment',
      amount: 125000.00,
      currency: 'USD',
      description: 'Temporal Engine Delta - Upgrade',
      status: 'pending'
    },
    {
      id: 'tx-005',
      timestamp: '2024-12-20 14:02:18',
      type: 'income',
      amount: 45892.44,
      currency: 'USD',
      description: 'Network validation rewards',
      status: 'confirmed'
    }
  ]);

  const [selectedPeriod, setSelectedPeriod] = useState<'24h' | '7d' | '30d' | '1y'>('24h');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * metric.value * 0.001,
        change: metric.change + (Math.random() - 0.5) * 1000,
        changePercent: metric.changePercent + (Math.random() - 0.5) * 0.5
      })));

      // Add new transaction occasionally
      if (Math.random() < 0.3) {
        const newTransaction: Transaction = {
          id: `tx-${Date.now()}`,
          timestamp: new Date().toLocaleString(),
          type: ['mining', 'expense', 'income'][Math.floor(Math.random() * 3)] as Transaction['type'],
          amount: Math.random() * 50000 + 5000,
          currency: 'USD',
          description: [
            'Quantum mining reward',
            'Energy consumption',
            'Network fees',
            'Equipment maintenance',
            'Validation rewards'
          ][Math.floor(Math.random() * 5)],
          status: Math.random() > 0.1 ? 'confirmed' : 'pending'
        };

        setTransactions(prev => [newTransaction, ...prev].slice(0, 10));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  const formatChange = (change: number, percent: number) => {
    const sign = change >= 0 ? '+' : '';
    const color = change >= 0 ? 'text-apple-green' : 'text-apple-red';
    return (
      <span className={`${color} text-sm`}>
        {sign}{formatCurrency(Math.abs(change), 'USD')} ({sign}{percent.toFixed(2)}%)
      </span>
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'revenue': return 'text-apple-green';
      case 'cost': return 'text-apple-red';
      case 'profit': return 'text-faa-yellow';
      case 'investment': return 'text-apple-blue';
      default: return 'text-gray-400';
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'income': return 'fas fa-arrow-up text-apple-green';
      case 'expense': return 'fas fa-arrow-down text-apple-red';
      case 'investment': return 'fas fa-chart-line text-apple-blue';
      case 'mining': return 'fas fa-coins text-faa-yellow';
      default: return 'fas fa-circle text-gray-400';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-apple-green/20 text-apple-green border-apple-green/30';
      case 'pending': return 'bg-faa-yellow/20 text-faa-yellow border-faa-yellow/30';
      case 'failed': return 'bg-apple-red/20 text-apple-red border-apple-red/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <section id="financial-tracking" className="mb-16" data-testid="financial-tracking">
      <h2 className="font-orbitron text-3xl font-bold text-faa-yellow text-center mb-12" data-testid="title-financial-tracking">
        💰 FINANCIAL IMPACT TRACKING 💰
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-testid="financial-layout">
        {/* Financial Metrics */}
        <div className="lg:col-span-2 space-y-6" data-testid="financial-metrics">
          {/* Period Selector */}
          <div className="flex justify-center mb-6">
            <div className="bg-faa-card border border-faa-border rounded-lg p-1 flex">
              {(['24h', '7d', '30d', '1y'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded text-sm font-semibold transition-colors ${
                    selectedPeriod === period
                      ? 'bg-faa-yellow text-faa-bg'
                      : 'text-faa-yellow-light hover:text-faa-yellow'
                  }`}
                  data-testid={`period-${period}`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {metrics.map((metric) => (
              <div key={metric.id} className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid={`metric-${metric.id}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <i className={`${metric.icon} ${getCategoryColor(metric.category)} text-xl mr-3`}></i>
                    <h3 className="font-semibold text-faa-yellow-light">{metric.name}</h3>
                  </div>
                </div>
                
                <div className="mb-2">
                  <div className="text-2xl font-bold text-faa-yellow">
                    {formatCurrency(metric.value, metric.currency)}
                  </div>
                  <div className="text-sm">
                    {formatChange(metric.change, metric.changePercent)}
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 capitalize">
                  {metric.category} • Last {selectedPeriod}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-faa-card border border-faa-border rounded-xl p-6" data-testid="transaction-history">
          <h3 className="font-orbitron text-lg font-bold text-faa-yellow mb-6 flex items-center">
            <i className="fas fa-history mr-3"></i>
            Recent Transactions
          </h3>
          
          <div className="space-y-3" data-testid="transactions-list">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="p-4 bg-faa-bg border border-faa-border rounded-lg"
                data-testid={`transaction-${transaction.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <i className={`${getTransactionIcon(transaction.type)} mr-3`}></i>
                    <span className="text-faa-yellow-light font-semibold">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </span>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusBadge(transaction.status)}`}>
                    {transaction.status.toUpperCase()}
                  </div>
                </div>
                
                <p className="text-gray-400 text-sm mb-1">{transaction.description}</p>
                <p className="text-gray-500 text-xs">{transaction.timestamp}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-faa-border">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-apple-green font-bold">
                  {formatCurrency(
                    transactions
                      .filter(t => t.type === 'income' || t.type === 'mining')
                      .reduce((sum, t) => sum + t.amount, 0),
                    'USD'
                  )}
                </div>
                <div className="text-gray-500 text-xs">Total Income</div>
              </div>
              <div className="text-center">
                <div className="text-apple-red font-bold">
                  {formatCurrency(
                    transactions
                      .filter(t => t.type === 'expense')
                      .reduce((sum, t) => sum + t.amount, 0),
                    'USD'
                  )}
                </div>
                <div className="text-gray-500 text-xs">Total Expenses</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}