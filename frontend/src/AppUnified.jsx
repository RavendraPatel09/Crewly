import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Search, Camera, Sparkles, Shield, MessageCircle, User, Settings, LogOut,
  Star, MapPin, DollarSign, Check, X, Zap, Target, TrendingUp, Users, Send,
  Menu, ChevronRight, Video, PenTool, LayoutTemplate, Loader2, Bot,
  Bell, BookmarkPlus, Heart, Share2, Filter, ChevronDown, Plus,
  Briefcase, Award, Clock, CheckCircle2, ArrowRight, BarChart2,
  Globe, Link, Eye, Bookmark, MoreHorizontal, Grid, List,
  Home, Compass, Inbox, Moon, Sun, Flame, Lightbulb, Rocket,
  Mic, MicOff, SmilePlus, Trophy, Calendar, Layers, TrendingDown,
  Play, Pause, Volume2, Radio, Gift, Medal, Zap as ZapIcon, ChevronUp,
  Hash, Activity, FileText, ChevronLeft, BarChart, PieChart, Wallet,
} from 'lucide-react';
import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const PROFILES = [
  {
    id: 1, name: 'Elena Vance', handle: '@elenav', role: 'Creator',
    tags: ['Lifestyle', 'Fashion', 'Beauty'], followers: '258K', engagement: '9.4%',
    rating: 4.9, reviews: 147, img: 'https://i.pravatar.cc/150?u=elena',
    cover: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=600&q=80',
    location: 'Los Angeles, CA', bio: 'Fashion & lifestyle creator building authentic brand connections.',
    aiInsight: "Elena's audience aligns 94% with luxury and beauty verticals. Her engagement rate outperforms category average by 3.1x.",
    verified: true, available: true, saved: false, matchScore: 94,
    badges: ['Top Creator', 'Fast Responder', 'Verified'],
  },
  {
    id: 2, name: 'Marcus Chen', handle: '@marcus.edits', role: 'Provider',
    tags: ['Video Editing', 'Motion Graphics', 'Color Grading'], rate: '$65/hr',
    rating: 5.0, reviews: 89, img: 'https://i.pravatar.cc/150?u=marcus',
    cover: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80',
    location: 'Toronto, CA', bio: 'Senior video editor specializing in premium short-form content.',
    aiInsight: "Marcus's 24-hr turnaround and motion graphics expertise perfectly match your listed production workflow.",
    verified: true, available: true, saved: true, matchScore: 98,
    badges: ['Top Rated', 'Pro Editor', 'Quick Turnaround'],
  },
  {
    id: 3, name: 'Sarah Jae', handle: '@sarahj', role: 'Creator',
    tags: ['Tech', 'Reviews', 'Unboxing'], followers: '1.2M', engagement: '7.8%',
    rating: 4.8, reviews: 203, img: 'https://i.pravatar.cc/150?u=sarah',
    cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80',
    location: 'San Francisco, CA', bio: 'Tech reviewer with 1.2M subscribers focused on genuine product storytelling.',
    aiInsight: "Sarah's 12% engagement on tech hardware content is exceptional. High-impact match for launch campaigns.",
    verified: true, available: false, saved: false, matchScore: 87,
    badges: ['Mega Creator', 'Tech Expert'],
  },
  {
    id: 4, name: 'David Kim', handle: '@dk.design', role: 'Provider',
    tags: ['Thumbnails', 'Branding', 'Graphic Design'], rate: '$35/hr',
    rating: 4.7, reviews: 62, img: 'https://i.pravatar.cc/150?u=david',
    cover: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&q=80',
    location: 'New York, NY', bio: 'Brand designer crafting visuals that convert viewers into subscribers.',
    aiInsight: "David's thumbnail A/B testing methodology has proven 40% CTR improvement across similar campaigns.",
    verified: false, available: true, saved: false, matchScore: 81,
    badges: ['Design Pro', 'CTR Expert'],
  },
  {
    id: 5, name: 'Priya Sharma', handle: '@priyacreates', role: 'Creator',
    tags: ['Wellness', 'Travel', 'Mindfulness'], followers: '495K', engagement: '11.2%',
    rating: 4.9, reviews: 178, img: 'https://i.pravatar.cc/150?u=priya',
    cover: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    location: 'Mumbai, IN', bio: 'Wellness advocate and travel creator inspiring mindful living globally.',
    aiInsight: "Priya's audience over-indexes 4x on wellness products. Top match for holistic brand campaigns.",
    verified: true, available: true, saved: false, matchScore: 92,
    badges: ['Rising Star', 'Wellness Expert', 'Verified'],
  },
  {
    id: 6, name: 'Alex Torres', handle: '@alex.sound', role: 'Provider',
    tags: ['Audio Engineering', 'Podcast Production', 'Music'], rate: '$45/hr',
    rating: 4.8, reviews: 51, img: 'https://i.pravatar.cc/150?u=alex',
    cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
    location: 'Austin, TX', bio: 'Audio engineer delivering crisp, broadcast-quality sound for content creators.',
    aiInsight: "Alex's podcast clients see an average 28% listener retention boost. Critical for your new audio-first strategy.",
    verified: true, available: true, saved: false, matchScore: 78,
    badges: ['Audio Wizard', 'Podcast Pro'],
  },
];

const NOTIFICATIONS = [
  { id: 1, type: 'match', text: 'Marcus Chen is a 98% AI match for your project', time: '2m ago', read: false },
  { id: 2, type: 'message', text: 'Elena Vance sent you a collaboration request', time: '1h ago', read: false },
  { id: 3, type: 'review', text: 'You received a new 5-star review from @dk.design', time: '3h ago', read: true },
  { id: 4, type: 'system', text: 'Your profile was viewed 42 times today', time: '5h ago', read: true },
  { id: 5, type: 'match', text: 'Priya Sharma accepted your collab invite', time: '8h ago', read: true },
  { id: 6, type: 'review', text: 'New badge unlocked: "Rising Collaborator"', time: '1d ago', read: true },
];

const CHAT_HISTORY = [
  { id: 1, from: 'them', text: "Hey! Saw your post looking for a motion graphics editor.", time: "10:41 AM" },
  { id: 2, from: 'them', text: "I specialize in fast-paced social content. Here's my reel — let me know what you think!", time: "10:42 AM" },
  { id: 3, from: 'me', text: "That reel is stunning. Exactly the vibe I'm going for. What's your typical turnaround?", time: "10:45 AM" },
  { id: 4, from: 'them', text: "24–48 hrs for a standard edit, 3 days for heavy motion graphics. I also do revisions until you're happy.", time: "10:47 AM" },
  { id: 5, from: 'them', text: "Can you send the brief and raw files? I can send a sample cut within 24 hrs.", time: "10:48 AM" },
];

const STORIES = [
  { id: 0, name: 'Your Story', img: 'https://i.pravatar.cc/150?u=currentuser', isOwn: true, unseen: false },
  { id: 1, name: 'Elena V.', img: 'https://i.pravatar.cc/150?u=elena', unseen: true },
  { id: 2, name: 'Marcus', img: 'https://i.pravatar.cc/150?u=marcus', unseen: true },
  { id: 3, name: 'Sarah J.', img: 'https://i.pravatar.cc/150?u=sarah', unseen: true },
  { id: 4, name: 'David K.', img: 'https://i.pravatar.cc/150?u=david', unseen: false },
  { id: 5, name: 'Priya S.', img: 'https://i.pravatar.cc/150?u=priya', unseen: true },
  { id: 6, name: 'Alex T.', img: 'https://i.pravatar.cc/150?u=alex', unseen: false },
];

const TRENDING_TOPICS = [
  { id: 1, tag: '#UGCCreators', posts: '14.2K', growth: '+32%', emoji: '🔥' },
  { id: 2, tag: '#AIVideoEditing', posts: '8.4K', growth: '+89%', emoji: '🤖' },
  { id: 3, tag: '#ThumbnailTips', posts: '6.1K', growth: '+21%', emoji: '🎨' },
  { id: 4, tag: '#YouTubeGrowth', posts: '22.7K', growth: '+14%', emoji: '📈' },
  { id: 5, tag: '#PodcastLaunch', posts: '3.9K', growth: '+56%', emoji: '🎙️' },
];

const COMMUNITY_POSTS = [
  {
    id: 1, author: PROFILES[0], time: '32m ago',
    content: 'Just wrapped a brand deal with a wellness startup — here\'s what made it work without sacrificing authenticity. Thread 🧵',
    reactions: { '🔥': 48, '❤️': 31, '👏': 22 }, comments: 17, reposted: false,
  },
  {
    id: 2, author: PROFILES[1], time: '1h ago',
    content: 'My motion reel just hit 500K views on LinkedIn. Crazy to think this started as a side hustle 2 years ago. Keep creating. 🚀',
    reactions: { '🔥': 102, '❤️': 76, '👏': 55 }, comments: 34, reposted: false,
  },
  {
    id: 3, author: PROFILES[4], time: '3h ago',
    content: 'Hot take: Your thumbnail matters more than your title for the first 30 days of a new video. Here\'s the data... 📊',
    reactions: { '🔥': 67, '❤️': 41, '🤔': 19 }, comments: 28, reposted: false,
  },
];

