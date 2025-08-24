import { useState } from 'react';

interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  symbol: string;
}

interface PaymentTier {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  paypalButtonId: string;
}

const currencies: CurrencyRate[] = [
  { code: 'USD', name: 'US Dollar', rate: 1, symbol: '$' },
  { code: 'EUR', name: 'Euro', rate: 0.85, symbol: '€' },
  { code: 'GBP', name: 'British Pound', rate: 0.73, symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', rate: 110, symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', rate: 1.25, symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', rate: 1.35, symbol: 'A$' },
  { code: 'ZAR', name: 'South African Rand', rate: 15.2, symbol: 'R' }
];

const paymentTiers: PaymentTier[] = [
  {
    id: 'core',
    name: 'LoopPay™ Core License',
    price: '$6,500',
    description: 'One-time fee for a perpetual sovereign license',
    features: [
      'Decentralized payout mesh access',
      'Immutable scroll contracts',
      'Regional compliance automation',
      'PulseTrade™ 9-second cycles',
      'ClaimRoot™ ownership verification',
      'Basic integration support'
    ],
    paypalButtonId: 'looppay-core'
  },
  {
    id: 'pro',
    name: 'LoopPay™ Pro Grid',
    price: '$230',
    period: '/month',
    description: 'Includes advanced analytics and priority support',
    features: [
      'All Core License features',
      'Advanced analytics dashboard',
      'Priority customer support',
      'Custom integration assistance',
      'Real-time transaction monitoring',
      'Multi-region deployment',
      'API access and documentation'
    ],
    paypalButtonId: 'looppay-pro'
  }
];

export default function LoopPayPortal() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [convertAmount, setConvertAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'zh', name: '中文' }
  ];

  const convertCurrency = () => {
    const amount = parseFloat(convertAmount);
    if (isNaN(amount)) return '0.00';

    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
    
    const convertedAmount = (amount / fromRate) * toRate;
    return convertedAmount.toFixed(2);
  };

  const handleAiQuery = async () => {
    if (!aiQuestion.trim()) return;

    setIsLoading(true);
    
    // Simulate AI response
    setTimeout(() => {
      const responses = {
        'How does PulseTrade™ work?': 'PulseTrade™ is our proprietary payment processing technology that completes transactions in 9-second cycles. It uses quantum-encrypted channels and distributed consensus validation to ensure both speed and security.',
        'What is ClaimRoot™?': 'ClaimRoot™ is our ownership verification system that creates immutable records of transaction ownership. Every payment processed through LoopPay™ is anchored to a sovereign legal scroll, providing unbreakable proof of payment.',
        'Regional compliance features?': 'DivLock™ technology automatically ensures all transactions adhere to regional and international financial regulations. The system adapts to local compliance requirements in real-time.',
        'Integration support?': 'Our API provides comprehensive integration support with detailed documentation, SDKs for major programming languages, and dedicated technical support for Pro Grid subscribers.'
      };

      const defaultResponse = "LoopPay™ uses advanced blockchain technology with sovereign payment protocols to ensure secure, fast, and compliant financial transactions. Our system integrates seamlessly with existing infrastructure while providing enhanced security and transparency.";

      const response = responses[aiQuestion as keyof typeof responses] || defaultResponse;
      setAiResponse(response);
      setIsLoading(false);
    }, 1500);
  };

  const handlePayment = (tierId: string) => {
    console.log(`Initiating payment for ${tierId}`);
    // PayPal integration would happen here
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
                <span className="text-purple-500">LoopPay™</span>
                <span className="text-blue-500 ml-2">Sovereign Portal</span>
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
            LoopPay™ Sovereign Payment & SSO Portal
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Your central hub for secure access to the LoopPay™ ecosystem, vendor management, and streamlined payout information.
          </p>
        </div>
      </section>

      {/* Core Functions */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-500">
            🔐 LoopPay™ Core Functions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <i className="fas fa-project-diagram text-4xl text-purple-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-3">Decentralized Payout Mesh</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Utilizes PulseTrade™ for 9-second payout cycles, ensuring vendors and contractors are paid with unparalleled speed and transparency.
              </p>
            </div>
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <i className="fas fa-file-signature text-4xl text-purple-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-3">Immutable Scroll Contracts</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Every transaction is anchored to a sovereign legal scroll via ClaimRoot™, providing an unbreakable chain of ownership and payment proof.
              </p>
            </div>
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <i className="fas fa-globe-africa text-4xl text-purple-500 mb-4"></i>
              <h3 className="text-xl font-bold mb-3">Regional Compliance</h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                DivLock™ technology ensures all transactions automatically adhere to regional and international financial regulations, mitigating risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-500">
            Ask the LoopPay™ AI Assistant
          </h2>
          <p className="text-center mb-8 text-gray-500">
            Query the system about LoopPay™ functionalities, integration protocols, or security best practices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="e.g., How does PulseTrade™ work?"
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              className={`flex-1 p-3 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <button
              onClick={handleAiQuery}
              disabled={isLoading}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <>✨ Get Info</>
              )}
            </button>
          </div>
          {aiResponse && (
            <div className={`p-6 rounded-lg border ${
              isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
            }`}>
              <p className="text-lg">{aiResponse}</p>
            </div>
          )}
        </div>
      </section>

      {/* Currency Converter */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-500">
            💱 Global Currency Converter
          </h2>
          <p className="text-center mb-8 text-gray-500">
            Convert amounts for international payouts using real-time exchange rates.
          </p>
          <div className={`p-6 rounded-xl ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          } border`}>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium mb-2">Amount</label>
                <input
                  type="number"
                  value={convertAmount}
                  onChange={(e) => setConvertAmount(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">From</label>
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">To</label>
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className={`w-full p-3 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <p className="text-2xl font-bold text-center">
                {currencies.find(c => c.code === fromCurrency)?.symbol}{convertAmount} = {' '}
                {currencies.find(c => c.code === toCurrency)?.symbol}{convertCurrency()}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className={`py-16 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-yellow-500">
            💳 LoopPay™ License Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {paymentTiers.map(tier => (
              <div key={tier.id} className={`p-8 rounded-xl ${
                isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'
              } border`}>
                <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
                <div className="text-4xl font-bold text-yellow-500 mb-2">
                  {tier.price}
                  {tier.period && <span className="text-lg font-medium text-gray-500">{tier.period}</span>}
                </div>
                <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {tier.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <i className="fas fa-check text-green-500 mt-1"></i>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePayment(tier.id)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Select {tier.name}
                </button>
              </div>
            ))}
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
                © 2025 LoopPay™ Sovereign Systems. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className={`text-sm hover:text-purple-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Privacy Policy
              </a>
              <a href="#" className={`text-sm hover:text-purple-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Terms of Service
              </a>
              <a href="#" className={`text-sm hover:text-purple-500 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}