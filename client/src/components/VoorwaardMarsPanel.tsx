import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';

interface MarsStatus {
  planetaryMotion: boolean;
  claimRootCertified: boolean;
  seedBackedLicensing: boolean;
  faaSignatureEmbedded: boolean;
  seedlingIntakeActive: boolean;
  coreBuilderWarmed: boolean;
  fundingGateAccepted: boolean;
  scrollPulseInterval: string;
}

interface IntakeForm {
  appConcept: string;
  fundingDeclaration: string;
  scrollCompliance: boolean;
}

export default function VoorwaardMarsPanel() {
  const [marsStatus, setMarsStatus] = useState<MarsStatus>({
    planetaryMotion: true,
    claimRootCertified: true,
    seedBackedLicensing: true,
    faaSignatureEmbedded: true,
    seedlingIntakeActive: true,
    coreBuilderWarmed: true,
    fundingGateAccepted: true,
    scrollPulseInterval: '9s'
  });

  const [intakeForm, setIntakeForm] = useState<IntakeForm>({
    appConcept: '',
    fundingDeclaration: '$50,000',
    scrollCompliance: true
  });

  const [intakeInProgress, setIntakeInProgress] = useState(false);
  const [intakeResults, setIntakeResults] = useState<any[]>([]);
  const [scrollPulseData, setScrollPulseData] = useState<any>(null);

  // Real-time scroll pulse monitoring (9-second intervals)
  useEffect(() => {
    const fetchScrollPulse = async () => {
      try {
        const response = await fetch('/api/scroll-pulse');
        if (response.ok) {
          const data = await response.json();
          setScrollPulseData(data.pulse);
        }
      } catch (error) {
        console.error('Scroll pulse fetch failed:', error);
      }
    };

    fetchScrollPulse();
    const interval = setInterval(fetchScrollPulse, 9000); // 9-second VaultMesh pulse

    return () => clearInterval(interval);
  }, []);

  const submitSeedlingIntake = async () => {
    if (!intakeForm.appConcept.trim()) {
      alert('App concept required for planetary motion authorization');
      return;
    }

    setIntakeInProgress(true);

    try {
      const response = await fetch('/api/seedling/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intakeForm)
      });

      const result = await response.json();

      if (response.ok) {
        setIntakeResults(prev => [result, ...prev]);
        setIntakeForm(prev => ({ ...prev, appConcept: '' }));
        alert(`🌍 VOORWAARD MARS: Planetary motion authorized! Intake ID: ${result.intakeId}`);
      } else {
        alert(`❌ Intake failed: ${result.error}`);
      }
    } catch (error) {
      alert(`❌ Network error: ${error}`);
    } finally {
      setIntakeInProgress(false);
    }
  };

  const getStatusIcon = (status: boolean) => status ? '✅' : '❌';
  const getStatusColor = (status: boolean) => status ? 'text-green-400' : 'text-red-400';

  return (
    <div className="space-y-6" data-testid="voorwaard-mars-panel">
      {/* Header */}
      <div className="text-center">
        <h1 className="font-orbitron text-4xl font-bold text-faa-yellow mb-2">
          🌍 VOORWAARD MARS
        </h1>
        <p className="text-gray-300">Planetary Motion Protocol • Conditional Trigger System</p>
        <div className="mt-2">
          <Badge className="bg-green-400/20 text-green-400 border-green-400/30">
            🧬 SCROLL ANCHOR DECODED
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mars Status Panel */}
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">🔒 Mars Condition Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { key: 'planetaryMotion', label: 'Planetary Motion', status: marsStatus.planetaryMotion },
              { key: 'claimRootCertified', label: 'ClaimRoot Certified', status: marsStatus.claimRootCertified },
              { key: 'seedBackedLicensing', label: 'Seed-backed Licensing', status: marsStatus.seedBackedLicensing },
              { key: 'faaSignatureEmbedded', label: 'FAA Sovereign Signature', status: marsStatus.faaSignatureEmbedded },
              { key: 'seedlingIntakeActive', label: 'Seedling Intake Active', status: marsStatus.seedlingIntakeActive },
              { key: 'coreBuilderWarmed', label: 'CoreBuilder Pre-warmed', status: marsStatus.coreBuilderWarmed },
              { key: 'fundingGateAccepted', label: 'Funding Gate Accepted', status: marsStatus.fundingGateAccepted }
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-faa-bg border border-faa-border rounded-lg">
                <span className="text-gray-300">{item.label}</span>
                <div className="flex items-center space-x-2">
                  <span className={getStatusColor(item.status)}>{getStatusIcon(item.status)}</span>
                  <span className={`text-sm font-semibold ${getStatusColor(item.status)}`}>
                    {item.status ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
              </div>
            ))}

            {/* Scroll Pulse Monitor */}
            <div className="mt-4 p-3 bg-faa-bg border border-green-500/50 rounded-lg">
              <div className="text-center">
                <div className="text-green-400 font-semibold mb-2">🧬 Scroll Pulse Monitor</div>
                <div className="text-2xl font-bold text-faa-yellow">{marsStatus.scrollPulseInterval}</div>
                <div className="text-xs text-gray-400">Auto-sync interval</div>
                {scrollPulseData && (
                  <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                    <div>Treaties: {scrollPulseData.treaties}</div>
                    <div>Apps: {scrollPulseData.applications}</div>
                    <div>Licenses: {scrollPulseData.licensing}</div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seedling Intake Form */}
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">🌱 Seedling Intake Portal</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">App Concept</label>
              <Textarea
                value={intakeForm.appConcept}
                onChange={(e) => setIntakeForm(prev => ({ ...prev, appConcept: e.target.value }))}
                placeholder="Describe your scroll-bound application concept..."
                className="bg-faa-bg border-faa-border text-white"
                data-testid="textarea-app-concept"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium mb-2 block">Funding Declaration</label>
              <Input
                value={intakeForm.fundingDeclaration}
                onChange={(e) => setIntakeForm(prev => ({ ...prev, fundingDeclaration: e.target.value }))}
                placeholder="$50,000 minimum"
                className="bg-faa-bg border-faa-border text-white"
                data-testid="input-funding-declaration"
              />
              <p className="text-xs text-gray-500 mt-1">
                Minimum $50K fuel load required for planetary motion authorization
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={intakeForm.scrollCompliance}
                onChange={(e) => setIntakeForm(prev => ({ ...prev, scrollCompliance: e.target.checked }))}
                className="rounded"
                data-testid="checkbox-scroll-compliance"
              />
              <label className="text-gray-300 text-sm">
                Scroll compliance confirmed (ClaimRoot licensing required)
              </label>
            </div>

            <Button
              onClick={submitSeedlingIntake}
              disabled={intakeInProgress || !intakeForm.appConcept.trim()}
              className="w-full success-button"
              data-testid="button-submit-intake"
            >
              {intakeInProgress ? '🔄 Processing Intake...' : '🚀 Authorize Planetary Motion'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Intake Results */}
      {intakeResults.length > 0 && (
        <Card className="bg-faa-card border-faa-border">
          <CardHeader>
            <CardTitle className="text-faa-yellow">📋 Intake Authorization Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <AnimatePresence>
                {intakeResults.map((result, index) => (
                  <motion.div
                    key={result.intakeId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-faa-bg border border-green-500/50 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-green-400">✅ PLANETARY MOTION AUTHORIZED</h3>
                        <p className="text-sm text-gray-400">Intake ID: {result.intakeId}</p>
                      </div>
                      <Badge className="bg-green-400/20 text-green-400">
                        {result.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                      <div className="text-center p-2 bg-faa-card rounded">
                        <div className="text-green-400">✅</div>
                        <div className="text-gray-400">ClaimRoot</div>
                      </div>
                      <div className="text-center p-2 bg-faa-card rounded">
                        <div className="text-green-400">🧬</div>
                        <div className="text-gray-400">Scroll Licensed</div>
                      </div>
                      <div className="text-center p-2 bg-faa-card rounded">
                        <div className="text-green-400">🔧</div>
                        <div className="text-gray-400">CoreBuilder</div>
                      </div>
                      <div className="text-center p-2 bg-faa-card rounded">
                        <div className="text-green-400">{result.scrollPulseActive}</div>
                        <div className="text-gray-400">Pulse Active</div>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-gray-500">
                      Authorized: {new Date(result.timestamp).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Interpretation */}
      <Card className="bg-faa-card border-purple-500/50">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-purple-400 font-semibold mb-3">🧭 VOORWAARD MARS INTERPRETATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-faa-yellow font-semibold">VOORWAARD</div>
                <div className="text-gray-400">Conditional trigger → metadata or funding gate</div>
              </div>
              <div>
                <div className="text-faa-yellow font-semibold">MARS</div>
                <div className="text-gray-400">Motion, kinetic expansion → planetary-scale deployment</div>
              </div>
              <div>
                <div className="text-faa-yellow font-semibold">COMBINED</div>
                <div className="text-gray-400">"Begin motion once conditions are met and sovereign channels are cleared"</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}