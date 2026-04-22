import React, { useState, useEffect } from 'react';
import { Search, Camera, Sparkles, Shield, MessageCircle, User, Settings, LogOut, Star, MapPin, DollarSign, Check, X, Zap, Target, TrendingUp, Users, Send, Menu, ChevronRight, Video, PenTool, LayoutTemplate } from 'lucide-react';

const mockCreators = [
  { id: 1, name: 'Elena Vance', handle: '@elenav', role: 'Creator', tags: ['Lifestyle', 'Fashion'], followers: '250K', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' },
  { id: 2, name: 'Marcus Chen', handle: '@marcus.edits', role: 'Provider', tags: ['Video Editing', 'Motion'], rate: '$50/hr', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704b' },
  { id: 3, name: 'Sarah Jae', handle: '@sarahj', role: 'Creator', tags: ['Tech', 'Reviews'], followers: '1.2M', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
  { id: 4, name: 'David Kim', handle: '@dk.design', role: 'Provider', tags: ['Thumbnails', 'Branding'], rate: '$30/hr', img: 'https://i.pravatar.cc/150?u=a042581f4e29026703d' },
];

export default function CreatorLinkApp() {
  const [currentView, setCurrentView] = useState('landing');
  const [userRole, setUserRole] = useState(null); // 'creator' | 'provider'

  const renderView = () => {
    switch(currentView) {
      case 'landing':
        return <LandingPage onNavigate={setCurrentView} />;
      case 'auth':
        return <AuthSelection onSelectRole={(role) => { setUserRole(role); setCurrentView('dashboard'); }} onBack={() => setCurrentView('landing')} />;
      case 'dashboard':
        return <DashboardLayout currentView={currentView} setCurrentView={setCurrentView} onLogout={() => setCurrentView('landing')}>
          <FeedView />
        </DashboardLayout>;
      case 'chat':
        return <DashboardLayout currentView={currentView} setCurrentView={setCurrentView} onLogout={() => setCurrentView('landing')}>
          <ChatView />
        </DashboardLayout>;
      default:
        return <LandingPage onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {renderView()}
    </div>
  );
}

// -----------------------------------------
// Landing Page
// -----------------------------------------
function LandingPage({ onNavigate }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Nav */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white"><Sparkles size={18} /></div>
          <span className="font-bold text-xl tracking-tight text-slate-800">CollabHub</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Explore</button>
          <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">How it Works</button>
          <button onClick={() => onNavigate('auth')} className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-sm transition">Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative px-6 py-24 text-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white/0 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full">
            <Zap size={14} /> Powering 10,000+ Collaborations
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 !leading-tight">
            Where Creators Meet Their <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">Perfect Match.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            The premium platform matching elite content creators with verified editors, designers, and strategists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => onNavigate('auth')} className="px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition">
              Get Started for Free
            </button>
            <button className="px-8 py-3.5 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-full hover:bg-slate-50 transition">
              Explore Talent
            </button>
          </div>
        </div>
      </header>

      {/* Trending Section */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-slate-800">Trending Collaborators</h2>
            <button className="text-sm font-semibold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">View All <ChevronRight size={16} /></button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCreators.map(creator => (
              <div key={creator.id} className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative mb-4">
                  <img src={creator.img} alt={creator.name} className="w-20 h-20 rounded-full object-cover border-4 border-indigo-50" />
                  <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-sm">
                    {creator.role === 'Creator' ? <Camera className="text-pink-500" size={16} /> : <Video className="text-teal-500" size={16} />}
                  </div>
                </div>
                <h3 className="font-bold text-lg text-slate-900">{creator.name}</h3>
                <p className="text-sm text-slate-500 mb-3">{creator.handle}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {creator.tags.map(tag => (
                    <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-slate-100 text-slate-700 rounded-md">{tag}</span>
                  ))}
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
                  <span className="font-semibold text-indigo-600">{creator.role === 'Creator' ? creator.followers : creator.rate}</span>
                  <span className="text-slate-400">{creator.role === 'Creator' ? 'Followers' : 'Starting'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -----------------------------------------
// Auth & Role Selection
// -----------------------------------------
function AuthSelection({ onSelectRole, onBack }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-medium">
        <ChevronRight className="rotate-180" size={18} /> Back
      </button>
      
      <div className="text-center mb-12">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-indigo-200">
          <Sparkles size={24} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Choose your path</h1>
        <p className="text-slate-500 max-w-md mx-auto">Select how you want to use CollabHub to get a personalized onboarding experience.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Creator Card */}
        <button onClick={() => onSelectRole('creator')} className="group relative text-left bg-white p-8 rounded-3xl border-2 border-transparent hover:border-indigo-600 shadow-sm hover:shadow-2xl transition-all duration-300">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Camera className="text-indigo-600" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">I am a Creator</h2>
          <p className="text-slate-600 leading-relaxed mb-6">I make content and need professional editors, managers, or designers to scale my brand.</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm font-medium text-slate-700"><Check className="text-teal-500" size={18} /> Find top-tier editors</li>
            <li className="flex items-center gap-3 text-sm font-medium text-slate-700"><Check className="text-teal-500" size={18} /> Build your dream team</li>
          </ul>
        </button>

        {/* Provider Card */}
        <button onClick={() => onSelectRole('provider')} className="group relative text-left bg-white p-8 rounded-3xl border-2 border-transparent hover:border-teal-500 shadow-sm hover:shadow-2xl transition-all duration-300">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <PenTool className="text-teal-600" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">I am a Service Provider</h2>
          <p className="text-slate-600 leading-relaxed mb-6">I am an editor, designer, or manager looking to work with established content creators.</p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm font-medium text-slate-700"><Check className="text-indigo-500" size={18} /> Access high-paying jobs</li>
            <li className="flex items-center gap-3 text-sm font-medium text-slate-700"><Check className="text-indigo-500" size={18} /> Showcase your portfolio</li>
          </ul>
        </button>
      </div>
      
      <p className="mt-12 text-sm text-slate-500">Already have an account? <button className="font-semibold text-indigo-600 hover:underline">Log in</button></p>
    </div>
  );
}

// -----------------------------------------
// Dashboard Layout & Components
// -----------------------------------------
function DashboardLayout({ children, currentView, setCurrentView, onLogout }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white"><Sparkles size={18} /></div>
            <span className="font-bold text-lg text-slate-800">CollabHub</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto block">
          <SidebarItem icon={<Target />} label="Discover" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <SidebarItem icon={<MessageCircle />} label="Messages" badge="3" active={currentView === 'chat'} onClick={() => setCurrentView('chat')} />
          <SidebarItem icon={<Users />} label="My Connections" />
          <SidebarItem icon={<Star />} label="Saved Profiles" />
          
          <div className="pt-6 mt-6 border-t border-slate-100">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Settings</p>
            <SidebarItem icon={<User />} label="My Profile" />
            <SidebarItem icon={<Settings />} label="Preferences" />
          </div>
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg w-full transition">
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative block">
        {/* Mobile Header */}
        <header className="md:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 block">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white"><Sparkles size={18} /></div>
          </div>
          <button className="text-slate-500"><Menu size={24} /></button>
        </header>
        
        <main className="flex-1 overflow-y-auto block">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, badge, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
    >
      <div className="flex items-center gap-3">
        {React.cloneElement(icon, { size: 18, className: active ? 'text-indigo-600' : 'text-slate-400' })}
        {label}
      </div>
      {badge && <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
    </button>
  );
}

function FeedView() {
  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 flex gap-8 block">
      {/* Main Feed */}
      <div className="flex-1 max-w-3xl block">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Collaboration Feed</h1>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-slate-200 bg-white rounded-lg text-slate-600 hover:border-indigo-600 transition"><LayoutTemplate size={18} /></button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap gap-2 mb-8">
          {['For You', 'Video Editors', 'Thumbnail Designers', 'Brand Strategists'].map((filter, i) => (
            <button key={filter} className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${i===0 ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
              {filter}
            </button>
          ))}
        </div>

        {/* Feed Cards */}
        <div className="space-y-6">
          {mockCreators.map(profile => (
            <div key={profile.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 hover:border-indigo-200 transition">
              <div className="shrink-0 flex items-start">
                <img src={profile.img} className="w-16 h-16 rounded-full object-cover shadow-sm bg-slate-100" alt={profile.name} />
              </div>
              <div className="flex-[2]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{profile.name}</h3>
                    <p className="text-slate-500 text-sm font-medium block">{profile.role} • {profile.tags.join(', ')}</p>
                  </div>
                  {profile.rate && <span className="font-bold text-teal-600">{profile.rate}</span>}
                </div>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">Looking to collaborate on upcoming tech review videos. Need high-retention editing and dynamic motion graphics. Long term partnership intended.</p>
                <div className="flex items-center gap-4">
                  <button className="flex-1 md:flex-none px-6 py-2 bg-indigo-50 text-indigo-700 font-semibold text-sm rounded-xl hover:bg-indigo-100 transition">View Portfolio</button>
                  <button className="flex-1 md:flex-none px-6 py-2 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-slate-800 transition">Message</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Sidebar: AI Suggestions */}
      <div className="w-80 hidden lg:block block">
        <div className="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 p-6 rounded-2xl sticky top-8">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-indigo-600" size={20} />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">AI Matches</h2>
          </div>
          
          <div className="space-y-4 block">
            {[mockCreators[1], mockCreators[3]].map(suggestion => (
              <div key={suggestion.id} className="bg-white p-4 rounded-xl border border-indigo-50 shadow-sm flex gap-3 hover:border-indigo-300 transition cursor-pointer">
                <img src={suggestion.img} className="w-10 h-10 rounded-full" alt="" />
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">{suggestion.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">98% Match • {suggestion.tags[0]}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2.5 bg-indigo-600 text-white font-semibold text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 transition flex justify-center items-center gap-2">
            Generate Matches
          </button>
        </div>
      </div>
    </div>
  );
}

function ChatView() {
  return (
    <div className="h-full flex flex-col md:flex-row bg-white rounded-tl-3xl shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1)] block border-t border-l border-slate-200 mt-2 ml-2 overflow-hidden">
      {/* Chat List */}
      <div className="w-full md:w-80 border-r border-slate-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-lg text-slate-800 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto block">
          <ChatListItem user={mockCreators[1]} active message="Can you send the project files?" time="2m" unread={2} />
          <ChatListItem user={mockCreators[2]} message="Sounds like a great plan!" time="1h" />
          <ChatListItem user={mockCreators[3]} message="The thumbnails are ready." time="1d" />
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col block h-full bg-slate-50">
        <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3 block">
            <img src={mockCreators[1].img} alt="" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">{mockCreators[1].name}</h3>
              <p className="text-xs text-teal-600 font-medium">Online</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600"><Settings size={20} /></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 block">
          <ChatMessage text="Hey! I saw your post looking for an editor." time="10:42 AM" />
          <ChatMessage text="I've attached my latest reels portfolio here." time="10:43 AM" />
          <ChatMessage text="That looks incredible! What's your typical turnaround time?" time="10:45 AM" isMe />
          <ChatMessage text="Usually 24-48 hours depending on effects needed." time="10:46 AM" />
          <ChatMessage text="Can you send the project files?" time="10:48 AM" />
        </div>
        
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 pr-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition bg-white rounded-xl shadow-sm"><Sparkles size={20} /></button>
            <input type="text" placeholder="Type a message..." className="flex-1 bg-transparent text-sm focus:outline-none text-slate-800" />
            <button className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 shadow-md shadow-indigo-200 transition"><Send size={18} className="-ml-0.5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatListItem({ user, active, message, time, unread }) {
  return (
    <button className={`w-full flex items-start gap-3 p-4 transition text-left cursor-pointer ${active ? 'bg-indigo-50/50 block' : 'hover:bg-slate-50 block'}`}>
      <div className="relative shrink-0">
        <img src={user.img} className="w-12 h-12 rounded-full object-cover block" alt="" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white bg-green-500 rounded-full block" />
      </div>
      <div className="flex-1 min-w-0 pr-2">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-sm text-slate-900 truncate block">{user.name}</h4>
          <span className="text-xs text-slate-400 shrink-0 block">{time}</span>
        </div>
        <p className={`text-sm truncate block ${unread ? 'font-semibold text-slate-800' : 'text-slate-500'}`}>{message}</p>
      </div>
      {unread && <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-2 block">{unread}</div>}
    </button>
  );
}

function ChatMessage({ text, time, isMe }) {
  return (
    <div className={`flex flex-col block ${isMe ? 'items-end' : 'items-start'}`}>
      <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] block ${isMe ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'}`}>
        <p className="text-sm block">{text}</p>
      </div>
      <span className="text-xs text-slate-400 mt-1 block">{time}</span>
    </div>
  );
}
