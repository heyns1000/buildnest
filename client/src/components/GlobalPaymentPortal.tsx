import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

interface PaymentMethod {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'pending' | 'inactive';
  fees: string;
  processing: string;
}

interface PricingTier {
  id: string;
  name: string;
  price: number;
  currency: string;
  frequency: 'monthly' | 'annual';
  features: string[];
  popular?: boolean;
}

export default function GlobalPaymentPortal() {
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState<{[key: string]: number}>({});
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [pricingTiers, setPricingTiers] = useState<PricingTier[]>([]);
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Initialize data
  useEffect(() => {
    // Mock exchange rates
    setExchangeRates({
      USD: 1.00,
      EUR: 0.85,
      GBP: 0.73,
      JPY: 110.25,
      CAD: 1.25,
      AUD: 1.35,
      CHF: 0.92,
      CNY: 6.45
    });

    // Payment methods
    setPaymentMethods([
      {
        id: 'paypal',
        name: 'PayPal',
        type: 'Digital Wallet',
        status: 'active',
        fees: '2.9% + $0.30',
        processing: 'Instant'
      },
      {
        id: 'stripe',
        name: 'Stripe',
        type: 'Credit Card',
        status: 'active',
        fees: '2.9% + $0.30',
        processing: '1-2 business days'
      },
      {
        id: 'crypto',
        name: 'Cryptocurrency',
        type: 'Digital Currency',
        status: 'active',
        fees: '1.5%',
        processing: '10-30 minutes'
      },
      {
        id: 'wire',
        name: 'Bank Wire',
        type: 'Bank Transfer',
        status: 'active',
        fees: '$25 fixed',
        processing: '3-5 business days'
      },
      {
        id: 'ach',
        name: 'ACH Transfer',
        type: 'Bank Transfer',
        status: 'active',
        fees: '$5 fixed',
        processing: '2-3 business days'
      }
    ]);

    // Pricing tiers
    setPricingTiers([
      {
        id: 'starter',
        name: 'Starter Package',
        price: 99,
        currency: 'USD',
        frequency: 'monthly',
        features: [
          'Basic VaultMesh Access',
          'Standard Security Protocols',
          'Community Support',
          '5GB Storage',
          'Email Support'
        ]
      },
      {
        id: 'professional',
        name: 'Professional Package',
        price: 299,
        currency: 'USD',
        frequency: 'monthly',
        popular: true,
        features: [
          'Full VaultMesh Integration',
          'Advanced Security Suite',
          'Priority Support',
          '50GB Storage',
          'Phone & Email Support',
          'API Access',
          'Custom Integrations'
        ]
      },
      {
        id: 'enterprise',
        name: 'Enterprise Package',
        price: 999,
        currency: 'USD',
        frequency: 'monthly',
        features: [
          'Complete AgroChain Core Protocol',
          'Military-Grade Security',
          'Dedicated Account Manager',
          'Unlimited Storage',
          '24/7 Priority Support',
          'Full API Access',
          'Custom Development',
          'White-label Solutions'
        ]
      }
    ]);
  }, []);

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    
    setIsProcessing(true);
    setAiResponse('');
    
    // Simulate AI processing
    setTimeout(() => {
      const responses = {
        'payment methods': 'Our payment portal supports PayPal, Stripe, cryptocurrency, bank wires, and ACH transfers. Each method has different processing times and fees optimized for different transaction types.',
        'pricing': 'We offer three tiers: Starter ($99/month) for basic access, Professional ($299/month) for full integration, and Enterprise ($999/month) for complete protocol access.',
        'security': 'All payments are processed through encrypted channels with multi-layer authentication. We support PCI DSS compliance and employ quantum-grade security protocols.',
        'currencies': 'We support major global currencies including USD, EUR, GBP, JPY, CAD, AUD, CHF, and CNY with real-time exchange rate conversion.',
        'refunds': 'Refund policies vary by subscription tier. Contact our support team for specific refund requests and processing timelines.',
        'default': 'I can help you with payment methods, pricing information, security questions, currency support, and general billing inquiries. What specific topic would you like to know more about?'
      };
      
      const query = aiQuery.toLowerCase();
      let response = responses.default;
      
      for (const [key, value] of Object.entries(responses)) {
        if (query.includes(key)) {
          response = value;
          break;
        }
      }
      
      setAiResponse(response);
      setIsProcessing(false);
    }, 2000);
  };

  const convertPrice = (price: number, fromCurrency: string = 'USD') => {
    if (fromCurrency === selectedCurrency) return price;
    const rate = exchangeRates[selectedCurrency] || 1;
    return Math.round(price * rate);
  };

  return (
    <div className="space-y-8" data-testid="global-payment-portal">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-blue-400 mb-4">💰 Fruitful Global Payment & SSO Portal</h2>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
          Your central hub for secure access to company resources and streamlined payment information. This portal ensures a seamless experience for all interns, developers, and staff.
        </p>
      </div>

      <Tabs defaultValue="payment-overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-8">
          <TabsTrigger value="payment-overview" data-testid="tab-payment-overview">Payment Overview</TabsTrigger>
          <TabsTrigger value="pricing-plans" data-testid="tab-pricing-plans">Pricing Plans</TabsTrigger>
          <TabsTrigger value="currency-converter" data-testid="tab-currency-converter">Currency Converter</TabsTrigger>
          <TabsTrigger value="ai-assistant" data-testid="tab-ai-assistant">AI Assistant</TabsTrigger>
          <TabsTrigger value="sso-info" data-testid="tab-sso-info">SSO Information</TabsTrigger>
        </TabsList>

        <TabsContent value="payment-overview" className="space-y-6">
          <Card className="bg-gray-800/90 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400">💳 Payment Methods & Processing</CardTitle>
              <p className="text-gray-300">Comprehensive overview of available payment options and their specifications.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className="bg-gray-700/50 border-gray-600">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{method.name}</h3>
                          <p className="text-gray-400 text-sm">{method.type}</p>
                        </div>
                        <Badge 
                          variant={method.status === 'active' ? 'default' : method.status === 'pending' ? 'secondary' : 'destructive'}
                          className={method.status === 'active' ? 'bg-green-600' : ''}
                        >
                          {method.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Processing Fees: </span>
                          <span className="text-yellow-400 font-mono">{method.fees}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Processing Time: </span>
                          <span className="text-white">{method.processing}</span>
                        </div>
                      </div>
                      
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                        Configure Payment
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-gray-800/90 border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg text-green-400">💰 Expense Reimbursement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">Submit and track your business expenses for reimbursement through our integrated finance portal.</p>
                <Button variant="outline" className="w-full border-green-500 text-green-400">
                  Submit Expense
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/90 border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg text-purple-400">💳 Corporate Card Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">Information on managing your corporate credit card, including policies and spending limits.</p>
                <Button variant="outline" className="w-full border-purple-500 text-purple-400">
                  Manage Cards
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/90 border-yellow-500/20">
              <CardHeader>
                <CardTitle className="text-lg text-yellow-400">📊 Payroll & Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm mb-4">Access your pay stubs, tax documents, and benefits information securely.</p>
                <Button variant="outline" className="w-full border-yellow-500 text-yellow-400">
                  View Payroll
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="pricing-plans" className="space-y-6">
          <Card className="bg-gray-800/90 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400">📋 VaultMesh™ & AgroChain™ Pricing</CardTitle>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-gray-300">Currency:</span>
                <Select value={selectedCurrency} onValueChange={setSelectedCurrency}>
                  <SelectTrigger className="w-32 bg-gray-700 border-gray-600" data-testid="currency-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(exchangeRates).map((currency) => (
                      <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                {pricingTiers.map((tier) => (
                  <Card 
                    key={tier.id} 
                    className={`relative ${
                      tier.popular 
                        ? 'bg-purple-900/20 border-purple-500 ring-2 ring-purple-500/50' 
                        : 'bg-gray-700/50 border-gray-600'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-purple-600">Most Popular</Badge>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <div className="text-center mb-6">
                        <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                        <div className="text-3xl font-bold text-blue-400">
                          {selectedCurrency} {convertPrice(tier.price).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-400">per {tier.frequency}</div>
                      </div>
                      
                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm">
                            <span className="text-green-400 mr-2">✓</span>
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button 
                        className={`w-full ${
                          tier.popular 
                            ? 'bg-purple-600 hover:bg-purple-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        data-testid={`select-plan-${tier.id}`}
                      >
                        Choose {tier.name}
                      </Button>
                      
                      <div className="mt-4 text-center">
                        <Button variant="link" className="text-blue-400 text-sm">
                          View detailed features →
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Card className="bg-yellow-900/20 border-yellow-500/50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-yellow-400 mb-2">🎯 MineNest™ Core Protocol</h3>
                    <p className="text-gray-300 mb-4">
                      Specialized FAA.ZONE framework for the Mining & Resources sector with advanced automation and PulseGrid connectivity.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-yellow-400">Professional Services Mesh</div>
                        <div className="text-gray-400">Direct FAA integration</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-yellow-400">NestTrack Subnode</div>
                        <div className="text-gray-400">Real-time asset tracking</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-yellow-400">VaultLink™ Compliance</div>
                        <div className="text-gray-400">Mining industry regulations</div>
                      </div>
                    </div>
                    <Button className="mt-4 bg-orange-600 hover:bg-orange-700">
                      Explore MineNest™ Pricing
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="currency-converter" className="space-y-6">
          <Card className="bg-gray-800/90 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400">💱 Real-Time Currency Converter</CardTitle>
              <p className="text-gray-300">Convert between supported currencies with live exchange rates.</p>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">From Currency</label>
                    <Select defaultValue="USD">
                      <SelectTrigger className="bg-gray-700 border-gray-600" data-testid="from-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(exchangeRates).map((currency) => (
                          <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">To Currency</label>
                    <Select defaultValue="EUR">
                      <SelectTrigger className="bg-gray-700 border-gray-600" data-testid="to-currency">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(exchangeRates).map((currency) => (
                          <SelectItem key={currency} value={currency}>{currency}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Amount</label>
                  <Input 
                    type="number" 
                    placeholder="Enter amount" 
                    className="bg-gray-700 border-gray-600 text-lg"
                    data-testid="amount-input"
                  />
                </div>
                
                <Button className="w-full bg-green-600 hover:bg-green-700 mb-6" data-testid="convert-button">
                  Convert Currency
                </Button>
                
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-400">Result will appear here</div>
                    <div className="text-sm text-gray-400 mt-2">Enter amount and click convert</div>
                  </CardContent>
                </Card>
                
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  {Object.entries(exchangeRates).map(([currency, rate]) => (
                    <div key={currency} className="text-center">
                      <div className="font-bold text-white">{currency}</div>
                      <div className="text-gray-400">{rate.toFixed(4)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-assistant" className="space-y-6">
          <Card className="bg-gray-800/90 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-400">🤖 Payment AI Assistant</CardTitle>
              <p className="text-gray-300">Get instant answers about payments, pricing, and account management.</p>
            </CardHeader>
            <CardContent>
              <div className="max-w-3xl mx-auto space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Ask about payments, pricing, or account features:</label>
                  <Textarea
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="e.g., 'What payment methods do you support?' or 'How much does the Professional plan cost?'"
                    className="bg-gray-700 border-gray-600 min-h-[100px]"
                    data-testid="ai-query-input"
                  />
                </div>
                
                <Button 
                  onClick={handleAiQuery}
                  disabled={isProcessing}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  data-testid="ask-ai-button"
                >
                  {isProcessing ? '🤖 Processing...' : '✨ Ask AI Assistant'}
                </Button>
                
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardHeader>
                    <CardTitle className="text-lg text-purple-400">AI Response</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="min-h-[150px] text-gray-300">
                      {isProcessing ? (
                        <div className="flex items-center justify-center h-full">
                          <div className="animate-spin text-purple-400 text-2xl">⚡</div>
                          <span className="ml-2">AI is thinking...</span>
                        </div>
                      ) : aiResponse ? (
                        <p>{aiResponse}</p>
                      ) : (
                        <p className="text-gray-500">Your AI assistant response will appear here...</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <Card className="bg-gray-700/30 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-yellow-400 mb-2">💡 Quick Questions</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• What payment methods are available?</li>
                        <li>• How much does each plan cost?</li>
                        <li>• What currencies do you support?</li>
                        <li>• How do refunds work?</li>
                      </ul>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-gray-700/30 border-gray-600">
                    <CardContent className="p-4">
                      <h4 className="font-bold text-blue-400 mb-2">🔧 Account Help</h4>
                      <ul className="space-y-1 text-gray-300">
                        <li>• How to upgrade my plan?</li>
                        <li>• Security and encryption details</li>
                        <li>• Integration support options</li>
                        <li>• Billing cycle information</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sso-info" className="space-y-6">
          <Card className="bg-gray-800/90 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-2xl text-green-400">🔐 Single Sign-On (SSO) Information</CardTitle>
              <p className="text-gray-300">Learn about enhanced security and simplified access across all Fruitful applications.</p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">🔒</div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">Enhanced Security</h3>
                    <p className="text-gray-300 text-sm">
                      SSO reduces password fatigue and strengthens security by minimizing credentials you need to manage.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">👆</div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">Simplified Access</h3>
                    <p className="text-gray-300 text-sm">
                      Access all Fruitful applications with a single set of credentials, improving workflow efficiency.
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-700/50 border-gray-600">
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-4">⚙️</div>
                    <h3 className="text-lg font-bold text-green-400 mb-2">Streamlined Onboarding</h3>
                    <p className="text-gray-300 text-sm">
                      New team members get up and running faster with simplified account setup across all systems.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-8">
                <Card className="bg-blue-900/20 border-blue-500/50">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-blue-400 mb-4">🚀 Getting Started with SSO</h3>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
                        <div>
                          <div className="font-semibold text-white">Account Setup</div>
                          <div className="text-gray-300 text-sm">Contact IT to set up your SSO credentials and verify your identity.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">2</div>
                        <div>
                          <div className="font-semibold text-white">Application Access</div>
                          <div className="text-gray-300 text-sm">Use your SSO credentials to access all integrated Fruitful applications.</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
                        <div>
                          <div className="font-semibold text-white">Security Training</div>
                          <div className="text-gray-300 text-sm">Complete security awareness training to understand best practices.</div>
                        </div>
                      </div>
                    </div>
                    <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                      Request SSO Access
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}