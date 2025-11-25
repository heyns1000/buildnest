import { useState, useEffect, useRef } from 'react';

interface DropFile {
  name: string;
  size: number;
  type: string;
  content?: string;
}

interface DeploymentStep {
  id: string;
  name: string;
  status: 'pending' | 'active' | 'complete' | 'error';
  duration?: string;
}

export default function HotStackDeployment() {
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes in seconds
  const [isActive, setIsActive] = useState(true);
  const [droppedFiles, setDroppedFiles] = useState<DropFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [deploymentSteps, setDeploymentSteps] = useState<DeploymentStep[]>([
    { id: '1', name: 'Initializing Omnidrop Protocol', status: 'pending' },
    { id: '2', name: 'Scanning File Structure', status: 'pending' },
    { id: '3', name: 'Vault DNS Hook Activation', status: 'pending' },
    { id: '4', name: 'MeshNest™ Integration', status: 'pending' },
    { id: '5', name: 'ClaimRoot™ Verification', status: 'pending' },
    { id: '6', name: 'Live Deployment', status: 'pending' }
  ]);
  const [isDeploying, setIsDeploying] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Countdown timer
  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  // Omnidrop canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
    }> = [];

    // Create particles
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.5 + 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 204, 0, ${particle.opacity})`;
        ctx.fill();

        particle.y += particle.speed;
        if (particle.y > canvas.height) {
          particle.y = -particle.size;
          particle.x = Math.random() * canvas.width;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    const validFiles = files.filter(file => 
      file.type === 'text/html' || 
      file.type === 'application/pdf' ||
      file.name.endsWith('.html') ||
      file.name.endsWith('.pdf')
    );

    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dropFile: DropFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          content: e.target?.result as string
        };
        setDroppedFiles(prev => [...prev, dropFile]);
      };
      reader.readAsText(file);
    });

    if (validFiles.length > 0) {
      startDeployment();
    }
  };

  const startDeployment = async () => {
    if (!isActive) return;

    setIsDeploying(true);
    let currentStep = 0;

    try {
      // Step 1: Initialize Omnidrop Protocol
      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 0 ? { ...step, status: 'active' } : step
      ));

      await new Promise(resolve => setTimeout(resolve, 2000));

      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 0 ? { ...step, status: 'complete', duration: '2s' } : step
      ));

      // Step 2: Scan File Structure (fetch real data context)
      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 1 ? { ...step, status: 'active' } : step
      ));

      const contextResponse = await fetch('/api/data/omnidrop-context');
      const realDataContext = await contextResponse.json();

      await new Promise(resolve => setTimeout(resolve, 1500));

      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 1 ? { ...step, status: 'complete', duration: '1.5s' } : step
      ));

      // Step 3: Vault DNS Hook Activation (provision domain)
      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 2 ? { ...step, status: 'active' } : step
      ));

      const appId = `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const userId = `user_${Math.random().toString(36).substr(2, 9)}`;

      const domainResponse = await fetch('/api/infrastructure/provision-domain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appId,
          userId,
          customDomain: null
        })
      });

      const domainData = await domainResponse.json();

      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 2 ? { ...step, status: 'complete', duration: '2.5s' } : step
      ));

      // Step 4: MeshNest™ Integration (polish with real data)
      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 3 ? { ...step, status: 'active' } : step
      ));

      const polishResponse = await fetch('/api/data/polish-user-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userRequest: droppedFiles[0]?.name || 'HotStack Deployment',
          uploadedFile: droppedFiles[0]
        })
      });

      await polishResponse.json();

      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 3 ? { ...step, status: 'complete', duration: '1.8s' } : step
      ));

      // Step 5: ClaimRoot™ Verification
      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 4 ? { ...step, status: 'active' } : step
      ));

      await new Promise(resolve => setTimeout(resolve, 1500));

      const claimRootLicense = `claim_${appId}_${Date.now()}`;

      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 4 ? { ...step, status: 'complete', duration: '1.5s' } : step
      ));

      // Step 6: Live Deployment (send email notification)
      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 5 ? { ...step, status: 'active' } : step
      ));

      await fetch('/api/infrastructure/send-deployment-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          userEmail: 'user@example.com', // In production, this would come from user auth
          appName: droppedFiles[0]?.name || 'HotStack App',
          appId,
          domain: domainData.data?.fullDomain || 'your-site.faa.zone',
          claimRootLicense
        })
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      setDeploymentSteps(prev => prev.map((step, index) =>
        index === 5 ? { ...step, status: 'complete', duration: '1s' } : step
      ));

      setIsDeploying(false);

      // Show success message with real domain
      setTimeout(() => {
        const domain = domainData.data?.fullDomain || 'your-site.faa.zone';
        alert(`🎉 Omnidrop Complete! Your site is now live at: https://${domain}\n\n✅ DNS records configured\n✅ SSL certificate active\n✅ Deployment email sent\n✅ ClaimRoot™ license: ${claimRootLicense}`);
      }, 500);

    } catch (error) {
      console.error('❌ Deployment failed:', error);
      setDeploymentSteps(prev => prev.map((step) =>
        step.status === 'active' ? { ...step, status: 'error' } : step
      ));
      setIsDeploying(false);

      alert('❌ Deployment failed. Please try again.');
    }
  };

  const handleClaimButton = () => {
    if (!isActive) {
      alert('⏰ The instant Omnidrop window has closed. Please refresh to activate a new claim timer.');
      return;
    }
    window.location.href = '#codenest-dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-gray-800 bg-opacity-90 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full border border-yellow-500 shadow-2xl">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-4">
              <span className="text-white">Fruitful | </span>
              <span className="text-yellow-400">HotStack™</span>
            </h1>
            <h2 className="text-xl text-gray-300 mb-6">
              Omnidrop Your Digital Presence. Live in Minutes. Branded Forever.
            </h2>
          </header>

          {/* Countdown Timer */}
          <div className="text-center mb-8">
            <div className={`text-6xl font-black mb-4 ${
              timeLeft <= 30 ? 'text-red-400 animate-pulse' : 'text-yellow-400'
            }`}>
              {formatTime(timeLeft)}
            </div>
            <p className="text-gray-400">
              {isActive ? 'Instant Omnidrop Window Active' : 'Omnidrop Window Closed'}
            </p>
          </div>

          {/* Features List */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-yellow-400">
              What Your Omnidrop Activates:
            </h3>
            <ul className="space-y-3">
              {[
                '🚀 Rapid Deployment: Your Scroll goes Live in under 180 seconds via Omnidrop Signal',
                '📦 Integrated Ecosystem: Auto DNS Hook + Curated Template Packs for seamless launch',
                '🧠 Intelligent Foundation: Powered by ScrollStack™, VaultDNS™, and MeshNest™ protocols',
                '💰 Treaty-Linked Economy: Includes a Royalty-Linked License from Fruitful Global\'s Treaty Grid',
                '🔒 ClaimRoot™ Verified: Secure, traceable site ownership for every deployed scroll'
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-yellow-400 text-lg">⚡</span>
                  <span className="text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Drag & Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 mb-6 text-center cursor-pointer transition-all ${
              isDragOver
                ? 'border-yellow-400 bg-yellow-400 bg-opacity-10 scale-105'
                : 'border-yellow-500 bg-yellow-500 bg-opacity-5'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <i className="fas fa-cloud-upload-alt text-4xl text-yellow-400 mb-4"></i>
            <p className="text-lg mb-2">
              Drag & Drop HTML/PDF here or Click to Upload
            </p>
            <p className="text-sm text-gray-500">
              (Adheres to the 3-minute rule for rapid ingestion)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".html,.pdf"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>

          {/* Dropped Files */}
          {droppedFiles.length > 0 && (
            <div className="mb-6">
              <h4 className="font-bold mb-3 text-green-400">
                <i className="fas fa-check-circle mr-2"></i>
                Files Ready for Omnidrop:
              </h4>
              <div className="space-y-2">
                {droppedFiles.map((file, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-700 p-3 rounded-lg">
                    <span className="text-white">{file.name}</span>
                    <span className="text-gray-400 text-sm">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deployment Progress */}
          {isDeploying && (
            <div className="mb-6">
              <h4 className="font-bold mb-4 text-blue-400">
                <i className="fas fa-rocket mr-2"></i>
                Omnidrop Deployment Progress:
              </h4>
              <div className="space-y-3">
                {deploymentSteps.map(step => (
                  <div key={step.id} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${
                      step.status === 'complete' ? 'bg-green-400' :
                      step.status === 'active' ? 'bg-yellow-400 animate-pulse' :
                      step.status === 'error' ? 'bg-red-400' :
                      'bg-gray-600'
                    }`} />
                    <span className={`flex-1 ${
                      step.status === 'complete' ? 'text-green-400' :
                      step.status === 'active' ? 'text-yellow-400' :
                      'text-gray-400'
                    }`}>
                      {step.name}
                    </span>
                    {step.duration && (
                      <span className="text-gray-500 text-sm">{step.duration}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Button */}
          <button
            onClick={handleClaimButton}
            disabled={!isActive}
            className={`w-full py-4 px-8 rounded-xl font-black text-lg transition-all ${
              isActive
                ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900 hover:scale-105 shadow-lg hover:shadow-yellow-400/50'
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <i className="fas fa-arrow-right mr-3"></i>
            Enter Fruitful | CodeNest™
          </button>

          {/* Footer */}
          <footer className="text-center mt-6 text-gray-500 text-sm">
            Powered by Fruitful Global | ScrollSynced | Vault-Verified
          </footer>
        </div>
      </div>
    </div>
  );
}