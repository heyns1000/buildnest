import { useState } from 'react';

interface SponsorshipTier {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  investmentValue: string;
  mealsValue: string;
  isPopular?: boolean;
  paypalButtonId?: string;
}

const sponsorshipTiers: SponsorshipTier[] = [
  {
    id: 'bronze',
    name: 'Bronze Sponsor',
    price: '$500',
    description: 'Entry-level sponsorship for emerging brands',
    features: [
      'Logo placement on event materials',
      'Social media mention (1x)',
      'Access to event networking',
      'Digital certificate of sponsorship',
      'Basic event photography package'
    ],
    investmentValue: '$500',
    mealsValue: '5 Meals',
    paypalButtonId: 'bronze-sponsor'
  },
  {
    id: 'silver', 
    name: 'Silver Sponsor',
    price: '$1,500',
    description: 'Mid-tier sponsorship with enhanced visibility',
    features: [
      'Premium logo placement',
      'Dedicated booth space (10x10)',
      'Social media mentions (5x)',
      'Speaking opportunity (5 minutes)',
      'Full event photography access',
      'Post-event report with metrics',
      'Networking reception invitation'
    ],
    investmentValue: '$1,500',
    mealsValue: '15 Meals',
    isPopular: true,
    paypalButtonId: 'silver-sponsor'
  },
  {
    id: 'gold',
    name: 'Gold Sponsor', 
    price: '$3,500',
    description: 'Premium sponsorship with maximum impact',
    features: [
      'Headline sponsor recognition',
      'Premium booth space (20x20)',
      'Keynote speaking slot (15 minutes)',
      'Custom branded event materials',
      'VIP networking access',
      'Professional video content',
      'Year-long digital partnership',
      'Exclusive post-event analytics',
      'Priority future event access'
    ],
    investmentValue: '$3,500',
    mealsValue: '35 Meals',
    paypalButtonId: 'gold-sponsor'
  }
];

export default function CrateDancePricing() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isDarkMode, setIsDarkMode] = useState(true);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' }
  ];

  const translations = {
    en: {
      pageTitle: 'Fruitful Crate Dance Showcase - Sponsorship Tiers',
      mainTitle: 'Crate Dance Showcase',
      subtitle: 'Join the global movement of creative expression and brand innovation',
      investmentLabel: 'Investment',
      mealsLabel: 'Community Meals',
      selectSponsorshipButton: 'Select Sponsorship',
      payWithPayPal: 'Pay with PayPal',
      checkoutButton: 'Checkout Now'
    },
    es: {
      pageTitle: 'Fruitful Crate Dance Showcase - Niveles de Patrocinio',
      mainTitle: 'Showcase de Crate Dance',
      subtitle: 'Únete al movimiento global de expresión creativa e innovación de marca',
      investmentLabel: 'Inversión',
      mealsLabel: 'Comidas Comunitarias',
      selectSponsorshipButton: 'Seleccionar Patrocinio',
      payWithPayPal: 'Pagar con PayPal',
      checkoutButton: 'Pagar Ahora'
    },
    fr: {
      pageTitle: 'Fruitful Crate Dance Showcase - Niveaux de Sponsoring',
      mainTitle: 'Showcase Crate Dance',
      subtitle: 'Rejoignez le mouvement mondial d\'expression créative et d\'innovation de marque',
      investmentLabel: 'Investissement',
      mealsLabel: 'Repas Communautaires',
      selectSponsorshipButton: 'Choisir le Sponsoring',
      payWithPayPal: 'Payer avec PayPal',
      checkoutButton: 'Payer Maintenant'
    }
  };

  const currentTranslations = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const handleSponsorshipSelect = (tierId: string) => {
    console.log(`Selected sponsorship tier: ${tierId}`);
    // Integration with PayPal would happen here
  };

  const renderPayPalButton = (tier: SponsorshipTier) => {
    // This would integrate with actual PayPal SDK
    return (
      <div className="space-y-2">
        <button
          onClick={() => handleSponsorshipSelect(tier.id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {currentTranslations.payWithPayPal}
        </button>
        <button
          onClick={() => handleSponsorshipSelect(tier.id)}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          {currentTranslations.checkoutButton}
        </button>
      </div>
    );
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
                <span className="text-yellow-500 ml-2">Crate Dance</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className={`px-3 py-1 rounded-full text-sm ${
                  isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                }`}
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-blue-600 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {currentTranslations.mainTitle}
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            {currentTranslations.subtitle}
          </p>
        </div>
      </section>

      {/* Sponsorship Tiers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sponsorshipTiers.map(tier => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-8 transition-transform hover:scale-105 ${
                  tier.isPopular 
                    ? 'border-2 border-blue-500 shadow-2xl' 
                    : isDarkMode 
                    ? 'bg-gray-800 border border-gray-700' 
                    : 'bg-white border border-gray-200'
                }`}
              >
                {tier.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className={`text-sm mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {tier.description}
                  </p>
                  <div className="text-4xl font-bold text-blue-500 mb-2">
                    {tier.price}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <i className="fas fa-check text-green-500 mr-3 mt-1"></i>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Value Boxes */}
                <div className="space-y-4 mb-8">
                  <div className={`p-4 rounded-lg border text-center ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <h4 className="font-bold text-sm mb-1">{currentTranslations.investmentLabel}</h4>
                    <p className="text-2xl font-bold text-blue-500">{tier.investmentValue}</p>
                  </div>
                  <div className={`p-4 rounded-lg border text-center ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <h4 className="font-bold text-sm mb-1">{currentTranslations.mealsLabel}</h4>
                    <p className="text-2xl font-bold text-green-500">{tier.mealsValue}</p>
                  </div>
                </div>

                {/* PayPal Integration */}
                {renderPayPalButton(tier)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info Section */}
      <section className={`py-16 ${
        isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Event Impact & Community Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎨</div>
              <h3 className="font-bold mb-2">Creative Expression</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Supporting local artists and creative communities through innovative dance performances
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="font-bold mb-2">Global Reach</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Broadcasting to international audiences with live streaming and digital engagement
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="font-bold mb-2">Community Building</h3>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Creating lasting connections between brands, artists, and community members
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-8 ${
        isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      } border-t`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 Fruitful Global. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className={`text-sm hover:text-blue-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm hover:text-blue-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Terms of Service
              </a>
              <a href="#" className={`text-sm hover:text-blue-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}