const KANBAN_COLUMNS = [
  {
    id: 'pipeline', label: 'Pipeline', color: 'indigo',
    cards: [
      { id: 'k1', title: 'Brand Deal — FitTech App', person: 'Elena Vance', budget: '$1,500', due: 'May 3' },
      { id: 'k2', title: 'YouTube Thumbnail Refresh', person: 'David Kim', budget: '$400', due: 'May 5' },
    ],
  },
  {
    id: 'in-progress', label: 'In Progress', color: 'violet',
    cards: [
      { id: 'k3', title: 'Motion Reel — Q2 Campaign', person: 'Marcus Chen', budget: '$2,200', due: 'Apr 30' },
    ],
  },
  {
    id: 'review', label: 'In Review', color: 'amber',
    cards: [
      { id: 'k4', title: 'Podcast Audio — Episode 12', person: 'Alex Torres', budget: '$600', due: 'Apr 28' },
    ],
  },
  {
    id: 'done', label: 'Completed', color: 'teal',
    cards: [
      { id: 'k5', title: 'Travel Collab — Bali Vlog', person: 'Priya Sharma', budget: '$3,000', due: 'Apr 20' },
      { id: 'k6', title: 'Tech Review — Gadget X', person: 'Sarah Jae', budget: '$1,800', due: 'Apr 15' },
    ],
  },
];

const CHART_DATA = [18, 34, 28, 52, 46, 68, 74, 62, 89, 95, 82, 110];
const CHART_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ACHIEVEMENTS = [
  { id: 1, icon: '🏆', title: 'First Collab', desc: 'Completed your first collaboration', earned: true },
  { id: 2, icon: '⚡', title: 'Fast Mover', desc: 'Responded within 1 hour', earned: true },
  { id: 3, icon: '🌟', title: 'Top Rated', desc: 'Maintained 4.8+ rating for 30 days', earned: true },
  { id: 4, icon: '🔥', title: 'Hot Streak', desc: '5 collabs in a single month', earned: false },
  { id: 5, icon: '💎', title: 'Diamond Creator', desc: 'Reached $10K in collaborations', earned: false },
  { id: 6, icon: '🤖', title: 'AI Pioneer', desc: 'First to use AI Brief Generator', earned: true },
];

