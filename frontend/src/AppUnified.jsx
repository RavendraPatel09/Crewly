import React, { useState, useEffect } from 'react';
import { Search, Camera, Sparkles, Shield, MessageCircle, User, Settings, LogOut, Star, MapPin, DollarSign, Check, X, Zap, Target, TrendingUp, Users, Send, Menu, ChevronRight, Video, PenTool, LayoutTemplate, Loader2, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockCreators = [
  { id: 1, name: 'Elena Vance', handle: '@elenav', role: 'Creator', tags: ['Lifestyle', 'Fashion'], followers: '250K', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', aiInsight: "Elena regularly partners with luxury brands. Her audience demographic heavily overlaps with your recent beauty campaigns." },
  { id: 2, name: 'Marcus Chen', handle: '@marcus.edits', role: 'Provider', tags: ['Video Editing', 'Motion'], rate: '$50/hr', img: 'https://i.pravatar.cc/150?u=a042581f4e29026704b', aiInsight: "Marcus specializes in fast-paced TikTok edits and aligns perfectly with your requirement for 24hr turnaround times." },
  { id: 3, name: 'Sarah Jae', handle: '@sarahj', role: 'Creator', tags: ['Tech', 'Reviews'], followers: '1.2M', img: 'https://i.pravatar.cc/150?u=a042581f4e29026024d', aiInsight: "Sarah's tech reviews have a 12% engagement rate. Excellent match for your upcoming hardware launch strategy." },
  { id: 4, name: 'David Kim', handle: '@dk.design', role: 'Provider', tags: ['Thumbnails', 'Branding'], rate: '$30/hr', img: 'https://i.pravatar.cc/150?u=a042581f4e29026703d', aiInsight: "David's CTR enhancement techniques average a 40% jump in metrics. High value for your budget range." },
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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentView}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          {renderView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// -----------------------------------------
// Landing Page
// -----------------------------------------
function LandingPage({ onNavigate }) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white"><Sparkles size={18} /></div>
          <span className="font-bold text-xl tracking-tight text-slate-800">CollabHub</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">Explore</button>
          <button className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition">How it Works</button>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onNavigate('auth')} className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-sm transition">Sign In</motion.button>
        </div>
      </nav>

      <header className="relative px-6 py-24 text-center overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 to-white/0 pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 text-sm font-medium text-indigo-700 bg-indigo-100/50 rounded-full border border-indigo-200">
            <Bot size={14} /> AI-Powered Creator Matchmaking
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 !leading-tight">
            Where Creators Meet Their <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-teal-500">Perfect Match.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            The premium platform utilizing advanced AI to match elite content creators with verified editors, designers, and strategists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => onNavigate('auth')} className="px-8 py-3.5 text-base font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition">
              Get Started for Free
            </motion.button>
          </div>
        </motion.div>
      </header>

      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-2xl font-bold text-slate-800">Trending Collaborators</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCreators.map((creator, i) => (
              <motion.div key={creator.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + (i * 0.1) }} className="group bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// -----------------------------------------
// Auth & AI Bio Optimizer
// -----------------------------------------
function AuthSelection({ onSelectRole, onBack }) {
  const [role, setRole] = useState(null);
  const [bioInput, setBioInput] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedBio, setEnhancedBio] = useState('');

  const handleEnhance = () => {
    if (!bioInput) return;
    setIsEnhancing(true);
    // Simulate AI network delay and typing effect
    setTimeout(() => {
      setIsEnhancing(false);
      const generated = `Professional ${role === 'creator' ? 'Content Creator' : 'Service Provider'} specializing in digital storytelling and brand growth. Seeking high-level collaborations to scale viewership and establish premium industry connections. Highly organized, fast turnaround times, and metrics-driven output.`;
      
      let i = 0;
      setEnhancedBio('');
      const interval = setInterval(() => {
        setEnhancedBio((prev) => prev + generated[i]);
        i++;
        if (i >= generated.length - 1) clearInterval(interval);
      }, 15);
    }, 1500);
  };

  if (role) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-8 rounded-3xl shadow-xl max-w-xl w-full border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700"><Bot size={20} /></div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">AI Profile Setup</h2>
              <p className="text-sm text-slate-500">Let our AI write your perfect bio.</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-700 mb-1 block">Describe yourself in a few words</label>
              <textarea value={bioInput} onChange={(e)=>setBioInput(e.target.value)} placeholder="e.g. i make scary games videos and need thumbnails" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"></textarea>
            </div>
            
            <button onClick={handleEnhance} disabled={isEnhancing} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-semibold shadow-md shadow-indigo-200 hover:shadow-lg transition flex justify-center items-center gap-2">
              {isEnhancing ? <Loader2 className="animate-spin" size={18} /> : <Sparkles size={18} />}
              {isEnhancing ? 'Enhancing Profile...' : 'AI Enhance Bio'}
            </button>

            <AnimatePresence>
              {(enhancedBio || isEnhancing) && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-6">
                  <label className="text-sm font-semibold text-teal-700 flex items-center gap-1 mb-2"><Sparkles size={14}/> Optimized Result</label>
                  <div className="bg-teal-50 border border-teal-100 rounded-xl p-4 text-sm text-teal-900 leading-relaxed min-h-24">
                    {enhancedBio}
                    {!enhancedBio && isEnhancing && <span className="animate-pulse">Analyzing persona...</span>}
                  </div>
                  <button onClick={() => onSelectRole(role)} className="w-full mt-4 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition">
                    Continue to Dashboard
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <button onClick={onBack} className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-medium">
        <ChevronRight className="rotate-180" size={18} /> Back
      </button>
      
      <div className="text-center mb-12">
        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-indigo-200">
          <Sparkles size={24} />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-3">Choose your path</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        <motion.button whileHover={{ scale: 1.02, y: -5 }} onClick={() => setRole('creator')} className="group relative text-left bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-indigo-600 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Camera className="text-indigo-600" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">I am a Creator</h2>
          <p className="text-slate-600 leading-relaxed mb-6">I make content and need professional editors, managers, or designers to scale my brand.</p>
        </motion.button>

        <motion.button whileHover={{ scale: 1.02, y: -5 }} onClick={() => setRole('provider')} className="group relative text-left bg-white p-8 rounded-3xl border-2 border-slate-100 hover:border-teal-500 shadow-sm hover:shadow-xl transition-all duration-300">
          <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <PenTool className="text-teal-600" size={28} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">I am a Service Provider</h2>
          <p className="text-slate-600 leading-relaxed mb-6">I am an editor, designer, or manager looking to work with established content creators.</p>
        </motion.button>
      </div>
    </div>
  );
}

// -----------------------------------------
// Dashboard & AI Matches
// -----------------------------------------
function DashboardLayout({ children, currentView, setCurrentView, onLogout }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white"><Sparkles size={18} /></div>
            <span className="font-bold text-lg text-slate-800">CollabHub</span>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto block">
          <SidebarItem icon={<Target />} label="Discover" active={currentView === 'dashboard'} onClick={() => setCurrentView('dashboard')} />
          <SidebarItem icon={<MessageCircle />} label="Messages" badge="3" active={currentView === 'chat'} onClick={() => setCurrentView('chat')} />
          <SidebarItem icon={<Users />} label="My Connections" />
          
          <div className="pt-6 mt-6 border-t border-slate-100">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Settings</p>
            <SidebarItem icon={<User />} label="My Profile" />
          </div>
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <button onClick={onLogout} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg w-full transition">
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-screen overflow-hidden relative block">
        <main className="flex-1 overflow-y-auto block">
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, badge, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
      <div className="flex items-center gap-3">
        {React.cloneElement(icon, { size: 18, className: active ? 'text-indigo-600' : 'text-slate-400' })}
        {label}
      </div>
      {badge && <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
    </button>
  );
}

function FeedView() {
  const [simulatingAI, setSimulatingAI] = useState(false);
  const [aiMatchesGenerated, setAiMatchesGenerated] = useState(false);

  const generateAILogic = () => {
    setSimulatingAI(true);
    setTimeout(() => {
      setSimulatingAI(false);
      setAiMatchesGenerated(true);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 md:p-8 flex gap-8 block">
      <div className="flex-1 max-w-3xl block">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Collaboration Feed</h1>
        
        <div className="space-y-6">
          {mockCreators.map(profile => (
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} key={profile.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 hover:border-indigo-200 transition">
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
                <div className="flex items-center gap-4 mt-4">
                  <button className="flex-1 md:flex-none px-6 py-2 bg-slate-900 text-white font-semibold text-sm rounded-xl hover:bg-slate-800 transition">Message</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="w-80 hidden lg:block block">
        <div className="bg-white border border-slate-200 p-6 rounded-3xl sticky top-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
            <Sparkles className="text-indigo-600" size={20} />
            <h2 className="text-sm font-extrabold uppercase tracking-widest text-slate-800">AI Matches</h2>
          </div>
          
          <div className="space-y-4 block">
            <AnimatePresence>
              {aiMatchesGenerated ? (
                <>
                  {[mockCreators[1], mockCreators[3]].map((suggestion, i) => (
                    <motion.div key={suggestion.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="bg-slate-50 p-4 rounded-2xl border border-indigo-100/50 hover:border-indigo-300 transition">
                      <div className="flex gap-3 mb-3">
                        <img src={suggestion.img} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{suggestion.name}</h4>
                          <div className="flex items-center gap-1 text-[11px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full inline-flex mt-0.5">
                            <Bot size={10} /> 98% Match Structure
                          </div>
                        </div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-slate-100 text-xs text-slate-600 leading-relaxed shadow-sm">
                        <span className="font-bold text-indigo-600">AI Insight:</span> {suggestion.aiInsight}
                      </div>
                    </motion.div>
                  ))}
                </>
              ) : (
                simulatingAI ? (
                  <div className="flex flex-col items-center justify-center py-10 space-y-4">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest text-center animate-pulse">Running Neural Matching Algorithm...</p>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3"><Search className="text-slate-400"/></div>
                    <p className="text-sm text-slate-500 mb-6">Discover hyper-relevant collaborators tailored to your unique style.</p>
                    <button onClick={generateAILogic} className="w-full py-2.5 bg-indigo-600 text-white font-bold text-sm rounded-xl hover:bg-indigo-700 shadow-md shadow-indigo-100 transition flex justify-center items-center gap-2">
                       Generate AI Matches
                    </button>
                  </div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------
// Chat & Smart Assistants
// -----------------------------------------
function ChatView() {
  const [inputValue, setInputValue] = useState('');
  
  const handlePillClick = (text) => {
    setInputValue(text);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-white shadow-sm block border-t border-l border-slate-200 mt-2 ml-2 rounded-tl-3xl overflow-hidden">
      <div className="w-full md:w-80 border-r border-slate-100 flex flex-col shrink-0 bg-white">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-bold text-lg text-slate-800 mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input type="text" placeholder="Search chats..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto block">
          <ChatListItem user={mockCreators[1]} active message="Can you send the project files?" time="2m" unread={2} />
        </div>
      </div>
      
      <div className="flex-1 flex flex-col block h-full bg-slate-50 relative">
        <div className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-6 shrink-0 relative z-10 shadow-sm">
          <div className="flex items-center gap-3 block">
            <img src={mockCreators[1].img} alt="" className="w-9 h-9 rounded-full object-cover" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">{mockCreators[1].name}</h3>
              <p className="text-xs text-teal-600 font-medium tracking-wide">Online</p>
            </div>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 block pb-32">
          <ChatMessage text="Hey! I saw your post looking for an editor." time="10:42 AM" />
          <ChatMessage text="I've attached my latest reels portfolio here." time="10:43 AM" />
          <ChatMessage text="That looks incredible! What's your typical turnaround time?" time="10:45 AM" isMe />
          <ChatMessage text="Usually 24-48 hours depending on effects needed." time="10:46 AM" />
          <ChatMessage text="Can you send the project files?" time="10:48 AM" />
        </div>
        
        {/* Contextual Smart Assistant */}
        <div className="absolute bottom-0 w-full p-4 bg-white border-t border-slate-200 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-10">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 hide-scrollbar">
            <div className="flex items-center gap-1.5 px-3 border-r border-slate-200"><Bot size={16} className="text-indigo-600" /> <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-1">AI Assigner</span></div>
            <button onClick={() => handlePillClick("I'll send the Google Drive link right away! 🚀")} className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full transition whitespace-nowrap">"I'll send the link"</button>
            <button onClick={() => handlePillClick("Are you open to signing an NDA first?")} className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full transition whitespace-nowrap">"Ask for NDA"</button>
            <button onClick={() => handlePillClick("Awesome. Let's schedule a brief 5-min alignment call.")} className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full transition whitespace-nowrap">"Schedule Call"</button>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 pr-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition bg-white rounded-xl shadow-sm"><Sparkles size={20} /></button>
            <input value={inputValue} onChange={e=>setInputValue(e.target.value)} type="text" placeholder="Type a message..." className="flex-1 bg-transparent text-sm focus:outline-none text-slate-800" />
            <button className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 shadow-md shadow-indigo-200 transition"><Send size={18} className="-ml-0.5" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatListItem({ user, active, message, time, unread }) {
  return (
    <button className={`w-full flex items-start gap-3 p-4 transition text-left cursor-pointer border-l-2 ${active ? 'bg-indigo-50/30 border-indigo-600 block' : 'border-transparent hover:bg-slate-50 block'}`}>
      <div className="relative shrink-0">
        <img src={user.img} className="w-12 h-12 rounded-full object-cover block shadow-sm border border-slate-200" alt="" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white bg-green-500 rounded-full block" />
      </div>
      <div className="flex-1 min-w-0 pr-2 pt-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-bold text-sm text-slate-900 truncate block">{user.name}</h4>
          <span className="text-[10px] uppercase font-bold text-slate-400 shrink-0 block">{time}</span>
        </div>
        <p className={`text-sm truncate block ${unread ? 'font-bold text-slate-900' : 'text-slate-500 font-medium'}`}>{message}</p>
      </div>
    </button>
  );
}

function ChatMessage({ text, time, isMe }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex flex-col block ${isMe ? 'items-end' : 'items-start'}`}>
      <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] shadow-sm block ${isMe ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-br-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'}`}>
        <p className="text-[15px] font-medium leading-snug block">{text}</p>
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1 block">{time}</span>
    </motion.div>
  );
}
