import React, { useState, useEffect } from 'react';
import { Search, Instagram, Sparkles, Shield, MessageCircle, User, Settings, LogOut, Star, MapPin, DollarSign, Check, X, Zap, Target, TrendingUp, Users, Send, Menu, ChevronRight } from 'lucide-react';

// Main App Component
export default function CreatorLinkApp() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [connections, setConnections] = useState([]);
  const [messages, setMessages] = useState([]);

  // Initialize with sample data
  useEffect(() => {
    // Sample profiles for demo
    const sampleProfiles = [
      {
        id: 1,
        type: 'service-provider',
        name: 'Sarah Chen',
        service: 'Video Editing',
        skills: ['Reels', 'Stories', 'Color Grading'],
        experience: '5 years',
        rate: '$50-100/hour',
        location: 'Los Angeles, CA',
        rating: 4.9,
        bio: 'Professional video editor specializing in Instagram content. Helped 100+ creators grow their accounts.',
        portfolio: ['Fashion', 'Lifestyle', 'Travel']
      },
      {
        id: 2,
        type: 'service-provider',
        name: 'Marcus Johnson',
        service: 'Brand Strategy',
        skills: ['Brand Identity', 'Content Strategy', 'Growth Marketing'],
        experience: '8 years',
        rate: '$100-200/hour',
        location: 'New York, NY',
        rating: 5.0,
        bio: 'Brand strategist who has worked with Fortune 500 companies and top influencers.',
        portfolio: ['Tech', 'Finance', 'Wellness']
      },
      {
        id: 3,
        type: 'creator',
        name: 'Emma Rodriguez',
        followers: '250K',
        niche: 'Fashion & Lifestyle',
        needs: ['Video Editing', 'Brand Partnerships'],
        budget: '$500-1000/month',
        location: 'Miami, FL',
        engagement: '8.5%',
        bio: 'Fashion influencer looking to scale content production and secure brand deals.',
        contentTypes: ['Reels', 'Stories', 'Posts']
      },
      {
        id: 4,
        type: 'service-provider',
        name: 'Alex Kim',
        service: 'Account Management',
        skills: ['Analytics', 'Engagement Strategy', 'DM Management'],
        experience: '3 years',
        rate: '$40-80/hour',
        location: 'Austin, TX',
        rating: 4.8,
        bio: 'Dedicated account manager helping creators focus on content while I handle the rest.',
        portfolio: ['Beauty', 'Food', 'Fitness']
      }
    ];
    setProfiles(sampleProfiles);
  }, []);

  const renderView = () => {
    switch(currentView) {
      case 'landing':
        return <LandingPage onGetStarted={() => setCurrentView('signup')} />;
      case 'signup':
        return <SignupPage onSignup={(userData) => {
          setUser(userData);
          setCurrentView('dashboard');
        }} onBack={() => setCurrentView('landing')} />;
      case 'dashboard':
        return <Dashboard 
          user={user} 
          profiles={profiles}
          connections={connections}
          setConnections={setConnections}
          messages={messages}
          setMessages={setMessages}
          onLogout={() => {
            setUser(null);
            setCurrentView('landing');
          }}
        />;
      default:
        return <LandingPage onGetStarted={() => setCurrentView('signup')} />;
    }
  };

  return (
    <div className="app">
      {renderView()}
      <style>{styles}</style>
    </div>
  );
}

// Landing Page Component
function LandingPage({ onGetStarted }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`landing ${isVisible ? 'visible' : ''}`}>
      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content">
          <div className="logo">
            <Instagram size={28} />
            <span>CreatorLink</span>
          </div>
          <button className="btn-secondary" onClick={onGetStarted}>
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>AI-Powered Matching</span>
          </div>
          <h1 className="hero-title">
            Connect Creators with 
            <span className="gradient-text"> Expert Services</span>
          </h1>
          <p className="hero-subtitle">
            The professional marketplace where Instagram creators meet verified service providers.
            Find editors, managers, strategists, and more—matched by AI to your specific needs.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={onGetStarted}>
              Get Started Free
              <ChevronRight size={20} />
            </button>
            <button className="btn-outline">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Animated Cards */}
        <div className="floating-cards">
          <div className="card floating-card" style={{ animationDelay: '0s' }}>
            <User size={24} className="card-icon creator" />
            <h3>Creators</h3>
            <p>Find expert help to scale your content</p>
          </div>
          <div className="card floating-card" style={{ animationDelay: '0.2s' }}>
            <Target size={24} className="card-icon provider" />
            <h3>Service Providers</h3>
            <p>Connect with growing creators</p>
          </div>
          <div className="card floating-card" style={{ animationDelay: '0.4s' }}>
            <Sparkles size={24} className="card-icon ai" />
            <h3>AI Matching</h3>
            <p>Smart recommendations powered by AI</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>Everything You Need</h2>
          <p>Professional tools for modern creators and service providers</p>
        </div>
        <div className="features-grid">
          <FeatureCard 
            icon={<Sparkles />}
            title="AI-Powered Matching"
            description="Our intelligent algorithm matches creators with the perfect service providers based on needs, style, and budget."
          />
          <FeatureCard 
            icon={<Shield />}
            title="Verified Profiles"
            description="Every service provider is verified with portfolio reviews and client testimonials for your peace of mind."
          />
          <FeatureCard 
            icon={<MessageCircle />}
            title="Secure Messaging"
            description="Built-in encrypted messaging system to discuss projects, share files, and collaborate seamlessly."
          />
          <FeatureCard 
            icon={<TrendingUp />}
            title="Growth Analytics"
            description="Track your collaborations, measure growth, and optimize your strategy with detailed insights."
          />
          <FeatureCard 
            icon={<DollarSign />}
            title="Transparent Pricing"
            description="Clear pricing, secure payments, and escrow protection for every transaction."
          />
          <FeatureCard 
            icon={<Users />}
            title="Community Driven"
            description="Join a thriving community of creators and professionals helping each other succeed."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Grow Your Instagram Presence?</h2>
          <p>Join thousands of creators and service providers already collaborating on CreatorLink</p>
          <button className="btn-primary large" onClick={onGetStarted}>
            Start Connecting Today
            <ChevronRight size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Instagram size={24} />
            <span>CreatorLink</span>
          </div>
          <p>© 2024 CreatorLink. Empowering creators worldwide.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// Signup Page Component