const LEADERBOARD = [
  { rank: 1, name: 'Sarah Jae', handle: '@sarahj', score: 9840, img: 'https://i.pravatar.cc/150?u=sarah', delta: '+12' },
  { rank: 2, name: 'Elena Vance', handle: '@elenav', score: 9210, img: 'https://i.pravatar.cc/150?u=elena', delta: '+5' },
  { rank: 3, name: 'Marcus Chen', handle: '@marcus.edits', score: 8760, img: 'https://i.pravatar.cc/150?u=marcus', delta: '+8' },
  { rank: 4, name: 'Priya Sharma', handle: '@priyacreates', score: 7920, img: 'https://i.pravatar.cc/150?u=priya', delta: '+22' },
  { rank: 5, name: 'Alex Torres', handle: '@alex.sound', score: 6540, img: 'https://i.pravatar.cc/150?u=alex', delta: '-3' },
  { rank: 7, name: 'Alex Creator', handle: '@you', score: 4210, img: 'https://i.pravatar.cc/150?u=currentuser', delta: '+18', isYou: true },
];

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const [view, setView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [savedProfiles, setSavedProfiles] = useState([PROFILES[1]]);

  const navigate = useCallback((v) => setView(v), []);

  const isInDashboard = ['dashboard', 'explore', 'chat', 'notifications', 'profile', 'settings', 'saved', 'analytics', 'projects', 'community', 'leaderboard'].includes(view);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased font-sans">
      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          {view === 'landing' && <LandingPage onNavigate={navigate} />}
          {view === 'auth' && (
            <AuthFlow
              onComplete={(role) => { setUserRole(role); navigate('dashboard'); }}
              onBack={() => navigate('landing')}
            />
          )}
          {isInDashboard && (
            <AppShell
              view={view}
              setView={navigate}
              userRole={userRole}
              savedProfiles={savedProfiles}
              setSavedProfiles={setSavedProfiles}
              notifications={NOTIFICATIONS}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LANDING PAGE
───────────────────────────────────────────── */
function LandingPage({ onNavigate }) {
  const stats = [
    { value: '50K+', label: 'Active Creators' },
    { value: '12K+', label: 'Service Providers' },
    { value: '$8M+', label: 'Collaborations Paid' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  const features = [
    { icon: <Bot size={24} />, color: 'indigo', title: 'AI-Powered Matching', desc: 'Our neural engine analyzes 120+ compatibility signals to surface your perfect collaborator.' },
    { icon: <Shield size={24} />, color: 'teal', title: 'Trust & Verification', desc: 'Every provider is background-checked, portfolio-verified, and rated by real creators.' },
    { icon: <Zap size={24} />, color: 'violet', title: 'Lightning-Fast Setup', desc: 'From sign-up to first collaboration in under 10 minutes, with guided AI onboarding.' },
    { icon: <BarChart2 size={24} />, color: 'rose', title: 'Real-Time Analytics', desc: 'Track campaign performance, engagement rates, and ROI from your personalized dashboard.' },
  ];

  const colorMap = {
    indigo: 'bg-indigo-50 text-indigo-600',
    teal: 'bg-teal-50 text-teal-600',
    violet: 'bg-violet-50 text-violet-600',
    rose: 'bg-rose-50 text-rose-600',
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-2xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button className="hover:text-indigo-600 transition-colors">Features</button>
            <button className="hover:text-indigo-600 transition-colors">Pricing</button>
            <button className="hover:text-indigo-600 transition-colors">Blog</button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('auth')} className="hidden md:block text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors px-4 py-2">Log in</button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('auth')} className="px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-colors">
              Get Started Free
            </motion.button>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-white py-28 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-64 h-64 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="relative max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full mb-8">
            <Bot size={13} /> AI-Powered Creator Platform
          </motion.div>
          <h1 className="text-5xl md:text-[72px] font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            Where Creators Meet<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-teal-500">Their Perfect Match</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed mb-10">
            CollabHub uses advanced AI to connect content creators with elite editors, designers, and strategists — turning good content into great brands.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('auth')} className="px-8 py-4 text-base font-bold text-white bg-indigo-600 rounded-2xl hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all flex items-center gap-2 justify-center">
              Start for Free <ArrowRight size={18} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate('auth')} className="px-8 py-4 text-base font-semibold text-slate-700 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 hover:text-indigo-700 transition-all">
              View Demo
            </motion.button>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50/50 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
              <div className="text-4xl font-extrabold text-indigo-600 mb-1">{s.value}</div>
              <div className="text-sm font-medium text-slate-500">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Everything you need to collaborate smarter</h2>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Built for creators who take their craft seriously.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }} className="group p-7 bg-slate-50 hover:bg-white rounded-3xl border border-slate-100 hover:border-indigo-100 hover:shadow-xl transition-all duration-300 cursor-default">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${colorMap[f.color]} group-hover:scale-110 transition-transform`}>{f.icon}</div>
                <h3 className="font-bold text-lg text-slate-900 mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-extrabold text-slate-900">Trending Collaborators</h2>
            <button onClick={() => onNavigate('auth')} className="text-sm font-bold text-indigo-600 flex items-center gap-1 hover:gap-2 transition-all">Browse All <ChevronRight size={16} /></button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROFILES.slice(0, 6).map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08 }}>
                <ProfileCard profile={p} onSave={() => {}} minimal />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-r from-indigo-600 to-violet-600">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Ready to build your creative empire?</h2>
          <p className="text-indigo-100 text-lg mb-8 leading-relaxed">Join 50,000+ creators already leveling up with AI-matched collaborators.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={() => onNavigate('auth')} className="px-10 py-4 bg-white text-indigo-700 font-extrabold text-base rounded-2xl shadow-2xl hover:shadow-white/20 transition">
            Join Free Today
          </motion.button>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-10 px-6 text-center text-sm text-slate-400">
        © 2026 CollabHub, Inc. · <button className="hover:text-slate-700">Privacy</button> · <button className="hover:text-slate-700">Terms</button> · <button className="hover:text-slate-700">Support</button>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AUTH FLOW (3-STEP)
───────────────────────────────────────────── */
function AuthFlow({ onComplete, onBack }) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [bioInput, setBioInput] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedBio, setEnhancedBio] = useState('');
  const [interests, setInterests] = useState([]);

  const INTEREST_OPTIONS = ['Fashion', 'Tech', 'Gaming', 'Travel', 'Wellness', 'Food', 'Finance', 'Music', 'Sports', 'Beauty'];
  const PROVIDER_OPTIONS = ['Video Editing', 'Motion Graphics', 'Thumbnails', 'Brand Strategy', 'Audio', 'Photography', 'Copywriting'];

  const options = role === 'creator' ? INTEREST_OPTIONS : PROVIDER_OPTIONS;

  const toggleInterest = (tag) => setInterests(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleEnhance = () => {
    if (!bioInput.trim()) return;
    setIsEnhancing(true);
    setEnhancedBio('');
    setTimeout(() => {
      setIsEnhancing(false);
      const base = role === 'creator'
        ? `Digital content creator specializing in ${interests.slice(0, 2).join(' & ') || 'lifestyle'} storytelling. Known for authentic audience engagement and consistent brand partnerships. Focused on building long-term creative collaborations that drive measurable results.`
        : `Professional ${interests[0] || 'creative'} specialist with a track record of elevating creator brands. Delivering high-quality, deadline-driven work with clear communication and precision output.`;
      let i = 0;
      const interval = setInterval(() => {
        setEnhancedBio(base.substring(0, i + 1));
        i++;
        if (i >= base.length) clearInterval(interval);
      }, 12);
    }, 1600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white flex flex-col items-center justify-center p-6">
      <button onClick={onBack} className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors">
        <ChevronRight className="rotate-180" size={16} /> Back
      </button>

      <div className="w-full max-w-md mb-10">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
          {['Choose Role', 'Build Profile', 'Done'].map((label, i) => (
            <span key={label} className={i <= step ? 'text-indigo-600' : ''}>{label}</span>
          ))}
        </div>
        <div className="h-1.5 bg-slate-200 rounded-full">
          <motion.div animate={{ width: `${[(33), (66), (100)][step]}%` }} transition={{ duration: 0.5 }} className="h-full bg-gradient-to-r from-indigo-600 to-violet-500 rounded-full" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div key="role" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="w-full max-w-2xl">
            <div className="text-center mb-10">
              <Logo className="mx-auto mb-6" />
              <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Choose your path</h1>
              <p className="text-slate-500">Select how you'll use CollabHub for a personalized experience.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: 'creator', icon: <Camera size={28} />, label: 'I am a Creator', sub: 'I produce content and need editors, designers, or strategists.', color: 'indigo', perks: ['Browse 12K+ verified providers', 'AI-matched recommendations', 'Secure payments & contracts'] },
                { id: 'provider', icon: <PenTool size={28} />, label: 'I am a Provider', sub: 'I offer services to help creators scale their content brand.', color: 'teal', perks: ['Access premium creator jobs', 'Showcase your portfolio', 'Build long-term client base'] },
              ].map(item => (
                <motion.button key={item.id} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }} onClick={() => { setRole(item.id); setStep(1); }} className="text-left p-7 bg-white border-2 border-slate-100 hover:border-indigo-500 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${item.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : 'bg-teal-50 text-teal-600'} group-hover:scale-110 transition-transform`}>{item.icon}</div>
                  <h2 className="text-xl font-extrabold text-slate-900 mb-1">{item.label}</h2>
                  <p className="text-slate-500 text-sm mb-5 leading-relaxed">{item.sub}</p>
                  {item.perks.map(perk => (
                    <div key={perk} className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                      <Check size={16} className={item.color === 'indigo' ? 'text-indigo-500' : 'text-teal-500'} /> {perk}
                    </div>
                  ))}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div key="bio" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="w-full max-w-xl">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-700"><Bot size={20} /></div>
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">AI Profile Setup</h2>
                  <p className="text-xs text-slate-500">Let AI craft your perfect profile bio.</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-bold text-slate-700 mb-2">Select your {role === 'creator' ? 'content niches' : 'skills'}</label>
                <div className="flex flex-wrap gap-2">
                  {options.map(tag => (
                    <button key={tag} onClick={() => toggleInterest(tag)} className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${interests.includes(tag) ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-400'}`}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-bold text-slate-700 mb-2">Describe yourself (rough draft is fine)</label>
                <textarea value={bioInput} onChange={e => setBioInput(e.target.value)} placeholder={role === 'creator' ? "e.g. I make gaming videos and need good thumbnails" : "e.g. I edit fast-paced reels and do motion graphics"} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 h-24 resize-none transition" />
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={handleEnhance} disabled={isEnhancing} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition">
                {isEnhancing ? <><Loader2 className="animate-spin" size={16} /> Analyzing...</> : <><Sparkles size={16} /> Enhance with AI</>}
              </motion.button>

              <AnimatePresence>
                {(enhancedBio || isEnhancing) && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-5 overflow-hidden">
                    <div className="bg-gradient-to-br from-teal-50 to-indigo-50 border border-teal-100 rounded-2xl p-4">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 mb-2 uppercase tracking-wider"><Sparkles size={12} /> AI Result</div>
                      <p className="text-sm text-teal-900 leading-relaxed min-h-12">
                        {isEnhancing ? <span className="text-slate-400 italic animate-pulse">Analyzing persona...</span> : enhancedBio}
                        {enhancedBio && <span className="inline-block w-0.5 h-4 bg-indigo-500 ml-0.5 animate-pulse align-middle" />}
                      </p>
                    </div>
                    {enhancedBio && (
                      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={() => setStep(2)} className="w-full mt-4 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition flex items-center justify-center gap-2">
                        Complete Setup <ArrowRight size={16} />
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={() => setStep(2)} className="w-full mt-3 py-2 text-sm font-semibold text-slate-400 hover:text-slate-700 transition">Skip for now</button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <motion.div animate={{ scale: [0, 1.2, 1], rotate: [0, 15, -10, 0] }} transition={{ delay: 0.1, duration: 0.6 }} className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 shadow-2xl shadow-indigo-300">
              🎉
            </motion.div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-3">You're all set!</h1>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Your AI-powered ColabHub profile is ready. Start discovering amazing collaborators.</p>
            <motion.button whileHover={{ scale: 1.04 }} onClick={() => onComplete(role)} className="px-10 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition flex items-center gap-2 mx-auto">
              Go to Dashboard <Rocket size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP SHELL (SIDEBAR + CONTENT)
───────────────────────────────────────────── */
function AppShell({ view, setView, userRole, savedProfiles, setSavedProfiles, notifications }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: <Home size={20} /> },
    { id: 'explore', label: 'Explore', icon: <Compass size={20} /> },
    { id: 'community', label: 'Community', icon: <Globe size={20} />, badge: 'New' },
    { id: 'projects', label: 'Projects', icon: <Layers size={20} /> },
    { id: 'chat', label: 'Messages', icon: <MessageCircle size={20} />, badge: '3' },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, badge: unreadCount > 0 ? String(unreadCount) : null },
    { id: 'leaderboard', label: 'Leaderboard', icon: <Trophy size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart2 size={20} /> },
    { id: 'saved', label: 'Saved', icon: <Bookmark size={20} /> },
    { id: 'profile', label: 'Profile', icon: <User size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  const handleSaveToggle = (profile) => {
    setSavedProfiles(prev =>
      prev.find(p => p.id === profile.id)
        ? prev.filter(p => p.id !== profile.id)
        : [...prev, { ...profile, saved: true }]
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden" />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{ x: sidebarOpen || true ? 0 : -280 }}
        className="hidden md:flex w-64 bg-white border-r border-slate-100 flex-col h-screen shrink-0"
      >
        <div className="h-16 flex items-center px-5 border-b border-slate-100">
          <Logo />
        </div>

        <div className="m-3 p-3 bg-indigo-50/60 rounded-2xl flex items-center gap-3">
          <img src="https://i.pravatar.cc/150?u=currentuser" alt="You" className="w-9 h-9 rounded-full border-2 border-indigo-200" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-slate-900 truncate">Alex Creator</p>
            <p className="text-xs text-indigo-600 font-semibold">{userRole === 'provider' ? 'Service Provider' : 'Creator'}</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-teal-400 ring-2 ring-white" />
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5">
          {navItems.map(item => (
            <SidebarItem key={item.id} {...item} active={view === item.id} onClick={() => setView(item.id)} />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button onClick={() => setView('landing')} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl w-full transition-colors">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </motion.aside>

      <div className="flex-1 flex flex-col min-h-0">
        <header className="md:hidden h-16 bg-white border-b border-slate-100 flex items-center justify-between px-4 shrink-0">
          <button onClick={() => setSidebarOpen(v => !v)} className="text-slate-600"><Menu size={22} /></button>
          <Logo />
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"><User size={16} className="text-indigo-600" /></div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div key={view} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="h-full">
              {view === 'dashboard' && <DashboardHome setView={setView} onSaveToggle={handleSaveToggle} savedProfiles={savedProfiles} />}
              {view === 'explore' && <ExplorePage onSaveToggle={handleSaveToggle} savedProfiles={savedProfiles} />}
              {view === 'community' && <CommunityPage />}
              {view === 'projects' && <ProjectsPage />}
              {view === 'chat' && <ChatPage />}
              {view === 'notifications' && <NotificationsPage notifications={notifications} />}
              {view === 'leaderboard' && <LeaderboardPage />}
              {view === 'analytics' && <AnalyticsPage />}
              {view === 'saved' && <SavedPage savedProfiles={savedProfiles} onSaveToggle={handleSaveToggle} />}
              {view === 'profile' && <ProfilePage userRole={userRole} />}
              {view === 'settings' && <SettingsPage />}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SIDEBAR ITEM
───────────────────────────────────────────── */
function SidebarItem({ icon, label, active, badge, onClick }) {
  return (
    <button onClick={onClick} className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${active ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
      <div className="flex items-center gap-3">
        <span className={active ? 'text-indigo-100' : 'text-slate-400'}>{icon}</span>
        {label}
      </div>
      {badge && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${active ? 'bg-white/30 text-white' : badge === 'New' ? 'bg-teal-500 text-white' : 'bg-indigo-600 text-white'}`}>{badge}</span>}
    </button>
  );
}

/* ─────────────────────────────────────────────
   FEATURE 1: STORIES BAR
───────────────────────────────────────────── */
function StoriesBar() {
  const [activeStory, setActiveStory] = useState(null);
  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar mb-6">
        {STORIES.map(story => (
          <motion.button
            key={story.id}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !story.isOwn && setActiveStory(story)}
            className="flex flex-col items-center gap-1.5 shrink-0"
          >
            <div className={`p-0.5 rounded-full ${story.unseen ? 'bg-gradient-to-tr from-indigo-500 via-violet-500 to-teal-400' : story.isOwn ? 'bg-slate-200' : 'bg-slate-200'}`}>
              <div className="bg-white p-0.5 rounded-full">
                <div className="relative">
                  <img src={story.img} alt={story.name} className="w-14 h-14 rounded-full object-cover" />
                  {story.isOwn && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center border-2 border-white">
                      <Plus size={10} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className={`text-[11px] font-semibold truncate w-16 text-center ${story.isOwn ? 'text-indigo-600' : 'text-slate-600'}`}>{story.name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setActiveStory(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-3xl overflow-hidden w-80 shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="h-2 bg-slate-100 m-3 rounded-full">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 4, ease: 'linear' }}
                  onAnimationComplete={() => setActiveStory(null)}
                  className="h-full bg-indigo-600 rounded-full"
                />
              </div>
              <div className="flex items-center gap-3 px-4 pb-3">
                <img src={activeStory.img} className="w-8 h-8 rounded-full" alt="" />
                <span className="font-bold text-sm">{activeStory.name}</span>
                <button onClick={() => setActiveStory(null)} className="ml-auto text-slate-400 hover:text-slate-700"><X size={18} /></button>
              </div>
              <div className="h-64 bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                <div className="text-center">
                  <img src={activeStory.img} className="w-20 h-20 rounded-full mx-auto mb-3 border-4 border-white shadow-xl" alt="" />
                  <p className="font-bold text-slate-800">{activeStory.name}</p>
                  <p className="text-xs text-slate-500 mt-1">Just shared an update ✨</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────
   FEATURE 2: MINI SPARKLINE CHART
───────────────────────────────────────────── */
function SparklineChart({ data, color = '#6366f1' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 48;
  const w = 200;
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min)) * h;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-12" preserveAspectRatio="none">
      <defs>
        <linearGradient id="spark-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points={points} />
      <polygon fill="url(#spark-grad)" points={`0,${h} ${points} ${w},${h}`} />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   FEATURE 3: AI BRIEF GENERATOR MODAL
───────────────────────────────────────────── */
function AIBriefModal({ onClose }) {
  const [step, setStep] = useState(0);
  const [brief, setBrief] = useState('');
  const [generating, setGenerating] = useState(false);
  const [projectType, setProjectType] = useState('');
  const [budget, setBudget] = useState('');

  const TYPES = ['YouTube Video', 'TikTok Reel', 'Podcast Episode', 'Brand Campaign', 'Instagram Series'];
  const BUDGETS = ['Under $500', '$500–$1,500', '$1,500–$5K', '$5K+'];

  const generate = () => {
    setGenerating(true);
    setBrief('');
    const text = `📋 Collaboration Brief\n\nProject Type: ${projectType}\nBudget Range: ${budget}\n\nObjective:\nWe are seeking a skilled ${projectType === 'YouTube Video' ? 'video editor' : 'content professional'} to collaborate on a high-impact ${projectType}. The goal is to elevate our brand presence and drive audience engagement.\n\nScope of Work:\n• Concept development aligned with brand guidelines\n• Full production / post-production cycle\n• 2 rounds of revisions included\n• Final deliverable in platform-optimized formats\n\nTimeline: 2–3 weeks from kickoff\nDeadline: Negotiable\n\nIdeal Collaborator:\nVerified, available, with prior experience in similar campaigns. Strong communication and portfolio required.\n\n— CollabHub AI Generated Brief ✨`;

    let i = 0;
    setTimeout(() => {
      setGenerating(false);
      const interval = setInterval(() => {
        setBrief(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 8);
    }, 1800);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-3xl shadow-2xl w-full max-w-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center"><FileText size={20} /></div>
              <div>
                <h2 className="font-extrabold text-lg">AI Brief Generator</h2>
                <p className="text-indigo-100 text-xs">Generate a professional collaboration brief instantly</p>
              </div>
            </div>
            <button onClick={onClose} className="text-white/70 hover:text-white"><X size={20} /></button>
          </div>
        </div>

        <div className="p-6">
          {!brief && !generating ? (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 block">Project Type</label>
                <div className="flex flex-wrap gap-2">
                  {TYPES.map(t => (
                    <button key={t} onClick={() => setProjectType(t)} className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${projectType === t ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 text-slate-600 hover:border-indigo-400'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-2 block">Budget Range</label>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map(b => (
                    <button key={b} onClick={() => setBudget(b)} className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${budget === b ? 'bg-violet-600 text-white border-violet-600' : 'border-slate-200 text-slate-600 hover:border-violet-400'}`}>{b}</button>
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={generate}
                disabled={!projectType || !budget}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold rounded-xl disabled:opacity-40 flex items-center justify-center gap-2 shadow-md shadow-indigo-200"
              >
                <Sparkles size={16} /> Generate Brief
              </motion.button>
            </div>
          ) : (
            <div>
              {generating ? (
                <div className="flex flex-col items-center py-10 gap-4">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 border-4 border-indigo-100 rounded-full" />
                    <div className="absolute inset-0 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-sm font-bold text-slate-400 animate-pulse">Drafting your brief...</p>
                </div>
              ) : (
                <>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 h-64 overflow-y-auto font-mono text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">
                    {brief}<span className="inline-block w-0.5 h-4 bg-indigo-600 animate-pulse align-middle ml-0.5" />
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => { setBrief(''); setGenerating(false); setProjectType(''); setBudget(''); }} className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50">Regenerate</button>
                    <button onClick={onClose} className="flex-1 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700">Use This Brief ✓</button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   DASHBOARD HOME
───────────────────────────────────────────── */
function DashboardHome({ setView, onSaveToggle, savedProfiles }) {
  const [aiMatchesLoading, setAiMatchesLoading] = useState(false);
  const [aiMatches, setAiMatches] = useState(null);
  const [showBriefModal, setShowBriefModal] = useState(false);

  const runAIMatch = () => {
    setAiMatchesLoading(true);
    setAiMatches(null);
    setTimeout(() => {
      setAiMatchesLoading(false);
      setAiMatches(PROFILES.filter(p => p.id === 2 || p.id === 4));
    }, 2200);
  };

  const stats = [
    { label: 'Profile Views', value: '1,284', delta: '+18%', color: 'indigo', icon: <Eye size={20} />, chart: [40, 55, 48, 70, 65, 80, 90, 95, 88, 110, 102, 120] },
    { label: 'Collaborations', value: '12', delta: '+3', color: 'teal', icon: <Briefcase size={20} />, chart: [2, 3, 2, 4, 5, 4, 6, 7, 8, 9, 10, 12] },
    { label: 'Avg. Rating', value: '4.9', delta: '★★★★★', color: 'violet', icon: <Star size={20} />, chart: [4.5, 4.6, 4.7, 4.7, 4.8, 4.8, 4.9, 4.9, 4.9, 4.9, 4.9, 4.9] },
    { label: 'AI Matches', value: '34', delta: 'new today', color: 'rose', icon: <Bot size={20} />, chart: [5, 8, 12, 10, 18, 22, 16, 28, 24, 30, 32, 34] },
  ];

  const chartColors = { indigo: '#6366f1', teal: '#14b8a6', violet: '#8b5cf6', rose: '#f43f5e' };
  const colorBg = { indigo: 'bg-indigo-50 text-indigo-600', teal: 'bg-teal-50 text-teal-600', violet: 'bg-violet-50 text-violet-600', rose: 'bg-rose-50 text-rose-600' };
  const colorDelta = { indigo: 'text-indigo-600', teal: 'text-teal-600', violet: 'text-violet-600', rose: 'text-rose-600' };

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Greeting */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Good morning, Alex 👋</h1>
          <p className="text-slate-500 text-sm mt-1">You have <span className="font-bold text-indigo-600">3 new collaboration requests</span> waiting.</p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <motion.button whileHover={{ scale: 1.04 }} onClick={() => setShowBriefModal(true)} className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 text-white text-sm font-bold rounded-xl shadow-md shadow-violet-200 hover:bg-violet-700 transition">
            <FileText size={16} /> AI Brief
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} onClick={() => setView('explore')} className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200 hover:bg-indigo-700 transition">
            <Plus size={16} /> New Search
          </motion.button>
        </div>
      </div>

      {/* FEATURE 1: Stories Bar */}
      <StoriesBar />

      {/* Stats Cards with Sparklines */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
            <div className={`w-10 h-10 ${colorBg[s.color]} rounded-xl flex items-center justify-center mb-3`}>{s.icon}</div>
            <div className="text-2xl font-extrabold text-slate-900">{s.value}</div>
            <div className="text-xs font-semibold text-slate-400 mt-0.5">{s.label}</div>
            <div className={`text-xs font-bold mt-1 ${colorDelta[s.color]}`}>{s.delta}</div>
            {/* FEATURE 2: Sparkline */}
            <div className="mt-3 -mx-2">
              <SparklineChart data={s.chart} color={chartColors[s.color]} />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        {/* Feed */}
        <div className="flex-1">
          {/* FEATURE 6: Trending Topics */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Flame size={16} className="text-orange-500" />
              <h2 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">Trending Now</h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-1 no-scrollbar">
              {TRENDING_TOPICS.map((topic, i) => (
                <motion.button
                  key={topic.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="shrink-0 bg-white border border-slate-100 rounded-2xl px-4 py-3 text-left hover:border-indigo-200 hover:shadow-md transition-all"
                >
                  <div className="text-xl mb-1">{topic.emoji}</div>
                  <div className="font-bold text-sm text-slate-800">{topic.tag}</div>
                  <div className="text-xs text-slate-400">{topic.posts} posts</div>
                  <div className="text-xs font-bold text-teal-600 mt-1">{topic.growth}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <h2 className="font-extrabold text-slate-900 mb-4 text-lg">Recent Collaborators</h2>
          <div className="space-y-4">
            {PROFILES.slice(0, 4).map((profile, i) => {
              const isSaved = !!savedProfiles.find(p => p.id === profile.id);
              return (
                <motion.div key={profile.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                  <ProfileCard profile={profile} isSaved={isSaved} onSave={() => onSaveToggle(profile)} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* AI Match Sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 sticky top-4">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b border-slate-100">
              <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600"><Bot size={16} /></div>
              <h2 className="font-extrabold text-sm uppercase tracking-widest text-slate-800">AI Match Engine</h2>
            </div>

            <AnimatePresence mode="wait">
              {aiMatches ? (
                <motion.div key="matches" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {aiMatches.map((p, i) => (
                    <motion.div key={p.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }} className="group bg-gradient-to-br from-indigo-50/80 to-white p-4 rounded-2xl border border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center gap-3 mb-3">
                        <img src={p.img} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                        <div>
                          <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                          <div className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full mt-0.5">
                            <CheckCircle2 size={9} /> {p.matchScore}% AI Match
                          </div>
                        </div>
                      </div>
                      {/* FEATURE 8: Skill Match Meter */}
                      <div className="mb-2">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1">
                          <span>Compatibility</span><span>{p.matchScore}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${p.matchScore}%` }}
                            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed bg-white rounded-xl p-3 border border-slate-100">
                        <span className="font-bold text-indigo-600">AI Insight: </span>{p.aiInsight}
                      </p>
                    </motion.div>
                  ))}
                  <button onClick={() => setView('explore')} className="w-full py-2.5 text-sm font-bold text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors mt-2">
                    View All Matches →
                  </button>
                </motion.div>
              ) : aiMatchesLoading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10 gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 border-4 border-indigo-100 rounded-full" />
                    <div className="absolute inset-0 w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest animate-pulse text-center">Running Neural Match Algorithm...</p>
                </motion.div>
              ) : (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4"><Lightbulb className="text-slate-400" size={24} /></div>
                  <p className="text-sm text-slate-500 mb-5 leading-relaxed">Discover hyper-relevant collaborators matched to your exact style and budget.</p>
                  <button onClick={runAIMatch} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-sm rounded-xl shadow-md shadow-indigo-200 hover:shadow-lg transition flex items-center justify-center gap-2">
                    <Sparkles size={16} /> Generate AI Matches
                  </button>
                  <p className="text-[10px] text-slate-400 mt-3">Powered by CollabHub Neural Engine™</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick Actions */}
          <div className="mt-4 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Quick Actions</h3>
            <div className="space-y-1">
              {[
                { label: 'Generate AI Brief', icon: <FileText size={15} />, color: 'text-violet-600 bg-violet-50 hover:bg-violet-100', action: () => setShowBriefModal(true) },
                { label: 'Post a collaboration brief', icon: <Plus size={15} />, color: 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100', action: () => {} },
                { label: 'Upgrade to Pro', icon: <Rocket size={15} />, color: 'text-violet-600 bg-violet-50 hover:bg-violet-100', action: () => {} },
                { label: 'Invite a colleague', icon: <Users size={15} />, color: 'text-teal-600 bg-teal-50 hover:bg-teal-100', action: () => {} },
              ].map(action => (
                <button key={action.label} onClick={action.action} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${action.color}`}>
                  {action.icon} {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* FEATURE 3: AI Brief Modal */}
      <AnimatePresence>
        {showBriefModal && <AIBriefModal onClose={() => setShowBriefModal(false)} />}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROFILE CARD (Reusable) with Match Meter
───────────────────────────────────────────── */
function ProfileCard({ profile, isSaved, onSave, minimal = false }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout className={`bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-indigo-100 transition-all duration-300 overflow-hidden ${!minimal ? 'cursor-pointer' : ''}`}>
      <div className="relative h-24 bg-gradient-to-r from-indigo-100 to-violet-100 overflow-hidden">
        {profile.cover && <img src={profile.cover} alt="" className="w-full h-full object-cover opacity-40" />}
        <div className="absolute inset-0 bg-gradient-to-t from-white/0 via-transparent to-transparent" />
        {!minimal && onSave && (
          <button onClick={(e) => { e.stopPropagation(); onSave(); }} className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${isSaved ? 'bg-indigo-600 text-white' : 'bg-white/80 text-slate-500 hover:bg-white'}`}>
            <Bookmark size={15} className={isSaved ? 'fill-white' : ''} />
          </button>
        )}
        {profile.available !== undefined && (
          <div className={`absolute top-3 left-3 px-2 py-0.5 rounded-full text-[10px] font-extrabold ${profile.available ? 'bg-teal-500 text-white' : 'bg-slate-300 text-slate-600'}`}>
            {profile.available ? '● Available' : 'Busy'}
          </div>
        )}
      </div>

      <div className="px-5 pb-5">
        <div className="flex items-end justify-between -mt-8 mb-3">
          <img src={profile.img} alt={profile.name} className="w-16 h-16 rounded-2xl border-4 border-white shadow-md object-cover" />
          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 border border-amber-100 rounded-full px-2 py-1">
            <Star size={11} className="fill-amber-400 text-amber-400" /> {profile.rating} ({profile.reviews})
          </div>
        </div>

        <div className="flex items-start justify-between mb-1">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-slate-900">{profile.name}</h3>
              {profile.verified && <CheckCircle2 size={15} className="text-indigo-600 fill-indigo-100" />}
            </div>
            <p className="text-xs text-slate-400 font-medium">{profile.handle}</p>
          </div>
          {profile.rate ? (
            <span className="font-bold text-teal-600 text-sm">{profile.rate}</span>
          ) : (
            <span className="text-xs font-bold text-slate-500">{profile.followers} <span className="text-slate-300">followers</span></span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400 font-medium mb-3">
          <MapPin size={11} /> {profile.location}
        </div>

        {/* FEATURE 8: Skill Match Meter */}
        {profile.matchScore && (
          <div className="mb-3">
            <div className="flex justify-between text-[10px] font-bold text-slate-400 mb-1">
              <span>AI Match Score</span><span className="text-indigo-600">{profile.matchScore}%</span>
            </div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${profile.matchScore}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full ${profile.matchScore >= 90 ? 'bg-gradient-to-r from-teal-400 to-indigo-500' : profile.matchScore >= 80 ? 'bg-gradient-to-r from-indigo-400 to-violet-500' : 'bg-gradient-to-r from-slate-300 to-slate-400'}`}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {profile.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-lg">{tag}</span>
          ))}
        </div>

        {!minimal && (
          <>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{profile.bio}</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 flex items-center justify-center gap-1.5">
                <MessageCircle size={15} /> Message
              </button>
              <button onClick={() => setExpanded(!expanded)} className="px-3 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden">
                  <div className="bg-indigo-50 rounded-xl p-3 text-xs text-indigo-800 leading-relaxed">
                    <span className="font-bold">AI Insight: </span>{profile.aiInsight}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   EXPLORE PAGE
───────────────────────────────────────────── */
function ExplorePage({ onSaveToggle, savedProfiles }) {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  const [sort, setSort] = useState('Rating');

  const filtered = PROFILES.filter(p => {
    const matchesRole = roleFilter === 'All' || p.role === roleFilter;
    const matchesSearch = `${p.name} ${p.tags.join(' ')} ${p.location}`.toLowerCase().includes(search.toLowerCase());
    return matchesRole && matchesSearch;
  }).sort((a, b) => sort === 'Rating' ? b.rating - a.rating : sort === 'Match' ? b.matchScore - a.matchScore : a.name.localeCompare(b.name));

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Explore Collaborators</h1>
        <p className="text-slate-500 text-sm">Find your perfect creative partner from {PROFILES.length}+ verified profiles.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3 text-slate-400" size={18} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, skill, or location..." className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm" />
        </div>
        <div className="flex gap-2">
          {['All', 'Creator', 'Provider'].map(f => (
            <button key={f} onClick={() => setRoleFilter(f)} className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${roleFilter === f ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-400'}`}>{f}</button>
          ))}
        </div>
        <div className="flex gap-2">
          <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option>Rating</option>
            <option>Match</option>
            <option>Name</option>
          </select>
          <button onClick={() => setViewMode(m => m === 'grid' ? 'list' : 'grid')} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition">
            {viewMode === 'grid' ? <List size={18} /> : <Grid size={18} />}
          </button>
        </div>
      </div>

      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{filtered.length} results found</p>

      <motion.div layout className={`grid gap-5 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        <AnimatePresence>
          {filtered.map((p, i) => {
            const isSaved = !!savedProfiles.find(s => s.id === p.id);
            return (
              <motion.div key={p.id} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.05 }}>
                <ProfileCard profile={p} isSaved={isSaved} onSave={() => onSaveToggle(p)} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE 10: COMMUNITY FEED with Reactions
───────────────────────────────────────────── */
function CommunityPage() {
  const [posts, setPosts] = useState(COMMUNITY_POSTS);
  const [newPost, setNewPost] = useState('');
  const [activeReaction, setActiveReaction] = useState({});

  const react = (postId, emoji) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const already = activeReaction[postId] === emoji;
      const reactions = { ...p.reactions };
      if (already) {
        reactions[emoji] = Math.max(0, reactions[emoji] - 1);
        setActiveReaction(r => ({ ...r, [postId]: null }));
      } else {
        if (activeReaction[postId]) reactions[activeReaction[postId]] = Math.max(0, reactions[activeReaction[postId]] - 1);
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        setActiveReaction(r => ({ ...r, [postId]: emoji }));
      }
      return { ...p, reactions };
    }));
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    setPosts(prev => [{
      id: Date.now(), author: PROFILES[0], time: 'Just now',
      content: newPost,
      reactions: { '🔥': 0, '❤️': 0, '👏': 0 }, comments: 0, reposted: false,
    }, ...prev]);
    setNewPost('');
  };

  return (
    <div className="p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Globe className="text-indigo-600" size={22} />
        <h1 className="text-2xl font-extrabold text-slate-900">Community Feed</h1>
        <span className="ml-auto text-xs font-bold px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-100">Live</span>
      </div>

      {/* Compose Post */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-6">
        <div className="flex items-start gap-3">
          <img src="https://i.pravatar.cc/150?u=currentuser" className="w-10 h-10 rounded-full border border-slate-200" alt="" />
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={e => setNewPost(e.target.value)}
              placeholder="Share something with the community..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none h-20 transition"
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2 text-slate-400">
                <button className="hover:text-indigo-600 transition p-1"><SmilePlus size={18} /></button>
                <button className="hover:text-indigo-600 transition p-1"><Camera size={18} /></button>
                <button className="hover:text-indigo-600 transition p-1"><Hash size={18} /></button>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={submitPost}
                disabled={!newPost.trim()}
                className="px-4 py-1.5 bg-indigo-600 text-white text-sm font-bold rounded-xl disabled:opacity-40 hover:bg-indigo-700 transition"
              >
                Post
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div key={post.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className="flex items-start gap-3 mb-3">
              <img src={post.author.img} className="w-10 h-10 rounded-full border border-slate-200" alt="" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{post.author.name}</span>
                  {post.author.verified && <CheckCircle2 size={13} className="text-indigo-600" />}
                  <span className="text-xs text-slate-400 ml-auto">{post.time}</span>
                </div>
                <p className="text-xs text-indigo-600 font-semibold">{post.author.handle}</p>
              </div>
            </div>

            <p className="text-slate-700 text-sm leading-relaxed mb-4">{post.content}</p>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
              {Object.entries(post.reactions).map(([emoji, count]) => (
                <motion.button
                  key={emoji}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => react(post.id, emoji)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold border transition-all ${activeReaction[post.id] === emoji ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'}`}
                >
                  <span>{emoji}</span>
                  <span className="text-xs">{count}</span>
                </motion.button>
              ))}
              <button className="ml-auto flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-indigo-600 transition">
                <MessageCircle size={14} /> {post.comments}
              </button>
              <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-teal-600 transition">
                <Share2 size={14} /> Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE 4: PROJECT BOARD (Kanban)
───────────────────────────────────────────── */
function ProjectsPage() {
  const [columns, setColumns] = useState(KANBAN_COLUMNS);
  const [dragCard, setDragCard] = useState(null);
  const [dragFrom, setDragFrom] = useState(null);
  const [overCol, setOverCol] = useState(null);

  const colColors = {
    indigo: { bg: 'bg-indigo-50', badge: 'bg-indigo-100 text-indigo-700', border: 'border-indigo-200', dot: 'bg-indigo-500' },
    violet: { bg: 'bg-violet-50', badge: 'bg-violet-100 text-violet-700', border: 'border-violet-200', dot: 'bg-violet-500' },
    amber: { bg: 'bg-amber-50', badge: 'bg-amber-100 text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
    teal: { bg: 'bg-teal-50', badge: 'bg-teal-100 text-teal-700', border: 'border-teal-200', dot: 'bg-teal-500' },
  };

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Layers className="text-indigo-600" size={22} />
        <h1 className="text-2xl font-extrabold text-slate-900">Project Board</h1>
        <span className="ml-2 text-sm text-slate-400">{columns.reduce((t, c) => t + c.cards.length, 0)} active projects</span>
        <motion.button whileHover={{ scale: 1.04 }} className="ml-auto flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md shadow-indigo-200">
          <Plus size={15} /> New Project
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
        {columns.map(col => {
          const c = colColors[col.color];
          return (
            <div
              key={col.id}
              className={`rounded-2xl border ${c.border} ${overCol === col.id ? 'ring-2 ring-indigo-400' : ''} transition-all`}
              onDragOver={e => { e.preventDefault(); setOverCol(col.id); }}
              onDrop={() => {
                if (!dragCard || dragFrom === col.id) { setOverCol(null); return; }
                setColumns(prev => prev.map(c => {
                  if (c.id === dragFrom) return { ...c, cards: c.cards.filter(k => k.id !== dragCard.id) };
                  if (c.id === col.id) return { ...c, cards: [...c.cards, dragCard] };
                  return c;
                }));
                setDragCard(null);
                setDragFrom(null);
                setOverCol(null);
              }}
            >
              <div className={`${c.bg} rounded-t-2xl px-4 py-3 flex items-center gap-2`}>
                <div className={`w-2 h-2 rounded-full ${c.dot}`} />
                <span className="font-extrabold text-sm text-slate-800">{col.label}</span>
                <span className={`ml-auto text-xs font-extrabold px-2 py-0.5 rounded-full ${c.badge}`}>{col.cards.length}</span>
              </div>
              <div className="p-3 space-y-3 min-h-32">
                {col.cards.map(card => (
                  <motion.div
                    key={card.id}
                    layout
                    draggable
                    onDragStart={() => { setDragCard(card); setDragFrom(col.id); }}
                    whileHover={{ scale: 1.02, rotate: 0.5 }}
                    className="bg-white rounded-xl border border-slate-100 p-4 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all"
                  >
                    <p className="font-bold text-sm text-slate-800 mb-2 leading-tight">{card.title}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <img src={`https://i.pravatar.cc/50?u=${card.person}`} className="w-5 h-5 rounded-full border border-slate-200" alt="" />
                      <span className="text-xs text-slate-500 font-medium truncate">{card.person}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-teal-600">{card.budget}</span>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-medium">
                        <Clock size={10} /> {card.due}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAT PAGE with Voice Note
───────────────────────────────────────────── */
function ChatPage() {
  const [messages, setMessages] = useState(CHAT_HISTORY);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const chatEndRef = useRef(null);
  const timerRef = useRef(null);

  const SMART_PILLS = [
    { label: "I'll send the brief", text: "I'll send you the project brief and raw files shortly! Looking forward to seeing your take on it. 🚀" },
    { label: "Ask rates", text: "Could you share your full rate card and package options? I want to explore a long-term arrangement." },
    { label: "Schedule call", text: "Let's jump on a quick 15-min intro call to align on the brief. What does your schedule look like this week?" },
    { label: "Request portfolio", text: "Could you send over a few samples that match this project style? Specifically looking for fast-paced motion work." },
  ];

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const sendMessage = () => {
    if (!inputValue.trim()) return;
    const newMsg = { id: Date.now(), from: 'me', text: inputValue, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'them', text: "That's great! I'll take a look and get back to you shortly.", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 1800);
  };

  // FEATURE 5: Voice Note Recording
  const toggleRecording = () => {
    if (isRecording) {
      clearInterval(timerRef.current);
      const dur = recordTime;
      setIsRecording(false);
      setRecordTime(0);
      const newMsg = { id: Date.now(), from: 'me', type: 'voice', duration: dur, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setMessages(prev => [...prev, newMsg]);
    } else {
      setIsRecording(true);
      setRecordTime(0);
      timerRef.current = setInterval(() => setRecordTime(t => t + 1), 1000);
    }
  };

  return (
    <div className="h-full flex">
      {/* Contacts list */}
      <div className="w-72 bg-white border-r border-slate-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-100 space-y-3">
          <h2 className="font-extrabold text-lg text-slate-900">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
            <input placeholder="Search conversations..." className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {PROFILES.slice(0, 5).map((p, i) => (
            <button key={p.id} className={`w-full flex items-center gap-3 p-4 border-l-2 transition-all text-left hover:bg-slate-50 ${i === 0 ? 'border-indigo-600 bg-indigo-50/30' : 'border-transparent'}`}>
              <div className="relative shrink-0">
                <img src={p.img} className="w-11 h-11 rounded-full object-cover border border-slate-200" alt="" />
                {i < 2 && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white bg-teal-400 rounded-full" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm text-slate-900 truncate">{p.name}</span>
                  <span className="text-[10px] text-slate-400 shrink-0">{i === 0 ? '2m' : i === 1 ? '1h' : `${i}d`}</span>
                </div>
                <p className={`text-xs truncate mt-0.5 ${i === 0 ? 'font-bold text-slate-800' : 'text-slate-500'}`}>{i === 0 ? CHAT_HISTORY[CHAT_HISTORY.length - 1].text : 'Great working with you!'}</p>
              </div>
              {i === 0 && <div className="w-5 h-5 bg-indigo-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shrink-0">3</div>}
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col bg-slate-50">
        <div className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0 shadow-sm">
          <div className="flex items-center gap-3">
            <img src={PROFILES[1].img} className="w-9 h-9 rounded-full border border-slate-200" alt="" />
            <div>
              <h3 className="font-bold text-sm text-slate-900">{PROFILES[1].name}</h3>
              <p className="text-xs text-teal-600 font-semibold">● Online</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition">View Profile</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex items-end gap-2 ${msg.from === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.from === 'them' && <img src={PROFILES[1].img} className="w-7 h-7 rounded-full border border-slate-200 shrink-0 mb-0.5" alt="" />}
              <div className={`max-w-[72%] ${msg.from === 'me' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                {/* FEATURE 5: Voice Message Bubble */}
                {msg.type === 'voice' ? (
                  <div className={`px-4 py-3 rounded-2xl flex items-center gap-3 ${msg.from === 'me' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white border border-slate-100 rounded-bl-sm'}`}>
                    <button className={`w-8 h-8 rounded-full flex items-center justify-center ${msg.from === 'me' ? 'bg-white/20' : 'bg-indigo-100'}`}>
                      <Play size={14} className={msg.from === 'me' ? 'text-white' : 'text-indigo-600'} />
                    </button>
                    <div className="flex gap-0.5 items-end h-6">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div key={i} style={{ height: `${Math.random() * 80 + 20}%` }} className={`w-0.5 rounded-full ${msg.from === 'me' ? 'bg-white/70' : 'bg-indigo-400'}`} />
                      ))}
                    </div>
                    <span className={`text-xs font-bold ${msg.from === 'me' ? 'text-white/80' : 'text-slate-500'}`}>0:{String(msg.duration).padStart(2, '0')}</span>
                  </div>
                ) : (
                  <div className={`px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${msg.from === 'me' ? 'bg-indigo-600 text-white rounded-br-sm shadow-md shadow-indigo-200' : 'bg-white text-slate-800 rounded-bl-sm border border-slate-100 shadow-sm'}`}>
                    {msg.text}
                  </div>
                )}
                <span className="text-[10px] text-slate-400 font-bold px-1">{msg.time}</span>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex items-end gap-2">
              <img src={PROFILES[1].img} className="w-7 h-7 rounded-full border border-slate-200 shrink-0" alt="" />
              <div className="bg-white border border-slate-100 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm">
                <div className="flex gap-1 items-center h-4">
                  {[0, 1, 2].map(i => <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, delay: i * 0.15, duration: 0.6 }} className="w-1.5 h-1.5 bg-slate-400 rounded-full" />)}
                </div>
              </div>
            </div>
          )}
          {isRecording && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex justify-end">
              <div className="flex items-center gap-3 bg-rose-500 text-white px-4 py-3 rounded-2xl rounded-br-sm shadow-md shadow-rose-200">
                <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-3 h-3 rounded-full bg-white" />
                <span className="text-sm font-bold">Recording... 0:{String(recordTime).padStart(2, '0')}</span>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="bg-white border-t border-slate-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1">
            <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0 pr-2 border-r border-slate-200">
              <Bot size={12} className="text-indigo-500" /> AI
            </div>
            {SMART_PILLS.map(pill => (
              <button key={pill.label} onClick={() => setInputValue(pill.text)} className="shrink-0 px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full transition whitespace-nowrap border border-indigo-100 hover:border-indigo-300">
                {pill.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-2 pr-3 focus-within:ring-2 focus-within:ring-indigo-400 transition-all">
            {/* FEATURE 5: Voice Note Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleRecording}
              className={`w-9 h-9 rounded-xl border flex items-center justify-center transition ${isRecording ? 'bg-rose-500 border-rose-500 text-white' : 'bg-white border-slate-200 text-slate-500 hover:bg-rose-50 hover:text-rose-500'}`}
            >
              {isRecording ? <MicOff size={16} /> : <Mic size={16} />}
            </motion.button>
            <input value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." className="flex-1 bg-transparent text-sm text-slate-800 focus:outline-none placeholder:text-slate-400" />
            <motion.button whileTap={{ scale: 0.9 }} onClick={sendMessage} className="w-9 h-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition shadow-md shadow-indigo-200">
              <Send size={16} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NOTIFICATIONS PAGE
───────────────────────────────────────────── */
function NotificationsPage({ notifications }) {
  const [notifs, setNotifs] = useState(notifications);
  const icons = { match: <Bot size={16} />, message: <MessageCircle size={16} />, review: <Star size={16} />, system: <Bell size={16} /> };
  const colors = { match: 'bg-indigo-100 text-indigo-600', message: 'bg-teal-100 text-teal-600', review: 'bg-amber-100 text-amber-600', system: 'bg-slate-100 text-slate-500' };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold text-slate-900">Notifications</h1>
        <button onClick={() => setNotifs(n => n.map(x => ({ ...x, read: true })))} className="text-xs font-bold text-indigo-600 hover:underline">Mark all read</button>
      </div>
      <div className="space-y-3">
        {notifs.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className={`flex items-start gap-4 p-4 bg-white rounded-2xl border shadow-sm transition-all ${!n.read ? 'border-indigo-100 shadow-indigo-50' : 'border-slate-100'}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${colors[n.type]}`}>{icons[n.type]}</div>
            <div className="flex-1">
              <p className={`text-sm leading-relaxed ${!n.read ? 'font-semibold text-slate-900' : 'text-slate-600'}`}>{n.text}</p>
              <p className="text-xs text-slate-400 mt-1 font-medium">{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-2" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE 3: LEADERBOARD PAGE
───────────────────────────────────────────── */
function LeaderboardPage() {
  const [period, setPeriod] = useState('Weekly');
  const rankColors = ['text-amber-500', 'text-slate-400', 'text-amber-700'];
  const rankBg = ['bg-amber-50 border-amber-200', 'bg-slate-50 border-slate-200', 'bg-orange-50 border-orange-200'];

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Trophy className="text-amber-500" size={24} />
        <h1 className="text-2xl font-extrabold text-slate-900">Leaderboard</h1>
      </div>
      <p className="text-slate-500 text-sm mb-6">Top collaborators ranked by activity, reviews, and match quality.</p>

      <div className="flex gap-2 mb-8">
        {['Weekly', 'Monthly', 'All-Time'].map(p => (
          <button key={p} onClick={() => setPeriod(p)} className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${period === p ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-200 text-slate-600 hover:border-indigo-300'}`}>{p}</button>
        ))}
      </div>

      {/* Podium Top 3 */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[LEADERBOARD[1], LEADERBOARD[0], LEADERBOARD[2]].map((u, i) => {
          const realRank = [2, 1, 3][i];
          const heights = ['h-24', 'h-32', 'h-20'];
          return (
            <motion.div key={u.rank} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="flex flex-col items-center">
              <img src={u.img} className="w-12 h-12 rounded-full border-4 border-white shadow-lg mb-2" alt="" />
              <p className="font-bold text-xs text-slate-800 text-center">{u.name.split(' ')[0]}</p>
              <p className="text-xs text-slate-400">{u.score.toLocaleString()}</p>
              <div className={`w-full ${heights[i]} ${rankBg[realRank - 1]} border rounded-t-xl mt-2 flex items-center justify-center`}>
                <span className={`text-2xl font-extrabold ${rankColors[realRank - 1]}`}>#{realRank}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full List */}
      <div className="space-y-2">
        {LEADERBOARD.map((u, i) => (
          <motion.div key={u.rank} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${u.isYou ? 'bg-indigo-50 border-indigo-200 shadow-md shadow-indigo-50' : 'bg-white border-slate-100 hover:border-slate-200'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold ${i < 3 ? rankColors[i] : 'text-slate-500'}`}>
              {u.rank <= 3 ? ['🥇', '🥈', '🥉'][u.rank - 1] : `#${u.rank}`}
            </div>
            <img src={u.img} className="w-10 h-10 rounded-full border-2 border-white shadow-sm" alt="" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-slate-900">{u.name}</p>
                {u.isYou && <span className="text-[10px] font-extrabold bg-indigo-600 text-white px-2 py-0.5 rounded-full">You</span>}
              </div>
              <p className="text-xs text-slate-400">{u.handle}</p>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-slate-900 text-sm">{u.score.toLocaleString()}</p>
              <p className={`text-xs font-bold ${u.delta.startsWith('+') ? 'text-teal-600' : 'text-rose-500'}`}>{u.delta}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FEATURE 2: ANALYTICS PAGE
───────────────────────────────────────────── */
function AnalyticsPage() {
  const [period, setPeriod] = useState('12M');
  const [activeMetric, setActiveMetric] = useState('views');

  const metrics = {
    views: { label: 'Profile Views', data: CHART_DATA, color: '#6366f1', total: '7,842', change: '+24%' },
    earnings: { label: 'Earnings ($)', data: [320, 580, 420, 950, 830, 1200, 1080, 1450, 1320, 1800, 1650, 2100], color: '#14b8a6', total: '$12,700', change: '+38%' },
    matches: { label: 'AI Matches', data: [5, 8, 12, 10, 18, 22, 16, 28, 24, 30, 32, 34], color: '#8b5cf6', total: '239', change: '+61%' },
  };

  const m = metrics[activeMetric];
  const maxVal = Math.max(...m.data);

  const pieData = [
    { label: 'Creators', pct: 62, color: '#6366f1' },
    { label: 'Providers', pct: 28, color: '#14b8a6' },
    { label: 'Brands', pct: 10, color: '#f59e0b' },
  ];

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <BarChart2 className="text-indigo-600" size={22} />
        <h1 className="text-2xl font-extrabold text-slate-900">Analytics</h1>
      </div>
      <p className="text-slate-500 text-sm mb-8">Your comprehensive performance overview.</p>

      {/* Top KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Earnings', value: '$12,700', delta: '+38%', icon: <Wallet size={18} />, color: 'teal' },
          { label: 'Profile Views', value: '7,842', delta: '+24%', icon: <Eye size={18} />, color: 'indigo' },
          { label: 'Conversion Rate', value: '6.4%', delta: '+1.2%', icon: <Target size={18} />, color: 'violet' },
          { label: 'Response Rate', value: '92%', delta: '+8%', icon: <Activity size={18} />, color: 'rose' },
        ].map((kpi, i) => (
          <motion.div key={kpi.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${kpi.color === 'teal' ? 'bg-teal-50 text-teal-600' : kpi.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : kpi.color === 'violet' ? 'bg-violet-50 text-violet-600' : 'bg-rose-50 text-rose-600'}`}>{kpi.icon}</div>
            <div className="text-xl font-extrabold text-slate-900">{kpi.value}</div>
            <div className="text-xs text-slate-400 mt-0.5">{kpi.label}</div>
            <div className="text-xs font-bold text-teal-600 mt-1">{kpi.delta} this month</div>
          </motion.div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-extrabold text-slate-900">{m.label}</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold" style={{ color: m.color }}>{m.total}</span>
              <span className="text-xs font-bold text-teal-600">{m.change} vs last year</span>
            </div>
          </div>
          <div className="flex gap-2">
            {Object.entries(metrics).map(([k, v]) => (
              <button key={k} onClick={() => setActiveMetric(k)} className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${activeMetric === k ? 'text-white border-transparent' : 'border-slate-200 text-slate-500 hover:border-indigo-300'}`} style={activeMetric === k ? { backgroundColor: v.color } : {}}>
                {v.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-end gap-2 h-40">
          {m.data.map((val, i) => (
            <motion.div
              key={i}
              className="flex-1 flex flex-col items-center gap-1"
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
            >
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: 'easeOut' }}
                style={{ height: `${(val / maxVal) * 100}%`, backgroundColor: m.color, originY: 1 }}
                className="w-full rounded-t-lg opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group"
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition whitespace-nowrap bg-white shadow rounded px-1">{val}</div>
              </motion.div>
              <span className="text-[9px] text-slate-400 font-medium">{CHART_LABELS[i]}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEATURE 12: Earnings Breakdown */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-extrabold text-slate-900 mb-4">Earnings Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: 'Video Editing', amount: '$5,200', pct: 41, color: 'bg-indigo-500' },
              { label: 'Brand Campaigns', amount: '$4,100', pct: 32, color: 'bg-violet-500' },
              { label: 'Thumbnail Design', amount: '$2,200', pct: 17, color: 'bg-teal-500' },
              { label: 'Audio Work', amount: '$1,200', pct: 9, color: 'bg-amber-500' },
            ].map((row, i) => (
              <div key={row.label}>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>{row.label}</span><span className="text-slate-500">{row.amount}</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${row.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className={`h-full ${row.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-extrabold text-slate-900 mb-4">Audience Type</h3>
          <div className="space-y-4">
            {pieData.map((d, i) => (
              <div key={d.label} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-sm font-semibold text-slate-700 flex-1">{d.label}</span>
                <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${d.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: d.color }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-500 w-8 text-right">{d.pct}%</span>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">Goals Progress</h4>
            {[
              { goal: '$20K Annual Revenue', current: 12700, target: 20000, color: 'bg-teal-500' },
              { goal: '500 AI Matches', current: 239, target: 500, color: 'bg-indigo-500' },
            ].map(g => (
              <div key={g.goal} className="mb-3">
                <div className="flex justify-between text-xs font-bold text-slate-600 mb-1">
                  <span>{g.goal}</span><span>{Math.round((g.current / g.target) * 100)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(g.current / g.target) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className={`h-full ${g.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SAVED PAGE
───────────────────────────────────────────── */
function SavedPage({ savedProfiles, onSaveToggle }) {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-1">Saved Profiles</h1>
      <p className="text-slate-500 text-sm mb-6">Your bookmarked creators and service providers.</p>
      {savedProfiles.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark className="text-slate-300 mx-auto mb-4" size={48} />
          <h3 className="font-bold text-slate-600 mb-1">No saved profiles yet</h3>
          <p className="text-slate-400 text-sm">Browse the Explore tab and bookmark profiles you like.</p>
        </div>
      ) : (
        <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {savedProfiles.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <ProfileCard profile={p} isSaved={true} onSave={() => onSaveToggle(p)} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROFILE PAGE with Badges + Calendar
───────────────────────────────────────────── */
function ProfilePage({ userRole }) {
  const skills = ['Video Editing', 'Motion Graphics', 'Color Grading', 'Reels', 'YouTube', 'TikTok'];
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDates, setSelectedDates] = useState([8, 9, 14, 15, 22]);

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const monthName = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  const toggleDate = (d) => setSelectedDates(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">My Profile</h1>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden mb-6">
        <div className="h-36 bg-gradient-to-r from-indigo-400 via-violet-500 to-teal-400" />
        <div className="px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <img src="https://i.pravatar.cc/150?u=currentuser" className="w-20 h-20 rounded-2xl border-4 border-white shadow-xl object-cover" alt="Avatar" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-teal-400 border-2 border-white rounded-full" />
            </div>
            <button className="px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition flex items-center gap-2">
              <PenTool size={14} /> Edit Profile
            </button>
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 mb-0.5">Alex Creator</h2>
          <p className="text-slate-500 text-sm mb-3">{userRole === 'provider' ? 'Service Provider' : 'Content Creator'} · Los Angeles, CA</p>
          <p className="text-slate-700 text-sm leading-relaxed mb-4">Digital content creator specializing in lifestyle storytelling. Seeking high-level collaborations to scale viewership and establish premium industry connections.</p>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => <span key={s} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full border border-indigo-100">{s}</span>)}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-slate-200 pb-0">
        {['overview', 'achievements', 'calendar'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`capitalize px-4 py-2.5 text-sm font-bold border-b-2 transition-all -mb-px ${activeTab === tab ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-500 hover:text-slate-700'}`}>
            {tab === 'achievements' ? '🏅 Achievements' : tab === 'calendar' ? '📅 Availability' : '📊 Overview'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Profile Views', value: '1,284', icon: <Eye size={20} />, color: 'indigo' },
                { label: 'Collaborations', value: '12', icon: <Briefcase size={20} />, color: 'teal' },
                { label: 'Avg Rating', value: '4.9 ★', icon: <Award size={20} />, color: 'violet' },
              ].map(stat => (
                <div key={stat.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center">
                  <div className={`w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center ${stat.color === 'indigo' ? 'bg-indigo-50 text-indigo-600' : stat.color === 'teal' ? 'bg-teal-50 text-teal-600' : 'bg-violet-50 text-violet-600'}`}>{stat.icon}</div>
                  <div className="text-2xl font-extrabold text-slate-900">{stat.value}</div>
                  <div className="text-xs font-medium text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* FEATURE 11: Achievement Badges */}
        {activeTab === 'achievements' && (
          <motion.div key="achievements" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.07 }}
                  className={`rounded-2xl border p-5 text-center transition-all ${a.earned ? 'bg-white border-indigo-100 shadow-sm hover:shadow-md' : 'bg-slate-50 border-slate-100 opacity-50'}`}
                >
                  <div className={`text-4xl mb-3 ${!a.earned ? 'grayscale' : ''}`}>{a.icon}</div>
                  <h3 className="font-extrabold text-sm text-slate-900 mb-1">{a.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{a.desc}</p>
                  {a.earned ? (
                    <span className="inline-flex items-center gap-1 mt-3 text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-1 rounded-full border border-teal-100">
                      <CheckCircle2 size={10} /> Earned
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 mt-3 text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">
                      🔒 Locked
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* FEATURE 10: Booking Calendar */}
        {activeTab === 'calendar' && (
          <motion.div key="calendar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-extrabold text-slate-900">{monthName}</h3>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-indigo-600 inline-block" /> Busy</span>
                  <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-teal-400 inline-block" /> Available</span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                  <div key={d} className="text-xs font-bold text-slate-400 py-1">{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const isSelected = selectedDates.includes(day);
                  const isToday = day === today.getDate();
                  return (
                    <motion.button
                      key={day}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleDate(day)}
                      className={`aspect-square rounded-xl text-sm font-bold flex items-center justify-center transition-all ${isSelected ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' : isToday ? 'bg-indigo-50 text-indigo-700 ring-2 ring-indigo-300' : 'text-slate-600 hover:bg-teal-50 hover:text-teal-700'}`}
                    >
                      {day}
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">Click dates to toggle your busy/available status</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SETTINGS PAGE
───────────────────────────────────────────── */
function SettingsPage() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [aiMatchAlerts, setAiMatchAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [publicProfile, setPublicProfile] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const Toggle = ({ value, onChange }) => (
    <button onClick={() => onChange(!value)} className={`w-11 h-6 rounded-full relative transition-all ${value ? 'bg-indigo-600' : 'bg-slate-200'}`}>
      <motion.div animate={{ x: value ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
    </button>
  );

  const Section = ({ title, children }) => (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mb-4">
      <h3 className="font-extrabold text-slate-900 mb-5 text-sm uppercase tracking-wider">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );

  const Row = ({ label, sub, control }) => (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-semibold text-sm text-slate-800">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
      {control}
    </div>
  );

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Settings</h1>

      <Section title="Notifications">
        <Row label="Email Notifications" sub="Receive updates via email" control={<Toggle value={emailNotifs} onChange={setEmailNotifs} />} />
        <Row label="AI Match Alerts" sub="Get notified of new AI-matched profiles" control={<Toggle value={aiMatchAlerts} onChange={setAiMatchAlerts} />} />
        <Row label="Weekly Digest" sub="Summary of your week's activity" control={<Toggle value={weeklyDigest} onChange={setWeeklyDigest} />} />
      </Section>

      <Section title="Privacy">
        <Row label="Public Profile" sub="Show your profile in Explore feed" control={<Toggle value={publicProfile} onChange={setPublicProfile} />} />
      </Section>

      <Section title="Appearance">
        <Row label="Dark Mode" sub="Coming soon" control={<Toggle value={darkMode} onChange={setDarkMode} />} />
      </Section>

      <Section title="Account">
        <Row label="Email" control={<span className="text-sm font-semibold text-slate-500">alex@example.com</span>} />
        <Row label="Plan" control={<span className="px-3 py-1 text-xs font-extrabold text-indigo-700 bg-indigo-50 rounded-full">Free</span>} />
        <button className="w-full py-3 border-2 border-indigo-200 text-indigo-700 font-bold text-sm rounded-xl hover:bg-indigo-50 transition mt-2 flex items-center justify-center gap-2">
          <Rocket size={16} /> Upgrade to Pro
        </button>
      </Section>

      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5">
        <h3 className="font-extrabold text-rose-700 text-sm mb-1">Danger Zone</h3>
        <p className="text-xs text-rose-400 mb-3">Permanently delete your account and all data.</p>
        <button className="px-4 py-2 text-xs font-bold text-rose-600 border border-rose-200 rounded-xl hover:bg-rose-100 transition">Delete Account</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LOGO COMPONENT
───────────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
        <Sparkles size={17} />
      </div>
      <span className="font-extrabold text-lg text-slate-900 tracking-tight">CollabHub</span>
    </div>
  );
}
