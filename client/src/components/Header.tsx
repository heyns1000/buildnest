export default function Header() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="main-header sticky top-0 z-50" data-testid="header-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo Group */}
          <div className="flex items-center gap-4" data-testid="header-logo-group">
            <div className="flex items-center gap-2">
              <span className="text-apple-blue text-2xl font-bold">🌱</span>
              <span className="text-apple-blue font-bold text-xl">Fruitful</span>
            </div>
            <div className="pulse-grid-noodle-rope hidden md:flex">
              <div className="noodle-dot dot-1"></div>
              <div className="noodle-dot dot-2"></div>
              <div className="noodle-dot dot-3"></div>
              <div className="noodle-dot dot-stepdad"></div>
              <div className="noodle-dot dot-4"></div>
              <div className="noodle-dot dot-5"></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-apple-blue font-bold">FAA.zone™</span>
              <span className="text-apple-green font-bold">BUILDNEST</span>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="main-nav hidden md:flex" data-testid="header-navigation">
            <ul className="nav-list flex space-x-8">
              <li>
                <button 
                  onClick={() => scrollToSection('overview')}
                  className="text-gray-300 hover:text-faa-yellow transition-colors"
                  data-testid="nav-overview"
                >
                  Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('system-status')}
                  className="text-gray-300 hover:text-faa-yellow transition-colors"
                  data-testid="nav-system-status"
                >
                  System Status
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('logic-cores')}
                  className="text-gray-300 hover:text-faa-yellow transition-colors"
                  data-testid="nav-logic-cores"
                >
                  Logic Cores
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('network')}
                  className="text-gray-300 hover:text-faa-yellow transition-colors"
                  data-testid="nav-network"
                >
                  Network
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('security')}
                  className="text-gray-300 hover:text-faa-yellow transition-colors"
                  data-testid="nav-security"
                >
                  Security
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="flex items-center gap-4" data-testid="header-actions">
            <button 
              onClick={() => scrollToSection('command-center')}
              className="action-button px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300"
              data-testid="button-command-center"
            >
              Command Center
            </button>
            <button className="hamburger-menu md:hidden text-faa-yellow-light" data-testid="button-hamburger-menu">
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
