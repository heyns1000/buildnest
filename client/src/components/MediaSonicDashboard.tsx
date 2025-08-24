import { useState, useEffect } from 'react';

interface MediaProject {
  id: string;
  name: string;
  type: 'Audio' | 'Video' | 'Motion Graphics' | 'Interactive';
  status: 'Active' | 'Rendering' | 'Complete' | 'Draft';
  progress: number;
  duration: string;
  fileSize: string;
  lastModified: string;
}

interface AudioTrack {
  id: string;
  name: string;
  artist: string;
  duration: string;
  waveform: number[];
  isPlaying: boolean;
}

interface SonicMetric {
  label: string;
  value: string;
  change: string;
  icon: string;
  color: string;
}

const initialProjects: MediaProject[] = [
  {
    id: '1',
    name: 'Brand Motion Logo',
    type: 'Motion Graphics',
    status: 'Complete',
    progress: 100,
    duration: '0:15',
    fileSize: '24.8 MB',
    lastModified: '2 hours ago'
  },
  {
    id: '2',
    name: 'Podcast Intro Music',
    type: 'Audio',
    status: 'Rendering',
    progress: 78,
    duration: '0:30',
    fileSize: '8.2 MB',
    lastModified: '15 minutes ago'
  },
  {
    id: '3',
    name: 'Product Demo Video',
    type: 'Video',
    status: 'Active',
    progress: 45,
    duration: '2:30',
    fileSize: '156.4 MB',
    lastModified: '1 hour ago'
  },
  {
    id: '4',
    name: 'Interactive Sound Design',
    type: 'Interactive',
    status: 'Draft',
    progress: 12,
    duration: '1:00',
    fileSize: '45.1 MB',
    lastModified: '3 hours ago'
  }
];

const audioTracks: AudioTrack[] = [
  {
    id: '1',
    name: 'Ambient Workspace',
    artist: 'Fruitful Audio',
    duration: '3:45',
    waveform: [0.2, 0.8, 0.6, 0.9, 0.4, 0.7, 0.5, 0.8, 0.3, 0.9, 0.6, 0.4, 0.8, 0.5, 0.7],
    isPlaying: false
  },
  {
    id: '2',
    name: 'Focus Flow',
    artist: 'Neural Sounds',
    duration: '4:12',
    waveform: [0.4, 0.6, 0.8, 0.5, 0.9, 0.3, 0.7, 0.6, 0.8, 0.4, 0.5, 0.9, 0.6, 0.7, 0.3],
    isPlaying: false
  },
  {
    id: '3',
    name: 'Creative Boost',
    artist: 'Quantum Audio',
    duration: '2:58',
    waveform: [0.7, 0.4, 0.9, 0.6, 0.3, 0.8, 0.5, 0.7, 0.4, 0.9, 0.6, 0.8, 0.3, 0.5, 0.7],
    isPlaying: false
  }
];

const sonicMetrics: SonicMetric[] = [
  {
    label: 'Active Projects',
    value: '24',
    change: '+3 this week',
    icon: 'fas fa-play-circle',
    color: 'text-green-400'
  },
  {
    label: 'Render Queue',
    value: '7',
    change: '2 mins avg wait',
    icon: 'fas fa-clock',
    color: 'text-yellow-400'
  },
  {
    label: 'Storage Used',
    value: '2.8 TB',
    change: '78% capacity',
    icon: 'fas fa-hdd',
    color: 'text-blue-400'
  },
  {
    label: 'Export Rate',
    value: '95.2%',
    change: '+2.1% quality',
    icon: 'fas fa-check-circle',
    color: 'text-purple-400'
  }
];

