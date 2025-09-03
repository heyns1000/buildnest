import { Link, useLocation } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  path: string;
  name: string;
  icon: string;
  description: string;
  scrollBound: boolean;
  status: 'active' | 'beta' | 'new';
}

const navigationItems: NavItem[] = [
  {
    path: '/',
    name: 'MONSTER OMNI Console',
    icon: '🏛️',
    description: 'Main operational dashboard and system control',
    scrollBound: true,
    status: 'active'
  },
  {
    path: '/omnihealth',
    name: 'OmniHealth Monitor',
    icon: '🔁',
    description: 'Real-time system health monitoring with scroll validation',
    scrollBound: true,
    status: 'new'
  },
  {
    path: '/seedling',
    name: 'Seedling Builder',
    icon: '🏗️',
    description: 'No-code generation system for scroll-bound applications',
    scrollBound: true,
    status: 'new'
  },
  {
    path: '/scroll-explainer',
    name: 'Scroll Explainer',
    icon: '📜',
    description: 'Partner/funder information and treaty system overview',
    scrollBound: true,
    status: 'new'
  },
  {
    path: '/treaty-sync',
    name: 'TreatySync Dashboard',
    icon: '🏛️',
    description: 'FAA Admin system for treaty logs and governance',
    scrollBound: true,
    status: 'beta'
  }
];

export default function AppNavigation({ className = '' }: { className?: string }) {
  const [location] = useLocation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-400/20 text-green-400 border-green-400/30';
      case 'beta': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400/30';
      case 'active': return 'bg-blue-400/20 text-blue-400 border-blue-400/30';
      default: return 'bg-gray-400/20 text-gray-400 border-gray-400/30';
    }
  };

  return (
    <Card className={`bg-faa-card border-faa-border ${className}`} data-testid="app-navigation">
      <CardContent className="p-6">
        <h2 className="font-orbitron text-xl font-bold text-faa-yellow mb-6 text-center">
          🧬 SCROLL-BACKED APPLICATIONS
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {navigationItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <div
                className={`p-4 border rounded-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                  location === item.path
                    ? 'border-faa-yellow bg-faa-yellow/10 shadow-lg'
                    : 'border-faa-border bg-faa-bg hover:border-faa-yellow/50'
                }`}
                data-testid={`nav-item-${item.path.replace('/', '') || 'dashboard'}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <h3 className="font-semibold text-white text-sm">{item.name}</h3>
                  </div>
                  <div className="flex flex-col items-end space-y-1">
                    <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                      {item.status.toUpperCase()}
                    </Badge>
                    {item.scrollBound && (
                      <Badge className="text-xs bg-purple-400/20 text-purple-400 border-purple-400/30">
                        🧬 SCROLL
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                
                {location === item.path && (
                  <div className="mt-3 pt-3 border-t border-faa-yellow/30">
                    <div className="text-xs text-faa-yellow font-semibold">
                      ✨ Currently Active
                    </div>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Scroll System Status */}
        <div className="mt-6 p-4 bg-faa-bg border border-green-500/50 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-green-400 font-semibold mb-2">
              🌟 SCROLL ECOSYSTEM STATUS
            </div>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="text-center">
                <div className="text-green-400 font-bold">5/5</div>
                <div className="text-gray-400">Apps Deployed</div>
              </div>
              <div className="text-center">
                <div className="text-blue-400 font-bold">100%</div>
                <div className="text-gray-400">Scroll Bound</div>
              </div>
              <div className="text-center">
                <div className="text-purple-400 font-bold">ACTIVE</div>
                <div className="text-gray-400">ClaimRoot</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}