function SignupPage({ onSignup, onBack }) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: null
  });
  const [profileData, setProfileData] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTypeSelect = (type) => {
    setUserType(type);
    setFormData({ ...formData, userType: type });
    setStep(2);
  };

  const handleBasicInfo = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handleProfileComplete = async (e) => {
    e.preventDefault();
    const completeUser = { ...formData, ...profileData, id: Date.now() };
    onSignup(completeUser);
  };

  const generateBioWithAI = async () => {
    setIsGenerating(true);
    try {
      const prompt = userType === 'creator' 
        ? \`Generate a compelling Instagram creator bio for someone who: \${JSON.stringify(profileData)}. Keep it under 100 characters, professional yet personable.\`
        : \`Generate a professional service provider bio for: \${JSON.stringify(profileData)}. Highlight expertise and value proposition in under 100 characters.\`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Note: Needs a valid API key for this to work
          // "x-api-key": "your_api_key_here",
          // "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",  // update to valid model name since sonnet-4 doesn't exist
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate or fetch AI response. You need a valid API Key.");
      }

      const data = await response.json();
      const generatedBio = data.content[0].text;
      setProfileData({ ...profileData, bio: generatedBio });
    } catch (error) {
      console.error('Error generating bio:', error);
      alert('Error connecting to AI: ' + error.message);
    }
    setIsGenerating(false);
  };

  return (
    <div className="signup-page">
      <button className="back-btn" onClick={onBack}>
        ← Back
      </button>

      <div className="signup-container">
        <div className="signup-header">
          <Instagram size={40} />
          <h1>Join CreatorLink</h1>
          <div className="progress-bar">
            <div className={\`progress-step \${step >= 1 ? 'active' : ''}\`}>1</div>
            <div className={\`progress-line \${step >= 2 ? 'active' : ''}\`}></div>
            <div className={\`progress-step \${step >= 2 ? 'active' : ''}\`}>2</div>
            <div className={\`progress-line \${step >= 3 ? 'active' : ''}\`}></div>
            <div className={\`progress-step \${step >= 3 ? 'active' : ''}\`}>3</div>
          </div>
        </div>

        {step === 1 && (
          <div className="type-selection">
            <h2>I am a...</h2>
            <div className="type-cards">
              <div className="type-card" onClick={() => handleTypeSelect('creator')}>
                <User size={48} />
                <h3>Creator</h3>
                <p>Looking for services to grow my Instagram</p>
                <ul>
                  <li>Find expert editors</li>
                  <li>Get account management</li>
                  <li>Scale your content</li>
                </ul>
              </div>
              <div className="type-card" onClick={() => handleTypeSelect('service-provider')}>
                <Target size={48} />
                <h3>Service Provider</h3>
                <p>Offering services to creators</p>
                <ul>
                  <li>Connect with creators</li>
                  <li>Showcase your work</li>
                  <li>Build your client base</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <form className="signup-form" onSubmit={handleBasicInfo}>
            <h2>Create Your Account</h2>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                required 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create a strong password"
                minLength="8"
              />
            </div>
            <button type="submit" className="btn-primary full-width">
              Continue
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="signup-form" onSubmit={handleProfileComplete}>
            <h2>Complete Your Profile</h2>
            
            {userType === 'creator' ? (
              <>
                <div className="form-group">
                  <label>Instagram Handle</label>
                  <input 
                    type="text" 
                    required 
                    value={profileData.instagram || ''}
                    onChange={(e) => setProfileData({ ...profileData, instagram: e.target.value })}
                    placeholder="@yourhandle"
                  />
                </div>
                <div className="form-group">
                  <label>Followers Count</label>
                  <input 
                    type="text" 
                    required 
                    value={profileData.followers || ''}
                    onChange={(e) => setProfileData({ ...profileData, followers: e.target.value })}
                    placeholder="e.g., 50K, 100K"
                  />
                </div>
                <div className="form-group">
                  <label>Content Niche</label>
                  <input 
                    type="text" 
                    required 
                    value={profileData.niche || ''}
                    onChange={(e) => setProfileData({ ...profileData, niche: e.target.value })}
                    placeholder="e.g., Fashion, Fitness, Travel"
                  />
                </div>
                <div className="form-group">
                  <label>What services do you need?</label>
                  <input 
                    type="text" 
                    required 
                    value={profileData.needs || ''}
                    onChange={(e) => setProfileData({ ...profileData, needs: e.target.value })}
                    placeholder="e.g., Video Editing, Account Management"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>Service Category</label>
                  <select 
                    required 
                    value={profileData.service || ''}
                    onChange={(e) => setProfileData({ ...profileData, service: e.target.value })}
                  >
                    <option value="">Select a service</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Account Management">Account Management</option>
                    <option value="Brand Strategy">Brand Strategy</option>
                    <option value="Content Writing">Content Writing</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Years of Experience</label>
                  <input 
                    type="text" 
                    required 
                    value={profileData.experience || ''}
                    onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                    placeholder="e.g., 3 years"
                  />
                </div>
                <div className="form-group">
                  <label>Hourly Rate Range</label>
                  <input 
                    type="text" 
                    required 
                    value={profileData.rate || ''}
                    onChange={(e) => setProfileData({ ...profileData, rate: e.target.value })}
                    placeholder="e.g., $50-100/hour"
                  />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Bio</label>
              <div className="bio-input-group">
                <textarea 
                  required 
                  value={profileData.bio || ''}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder="Tell us about yourself..."
                  rows="4"
                />
                <button 
                  type="button" 
                  className="btn-ai" 
                  onClick={generateBioWithAI}
                  disabled={isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate with AI'}
                  <Sparkles size={16} />
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input 
                type="text" 
                required 
                value={profileData.location || ''}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                placeholder="City, State/Country"
              />
            </div>

            <button type="submit" className="btn-primary full-width">
              Complete Profile
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard({ user, profiles, connections, setConnections, messages, setMessages, onLogout }) {
  const [activeTab, setActiveTab] = useState('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const getAIRecommendations = async () => {
    setIsLoadingAI(true);
    try {
      const prompt = user.userType === 'creator'
        ? \`Based on this creator profile: \${JSON.stringify(user)}, recommend the best types of service providers they should look for. Return ONLY a JSON array of 3 recommendations with: {"service": "service name", "reason": "why this helps", "priority": "high/medium"}\`
        : \`Based on this service provider profile: \${JSON.stringify(user)}, recommend ideal creator profiles they should target. Return ONLY a JSON array of 3 recommendations with: {"type": "creator type", "reason": "why good match", "priority": "high/medium"}\`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          // Note: Needs a valid API key for this to work
          // "x-api-key": "your_api_key_here",
          // "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307", // update to valid model name
          max_tokens: 1000,
          messages: [{ role: "user", content: prompt }]
        })
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate or fetch AI response. You need a valid API Key.");
      }

      const data = await response.json();
      const text = data.content[0].text;
      const cleaned = text.replace(/\`\`\`json|\`\`\`/g, "").trim();
      const recommendations = JSON.parse(cleaned);
      setAiRecommendations(recommendations);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      // alert('Error getting recommendations from AI: ' + error.message);
    }
    setIsLoadingAI(false);
  };

  useEffect(() => {
    if (activeTab === 'discover' && aiRecommendations.length === 0) {
      getAIRecommendations();
    }
  }, [activeTab]);

  const filteredProfiles = profiles.filter(profile => {
    if (user.userType === 'creator') {
      return profile.type === 'service-provider';
    } else {
      return profile.type === 'creator';
    }
  }).filter(profile => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    return (
      profile.name.toLowerCase().includes(searchLower) ||
      (profile.service && profile.service.toLowerCase().includes(searchLower)) ||
      (profile.niche && profile.niche.toLowerCase().includes(searchLower))
    );
  });

  const handleConnect = (profileId) => {
    const connection = {
      id: Date.now(),
      profileId,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    setConnections([...connections, connection]);
  };

  const handleMessage = (profileId, content) => {
    const message = {
      id: Date.now(),
      from: user.id,
      to: profileId,
      content,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, message]);
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Instagram size={32} />
          <span>CreatorLink</span>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={\`nav-item \${activeTab === 'discover' ? 'active' : ''}\`}
            onClick={() => setActiveTab('discover')}
          >
            <Search size={20} />
            <span>Discover</span>
          </button>
          <button 
            className={\`nav-item \${activeTab === 'connections' ? 'active' : ''}\`}
            onClick={() => setActiveTab('connections')}
          >
            <Users size={20} />
            <span>Connections</span>
            {connections.length > 0 && <span className="badge">{connections.length}</span>}
          </button>
          <button 
            className={\`nav-item \${activeTab === 'messages' ? 'active' : ''}\`}
            onClick={() => setActiveTab('messages')}
          >
            <MessageCircle size={20} />
            <span>Messages</span>
            {messages.length > 0 && <span className="badge">{messages.length}</span>}
          </button>
          <button 
            className={\`nav-item \${activeTab === 'profile' ? 'active' : ''}\`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={20} />
            <span>My Profile</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item" onClick={onLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'discover' && (
          <div className="discover-view">
            <div className="view-header">
              <div>
                <h1>Discover {user.userType === 'creator' ? 'Service Providers' : 'Creators'}</h1>
                <p>Find the perfect match for your needs</p>
              </div>
              <div className="search-box">
                <Search size={20} />
                <input 
                  type="text" 
                  placeholder="Search by name, skill, or niche..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* AI Recommendations */}
            {aiRecommendations.length > 0 && (
              <div className="ai-recommendations">
                <div className="ai-header">
                  <Sparkles size={20} />
                  <h2>AI Recommendations for You</h2>
                </div>
                <div className="recommendations-grid">
                  {aiRecommendations.map((rec, idx) => (
                    <div key={idx} className="recommendation-card">
                      <div className={\`priority-badge \${rec.priority}\`}>
                        {rec.priority} priority
                      </div>
                      <h3>{rec.service || rec.type}</h3>
                      <p>{rec.reason}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Grid */}
            <div className="profiles-grid">
              {filteredProfiles.map(profile => (
                <div key={profile.id} className="profile-card" onClick={() => setSelectedProfile(profile)}>
                  <div className="profile-header">
                    <div className="profile-avatar">
                      {profile.name.charAt(0)}
                    </div>
                    <div className="profile-info">
                      <h3>{profile.name}</h3>
                      {profile.type === 'service-provider' ? (
                        <p className="profile-service">{profile.service}</p>
                      ) : (
                        <p className="profile-niche">{profile.niche}</p>
                      )}
                    </div>
                    {profile.rating && (
                      <div className="profile-rating">
                        <Star size={16} fill="currentColor" />
                        <span>{profile.rating}</span>
                      </div>
                    )}
                  </div>

                  <p className="profile-bio">{profile.bio}</p>

                  <div className="profile-details">
                    {profile.type === 'service-provider' ? (
                      <>
                        <div className="detail-item">
                          <MapPin size={16} />
                          <span>{profile.location}</span>
                        </div>
                        <div className="detail-item">
                          <DollarSign size={16} />
                          <span>{profile.rate}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="detail-item">
                          <Instagram size={16} />
                          <span>{profile.followers} followers</span>
                        </div>
                        <div className="detail-item">
                          <TrendingUp size={16} />
                          <span>{profile.engagement} engagement</span>
                        </div>
                      </>
                    )}
                  </div>

                  {profile.skills && (
                    <div className="profile-tags">
                      {profile.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="tag">{skill}</span>
                      ))}
                    </div>
                  )}

                  <button 
                    className="btn-connect"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleConnect(profile.id);
                    }}
                  >
                    {connections.some(c => c.profileId === profile.id) ? 'Requested' : 'Connect'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'connections' && (
          <div className="connections-view">
            <div className="view-header">
              <h1>Your Connections</h1>
              <p>Manage your professional network</p>
            </div>

            {connections.length === 0 ? (
              <div className="empty-state">
                <Users size={48} />
                <h2>No connections yet</h2>
                <p>Start connecting with {user.userType === 'creator' ? 'service providers' : 'creators'} to grow your network</p>
                <button className="btn-primary" onClick={() => setActiveTab('discover')}>
                  Discover Profiles
                </button>
              </div>
            ) : (
              <div className="connections-list">
                {connections.map(conn => {
                  const profile = profiles.find(p => p.id === conn.profileId);
                  if (!profile) return null;
                  
                  return (
                    <div key={conn.id} className="connection-item">
                      <div className="connection-avatar">{profile.name.charAt(0)}</div>
                      <div className="connection-info">
                        <h3>{profile.name}</h3>
                        <p>{profile.service || profile.niche}</p>
                      </div>
                      <span className={\`connection-status \${conn.status}\`}>
                        {conn.status}
                      </span>
                      <button className="btn-secondary" onClick={() => setActiveTab('messages')}>
                        Message
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="messages-view">
            <div className="view-header">
              <h1>Messages</h1>
              <p>Communicate securely with your connections</p>
            </div>

            {messages.length === 0 ? (
              <div className="empty-state">
                <MessageCircle size={48} />
                <h2>No messages yet</h2>
                <p>Start a conversation with your connections</p>
              </div>
            ) : (
              <div className="messages-list">
                {messages.map(msg => (
                  <div key={msg.id} className="message-item">
                    <div className="message-content">{msg.content}</div>
                    <div className="message-time">
                      {new Date(msg.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="profile-view">
            <div className="view-header">
              <h1>My Profile</h1>
              <button className="btn-secondary">
                <Settings size={20} />
                Edit Profile
              </button>
            </div>

            <div className="profile-content">
              <div className="profile-main">
                <div className="profile-avatar large">{user.name.charAt(0)}</div>
                <h2>{user.name}</h2>
                <p className="user-type-badge">{user.userType === 'creator' ? 'Creator' : 'Service Provider'}</p>
                <p className="profile-bio-large">{user.bio}</p>

                <div className="profile-stats">
                  <div className="stat">
                    <div className="stat-value">{connections.length}</div>
                    <div className="stat-label">Connections</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">{messages.length}</div>
                    <div className="stat-label">Messages</div>
                  </div>
                  <div className="stat">
                    <div className="stat-value">0</div>
                    <div className="stat-label">Projects</div>
                  </div>
                </div>
              </div>

              <div className="profile-details-section">
                <h3>Profile Details</h3>
                <div className="details-grid">
                  <div className="detail">
                    <label>Email</label>
                    <p>{user.email}</p>
                  </div>
                  <div className="detail">
                    <label>Location</label>
                    <p>{user.location}</p>
                  </div>
                  {user.userType === 'creator' ? (
                    <>
                      <div className="detail">
                        <label>Followers</label>
                        <p>{user.followers}</p>
                      </div>
                      <div className="detail">
                        <label>Niche</label>
                        <p>{user.niche}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="detail">
                        <label>Service</label>
                        <p>{user.service}</p>
                      </div>
                      <div className="detail">
                        <label>Experience</label>
                        <p>{user.experience}</p>
                      </div>
                      <div className="detail">
                        <label>Rate</label>
                        <p>{user.rate}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="modal-overlay" onClick={() => setSelectedProfile(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProfile(null)}>
              <X size={24} />
            </button>

            <div className="modal-header">
              <div className="profile-avatar large">{selectedProfile.name.charAt(0)}</div>
              <h2>{selectedProfile.name}</h2>
              <p>{selectedProfile.service || selectedProfile.niche}</p>
              {selectedProfile.rating && (
                <div className="profile-rating large">
                  <Star size={20} fill="currentColor" />
                  <span>{selectedProfile.rating}</span>
                </div>
              )}
            </div>

            <div className="modal-body">
              <div className="modal-section">
                <h3>About</h3>
                <p>{selectedProfile.bio}</p>
              </div>

              {selectedProfile.skills && (
                <div className="modal-section">
                  <h3>Skills & Expertise</h3>
                  <div className="profile-tags">
                    {selectedProfile.skills.map((skill, idx) => (
                      <span key={idx} className="tag large">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {selectedProfile.portfolio && (
                <div className="modal-section">
                  <h3>Portfolio Categories</h3>
                  <div className="profile-tags">
                    {selectedProfile.portfolio.map((item, idx) => (
                      <span key={idx} className="tag large">{item}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-section">
                <h3>Details</h3>
                <div className="details-list">
                  <div className="detail-row">
                    <MapPin size={18} />
                    <span>{selectedProfile.location}</span>
                  </div>
                  {selectedProfile.rate && (
                    <div className="detail-row">
                      <DollarSign size={18} />
                      <span>{selectedProfile.rate}</span>
                    </div>
                  )}
                  {selectedProfile.experience && (
                    <div className="detail-row">
                      <Zap size={18} />
                      <span>{selectedProfile.experience} experience</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-primary full-width"
                onClick={() => {
                  handleConnect(selectedProfile.id);
                  setSelectedProfile(null);
                }}
              >
                {connections.some(c => c.profileId === selectedProfile.id) ? 'Connection Requested' : 'Send Connection Request'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Comprehensive Styles
const styles = \`
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;900&display=swap');

  :root {
    --primary: #FF385C;
    --primary-dark: #E31C5F;
    --secondary: #00A699;
    --accent: #FFB400;
    --bg-primary: #FFFFFF;
    --bg-secondary: #F7F7F7;
    --bg-tertiary: #FAFAFA;
    --text-primary: #222222;
    --text-secondary: #717171;
    --text-light: #B0B0B0;
    --border: #DDDDDD;
    --border-light: #EBEBEB;
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
    --shadow-xl: 0 16px 48px rgba(0, 0, 0, 0.14);
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 24px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
    color: var(--text-primary);
    background: var(--bg-primary);
    line-height: 1.6;
    overflow-x: hidden;
  }

  .app {
    min-height: 100vh;
  }

  /* === LANDING PAGE === */
  .landing {
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .landing.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-light);
    z-index: 1000;
    padding: 1rem 0;
  }

  .nav-content {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
  }

  .hero {
    max-width: 1400px;
    margin: 0 auto;
    padding: 10rem 2rem 6rem;
    display: flex;
    align-items: center;
    gap: 4rem;
    min-height: 90vh;
  }

  .hero-content {
    flex: 1;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #FF385C 0%, #FFB400 100%);
    color: white;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 2rem;
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .hero-title {
    font-family: 'Playfair Display', serif;
    font-size: 4.5rem;
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    color: var(--text-primary);
  }

  .gradient-text {
    background: linear-gradient(135deg, #FF385C 0%, #FFB400 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    color: var(--text-secondary);
    margin-bottom: 2.5rem;
    max-width: 600px;
    line-height: 1.8;
  }

  .hero-cta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .btn-primary {
    background: linear-gradient(135deg, #FF385C 0%, #E31C5F 100%);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
    box-shadow: 0 4px 16px rgba(255, 56, 92, 0.3);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 56, 92, 0.4);
  }

  .btn-primary.large {
    padding: 1.25rem 2.5rem;
    font-size: 1.125rem;
  }

  .btn-secondary {
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--border);
    padding: 1rem 2rem;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-secondary:hover {
    border-color: var(--primary);
    color: var(--primary);
  }

  .btn-outline {
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--text-primary);
    padding: 1rem 2rem;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-outline:hover {
    background: var(--text-primary);
    color: white;
  }

  .floating-cards {
    flex: 1;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .card {
    background: white;
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-md);
  }

  .floating-card {
    animation: floatCard 4s ease-in-out infinite;
  }

  @keyframes floatCard {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-15px) rotate(2deg); }
  }

  .card-icon {
    width: 48px;
    height: 48px;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
  }

  .card-icon.creator {
    background: linear-gradient(135deg, #FF385C 0%, #FFB400 100%);
    color: white;
  }

  .card-icon.provider {
    background: linear-gradient(135deg, #00A699 0%, #00D9C5 100%);
    color: white;
  }

  .card-icon.ai {
    background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
    color: white;
  }

  .card h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  .card p {
    color: var(--text-secondary);
    font-size: 0.9375rem;
  }

  .features {
    max-width: 1400px;
    margin: 0 auto;
    padding: 6rem 2rem;
  }

  .section-header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-header h2 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  .section-header p {
    font-size: 1.125rem;
    color: var(--text-secondary);
  }

  .features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .feature-card {
    background: var(--bg-tertiary);
    padding: 2.5rem;
    border-radius: var(--radius-lg);
    transition: all 0.3s ease;
    border: 1px solid transparent;
  }

  .feature-card:hover {
    background: white;
    border-color: var(--primary);
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }

  .feature-icon {
    width: 56px;
    height: 56px;
    background: linear-gradient(135deg, #FF385C 0%, #FFB400 100%);
    color: white;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  .feature-card h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .feature-card p {
    color: var(--text-secondary);
    line-height: 1.7;
  }

  .cta-section {
    background: linear-gradient(135deg, #FF385C 0%, #E31C5F 100%);
    padding: 6rem 2rem;
    text-align: center;
    color: white;
  }

  .cta-content h2 {
    font-family: 'Playfair Display', serif;
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1rem;
  }

  .cta-content p {
    font-size: 1.25rem;
    margin-bottom: 2.5rem;
    opacity: 0.95;
  }

  .cta-section .btn-primary {
    background: white;
    color: var(--primary);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }

  .footer {
    background: var(--text-primary);
    color: white;
    padding: 3rem 2rem;
  }

  .footer-content {
    max-width: 1400px;
    margin: 0 auto;
    text-align: center;
  }

  .footer-logo {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .footer p {
    opacity: 0.7;
  }

  /* === SIGNUP PAGE === */
  .signup-page {
    min-height: 100vh;
    background: linear-gradient(135deg, #FF385C 0%, #FFB400 100%);
    padding: 2rem;
    position: relative;
  }

  .back-btn {
    position: absolute;
    top: 2rem;
    left: 2rem;
    background: rgba(255, 255, 255, 0.2);
    border: none;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  .back-btn:hover {
    background: rgba(255, 255, 255, 0.3);
  }

  .signup-container {
    max-width: 600px;
    margin: 4rem auto;
    background: white;
    border-radius: var(--radius-xl);
    padding: 3rem;
    box-shadow: var(--shadow-xl);
  }

  .signup-header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .signup-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 900;
    margin: 1rem 0;
  }

  .progress-bar {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 2rem;
  }

  .progress-step {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: var(--bg-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    transition: all 0.3s ease;
  }

  .progress-step.active {
    background: var(--primary);
    color: white;
  }

  .progress-line {
    width: 60px;
    height: 3px;
    background: var(--bg-secondary);
    transition: all 0.3s ease;
  }

  .progress-line.active {
    background: var(--primary);
  }

  .type-selection h2 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .type-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  .type-card {
    padding: 2.5rem;
    border: 2px solid var(--border);
    border-radius: var(--radius-lg);
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
  }

  .type-card:hover {
    border-color: var(--primary);
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
  }

  .type-card svg {
    color: var(--primary);
    margin-bottom: 1rem;
  }

  .type-card h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .type-card p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }

  .type-card ul {
    list-style: none;
    text-align: left;
  }

  .type-card li {
    padding: 0.5rem 0;
    color: var(--text-secondary);
    font-size: 0.9375rem;
  }

  .type-card li::before {
    content: "✓ ";
    color: var(--secondary);
    font-weight: 700;
    margin-right: 0.5rem;
  }

  .signup-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .signup-form h2 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .form-group label {
    font-weight: 600;
    color: var(--text-primary);
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 1rem;
    border: 2px solid var(--border);
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  .form-group input:focus,
  .form-group select:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: var(--primary);
  }

  .bio-input-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .btn-ai {
    background: linear-gradient(135deg, #6366F1 0%, #A855F7 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: var(--radius-md);
    font-size: 0.9375rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: all 0.3s ease;
  }

  .btn-ai:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
  }

  .btn-ai:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .full-width {
    width: 100%;
  }

  /* === DASHBOARD === */
  .dashboard {
    display: flex;
    min-height: 100vh;
    background: var(--bg-tertiary);
  }

  .sidebar {
    width: 280px;
    background: white;
    border-right: 1px solid var(--border-light);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100vh;
  }

  .sidebar-header {
    padding: 2rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--primary);
    border-bottom: 1px solid var(--border-light);
  }

  .sidebar-nav {
    flex: 1;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: none;
    background: transparent;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
  }

  .nav-item:hover {
    background: var(--bg-tertiary);
    color: var(--text-primary);
  }

  .nav-item.active {
    background: linear-gradient(135deg, #FF385C 0%, #FFB400 100%);
    color: white;
  }

  .badge {
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    background: var(--primary);
    color: white;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .sidebar-footer {
    padding: 1rem;
    border-top: 1px solid var(--border-light);
  }

  .main-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
  }

  .view-header {
    margin-bottom: 2.5rem;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 2rem;
  }

  .view-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 900;
    margin-bottom: 0.5rem;
  }

  .view-header p {
    color: var(--text-secondary);
  }

  .search-box {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    background: white;
    padding: 0.75rem 1.25rem;
    border-radius: var(--radius-md);
    border: 2px solid var(--border);
    min-width: 400px;
  }

  .search-box input {
    border: none;
    outline: none;
    flex: 1;
    font-size: 1rem;
  }

  .ai-recommendations {
    background: white;
    border-radius: var(--radius-lg);
    padding: 2rem;
    margin-bottom: 2.5rem;
    box-shadow: var(--shadow-sm);
  }

  .ai-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
    color: var(--primary);
  }

  .ai-header h2 {
    font-size: 1.5rem;
    font-weight: 700;
  }

  .recommendations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1.5rem;
  }

  .recommendation-card {
    background: var(--bg-tertiary);
    padding: 1.5rem;
    border-radius: var(--radius-md);
    position: relative;
  }

  .priority-badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.25rem 0.75rem;
    border-radius: 100px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
  }

  .priority-badge.high {
    background: #FFE5E5;
    color: var(--primary);
  }

  .priority-badge.medium {
    background: #FFF4E5;
    color: #FFB400;
  }

  .recommendation-card h3 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    padding-right: 5rem;
  }

  .recommendation-card p {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    line-height: 1.6;
  }

  .profiles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .profile-card {
    background: white;
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-sm);
    transition: all 0.3s ease;
    cursor: pointer;
    border: 2px solid transparent;
  }

  .profile-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateY(-4px);
    border-color: var(--primary);
  }

  .profile-header {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
    align-items: flex-start;
  }

  .profile-avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF385C 0%, #FFB400 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .profile-avatar.large {
    width: 96px;
    height: 96px;
    font-size: 2.5rem;
  }

  .profile-info {
    flex: 1;
  }

  .profile-info h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .profile-service,
  .profile-niche {
    color: var(--text-secondary);
    font-size: 0.9375rem;
  }

  .profile-rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--accent);
    font-weight: 700;
  }

  .profile-rating.large {
    font-size: 1.25rem;
  }

  .profile-bio {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  .profile-bio-large {
    text-align: center;
    color: var(--text-secondary);
    font-size: 1.125rem;
    line-height: 1.7;
    margin: 1.5rem 0;
  }

  .profile-details {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-size: 0.875rem;
  }

  .detail-item svg {
    color: var(--primary);
  }

  .profile-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .tag {
    padding: 0.375rem 0.75rem;
    background: var(--bg-tertiary);
    border-radius: 100px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--text-secondary);
  }

  .tag.large {
    padding: 0.5rem 1rem;
    font-size: 0.9375rem;
  }

  .btn-connect {
    width: 100%;
    padding: 0.875rem;
    background: linear-gradient(135deg, #FF385C 0%, #E31C5F 100%);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .btn-connect:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(255, 56, 92, 0.3);
  }

  .empty-state {
    text-align: center;
    padding: 4rem 2rem;
  }

  .empty-state svg {
    color: var(--text-light);
    margin-bottom: 1.5rem;
  }

  .empty-state h2 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .empty-state p {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
  }

  .connections-list,
  .messages-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .connection-item {
    background: white;
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    display: flex;
    align-items: center;
    gap: 1.5rem;
    box-shadow: var(--shadow-sm);
  }

  .connection-avatar {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: linear-gradient(135deg, #FF385C 0%, #FFB400 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    font-weight: 700;
  }

  .connection-info {
    flex: 1;
  }

  .connection-info h3 {
    font-size: 1.125rem;
    font-weight: 700;
    margin-bottom: 0.25rem;
  }

  .connection-info p {
    color: var(--text-secondary);
  }

  .connection-status {
    padding: 0.5rem 1rem;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  .connection-status.pending {
    background: #FFF4E5;
    color: #FFB400;
  }

  .connection-status.connected {
    background: #E5F9F5;
    color: var(--secondary);
  }

  .message-item {
    background: white;
    padding: 1.5rem;
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
  }

  .message-content {
    margin-bottom: 0.75rem;
  }

  .message-time {
    font-size: 0.875rem;
    color: var(--text-light);
  }

  .profile-content {
    background: white;
    border-radius: var(--radius-lg);
    padding: 3rem;
    box-shadow: var(--shadow-sm);
  }

  .profile-main {
    text-align: center;
    padding-bottom: 3rem;
    border-bottom: 1px solid var(--border-light);
    margin-bottom: 3rem;
  }

  .profile-main h2 {
    font-size: 2rem;
    margin: 1.5rem 0 0.5rem;
  }

  .user-type-badge {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: linear-gradient(135deg, #FF385C 0%, #FFB400 100%);
    color: white;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }

  .profile-stats {
    display: flex;
    justify-content: center;
    gap: 4rem;
    margin-top: 2rem;
  }

  .stat {
    text-align: center;
  }

  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary);
  }

  .stat-label {
    color: var(--text-secondary);
    font-size: 0.9375rem;
    margin-top: 0.5rem;
  }

  .profile-details-section h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }

  .detail label {
    display: block;
    font-weight: 600;
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .detail p {
    font-size: 1.125rem;
    font-weight: 600;
  }

  /* === MODAL === */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 2rem;
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .modal-content {
    background: white;
    border-radius: var(--radius-xl);
    max-width: 600px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.3s ease;
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  .modal-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: var(--bg-tertiary);
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .modal-close:hover {
    background: var(--border);
  }

  .modal-header {
    padding: 3rem;
    text-align: center;
    border-bottom: 1px solid var(--border-light);
  }

  .modal-header h2 {
    font-size: 2rem;
    font-weight: 700;
    margin: 1.5rem 0 0.5rem;
  }

  .modal-header p {
    color: var(--text-secondary);
    font-size: 1.125rem;
  }

  .modal-body {
    padding: 2rem 3rem;
  }

  .modal-section {
    margin-bottom: 2.5rem;
  }

  .modal-section:last-child {
    margin-bottom: 0;
  }

  .modal-section h3 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .details-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .detail-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
  }

  .detail-row svg {
    color: var(--primary);
  }

  .modal-footer {
    padding: 2rem 3rem;
    border-top: 1px solid var(--border-light);
  }

  /* === RESPONSIVE === */
  @media (max-width: 1024px) {
    .hero {
      flex-direction: column;
      padding: 8rem 2rem 4rem;
    }

    .hero-title {
      font-size: 3rem;
    }

    .sidebar {
      width: 240px;
    }
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }

    .floating-cards {
      grid-template-columns: 1fr;
    }

    .features-grid {
      grid-template-columns: 1fr;
    }

    .search-box {
      min-width: auto;
      width: 100%;
    }

    .view-header {
      flex-direction: column;
    }

    .profiles-grid {
      grid-template-columns: 1fr;
    }

    .sidebar {
      position: fixed;
      left: -100%;
      z-index: 100;
      transition: left 0.3s ease;
    }

    .sidebar.open {
      left: 0;
    }

    .profile-stats {
      gap: 2rem;
    }

    .details-grid {
      grid-template-columns: 1fr;
    }
  }
\`;