export default function MediaSonicDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState<MediaProject[]>(initialProjects);
  const [tracks, setTracks] = useState<AudioTrack[]>(audioTracks);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectType, setNewProjectType] = useState<'Audio' | 'Video' | 'Motion Graphics' | 'Interactive'>('Audio');

  // Firebase simulation (would be real Firebase in actual implementation)
  const [firestoreData, setFirestoreData] = useState<any>({
    mediaAssets: [],
    renderJobs: [],
    audioLibrary: []
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setProjects(prev => prev.map(project => {
        if (project.status === 'Rendering' && project.progress < 100) {
          return { ...project, progress: Math.min(100, project.progress + Math.random() * 5) };
        }
        return project;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const createProject = () => {
    if (!newProjectName.trim()) return;
    
    const newProject: MediaProject = {
      id: Date.now().toString(),
      name: newProjectName,
      type: newProjectType,
      status: 'Draft',
      progress: 0,
      duration: '0:00',
      fileSize: '0 MB',
      lastModified: 'Just now'
    };
    
    setProjects([...projects, newProject]);
    setNewProjectName('');
  };

  const togglePlayAudio = (trackId: string) => {
    if (currentlyPlaying === trackId) {
      setCurrentlyPlaying(null);
      setTracks(prev => prev.map(track => ({ ...track, isPlaying: false })));
    } else {
      setCurrentlyPlaying(trackId);
      setTracks(prev => prev.map(track => ({
        ...track,
        isPlaying: track.id === trackId
      })));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Complete': return 'text-green-400';
      case 'Active': return 'text-blue-400';
      case 'Rendering': return 'text-yellow-400';
      case 'Draft': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Audio': return 'fas fa-music';
      case 'Video': return 'fas fa-video';
      case 'Motion Graphics': return 'fas fa-magic';
      case 'Interactive': return 'fas fa-gamepad';
      default: return 'fas fa-file';
    }
  };

  const renderWaveform = (waveform: number[], isActive: boolean = false) => {
    return (
      <div className="flex items-end space-x-1 h-12">
        {waveform.map((height, index) => (
          <div
            key={index}
            className={`w-2 transition-all duration-300 ${
              isActive ? 'bg-red-500' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'
            }`}
            style={{ height: `${height * 100}%` }}
          />
        ))}
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
                <span className="text-red-500 ml-2">Media & Sonic</span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'overview', name: 'Overview', icon: 'fas fa-home' },
            { id: 'projects', name: 'Projects', icon: 'fas fa-project-diagram' },
            { id: 'audio', name: 'Audio Library', icon: 'fas fa-music' },
            { id: 'render', name: 'Render Queue', icon: 'fas fa-cogs' },
            { id: 'analytics', name: 'Analytics', icon: 'fas fa-chart-bar' },
            { id: 'settings', name: 'Settings', icon: 'fas fa-cog' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : isDarkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <i className={`${tab.icon} mr-2`}></i>
              {tab.name}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sonicMetrics.map((metric, index) => (
                <div key={index} className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border`}>
                  <div className="flex items-center justify-between mb-4">
                    <i className={`${metric.icon} text-2xl ${metric.color}`}></i>
                    <span className="text-2xl font-bold">{metric.value}</span>
                  </div>
                  <h3 className="font-medium mb-1">{metric.label}</h3>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {metric.change}
                  </p>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <h3 className="text-xl font-bold mb-6">
                <i className="fas fa-clock mr-2 text-yellow-500"></i>
                Recent Activity
              </h3>
              <div className="space-y-4">
                {projects.slice(0, 3).map(project => (
                  <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <div className="flex items-center gap-4">
                      <i className={`${getTypeIcon(project.type)} text-xl text-blue-500`}></i>
                      <div>
                        <h4 className="font-medium">{project.name}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {project.type} • {project.lastModified}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm ${getStatusColor(project.status)}`}>
                      ● {project.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            {/* Create New Project */}
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <h3 className="text-xl font-bold mb-4">
                <i className="fas fa-plus mr-2 text-green-500"></i>
                Create New Project
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className={`px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <select
                  value={newProjectType}
                  onChange={(e) => setNewProjectType(e.target.value as any)}
                  className={`px-4 py-2 rounded-lg border ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="Audio">Audio</option>
                  <option value="Video">Video</option>
                  <option value="Motion Graphics">Motion Graphics</option>
                  <option value="Interactive">Interactive</option>
                </select>
                <button
                  onClick={createProject}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Create Project
                </button>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <div key={project.id} className={`p-6 rounded-xl ${
                  isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                } border hover:shadow-lg transition-shadow`}>
                  <div className="flex items-center justify-between mb-4">
                    <i className={`${getTypeIcon(project.type)} text-2xl text-blue-500`}></i>
                    <span className={`text-sm ${getStatusColor(project.status)}`}>
                      ● {project.status}
                    </span>
                  </div>
                  <h4 className="font-bold text-lg mb-2">{project.name}</h4>
                  <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {project.type} • {project.duration}
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{project.fileSize}</span>
                    <span>{project.lastModified}</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
                      Open
                    </button>
                    <button className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors">
                      Export
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Audio Library Tab */}
        {activeTab === 'audio' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <h3 className="text-xl font-bold mb-6">
                <i className="fas fa-music mr-2 text-purple-500"></i>
                Audio Library
              </h3>
              <div className="space-y-4">
                {tracks.map(track => (
                  <div key={track.id} className={`p-4 rounded-lg ${
                    isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                  } hover:bg-opacity-80 transition-colors`}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => togglePlayAudio(track.id)}
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            track.isPlaying ? 'bg-red-600' : 'bg-blue-600'
                          } text-white hover:opacity-80 transition-opacity`}
                        >
                          <i className={`fas ${track.isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
                        </button>
                        <div>
                          <h4 className="font-medium">{track.name}</h4>
                          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {track.artist} • {track.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-16">
                      {renderWaveform(track.waveform, track.isPlaying)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Render Queue Tab */}
        {activeTab === 'render' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <h3 className="text-xl font-bold mb-6">
                <i className="fas fa-cogs mr-2 text-orange-500"></i>
                Render Queue
              </h3>
              <div className="space-y-4">
                {projects.filter(p => p.status === 'Rendering').map(project => (
                  <div key={project.id} className={`p-4 rounded-lg border ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{project.name}</h4>
                      <span className="text-yellow-400">● Rendering</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{project.type}</span>
                      <span>{project.progress.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-xl ${
              isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            } border`}>
              <h3 className="text-xl font-bold mb-6">
                <i className="fas fa-chart-bar mr-2 text-green-500"></i>
                Performance Analytics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className="font-medium mb-4">Render Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Avg. Render Time:</span>
                      <span className="text-green-400">2.3 min</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="text-green-400">98.7%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Queue Wait Time:</span>
                      <span className="text-yellow-400">1.8 min</span>
                    </div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h4 className="font-medium mb-4">Resource Usage</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>CPU Usage:</span>
                      <span className="text-blue-400">67%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GPU Usage:</span>
                      <span className="text-purple-400">82%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Memory:</span>
                      <span className="text-red-400">34.2 GB</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}