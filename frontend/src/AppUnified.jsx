import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Search, Camera, Sparkles, Shield, MessageCircle, User, Settings, LogOut,
  Star, MapPin, Check, X, Zap, Users, Send, Menu, ChevronRight, PenTool,
  Loader2, Bot, Bell, Heart, Share2, Plus, Briefcase, Award, Clock,
  CheckCircle2, ArrowRight, BarChart2, Eye, Bookmark, MoreHorizontal,
  Grid, List, Home, Compass, Flame, Lightbulb, Rocket, Mic, MicOff,
  SmilePlus, Trophy, Layers, Play, Globe, FileText, Activity, Wallet,
  Hash, TrendingUp, Target, ChevronLeft, ChevronDown, Filter, Zap as ZapIcon,
} from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

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
    aiInsight: "Alex's podcast clients see an average 28% listener retention boost.",
    verified: true, available: true, saved: false, matchScore: 78,
    badges: ['Audio Wizard', 'Podcast Pro'],
  },
];

const INITIAL_NOTIFICATIONS = [
  { id: 1, type: 'match',   text: 'Marcus Chen is a 98% AI match for your project',       time: '2m ago',  read: false },
  { id: 2, type: 'message', text: 'Elena Vance sent you a collaboration request',           time: '1h ago',  read: false },
  { id: 3, type: 'review',  text: 'You received a new 5-star review from @dk.design',      time: '3h ago',  read: true  },
  { id: 4, type: 'system',  text: 'Your profile was viewed 42 times today',                time: '5h ago',  read: true  },
  { id: 5, type: 'match',   text: 'Priya Sharma accepted your collab invite',              time: '8h ago',  read: true  },
  { id: 6, type: 'review',  text: 'New badge unlocked: "Rising Collaborator"',             time: '1d ago',  read: true  },
];

const CONVERSATIONS = [
  { id: 1, profile: PROFILES[1], lastMsg: "Can you send the brief and raw files?",     time: '2m',  unread: 3, online: true  },
  { id: 2, profile: PROFILES[0], lastMsg: "Looking forward to working together! ✨",    time: '1h',  unread: 1, online: true  },
  { id: 3, profile: PROFILES[4], lastMsg: "Great working with you!",                   time: '2d',  unread: 0, online: false },
  { id: 4, profile: PROFILES[2], lastMsg: "Let me check my availability",              time: '3d',  unread: 0, online: false },
  { id: 5, profile: PROFILES[5], lastMsg: "Audio files delivered! 🎧",                 time: '5d',  unread: 0, online: false },
];

const BASE_CHAT = {
  1: [
    { id: 1, from: 'them', text: "Hey! Saw your post looking for a motion graphics editor.",                                         time: "10:41 AM" },
    { id: 2, from: 'them', text: "I specialize in fast-paced social content. Here's my reel — let me know what you think!",          time: "10:42 AM" },
    { id: 3, from: 'me',   text: "That reel is stunning. Exactly the vibe I'm going for. What's your typical turnaround?",          time: "10:45 AM" },
    { id: 4, from: 'them', text: "24–48 hrs for a standard edit, 3 days for heavy motion graphics. Revisions until you're happy.",   time: "10:47 AM" },
    { id: 5, from: 'them', text: "Can you send the brief and raw files? I can send a sample cut within 24 hrs.",                    time: "10:48 AM" },
  ],
  2: [
    { id: 1, from: 'them', text: "Hi! I'd love to collaborate on your next campaign 🌟",                            time: "Yesterday" },
    { id: 2, from: 'me',   text: "Elena! Your engagement numbers are incredible. Let's talk.",                      time: "Yesterday" },
    { id: 3, from: 'them', text: "Looking forward to working together! ✨",                                          time: "Yesterday" },
  ],
  3: [
    { id: 1, from: 'me',   text: "Priya, would love to feature you in our wellness series!",                        time: "Mon" },
    { id: 2, from: 'them', text: "That sounds amazing, I'm in! Great working with you!",                            time: "Mon" },
  ],
  4: [
    { id: 1, from: 'me',   text: "Sarah, are you available for a tech review campaign?",                            time: "Sun" },
    { id: 2, from: 'them', text: "Let me check my availability and get back to you!",                               time: "Sun" },
  ],
  5: [
    { id: 1, from: 'them', text: "Your podcast episode sounds crystal clear now!",                                   time: "Fri" },
    { id: 2, from: 'me',   text: "Incredible work, Alex. Audio files delivered! 🎧",                                time: "Fri" },
  ],
};

const SMART_PILLS = [
  { label: "Send brief",       text: "I'll send you the project brief and raw files shortly! Looking forward to seeing your take on it. 🚀" },
  { label: "Ask rates",        text: "Could you share your full rate card and package options? I want to explore a long-term arrangement." },
  { label: "Schedule call",    text: "Let's jump on a quick 15-min intro call to align on the brief. What does your schedule look like?" },
  { label: "Request portfolio",text: "Could you send over samples that match this project style? Fast-paced motion work specifically." },
];

const STORIES = [
  { id: 0, name: 'Your Story', img: 'https://i.pravatar.cc/150?u=currentuser', isOwn: true, unseen: false },
  { id: 1, name: 'Elena V.',   img: 'https://i.pravatar.cc/150?u=elena',       unseen: true,  preview: 'New fashion collab 🌟' },
  { id: 2, name: 'Marcus',     img: 'https://i.pravatar.cc/150?u=marcus',      unseen: true,  preview: 'Behind the edit ✂️' },
  { id: 3, name: 'Sarah J.',   img: 'https://i.pravatar.cc/150?u=sarah',       unseen: true,  preview: 'Unboxing day! 📦' },
  { id: 4, name: 'David K.',   img: 'https://i.pravatar.cc/150?u=david',       unseen: false, preview: 'New thumbnails 🎨' },
  { id: 5, name: 'Priya S.',   img: 'https://i.pravatar.cc/150?u=priya',       unseen: true,  preview: 'Bali morning routine ☀️' },
  { id: 6, name: 'Alex T.',    img: 'https://i.pravatar.cc/150?u=alex',        unseen: false, preview: 'Studio session 🎙️' },
];

const TRENDING_TOPICS = [
  { id: 1, tag: '#UGCCreators',    posts: '14.2K', growth: '+32%', emoji: '🔥', gradFrom: '#f97316', gradTo: '#ef4444' },
  { id: 2, tag: '#AIVideoEditing', posts: '8.4K',  growth: '+89%', emoji: '🤖', gradFrom: '#7c3aed', gradTo: '#4f46e5' },
  { id: 3, tag: '#ThumbnailTips',  posts: '6.1K',  growth: '+21%', emoji: '🎨', gradFrom: '#ec4899', gradTo: '#f43f5e' },
  { id: 4, tag: '#YouTubeGrowth',  posts: '22.7K', growth: '+14%', emoji: '📈', gradFrom: '#14b8a6', gradTo: '#0ea5e9' },
  { id: 5, tag: '#PodcastLaunch',  posts: '3.9K',  growth: '+56%', emoji: '🎙️', gradFrom: '#6366f1', gradTo: '#3b82f6' },
];

const INITIAL_COMMUNITY_POSTS = [
  {
    id: 1, author: PROFILES[0], time: '32m ago',
    content: "Just wrapped a brand deal with a wellness startup — here's what made it work without sacrificing authenticity. Thread 🧵",
    reactions: { '🔥': 48, '❤️': 31, '👏': 22 }, comments: 17,
  },
  {
    id: 2, author: PROFILES[1], time: '1h ago',
    content: 'My motion reel just hit 500K views on LinkedIn. Crazy to think this started as a side hustle 2 years ago. Keep creating. 🚀',
    reactions: { '🔥': 102, '❤️': 76, '👏': 55 }, comments: 34,
  },
  {
    id: 3, author: PROFILES[4], time: '3h ago',
    content: "Hot take: Your thumbnail matters more than your title for the first 30 days of a new video. Here's the data... 📊",
    reactions: { '🔥': 67, '❤️': 41, '🤔': 19 }, comments: 28,
  },
];

const INITIAL_KANBAN = [
  {
    id: 'pipeline', label: 'Pipeline', color: 'violet',
    cards: [
      { id: 'k1', title: 'Brand Deal — FitTech App',       person: 'Elena Vance',  personImg: 'https://i.pravatar.cc/50?u=elena',  budget: '$1,500', due: 'May 3'  },
      { id: 'k2', title: 'YouTube Thumbnail Refresh',      person: 'David Kim',    personImg: 'https://i.pravatar.cc/50?u=david',  budget: '$400',   due: 'May 5'  },
    ],
  },
  {
    id: 'in-progress', label: 'In Progress', color: 'cyan',
    cards: [
      { id: 'k3', title: 'Motion Reel — Q2 Campaign',     person: 'Marcus Chen',  personImg: 'https://i.pravatar.cc/50?u=marcus', budget: '$2,200', due: 'Apr 30' },
    ],
  },
  {
    id: 'review', label: 'In Review', color: 'amber',
    cards: [
      { id: 'k4', title: 'Podcast Audio — Episode 12',    person: 'Alex Torres',  personImg: 'https://i.pravatar.cc/50?u=alex',   budget: '$600',   due: 'Apr 28' },
    ],
  },
  {
    id: 'done', label: 'Completed', color: 'teal',
    cards: [
      { id: 'k5', title: 'Travel Collab — Bali Vlog',     person: 'Priya Sharma', personImg: 'https://i.pravatar.cc/50?u=priya',  budget: '$3,000', due: 'Apr 20' },
      { id: 'k6', title: 'Tech Review — Gadget X',        person: 'Sarah Jae',    personImg: 'https://i.pravatar.cc/50?u=sarah',  budget: '$1,800', due: 'Apr 15' },
    ],
  },
];

const CHART_DATA = {
  views:    [18, 34, 28, 52, 46, 68, 74, 62, 89, 95, 82, 110],
  earnings: [320, 580, 420, 950, 830, 1200, 1080, 1450, 1320, 1800, 1650, 2100],
  matches:  [5, 8, 12, 10, 18, 22, 16, 28, 24, 30, 32, 34],
};
const CHART_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const ACHIEVEMENTS = [
  { id: 1, icon: '🏆', title: 'First Collab',    desc: 'Completed your first collaboration',       earned: true  },
  { id: 2, icon: '⚡', title: 'Fast Mover',      desc: 'Responded within 1 hour',                 earned: true  },
  { id: 3, icon: '🌟', title: 'Top Rated',       desc: 'Maintained 4.8+ rating for 30 days',      earned: true  },
  { id: 4, icon: '🔥', title: 'Hot Streak',      desc: '5 collabs in a single month',             earned: false },
  { id: 5, icon: '💎', title: 'Diamond Creator', desc: 'Reached $10K in collaborations',          earned: false },
  { id: 6, icon: '🤖', title: 'AI Pioneer',      desc: 'First to use AI Brief Generator',         earned: true  },
];

const LEADERBOARD_DATA = {
  Weekly: [
    { rank: 1, name: 'Sarah Jae',    handle: '@sarahj',        score: 9840,   img: 'https://i.pravatar.cc/150?u=sarah',       delta: '+12' },
    { rank: 2, name: 'Elena Vance',  handle: '@elenav',         score: 9210,   img: 'https://i.pravatar.cc/150?u=elena',       delta: '+5'  },
    { rank: 3, name: 'Marcus Chen',  handle: '@marcus.edits',   score: 8760,   img: 'https://i.pravatar.cc/150?u=marcus',      delta: '+8'  },
    { rank: 4, name: 'Priya Sharma', handle: '@priyacreates',   score: 7920,   img: 'https://i.pravatar.cc/150?u=priya',       delta: '+22' },
    { rank: 5, name: 'Alex Torres',  handle: '@alex.sound',     score: 6540,   img: 'https://i.pravatar.cc/150?u=alex',        delta: '-3'  },
    { rank: 7, name: 'Alex Creator', handle: '@you',            score: 4210,   img: 'https://i.pravatar.cc/150?u=currentuser', delta: '+18', isYou: true },
  ],
  Monthly: [
    { rank: 1, name: 'Marcus Chen',  handle: '@marcus.edits',   score: 42300,  img: 'https://i.pravatar.cc/150?u=marcus',      delta: '+4'  },
    { rank: 2, name: 'Sarah Jae',    handle: '@sarahj',         score: 39800,  img: 'https://i.pravatar.cc/150?u=sarah',       delta: '+2'  },
    { rank: 3, name: 'Priya Sharma', handle: '@priyacreates',   score: 35100,  img: 'https://i.pravatar.cc/150?u=priya',       delta: '+11' },
    { rank: 4, name: 'Elena Vance',  handle: '@elenav',         score: 31200,  img: 'https://i.pravatar.cc/150?u=elena',       delta: '-1'  },
    { rank: 5, name: 'David Kim',    handle: '@dk.design',      score: 28400,  img: 'https://i.pravatar.cc/150?u=david',       delta: '+7'  },
    { rank: 9, name: 'Alex Creator', handle: '@you',            score: 18700,  img: 'https://i.pravatar.cc/150?u=currentuser', delta: '+31', isYou: true },
  ],
  'All-Time': [
    { rank: 1,  name: 'Elena Vance',  handle: '@elenav',        score: 284000, img: 'https://i.pravatar.cc/150?u=elena',       delta: '—'   },
    { rank: 2,  name: 'Sarah Jae',    handle: '@sarahj',        score: 261000, img: 'https://i.pravatar.cc/150?u=sarah',       delta: '-1'  },
    { rank: 3,  name: 'Marcus Chen',  handle: '@marcus.edits',  score: 218000, img: 'https://i.pravatar.cc/150?u=marcus',      delta: '+1'  },
    { rank: 4,  name: 'Alex Torres',  handle: '@alex.sound',    score: 195000, img: 'https://i.pravatar.cc/150?u=alex',        delta: '—'   },
    { rank: 5,  name: 'Priya Sharma', handle: '@priyacreates',  score: 179000, img: 'https://i.pravatar.cc/150?u=priya',       delta: '+1'  },
    { rank: 14, name: 'Alex Creator', handle: '@you',           score: 82000,  img: 'https://i.pravatar.cc/150?u=currentuser', delta: '+6',  isYou: true },
  ],
};

/* ─────────────────────────────────────────────
   ANIMATED BACKGROUND
───────────────────────────────────────────── */
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.09) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(14,165,233,0.07) 0%, transparent 55%), radial-gradient(ellipse at 50% 90%, rgba(20,184,166,0.05) 0%, transparent 55%), #05050f'
      }} />
      <div className="blob-1 absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }} />
      <div className="blob-2 absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #0ea5e9, transparent)' }} />
      <div className="blob-3 absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-[0.03]"
        style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }} />
      <div className="blob-4 absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-[0.035]"
        style={{ background: 'radial-gradient(circle, #14b8a6, transparent)' }} />
      {/* Subtle dot grid */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   CUSTOM CURSOR (desktop only)
───────────────────────────────────────────── */
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 700, damping: 42 });
  const springY = useSpring(cursorY, { stiffness: 700, damping: 42 });
  const trailX  = useSpring(cursorX, { stiffness: 140, damping: 22 });
  const trailY  = useSpring(cursorY, { stiffness: 140, damping: 22 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move   = (e) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const down   = () => setClicking(true);
    const up     = () => setClicking(false);
    const over   = (e) => setHovering(!!e.target.closest('button,a,[role="button"],input,textarea,select'));
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup',   up);
    window.addEventListener('mouseover', over);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
      window.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <div className="hidden md:block">
      {/* Trail */}
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-screen"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}>
        <motion.div
          animate={{ width: hovering ? 40 : 22, height: hovering ? 40 : 22, opacity: hovering ? 0.28 : 0.14 }}
          transition={{ duration: 0.18 }}
          className="rounded-full"
          style={{ background: 'radial-gradient(circle, #a78bfa, transparent)' }}
        />
      </motion.div>
      {/* Dot */}
      <motion.div className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}>
        <motion.div
          animate={{ width: clicking ? 5 : hovering ? 11 : 8, height: clicking ? 5 : hovering ? 11 : 8, background: hovering ? '#a78bfa' : '#ffffff' }}
          transition={{ duration: 0.12 }}
          className="rounded-full"
        />
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SPARKLINE CHART
───────────────────────────────────────────── */
function SparklineChart({ data, color = '#7c3aed' }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const h = 44, w = 200;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min + 0.001)) * h;
    return `${x},${y}`;
  }).join(' ');
  const id = `sg-${color.replace('#', '')}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-11" preserveAspectRatio="none">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.38" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <polygon fill={`url(#${id})`} points={`0,${h} ${pts} ${w},${h}`} />
      <polyline fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   AI BRIEF GENERATOR MODAL
───────────────────────────────────────────── */
function AIBriefModal({ onClose }) {
  const [brief, setBrief] = useState('');
  const [generating, setGenerating] = useState(false);
  const [projectType, setProjectType] = useState('YouTube Video');
  const [budget, setBudget] = useState('$500–$1,500');
  const intervalRef = useRef(null);

  const TYPES   = ['YouTube Video', 'TikTok Reel', 'Podcast Episode', 'Brand Campaign', 'Instagram Series'];
  const BUDGETS = ['Under $500', '$500–$1,500', '$1,500–$5K', '$5K+'];

  const generate = useCallback(() => {
    setGenerating(true); setBrief('');
    clearInterval(intervalRef.current);
    setTimeout(() => {
      setGenerating(false);
      const text = `📋 COLLABORATION BRIEF\n${'─'.repeat(40)}\n\nProject Type: ${projectType}\nBudget Range: ${budget}\nPosted: ${new Date().toLocaleDateString()}\n\n🎯 OBJECTIVE\nWe are seeking a skilled ${projectType === 'YouTube Video' ? 'video editor & strategist' : projectType === 'Podcast Episode' ? 'audio engineer & producer' : 'creative professional'} to collaborate on a high-impact ${projectType}. The goal is to elevate brand presence and drive measurable audience engagement.\n\n📌 SCOPE OF WORK\n• Concept development aligned with brand voice\n• Full production or post-production pipeline\n• 2 rounds of revisions included\n• Final delivery in platform-optimized formats\n• Usage rights for 12 months post-delivery\n\n⏱ TIMELINE\nKickoff: Flexible within 1 week\nDelivery: 2–3 weeks from kickoff\nRevision window: 5 business days\n\n✅ IDEAL COLLABORATOR\n• Verified profile with 10+ completed projects\n• Prior experience in similar content verticals\n• Strong communication & portfolio required\n• Available for sync calls during EST/PST hours\n\n💡 GENERATED BY CollabHub AI ✨`;
      let i = 0;
      intervalRef.current = setInterval(() => {
        setBrief(text.substring(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(intervalRef.current);
      }, 6);
    }, 1800);
  }, [projectType, budget]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(14px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 24 }} animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }} transition={{ type: 'spring', damping: 28, stiffness: 300 }}
        className="glass rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl"
        style={{ boxShadow: '0 40px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.15)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'linear-gradient(135deg, rgba(124,58,237,0.22), rgba(79,70,229,0.12))' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.28)' }}>
                <FileText size={18} className="text-violet-300" />
              </div>
              <div>
                <h2 className="font-display font-bold text-white text-lg">AI Brief Generator</h2>
                <p className="text-violet-300/70 text-xs">Generate a professional collaboration brief</p>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-xl glass flex items-center justify-center text-slate-400 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-6">
          {!brief && !generating ? (
            <div className="space-y-5">
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 block">Project Type</label>
                <div className="flex flex-wrap gap-2">
                  {TYPES.map(t => (
                    <button key={t} onClick={() => setProjectType(t)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${projectType === t ? 'border-violet-500/60 text-violet-300' : 'text-slate-400 hover:text-slate-200'}`}
                      style={projectType === t ? { background: 'rgba(124,58,237,0.15)', borderColor: 'rgba(124,58,237,0.55)' } : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)' }}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3 block">Budget Range</label>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map(b => (
                    <button key={b} onClick={() => setBudget(b)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${budget === b ? 'text-cyan-300' : 'text-slate-400 hover:text-slate-200'}`}
                      style={budget === b ? { background: 'rgba(14,165,233,0.15)', borderColor: 'rgba(14,165,233,0.5)' } : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)' }}>
                      {b}
                    </button>
                  ))}
                </div>
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={generate}
                className="w-full py-3.5 btn-gradient text-white font-bold rounded-xl flex items-center justify-center gap-2 glow-violet">
                <Sparkles size={16} /> Generate Brief with AI
              </motion.button>
              <p className="text-center text-xs" style={{ color: '#334155' }}>Powered by CollabHub Neural Engine™</p>
            </div>
          ) : (
            <div>
              {generating ? (
                <div className="flex flex-col items-center py-12 gap-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2" style={{ borderColor: 'rgba(124,58,237,0.2)' }} />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-t-transparent spin-ring" style={{ borderColor: '#7c3aed', borderTopColor: 'transparent' }} />
                    <div className="absolute inset-4 rounded-full animate-pulse" style={{ background: 'rgba(124,58,237,0.2)' }} />
                  </div>
                  <p className="text-sm font-semibold text-slate-400 animate-pulse tracking-wider">Drafting your brief...</p>
                </div>
              ) : (
                <>
                  <div className="glass rounded-2xl p-4 h-64 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap mb-4 border" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                    {brief}<span className="inline-block w-0.5 h-3.5 bg-violet-400 animate-pulse align-middle ml-0.5" />
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => { setBrief(''); setGenerating(false); }}
                      className="flex-1 py-2.5 glass border text-sm font-semibold text-slate-300 hover:text-white rounded-xl transition-all"
                      style={{ borderColor: 'rgba(255,255,255,0.09)' }}>
                      Regenerate
                    </button>
                    <button onClick={onClose} className="flex-1 py-2.5 btn-gradient text-white rounded-xl text-sm font-bold">
                      Use This Brief ✓
                    </button>
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
   STORIES BAR
───────────────────────────────────────────── */
function StoriesBar() {
  const [activeStory, setActiveStory] = useState(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  const openStory  = (s) => { if (s.isOwn) return; setActiveStory(s); setProgress(0); };
  const closeStory = () => { setActiveStory(null); setProgress(0); clearInterval(progressRef.current); };

  useEffect(() => {
    if (!activeStory) return;
    clearInterval(progressRef.current);
    setProgress(0);
    progressRef.current = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(progressRef.current); closeStory(); return 100; }
        return p + 2;
      });
    }, 80);
    return () => clearInterval(progressRef.current);
  }, [activeStory]);

  return (
    <>
      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar mb-6">
        {STORIES.map(story => (
          <motion.button key={story.id} whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.94 }}
            onClick={() => openStory(story)} className="flex flex-col items-center gap-1.5 shrink-0">
            <div className="p-0.5 rounded-full"
              style={story.unseen
                ? { background: 'linear-gradient(135deg, #7c3aed, #4f46e5, #0ea5e9)' }
                : { background: 'rgba(255,255,255,0.09)' }}>
              <div className="p-0.5 rounded-full" style={{ background: '#05050f' }}>
                <div className="relative">
                  <img src={story.img} alt={story.name} className="w-13 h-13 rounded-full object-cover" style={{ width: 52, height: 52 }} />
                  {story.isOwn && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2" style={{ borderColor: '#05050f', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                      <Plus size={10} className="text-white" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-semibold truncate w-14 text-center" style={{ color: story.isOwn ? '#a78bfa' : '#64748b' }}>
              {story.name}
            </span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {activeStory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)' }}
            onClick={closeStory}>
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }} transition={{ type: 'spring', damping: 22 }}
              className="glass rounded-3xl overflow-hidden w-80 shadow-2xl"
              onClick={e => e.stopPropagation()}>
              <div className="h-1.5 m-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                <motion.div animate={{ width: `${progress}%` }} transition={{ ease: 'linear' }}
                  className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #7c3aed, #0ea5e9)' }} />
              </div>
              <div className="flex items-center gap-3 px-4 pb-3">
                <img src={activeStory.img} className="w-8 h-8 rounded-full" alt="" />
                <div>
                  <span className="font-semibold text-sm text-white">{activeStory.name}</span>
                  <p className="text-[11px] text-slate-400">{activeStory.preview}</p>
                </div>
                <button onClick={closeStory} className="ml-auto text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
              </div>
              <div className="h-64 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.22), rgba(14,165,233,0.1))' }}>
                <div className="text-center">
                  <img src={activeStory.img} className="w-20 h-20 rounded-full mx-auto mb-3 border-2 object-cover"
                    style={{ borderColor: 'rgba(124,58,237,0.55)', boxShadow: '0 0 30px rgba(124,58,237,0.45)' }} alt="" />
                  <p className="font-bold text-white">{activeStory.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{activeStory.preview}</p>
                </div>
              </div>
              <div className="p-3">
                <button className="w-full py-2 glass rounded-xl text-sm font-semibold text-slate-300 border transition-colors"
                  style={{ borderColor: 'rgba(255,255,255,0.09)' }}>
                  Reply to Story
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ─────────────────────────────────────────────
   GLASS CARD
───────────────────────────────────────────── */
const GlassCard = ({ children, className = '', hover = false, onClick }) => (
  <div onClick={onClick} className={`glass rounded-2xl ${hover ? 'card-lift cursor-pointer' : ''} ${className}`}>
    {children}
  </div>
);

/* ─────────────────────────────────────────────
   LOGO
───────────────────────────────────────────── */
function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"
        style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', boxShadow: '0 4px 20px rgba(124,58,237,0.45)' }}>
        <Sparkles size={15} />
      </div>
      <span className="font-display font-extrabold text-lg text-white tracking-tight">CollabHub</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const [view, setView] = useState('landing');
  const [userRole, setUserRole] = useState(null);
  const [savedProfiles, setSavedProfiles] = useState([PROFILES[1]]);
  const navigate = useCallback((v) => setView(v), []);
  const isInDashboard = ['dashboard','explore','community','projects','chat','notifications','leaderboard','analytics','saved','profile','settings'].includes(view);

  return (
    <div className="min-h-screen" style={{ background: '#05050f', color: '#f1f5f9', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}>
      <AnimatedBackground />
      <CustomCursor />
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={view}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="h-full">
            {view === 'landing'   && <LandingPage onNavigate={navigate} />}
            {view === 'auth'      && <AuthFlow onComplete={(role) => { setUserRole(role); navigate('dashboard'); }} onBack={() => navigate('landing')} />}
            {isInDashboard        && <AppShell view={view} setView={navigate} userRole={userRole} savedProfiles={savedProfiles} setSavedProfiles={setSavedProfiles} />}
          </motion.div>
        </AnimatePresence>
      </div>
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
    { value: '$8M+', label: 'Paid Out' },
    { value: '98%',  label: 'Satisfaction' },
  ];
  const features = [
    { icon: <Bot size={22} />,      color: '#7c3aed', title: 'AI-Powered Matching',  desc: 'Neural engine analyzing 120+ compatibility signals to find your perfect collaborator instantly.' },
    { icon: <Shield size={22} />,   color: '#14b8a6', title: 'Verified Profiles',    desc: 'Every provider is background-checked, portfolio-verified, and rated by real creators.' },
    { icon: <Zap size={22} />,      color: '#0ea5e9', title: 'Instant Setup',        desc: 'From sign-up to first collaboration in under 10 minutes with guided AI onboarding.' },
    { icon: <BarChart2 size={22} />,color: '#f59e0b', title: 'Live Analytics',       desc: 'Track campaign performance, engagement rates, and ROI from your personal dashboard.' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="sticky top-0 z-40 glass-dark border-b" style={{ borderColor: 'rgba(255,255,255,0.055)' }}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="hidden md:flex items-center gap-8 text-sm font-medium" style={{ color: '#64748b' }}>
            {['Features', 'Pricing', 'Blog'].map(item => (
              <button key={item} className="hover:text-white transition-colors">{item}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => onNavigate('auth')} className="hidden md:block text-sm font-semibold px-4 py-2 transition-colors hover:text-white" style={{ color: '#64748b' }}>
              Log in
            </button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => onNavigate('auth')}
              className="px-5 py-2.5 text-sm font-bold text-white rounded-xl glow-violet transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
              Get Started Free
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex-1 flex items-center py-28 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full border mb-8"
              style={{ borderColor: 'rgba(124,58,237,0.38)', background: 'rgba(124,58,237,0.1)', color: '#a78bfa' }}>
              <Bot size={11} /> AI-Powered Creator Platform
            </motion.div>

            <h1 className="font-display text-6xl md:text-8xl font-extrabold leading-[1.05] mb-8 tracking-tight">
              <span className="text-white">Where Creators</span><br />
              <span className="gradient-text">Meet Their Match</span>
            </h1>

            <p className="max-w-2xl mx-auto text-xl leading-relaxed mb-12" style={{ color: '#94a3b8' }}>
              CollabHub uses advanced AI to connect content creators with elite editors, designers, and strategists — turning good content into unforgettable brands.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button whileHover={{ scale: 1.04, y: -3 }} whileTap={{ scale: 0.97 }}
                onClick={() => onNavigate('auth')}
                className="px-10 py-4 text-base font-bold text-white rounded-2xl btn-gradient glow-violet flex items-center gap-2 justify-center">
                Start for Free <ArrowRight size={18} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.02 }} onClick={() => onNavigate('auth')}
                className="px-10 py-4 text-base font-semibold glass border rounded-2xl transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.09)', color: '#94a3b8' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(124,58,237,0.38)'; e.currentTarget.style.color='#f1f5f9'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.09)'; e.currentTarget.style.color='#94a3b8'; }}>
                Watch Demo
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y py-12 px-6" style={{ borderColor: 'rgba(255,255,255,0.055)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="text-center">
              <div className="font-display text-4xl font-extrabold mb-1 gradient-text">{s.value}</div>
              <div className="text-sm font-medium" style={{ color: '#475569' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white mb-4">Collaborate smarter</h2>
            <p className="text-lg max-w-xl mx-auto" style={{ color: '#64748b' }}>Built for creators who take their craft seriously.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass rounded-3xl p-7 border card-lift group"
                style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                  style={{ background: `${f.color}1f` }}>
                  <span style={{ color: f.color }}>{f.icon}</span>
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#64748b' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 mx-6 my-12 rounded-3xl"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.22), rgba(79,70,229,0.14), rgba(14,165,233,0.09))', border: '1px solid rgba(124,58,237,0.18)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-extrabold text-white mb-4">Ready to build your creative empire?</h2>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: '#94a3b8' }}>Join 50,000+ creators already leveling up with AI-matched collaborators.</p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('auth')}
            className="px-10 py-4 bg-white font-extrabold rounded-2xl shadow-2xl transition"
            style={{ color: '#7c3aed' }}>
            Join Free Today
          </motion.button>
        </div>
      </section>

      <footer className="border-t py-10 px-6 text-center text-sm" style={{ borderColor: 'rgba(255,255,255,0.055)', color: '#334155' }}>
        © 2026 CollabHub, Inc. ·{' '}
        <button className="hover:text-slate-300 transition-colors">Privacy</button> ·{' '}
        <button className="hover:text-slate-300 transition-colors">Terms</button> ·{' '}
        <button className="hover:text-slate-300 transition-colors">Support</button>
      </footer>
    </div>
  );
}

/* ─────────────────────────────────────────────
   AUTH FLOW
───────────────────────────────────────────── */
function AuthFlow({ onComplete, onBack }) {
  const [step, setStep] = useState(0);
  const [role, setRole] = useState(null);
  const [bioInput, setBioInput] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [enhancedBio, setEnhancedBio] = useState('');
  const [interests, setInterests] = useState([]);
  const intervalRef = useRef(null);

  const INTEREST_OPTIONS = ['Fashion','Tech','Gaming','Travel','Wellness','Food','Finance','Music','Sports','Beauty'];
  const PROVIDER_OPTIONS  = ['Video Editing','Motion Graphics','Thumbnails','Brand Strategy','Audio','Photography','Copywriting'];
  const options = role === 'creator' ? INTEREST_OPTIONS : PROVIDER_OPTIONS;

  const toggleInterest = (tag) => setInterests(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);

  const handleEnhance = () => {
    if (!bioInput.trim()) return;
    setIsEnhancing(true); setEnhancedBio('');
    clearInterval(intervalRef.current);
    setTimeout(() => {
      setIsEnhancing(false);
      const base = role === 'creator'
        ? `Digital content creator specializing in ${interests.slice(0, 2).join(' & ') || 'lifestyle'} storytelling. Known for authentic audience engagement and consistent brand partnerships that drive measurable results.`
        : `Professional ${interests[0] || 'creative'} specialist with a track record of elevating creator brands. Delivering high-quality, deadline-driven work with clear communication and precise execution.`;
      let i = 0;
      intervalRef.current = setInterval(() => {
        setEnhancedBio(base.substring(0, i + 1));
        i++;
        if (i >= base.length) clearInterval(intervalRef.current);
      }, 14);
    }, 1600);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const stepLabels = ['Choose Role', 'Build Profile', 'Done'];
  const progressPcts = [33, 66, 100];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <button onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 text-sm font-semibold transition-colors"
        style={{ color: '#475569' }}
        onMouseEnter={e => e.currentTarget.style.color='#f1f5f9'}
        onMouseLeave={e => e.currentTarget.style.color='#475569'}>
        <ChevronRight className="rotate-180" size={16} /> Back
      </button>

      {/* Progress */}
      <div className="w-full max-w-md mb-10">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest mb-3">
          {stepLabels.map((label, i) => (
            <span key={label} style={{ color: i <= step ? '#a78bfa' : '#334155' }}>{label}</span>
          ))}
        </div>
        <div className="h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.07)' }}>
          <motion.div animate={{ width: `${progressPcts[step]}%` }} transition={{ duration: 0.5 }}
            className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #7c3aed, #0ea5e9)' }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 0: Choose Role */}
        {step === 0 && (
          <motion.div key="role" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="w-full max-w-2xl">
            <div className="text-center mb-10">
              <Logo />
              <h1 className="font-display text-3xl font-extrabold text-white mt-6 mb-2">Choose your path</h1>
              <p style={{ color: '#64748b' }}>Select how you'll use CollabHub.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { id: 'creator',  icon: <Camera size={28} />,  label: 'I am a Creator',  sub: 'I produce content and need editors, designers, or strategists.', color: '#7c3aed', perks: ['Browse 12K+ verified providers', 'AI-matched recommendations', 'Secure payments & contracts'] },
                { id: 'provider', icon: <PenTool size={28} />, label: 'I am a Provider', sub: 'I offer services to help creators scale their content brand.', color: '#14b8a6', perks: ['Access premium creator jobs', 'Showcase your portfolio', 'Build long-term client base'] },
              ].map(item => (
                <motion.button key={item.id} whileHover={{ scale: 1.02, y: -4 }} whileTap={{ scale: 0.98 }}
                  onClick={() => { setRole(item.id); setStep(1); }}
                  className="text-left p-7 glass card-lift rounded-3xl border group"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110"
                    style={{ background: `${item.color}1f` }}>
                    <span style={{ color: item.color }}>{item.icon}</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-white mb-1">{item.label}</h2>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: '#64748b' }}>{item.sub}</p>
                  {item.perks.map(perk => (
                    <div key={perk} className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: '#cbd5e1' }}>
                      <Check size={14} style={{ color: item.color }} /> {perk}
                    </div>
                  ))}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 1: Build Profile */}
        {step === 1 && (
          <motion.div key="bio" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} className="w-full max-w-xl">
            <div className="glass rounded-3xl border p-8" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.22)' }}>
                  <Bot size={20} className="text-violet-400" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white">AI Profile Setup</h2>
                  <p className="text-xs" style={{ color: '#475569' }}>Let AI craft your profile bio.</p>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#64748b' }}>
                  Select your {role === 'creator' ? 'content niches' : 'skills'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {options.map(tag => (
                    <button key={tag} onClick={() => toggleInterest(tag)}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
                      style={interests.includes(tag)
                        ? { background: 'rgba(124,58,237,0.15)', borderColor: 'rgba(124,58,237,0.6)', color: '#c4b5fd' }
                        : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)', color: '#64748b' }}>
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#64748b' }}>Describe yourself</label>
                <textarea value={bioInput} onChange={e => setBioInput(e.target.value)}
                  placeholder={role === 'creator' ? "e.g. I make gaming videos and need good thumbnails" : "e.g. I edit fast-paced reels and do motion graphics"}
                  className="w-full glass border rounded-xl p-3 text-sm h-24 resize-none transition-colors bg-transparent placeholder:text-slate-600"
                  style={{ borderColor: 'rgba(255,255,255,0.09)', color: '#e2e8f0' }}
                  onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.45)'}
                  onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.09)'} />
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                onClick={handleEnhance} disabled={isEnhancing || !bioInput.trim()}
                className="w-full py-3 btn-gradient text-white font-bold rounded-xl disabled:opacity-40 flex items-center justify-center gap-2 glow-violet">
                {isEnhancing ? <><Loader2 className="animate-spin" size={16} /> Analyzing...</> : <><Sparkles size={16} /> Enhance with AI</>}
              </motion.button>

              <AnimatePresence>
                {(enhancedBio || isEnhancing) && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-5 overflow-hidden">
                    <div className="rounded-2xl p-4 border" style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.28)' }}>
                      <div className="flex items-center gap-1.5 text-xs font-bold text-violet-400 mb-2 uppercase tracking-widest">
                        <Sparkles size={11} /> AI Result
                      </div>
                      <p className="text-sm leading-relaxed min-h-12" style={{ color: '#cbd5e1' }}>
                        {isEnhancing ? <span className="italic animate-pulse" style={{ color: '#475569' }}>Analyzing persona...</span> : enhancedBio}
                        {enhancedBio && <span className="inline-block w-0.5 h-4 bg-violet-400 ml-0.5 animate-pulse align-middle" />}
                      </p>
                    </div>
                    {enhancedBio && (
                      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        onClick={() => setStep(2)}
                        className="w-full mt-4 py-3 glass border text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                        style={{ borderColor: 'rgba(255,255,255,0.12)' }}>
                        Complete Setup <ArrowRight size={16} />
                      </motion.button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <button onClick={() => setStep(2)} className="w-full mt-3 py-2 text-sm font-semibold transition-colors" style={{ color: '#334155' }}
                onMouseEnter={e => e.currentTarget.style.color='#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color='#334155'}>
                Skip for now
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 2: Done */}
        {step === 2 && (
          <motion.div key="done" initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
            <motion.div animate={{ scale: [0, 1.2, 1], rotate: [0, 15, -10, 0] }} transition={{ delay: 0.1, duration: 0.7 }}
              className="w-24 h-24 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', boxShadow: '0 0 60px rgba(124,58,237,0.6)' }}>
              🎉
            </motion.div>
            <h1 className="font-display text-3xl font-extrabold text-white mb-3">You're all set!</h1>
            <p className="mb-8 max-w-sm mx-auto" style={{ color: '#64748b' }}>Your AI-powered CollabHub profile is ready. Start discovering amazing collaborators.</p>
            <motion.button whileHover={{ scale: 1.04 }} onClick={() => onComplete(role)}
              className="px-10 py-4 btn-gradient text-white font-bold rounded-2xl glow-violet flex items-center gap-2 mx-auto">
              Go to Dashboard <Rocket size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP SHELL (with mobile bottom nav)
───────────────────────────────────────────── */
function AppShell({ view, setView, userRole, savedProfiles, setSavedProfiles }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'dashboard',     label: 'Home',          icon: <Home size={18} /> },
    { id: 'explore',       label: 'Explore',        icon: <Compass size={18} /> },
    { id: 'community',     label: 'Community',      icon: <Globe size={18} />, badge: 'New' },
    { id: 'projects',      label: 'Projects',       icon: <Layers size={18} /> },
    { id: 'chat',          label: 'Messages',       icon: <MessageCircle size={18} />, badge: '4' },
    { id: 'notifications', label: 'Notifications',  icon: <Bell size={18} />, badge: unreadCount > 0 ? String(unreadCount) : null },
    { id: 'leaderboard',   label: 'Leaderboard',    icon: <Trophy size={18} /> },
    { id: 'analytics',     label: 'Analytics',      icon: <BarChart2 size={18} /> },
    { id: 'saved',         label: 'Saved',          icon: <Bookmark size={18} /> },
    { id: 'profile',       label: 'Profile',        icon: <User size={18} /> },
    { id: 'settings',      label: 'Settings',       icon: <Settings size={18} /> },
  ];

  const mobileNavItems = [
    { id: 'dashboard', label: 'Home',     icon: <Home size={21} /> },
    { id: 'explore',   label: 'Explore',  icon: <Compass size={21} /> },
    { id: 'community', label: 'Community',icon: <Globe size={21} /> },
    { id: 'chat',      label: 'Messages', icon: <MessageCircle size={21} />, badge: '4' },
    { id: 'profile',   label: 'Profile',  icon: <User size={21} /> },
  ];

  const handleSaveToggle = (profile) =>
    setSavedProfiles(prev =>
      prev.find(p => p.id === profile.id)
        ? prev.filter(p => p.id !== profile.id)
        : [...prev, { ...profile, saved: true }]
    );

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile Sidebar Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeSidebar}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)' }} />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
            className="fixed left-0 top-0 bottom-0 w-[240px] z-50 md:hidden glass-dark flex flex-col"
            style={{ borderRight: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="h-16 flex items-center justify-between px-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <Logo />
              <button onClick={closeSidebar} className="text-slate-500 hover:text-white transition-colors"><X size={18} /></button>
            </div>
            <div className="m-3 p-3 rounded-2xl flex items-center gap-3" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.18)' }}>
              <img src="https://i.pravatar.cc/150?u=currentuser" alt="You" className="w-9 h-9 rounded-full border object-cover" style={{ borderColor: 'rgba(124,58,237,0.4)' }} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-white truncate">Alex Creator</p>
                <p className="text-xs font-semibold text-violet-400">{userRole === 'provider' ? 'Provider' : 'Creator'}</p>
              </div>
              <div className="w-2 h-2 rounded-full" style={{ background: '#14b8a6', boxShadow: '0 0 6px rgba(20,184,166,0.8)' }} />
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 no-scrollbar">
              {navItems.map(item => (
                <button key={item.id} onClick={() => { setView(item.id); closeSidebar(); }}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={view === item.id ? { background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.32)', color: '#f1f5f9' } : { border: '1px solid transparent', color: '#475569' }}>
                  <div className="flex items-center gap-3">
                    <span style={{ color: view === item.id ? '#a78bfa' : '#475569' }}>{item.icon}</span>
                    {item.label}
                  </div>
                  {item.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                      style={{ background: item.badge === 'New' ? '#14b8a6' : '#7c3aed' }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
              <button onClick={() => { setView('landing'); closeSidebar(); }}
                className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl w-full transition-colors"
                style={{ color: '#475569' }}
                onMouseEnter={e => { e.currentTarget.style.color='#f87171'; e.currentTarget.style.background='rgba(244,63,94,0.07)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='#475569'; e.currentTarget.style.background='transparent'; }}>
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-[220px] flex-col h-screen shrink-0 glass-dark border-r" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
        <div className="h-16 flex items-center px-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
          <Logo />
        </div>
        <div className="m-3 p-3 rounded-2xl flex items-center gap-3" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.18)' }}>
          <img src="https://i.pravatar.cc/150?u=currentuser" alt="You" className="w-9 h-9 rounded-full border object-cover" style={{ borderColor: 'rgba(124,58,237,0.4)' }} />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm text-white truncate">Alex Creator</p>
            <p className="text-xs font-semibold text-violet-400">{userRole === 'provider' ? 'Provider' : 'Creator'}</p>
          </div>
          <div className="w-2 h-2 rounded-full" style={{ background: '#14b8a6', boxShadow: '0 0 6px rgba(20,184,166,0.8)' }} />
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 no-scrollbar">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setView(item.id)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={view === item.id
                ? { background: 'rgba(124,58,237,0.18)', border: '1px solid rgba(124,58,237,0.32)', color: '#f1f5f9', boxShadow: '0 0 18px rgba(124,58,237,0.08)' }
                : { border: '1px solid transparent', color: '#475569' }}
              onMouseEnter={e => { if (view !== item.id) { e.currentTarget.style.color='#cbd5e1'; e.currentTarget.style.background='rgba(255,255,255,0.03)'; }}}
              onMouseLeave={e => { if (view !== item.id) { e.currentTarget.style.color='#475569'; e.currentTarget.style.background='transparent'; }}}>
              <div className="flex items-center gap-3">
                <span style={{ color: view === item.id ? '#a78bfa' : '#334155' }}>{item.icon}</span>
                {item.label}
              </div>
              {item.badge && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: view === item.id ? 'rgba(124,58,237,0.5)' : item.badge === 'New' ? '#14b8a6' : '#7c3aed' }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
          <button onClick={() => setView('landing')}
            className="flex items-center gap-3 px-3.5 py-2.5 text-sm font-semibold rounded-xl w-full transition-all"
            style={{ color: '#475569' }}
            onMouseEnter={e => { e.currentTarget.style.color='#f87171'; e.currentTarget.style.background='rgba(244,63,94,0.07)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='#475569'; e.currentTarget.style.background='transparent'; }}>
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Mobile Top Header */}
        <header className="md:hidden h-14 glass-dark shrink-0 flex items-center justify-between px-4"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          <button onClick={() => setSidebarOpen(v => !v)} className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
            style={{ color: '#64748b' }}
            onMouseEnter={e => e.currentTarget.style.color='#f1f5f9'}
            onMouseLeave={e => e.currentTarget.style.color='#64748b'}>
            <Menu size={20} />
          </button>
          <Logo />
          <button onClick={() => setView('notifications')} className="w-9 h-9 rounded-xl flex items-center justify-center relative transition-colors"
            style={{ background: 'rgba(124,58,237,0.12)', color: '#a78bfa' }}>
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full text-[9px] font-extrabold flex items-center justify-center text-white"
                style={{ background: '#7c3aed' }}>
                {unreadCount}
              </span>
            )}
          </button>
        </header>

        {/* Scrollable Main */}
        <main className="flex-1 overflow-y-auto" style={{ paddingBottom: '0' }}>
          <div className="pb-20 md:pb-0">
            <AnimatePresence mode="wait">
              <motion.div key={view}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
                className="h-full">
                {view === 'dashboard'     && <DashboardHome setView={setView} onSaveToggle={handleSaveToggle} savedProfiles={savedProfiles} />}
                {view === 'explore'       && <ExplorePage onSaveToggle={handleSaveToggle} savedProfiles={savedProfiles} />}
                {view === 'community'     && <CommunityPage />}
                {view === 'projects'      && <ProjectsPage />}
                {view === 'chat'          && <ChatPage />}
                {view === 'notifications' && <NotificationsPage notifications={notifications} setNotifications={setNotifications} />}
                {view === 'leaderboard'   && <LeaderboardPage />}
                {view === 'analytics'     && <AnalyticsPage />}
                {view === 'saved'         && <SavedPage savedProfiles={savedProfiles} onSaveToggle={handleSaveToggle} />}
                {view === 'profile'       && <ProfilePage userRole={userRole} />}
                {view === 'settings'      && <SettingsPage setView={setView} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 glass-dark"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
          <div className="flex items-center justify-around h-16 px-2">
            {mobileNavItems.map(item => {
              const isActive = view === item.id;
              return (
                <button key={item.id} onClick={() => setView(item.id)}
                  className="flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all relative"
                  style={{ color: isActive ? '#a78bfa' : '#475569' }}>
                  <div className="relative">
                    {isActive && (
                      <motion.span layoutId="mobile-nav-indicator"
                        className="absolute -inset-2 rounded-xl"
                        style={{ background: 'rgba(124,58,237,0.15)' }} />
                    )}
                    <span className="relative">{item.icon}</span>
                    {item.badge && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-white"
                        style={{ background: '#7c3aed' }}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-semibold">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
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
    setAiMatchesLoading(true); setAiMatches(null);
    setTimeout(() => { setAiMatchesLoading(false); setAiMatches(PROFILES.filter(p => p.id === 2 || p.id === 5)); }, 2400);
  };

  const stats = [
    { label: 'Profile Views',    value: '1,284', delta: '+18%',      color: '#7c3aed', icon: <Eye size={18} />,      chart: [40,55,48,70,65,80,90,95,88,110,102,120] },
    { label: 'Collaborations',   value: '12',    delta: '+3 this mo.',color: '#0ea5e9', icon: <Briefcase size={18} />,chart: [2,3,2,4,5,4,6,7,8,9,10,12] },
    { label: 'Avg. Rating',      value: '4.9',   delta: '★★★★★',     color: '#14b8a6', icon: <Star size={18} />,     chart: [4.5,4.6,4.7,4.7,4.8,4.8,4.9,4.9,4.9,4.9,4.9,4.9] },
    { label: 'AI Matches',       value: '34',    delta: 'new today',  color: '#f59e0b', icon: <Bot size={18} />,      chart: [5,8,12,10,18,22,16,28,24,30,32,34] },
  ];

  return (
    <div className="p-5 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-extrabold text-white">Good morning, Alex 👋</h1>
          <p className="text-sm mt-1" style={{ color: '#475569' }}>
            You have <span className="font-bold" style={{ color: '#a78bfa' }}>3 new collaboration requests</span> waiting.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <motion.button whileHover={{ scale: 1.04 }} onClick={() => setShowBriefModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold rounded-xl border transition-all"
            style={{ color: '#a78bfa', borderColor: 'rgba(124,58,237,0.38)' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(124,58,237,0.09)'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}>
            <FileText size={15} /> AI Brief
          </motion.button>
          <motion.button whileHover={{ scale: 1.04 }} onClick={() => setView('explore')}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white rounded-xl glow-violet"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
            <Plus size={15} /> New Search
          </motion.button>
        </div>
      </div>

      <StoriesBar />

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {stats.map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="glass rounded-2xl border overflow-hidden card-lift shimmer p-4"
            style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: `${s.color}20` }}>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div className="text-2xl font-extrabold text-white">{s.value}</div>
            <div className="text-xs font-semibold mt-0.5" style={{ color: '#475569' }}>{s.label}</div>
            <div className="text-xs font-bold mt-0.5" style={{ color: s.color }}>{s.delta}</div>
            <div className="mt-2 -mx-1"><SparklineChart data={s.chart} color={s.color} /></div>
          </motion.div>
        ))}
      </div>

      <div className="flex gap-6 flex-col lg:flex-row">
        <div className="flex-1 min-w-0">
          {/* Trending */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Flame size={14} style={{ color: '#f97316' }} />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#64748b' }}>Trending Now</span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {TRENDING_TOPICS.map((topic, i) => (
                <motion.button key={topic.id}
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                  whileHover={{ scale: 1.04, y: -3 }}
                  className="shrink-0 glass border rounded-2xl px-4 py-3 text-left card-lift transition-all"
                  style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                  <div className="text-xl mb-1">{topic.emoji}</div>
                  <div className="font-bold text-sm text-white whitespace-nowrap">{topic.tag}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{topic.posts} posts</div>
                  <div className="text-xs font-bold mt-1" style={{ color: '#34d399' }}>{topic.growth}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <h2 className="font-bold text-white mb-4">Recent Collaborators</h2>
          <div className="space-y-4">
            {PROFILES.slice(0, 4).map((profile, i) => {
              const isSaved = !!savedProfiles.find(p => p.id === profile.id);
              return (
                <motion.div key={profile.id}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
                  <ProfileCard profile={profile} isSaved={isSaved} onSave={() => onSaveToggle(profile)} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-72 shrink-0">
          <GlassCard className="p-5 mb-4">
            <div className="flex items-center gap-2 mb-5 pb-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
              <div className="w-7 h-7 rounded-xl flex items-center justify-center" style={{ background: 'rgba(124,58,237,0.2)' }}>
                <Bot size={14} className="text-violet-400" />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest" style={{ color: '#cbd5e1' }}>AI Match Engine</span>
            </div>
            <AnimatePresence mode="wait">
              {aiMatches ? (
                <motion.div key="matches" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  {aiMatches.map((p, i) => (
                    <motion.div key={p.id}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
                      className="rounded-2xl p-4 border cursor-pointer transition-all"
                      style={{ background: 'rgba(124,58,237,0.07)', borderColor: 'rgba(255,255,255,0.07)' }}
                      onMouseEnter={e => e.currentTarget.style.borderColor='rgba(124,58,237,0.3)'}
                      onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}>
                      <div className="flex items-center gap-3 mb-3">
                        <img src={p.img} className="w-9 h-9 rounded-full border object-cover" style={{ borderColor: 'rgba(124,58,237,0.3)' }} alt="" />
                        <div>
                          <h4 className="font-bold text-sm text-white">{p.name}</h4>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgba(20,184,166,0.18)', color: '#34d399' }}>
                            {p.matchScore}% Match
                          </span>
                        </div>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-[10px] font-semibold mb-1" style={{ color: '#475569' }}>
                          <span>Compatibility</span><span style={{ color: '#a78bfa' }}>{p.matchScore}%</span>
                        </div>
                        <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <motion.div initial={{ width: 0 }} animate={{ width: `${p.matchScore}%` }} transition={{ duration: 1, delay: 0.3 }}
                            className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #7c3aed, #0ea5e9)' }} />
                        </div>
                      </div>
                      <p className="text-xs leading-relaxed p-2 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', color: '#94a3b8' }}>
                        <span className="font-bold text-violet-400">AI: </span>{p.aiInsight}
                      </p>
                    </motion.div>
                  ))}
                  <button onClick={() => setView('explore')} className="w-full py-2.5 text-sm font-bold text-violet-400 hover:text-violet-300 transition-colors">
                    View All Matches →
                  </button>
                </motion.div>
              ) : aiMatchesLoading ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center py-10 gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2" style={{ borderColor: 'rgba(124,58,237,0.2)' }} />
                    <div className="absolute inset-0 rounded-full border-2 border-t-transparent spin-ring" style={{ borderColor: '#7c3aed', borderTopColor: 'transparent' }} />
                  </div>
                  <p className="text-xs font-bold animate-pulse tracking-wider text-center" style={{ color: '#475569' }}>Running Neural Algorithm...</p>
                </motion.div>
              ) : (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <Lightbulb size={20} style={{ color: '#475569' }} />
                  </div>
                  <p className="text-sm mb-5 leading-relaxed" style={{ color: '#475569' }}>Discover hyper-relevant collaborators matched to your style and budget.</p>
                  <button onClick={runAIMatch}
                    className="w-full py-3 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 glow-violet"
                    style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                    <Sparkles size={14} /> Generate AI Matches
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>

          <GlassCard className="p-5">
            <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: '#475569' }}>Quick Actions</p>
            <div className="space-y-1">
              {[
                { label: 'Generate AI Brief',     icon: <FileText size={14} />,  color: '#a78bfa', action: () => setShowBriefModal(true) },
                { label: 'Post a collaboration',  icon: <Plus size={14} />,      color: '#38bdf8', action: () => {} },
                { label: 'Upgrade to Pro',        icon: <Rocket size={14} />,    color: '#f59e0b', action: () => {} },
                { label: 'Invite a colleague',    icon: <Users size={14} />,     color: '#34d399', action: () => {} },
              ].map(action => (
                <button key={action.label} onClick={action.action}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all"
                  style={{ color: '#64748b' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#f1f5f9'; e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='#64748b'; e.currentTarget.style.background='transparent'; }}>
                  <span style={{ color: action.color }}>{action.icon}</span> {action.label}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      <AnimatePresence>
        {showBriefModal && <AIBriefModal onClose={() => setShowBriefModal(false)} />}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROFILE CARD
───────────────────────────────────────────── */
function ProfileCard({ profile, isSaved, onSave, minimal = false }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <motion.div layout className="glass rounded-2xl border overflow-hidden card-lift" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
      <div className="relative h-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(14,165,233,0.09))' }}>
        {profile.cover && <img src={profile.cover} alt="" className="w-full h-full object-cover opacity-20" />}
        {!minimal && onSave && (
          <button onClick={e => { e.stopPropagation(); onSave(); }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full glass flex items-center justify-center border transition-all"
            style={isSaved ? { borderColor: 'rgba(124,58,237,0.65)', color: '#a78bfa' } : { borderColor: 'rgba(255,255,255,0.1)', color: '#475569' }}>
            <Bookmark size={14} style={isSaved ? { fill: '#a78bfa' } : {}} />
          </button>
        )}
        <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold"
          style={profile.available
            ? { background: 'rgba(20,184,166,0.18)', color: '#2dd4bf' }
            : { background: 'rgba(255,255,255,0.06)', color: '#475569' }}>
          {profile.available ? '● Available' : 'Busy'}
        </div>
      </div>
      <div className="px-5 pb-5">
        <div className="flex items-end justify-between -mt-7 mb-3">
          <img src={profile.img} alt={profile.name} className="w-14 h-14 rounded-2xl border-2 object-cover"
            style={{ borderColor: '#05050f', boxShadow: '0 0 20px rgba(0,0,0,0.5)' }} />
          <div className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full"
            style={{ background: 'rgba(245,158,11,0.1)', color: '#fbbf24' }}>
            <Star size={10} style={{ fill: '#fbbf24' }} /> {profile.rating} ({profile.reviews})
          </div>
        </div>
        <div className="flex items-start justify-between mb-1">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-bold text-white">{profile.name}</h3>
              {profile.verified && <CheckCircle2 size={13} className="text-violet-400" />}
            </div>
            <p className="text-xs font-medium" style={{ color: '#475569' }}>{profile.handle}</p>
          </div>
          {profile.rate
            ? <span className="font-bold text-sm" style={{ color: '#2dd4bf' }}>{profile.rate}</span>
            : <span className="text-xs font-bold" style={{ color: '#64748b' }}>{profile.followers} <span style={{ color: '#334155' }}>followers</span></span>}
        </div>
        <div className="flex items-center gap-1 text-xs font-medium mb-3" style={{ color: '#334155' }}>
          <MapPin size={10} /> {profile.location}
        </div>
        {profile.matchScore && (
          <div className="mb-3">
            <div className="flex justify-between text-[10px] font-bold mb-1" style={{ color: '#475569' }}>
              <span>AI Match Score</span><span style={{ color: '#a78bfa' }}>{profile.matchScore}%</span>
            </div>
            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <motion.div initial={{ width: 0 }} whileInView={{ width: `${profile.matchScore}%` }} viewport={{ once: true }} transition={{ duration: 0.9 }}
                className="h-full rounded-full"
                style={{ background: profile.matchScore >= 90 ? 'linear-gradient(90deg, #14b8a6, #7c3aed)' : 'linear-gradient(90deg, #7c3aed, #4f46e5)' }} />
            </div>
          </div>
        )}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {profile.tags.map(tag => (
            <span key={tag} className="px-2.5 py-1 text-xs font-semibold rounded-lg"
              style={{ background: 'rgba(255,255,255,0.055)', color: '#94a3b8' }}>
              {tag}
            </span>
          ))}
        </div>
        {!minimal && (
          <>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>{profile.bio}</p>
            <div className="flex gap-2">
              <button className="flex-1 py-2 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all glow-violet"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                <MessageCircle size={14} /> Message
              </button>
              <button onClick={() => setExpanded(!expanded)}
                className="px-3 py-2 glass border text-sm rounded-xl transition-all"
                style={{ borderColor: 'rgba(255,255,255,0.09)', color: '#64748b' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; e.currentTarget.style.color='#f1f5f9'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.09)'; e.currentTarget.style.color='#64748b'; }}>
                <MoreHorizontal size={15} />
              </button>
            </div>
            <AnimatePresence>
              {expanded && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-3 overflow-hidden">
                  <div className="rounded-xl p-3 text-xs leading-relaxed" style={{ background: 'rgba(124,58,237,0.09)', border: '1px solid rgba(124,58,237,0.2)', color: '#cbd5e1' }}>
                    <span className="font-bold text-violet-400">AI Insight: </span>{profile.aiInsight}
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
  const [sort, setSort] = useState('Match');

  const filtered = useMemo(() =>
    PROFILES.filter(p => {
      const matchesRole   = roleFilter === 'All' || p.role === roleFilter;
      const matchesSearch = `${p.name} ${p.tags.join(' ')} ${p.location}`.toLowerCase().includes(search.toLowerCase());
      return matchesRole && matchesSearch;
    }).sort((a, b) => sort === 'Rating' ? b.rating - a.rating : sort === 'Match' ? b.matchScore - a.matchScore : a.name.localeCompare(b.name)),
  [search, roleFilter, sort]);

  return (
    <div className="p-5 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-extrabold text-white mb-1">Explore Collaborators</h1>
        <p className="text-sm" style={{ color: '#475569' }}>Find your perfect creative partner from {PROFILES.length}+ verified profiles.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-3.5" size={16} style={{ color: '#475569' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, skill, or location..."
            className="w-full pl-11 pr-4 py-3 glass border rounded-xl text-sm placeholder:text-slate-600 transition-colors bg-transparent"
            style={{ borderColor: 'rgba(255,255,255,0.09)', color: '#e2e8f0' }}
            onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.45)'}
            onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.09)'} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {['All', 'Creator', 'Provider'].map(f => (
            <button key={f} onClick={() => setRoleFilter(f)}
              className="px-4 py-2.5 rounded-xl text-sm font-bold border transition-all"
              style={roleFilter === f
                ? { background: 'rgba(124,58,237,0.18)', borderColor: 'rgba(124,58,237,0.5)', color: '#a78bfa' }
                : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)', color: '#64748b' }}>
              {f}
            </button>
          ))}
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="px-3 py-2 glass border rounded-xl text-sm font-semibold bg-transparent transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.09)', color: '#94a3b8' }}>
            <option value="Match"  style={{ background: '#0f0f1a' }}>Match Score</option>
            <option value="Rating" style={{ background: '#0f0f1a' }}>Rating</option>
            <option value="Name"   style={{ background: '#0f0f1a' }}>Name</option>
          </select>
          <button onClick={() => setViewMode(m => m === 'grid' ? 'list' : 'grid')}
            className="p-3 glass border rounded-xl transition-all"
            style={{ borderColor: 'rgba(255,255,255,0.09)', color: '#64748b' }}
            onMouseEnter={e => { e.currentTarget.style.color='#f1f5f9'; e.currentTarget.style.borderColor='rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color='#64748b'; e.currentTarget.style.borderColor='rgba(255,255,255,0.09)'; }}>
            {viewMode === 'grid' ? <List size={17} /> : <Grid size={17} />}
          </button>
        </div>
      </div>

      <p className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#334155' }}>{filtered.length} results found</p>

      <motion.div layout className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div key={p.id} layout
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }} transition={{ delay: i * 0.04 }}>
              <ProfileCard profile={p} isSaved={!!savedProfiles.find(s => s.id === p.id)} onSave={() => onSaveToggle(p)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMMUNITY PAGE
───────────────────────────────────────────── */
function CommunityPage() {
  const [posts, setPosts] = useState(INITIAL_COMMUNITY_POSTS);
  const [newPost, setNewPost] = useState('');
  const [activeReaction, setActiveReaction] = useState({});

  const react = (postId, emoji) => {
    const already = activeReaction[postId] === emoji;
    setActiveReaction(r => ({ ...r, [postId]: already ? null : emoji }));
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const reactions = { ...p.reactions };
      if (already) { reactions[emoji] = Math.max(0, reactions[emoji] - 1); }
      else {
        if (activeReaction[postId]) reactions[activeReaction[postId]] = Math.max(0, reactions[activeReaction[postId]] - 1);
        reactions[emoji] = (reactions[emoji] || 0) + 1;
      }
      return { ...p, reactions };
    }));
  };

  const submitPost = () => {
    if (!newPost.trim()) return;
    setPosts(prev => [{ id: Date.now(), author: PROFILES[0], time: 'Just now', content: newPost, reactions: { '🔥': 0, '❤️': 0, '👏': 0 }, comments: 0 }, ...prev]);
    setNewPost('');
  };

  return (
    <div className="p-5 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Globe size={20} style={{ color: '#2dd4bf' }} />
        <h1 className="font-display text-2xl font-extrabold text-white">Community Feed</h1>
        <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full" style={{ background: 'rgba(20,184,166,0.13)', color: '#34d399', border: '1px solid rgba(20,184,166,0.22)' }}>● Live</span>
      </div>

      {/* Compose */}
      <GlassCard className="p-4 mb-6">
        <div className="flex items-start gap-3">
          <img src="https://i.pravatar.cc/150?u=currentuser" className="w-10 h-10 rounded-full border object-cover" style={{ borderColor: 'rgba(124,58,237,0.3)' }} alt="" />
          <div className="flex-1">
            <textarea value={newPost} onChange={e => setNewPost(e.target.value)}
              placeholder="Share something with the community..."
              className="w-full glass border rounded-xl px-4 py-3 text-sm placeholder:text-slate-600 resize-none h-20 transition-colors bg-transparent"
              style={{ borderColor: 'rgba(255,255,255,0.07)', color: '#e2e8f0' }}
              onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.38)'}
              onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.07)'} />
            <div className="flex justify-between items-center mt-2">
              <div className="flex gap-2" style={{ color: '#475569' }}>
                {[<SmilePlus size={17} />, <Camera size={17} />, <Hash size={17} />].map((icon, i) => (
                  <button key={i} className="p-1 hover:text-violet-400 transition-colors">{icon}</button>
                ))}
              </div>
              <motion.button whileTap={{ scale: 0.95 }} onClick={submitPost} disabled={!newPost.trim()}
                className="px-5 py-1.5 text-sm font-bold text-white rounded-xl disabled:opacity-40 transition-all"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
                Post
              </motion.button>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="space-y-4">
        {posts.map((post, i) => (
          <motion.div key={post.id}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl border p-5" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="flex items-start gap-3 mb-3">
              <img src={post.author.img} className="w-10 h-10 rounded-full border object-cover" style={{ borderColor: 'rgba(255,255,255,0.09)' }} alt="" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{post.author.name}</span>
                  {post.author.verified && <CheckCircle2 size={13} className="text-violet-400" />}
                  <span className="text-xs ml-auto" style={{ color: '#334155' }}>{post.time}</span>
                </div>
                <p className="text-xs font-medium" style={{ color: 'rgba(167,139,250,0.65)' }}>{post.author.handle}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>{post.content}</p>
            <div className="flex items-center gap-2 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
              {Object.entries(post.reactions).map(([emoji, count]) => (
                <motion.button key={emoji} whileTap={{ scale: 0.82 }} onClick={() => react(post.id, emoji)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border transition-all"
                  style={activeReaction[post.id] === emoji
                    ? { background: 'rgba(124,58,237,0.18)', borderColor: 'rgba(124,58,237,0.38)', color: '#a78bfa' }
                    : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.09)', color: '#64748b' }}>
                  <span>{emoji}</span><span>{count}</span>
                </motion.button>
              ))}
              <button className="ml-auto flex items-center gap-1 text-xs font-bold transition-colors" style={{ color: '#475569' }}
                onMouseEnter={e => e.currentTarget.style.color='#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color='#475569'}>
                <MessageCircle size={13} /> {post.comments}
              </button>
              <button className="flex items-center gap-1 text-xs font-bold transition-colors" style={{ color: '#475569' }}
                onMouseEnter={e => e.currentTarget.style.color='#2dd4bf'}
                onMouseLeave={e => e.currentTarget.style.color='#475569'}>
                <Share2 size={13} /> Share
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROJECTS (Kanban)
───────────────────────────────────────────── */
function ProjectsPage() {
  const [columns, setColumns] = useState(INITIAL_KANBAN);
  const [dragOver, setDragOver] = useState(null);
  const dragInfo = useRef({ card: null, fromColId: null });

  const colStyles = {
    violet: { dot: '#8b5cf6', badge: 'rgba(124,58,237,0.2)', badgeText: '#a78bfa', header: 'rgba(124,58,237,0.07)', border: 'rgba(124,58,237,0.25)' },
    cyan:   { dot: '#0ea5e9', badge: 'rgba(14,165,233,0.2)',  badgeText: '#38bdf8', header: 'rgba(14,165,233,0.07)',  border: 'rgba(14,165,233,0.25)'  },
    amber:  { dot: '#f59e0b', badge: 'rgba(245,158,11,0.2)', badgeText: '#fbbf24', header: 'rgba(245,158,11,0.07)', border: 'rgba(245,158,11,0.25)' },
    teal:   { dot: '#14b8a6', badge: 'rgba(20,184,166,0.2)', badgeText: '#2dd4bf', header: 'rgba(20,184,166,0.07)', border: 'rgba(20,184,166,0.25)' },
  };

  const handleDrop = (targetColId) => {
    const { card, fromColId } = dragInfo.current;
    if (!card || fromColId === targetColId) { setDragOver(null); return; }
    setColumns(prev => prev.map(c => {
      if (c.id === fromColId) return { ...c, cards: c.cards.filter(k => k.id !== card.id) };
      if (c.id === targetColId) return { ...c, cards: [...c.cards, card] };
      return c;
    }));
    dragInfo.current = { card: null, fromColId: null };
    setDragOver(null);
  };

  return (
    <div className="p-5 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <Layers size={20} className="text-violet-400" />
        <h1 className="font-display text-2xl font-extrabold text-white">Project Board</h1>
        <span className="text-sm" style={{ color: '#475569' }}>{columns.reduce((t, c) => t + c.cards.length, 0)} active</span>
        <motion.button whileHover={{ scale: 1.04 }}
          className="ml-auto flex items-center gap-2 px-4 py-2 text-sm font-bold text-white rounded-xl glow-violet"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
          <Plus size={14} /> New Project
        </motion.button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map(col => {
          const s = colStyles[col.color];
          const isOver = dragOver === col.id;
          return (
            <div key={col.id} className="rounded-2xl border transition-all overflow-hidden"
              style={{ borderColor: isOver ? s.border : 'rgba(255,255,255,0.07)', background: isOver ? s.header : 'rgba(255,255,255,0.025)' }}
              onDragOver={e => { e.preventDefault(); setDragOver(col.id); }}
              onDragLeave={() => setDragOver(null)}
              onDrop={() => handleDrop(col.id)}>
              <div className="px-4 py-3 flex items-center gap-2" style={{ background: s.header }}>
                <div className="w-2 h-2 rounded-full" style={{ background: s.dot, boxShadow: `0 0 8px ${s.dot}` }} />
                <span className="font-bold text-sm text-white">{col.label}</span>
                <span className="ml-auto text-xs font-extrabold px-2 py-0.5 rounded-full" style={{ background: s.badge, color: s.badgeText }}>{col.cards.length}</span>
              </div>
              <div className="p-3 space-y-2 min-h-40">
                {col.cards.map(card => (
                  <motion.div key={card.id} layout draggable
                    onDragStart={() => { dragInfo.current = { card, fromColId: col.id }; }}
                    whileHover={{ scale: 1.02, rotate: 0.4 }}
                    className="glass rounded-xl border p-4 cursor-grab active:cursor-grabbing transition-all"
                    style={{ borderColor: 'rgba(255,255,255,0.07)' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.18)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.07)'}>
                    <p className="font-bold text-sm text-white mb-2 leading-tight">{card.title}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <img src={card.personImg} className="w-5 h-5 rounded-full border object-cover" style={{ borderColor: 'rgba(255,255,255,0.18)' }} alt="" />
                      <span className="text-xs font-medium truncate" style={{ color: '#475569' }}>{card.person}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold" style={{ color: '#2dd4bf' }}>{card.budget}</span>
                      <div className="flex items-center gap-1 text-[10px] font-medium" style={{ color: '#334155' }}>
                        <Clock size={9} /> {card.due}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-center text-xs mt-4" style={{ color: '#334155' }}>Drag and drop cards between columns to update project status</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAT PAGE
───────────────────────────────────────────── */
function ChatPage() {
  const [activeConvoId, setActiveConvoId] = useState(1);
  const [conversations, setConversations] = useState(CONVERSATIONS);
  const [allMessages, setAllMessages] = useState(BASE_CHAT);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [showContacts, setShowContacts] = useState(true);
  const chatEndRef = useRef(null);
  const timerRef   = useRef(null);

  const activeConvo = conversations.find(c => c.id === activeConvoId);
  const messages    = allMessages[activeConvoId] || [];

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, activeConvoId]);

  const sendMessage = useCallback((text) => {
    const msg = text || inputValue;
    if (!msg.trim()) return;
    const newMsg = { id: Date.now(), from: 'me', text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setAllMessages(prev => ({ ...prev, [activeConvoId]: [...(prev[activeConvoId] || []), newMsg] }));
    setConversations(prev => prev.map(c => c.id === activeConvoId ? { ...c, lastMsg: msg.substring(0, 40), unread: 0 } : c));
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "That's great! I'll take a look and get back to you shortly.",
        "Absolutely, sounds perfect! Let me put together some ideas.",
        "Thanks for reaching out! This project sounds exciting.",
        "I'll send over my portfolio samples that match this style.",
      ];
      const reply = { id: Date.now() + 1, from: 'them', text: responses[Math.floor(Math.random() * responses.length)], time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setAllMessages(prev => ({ ...prev, [activeConvoId]: [...(prev[activeConvoId] || []), reply] }));
    }, 1800 + Math.random() * 800);
  }, [inputValue, activeConvoId]);

  const toggleRecording = () => {
    if (isRecording) {
      clearInterval(timerRef.current);
      const dur = recordTime;
      setIsRecording(false); setRecordTime(0);
      const voiceMsg = { id: Date.now(), from: 'me', type: 'voice', duration: dur, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setAllMessages(prev => ({ ...prev, [activeConvoId]: [...(prev[activeConvoId] || []), voiceMsg] }));
    } else {
      setIsRecording(true); setRecordTime(0);
      timerRef.current = setInterval(() => setRecordTime(t => t + 1), 1000);
    }
  };

  useEffect(() => () => clearInterval(timerRef.current), []);

  const switchConvo = (id) => {
    setActiveConvoId(id);
    setConversations(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
    setShowContacts(false); // mobile: show chat
  };

  return (
    <div className="h-full flex" style={{ height: 'calc(100vh - 56px - 64px)' }}>
      {/* Contacts Panel */}
      <div className={`${showContacts ? 'flex' : 'hidden'} md:flex w-full md:w-72 glass-dark border-r flex-col shrink-0`}
        style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
        <div className="p-4 border-b space-y-3" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
          <h2 className="font-display font-bold text-lg text-white">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-2.5" size={14} style={{ color: '#475569' }} />
            <input placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 text-sm glass border rounded-xl placeholder:text-slate-600 bg-transparent transition-colors"
              style={{ borderColor: 'rgba(255,255,255,0.09)', color: '#cbd5e1' }}
              onFocus={e => e.target.style.borderColor='rgba(124,58,237,0.38)'}
              onBlur={e => e.target.style.borderColor='rgba(255,255,255,0.09)'} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {conversations.map(convo => (
            <button key={convo.id} onClick={() => switchConvo(convo.id)}
              className="w-full flex items-center gap-3 p-4 border-l-2 transition-all text-left"
              style={{ borderColor: activeConvoId === convo.id ? '#7c3aed' : 'transparent', background: activeConvoId === convo.id ? 'rgba(124,58,237,0.07)' : 'transparent' }}
              onMouseEnter={e => { if (activeConvoId !== convo.id) e.currentTarget.style.background='rgba(255,255,255,0.025)'; }}
              onMouseLeave={e => { if (activeConvoId !== convo.id) e.currentTarget.style.background='transparent'; }}>
              <div className="relative shrink-0">
                <img src={convo.profile.img} className="w-11 h-11 rounded-full object-cover border" style={{ borderColor: 'rgba(255,255,255,0.09)' }} alt="" />
                {convo.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 rounded-full" style={{ borderColor: '#05050f', background: '#14b8a6', boxShadow: '0 0 6px rgba(20,184,166,0.8)' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-sm truncate" style={{ color: activeConvoId === convo.id ? '#f1f5f9' : '#94a3b8' }}>{convo.profile.name}</span>
                  <span className="text-[10px] shrink-0" style={{ color: '#334155' }}>{convo.time}</span>
                </div>
                <p className="text-xs truncate mt-0.5" style={{ color: convo.unread > 0 ? '#94a3b8' : '#475569', fontWeight: convo.unread > 0 ? '600' : '400' }}>{convo.lastMsg}</p>
              </div>
              {convo.unread > 0 && (
                <div className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 text-white" style={{ background: '#7c3aed' }}>{convo.unread}</div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`${!showContacts ? 'flex' : 'hidden'} md:flex flex-1 flex-col`}>
        {/* Chat Header */}
        <div className="h-14 glass-dark border-b flex items-center justify-between px-4 md:px-6 shrink-0" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden mr-1 text-slate-400 hover:text-white transition-colors" onClick={() => setShowContacts(true)}>
              <ChevronLeft size={20} />
            </button>
            <img src={activeConvo?.profile.img} className="w-8 h-8 rounded-full border object-cover" style={{ borderColor: 'rgba(255,255,255,0.13)' }} alt="" />
            <div>
              <h3 className="font-bold text-sm text-white">{activeConvo?.profile.name}</h3>
              <p className="text-xs font-semibold" style={{ color: activeConvo?.online ? '#34d399' : '#475569' }}>
                {activeConvo?.online ? '● Online' : 'Offline'}
              </p>
            </div>
          </div>
          <button className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors" style={{ color: '#a78bfa', borderColor: 'rgba(124,58,237,0.3)' }}
            onMouseEnter={e => e.currentTarget.style.background='rgba(124,58,237,0.09)'}
            onMouseLeave={e => e.currentTarget.style.background='transparent'}>
            View Profile
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {messages.map(msg => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`flex items-end gap-2 ${msg.from === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.from === 'them' && (
                <img src={activeConvo?.profile.img} className="w-7 h-7 rounded-full border shrink-0 mb-0.5 object-cover" style={{ borderColor: 'rgba(255,255,255,0.09)' }} alt="" />
              )}
              <div className={`max-w-[72%] flex flex-col gap-1 ${msg.from === 'me' ? 'items-end' : 'items-start'}`}>
                {msg.type === 'voice' ? (
                  <div className={`px-4 py-3 rounded-2xl flex items-center gap-3 ${msg.from === 'me' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
                    style={{ background: msg.from === 'me' ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
                      <Play size={13} className="text-white ml-0.5" />
                    </button>
                    <div className="flex gap-0.5 items-end h-5">
                      {Array.from({ length: 18 }).map((_, i) => (
                        <div key={i} className="w-0.5 rounded-full" style={{ height: `${20 + Math.sin(i * 1.2) * 60 + 20}%`, background: 'rgba(255,255,255,0.6)' }} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-white/80">0:{String(msg.duration).padStart(2, '0')}</span>
                  </div>
                ) : (
                  <div className={`px-4 py-3 rounded-2xl text-sm font-medium leading-relaxed ${msg.from === 'me' ? 'rounded-br-sm text-white' : 'rounded-bl-sm'}`}
                    style={{ background: msg.from === 'me' ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'rgba(255,255,255,0.07)', border: msg.from === 'them' ? '1px solid rgba(255,255,255,0.08)' : 'none', color: msg.from === 'them' ? '#e2e8f0' : 'white' }}>
                    {msg.text}
                  </div>
                )}
                <span className="text-[10px] font-bold px-1" style={{ color: '#334155' }}>{msg.time}</span>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex items-end gap-2">
              <img src={activeConvo?.profile.img} className="w-7 h-7 rounded-full border shrink-0 object-cover" style={{ borderColor: 'rgba(255,255,255,0.09)' }} alt="" />
              <div className="px-4 py-3 rounded-2xl rounded-bl-sm" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex gap-1 items-center h-4">
                  {[0.1, 0.25, 0.4].map((d, i) => (
                    <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, delay: d, duration: 0.6 }} className="w-1.5 h-1.5 rounded-full" style={{ background: '#64748b' }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          {isRecording && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-end">
              <div className="flex items-center gap-3 px-4 py-3 rounded-2xl rounded-br-sm" style={{ background: 'linear-gradient(135deg, #f43f5e, #e11d48)' }}>
                <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-3 h-3 rounded-full bg-white" />
                <span className="text-sm font-bold text-white">0:{String(recordTime).padStart(2, '0')}</span>
              </div>
            </motion.div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="glass-dark border-t p-3 md:p-4" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
          <div className="flex gap-2 mb-3 overflow-x-auto pb-1 no-scrollbar">
            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest shrink-0 pr-2 border-r" style={{ color: '#475569', borderColor: 'rgba(255,255,255,0.07)' }}>
              <Bot size={11} className="text-violet-500" /> AI
            </div>
            {SMART_PILLS.map(pill => (
              <button key={pill.label} onClick={() => sendMessage(pill.text)}
                className="shrink-0 px-3 py-1.5 text-xs font-bold rounded-full border transition-all whitespace-nowrap"
                style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.22)', color: '#a78bfa' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='rgba(124,58,237,0.5)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='rgba(124,58,237,0.22)'}>
                {pill.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 glass border rounded-2xl p-2 pr-3 transition-colors"
            style={{ borderColor: 'rgba(255,255,255,0.09)' }}
            onFocusCapture={e => e.currentTarget.style.borderColor='rgba(124,58,237,0.38)'}
            onBlurCapture={e => e.currentTarget.style.borderColor='rgba(255,255,255,0.09)'}>
            <motion.button whileTap={{ scale: 0.9 }} onClick={toggleRecording}
              className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all"
              style={isRecording
                ? { background: '#f43f5e', borderColor: '#f43f5e', color: 'white' }
                : { background: 'rgba(255,255,255,0.055)', borderColor: 'rgba(255,255,255,0.09)', color: '#64748b' }}>
              {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
            </motion.button>
            <input value={inputValue} onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-sm placeholder:text-slate-600 focus:outline-none"
              style={{ color: '#e2e8f0' }} />
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => sendMessage()}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
              <Send size={15} />
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
function NotificationsPage({ notifications, setNotifications }) {
  const icons  = { match: <Bot size={15} />, message: <MessageCircle size={15} />, review: <Star size={15} />, system: <Bell size={15} /> };
  const colors = {
    match:   { bg: 'rgba(124,58,237,0.18)', text: '#a78bfa' },
    message: { bg: 'rgba(20,184,166,0.18)', text: '#34d399' },
    review:  { bg: 'rgba(245,158,11,0.18)', text: '#fbbf24' },
    system:  { bg: 'rgba(100,116,139,0.18)',text: '#94a3b8' },
  };
  const markRead    = (id) => setNotifications(n => n.map(x => x.id === id ? { ...x, read: true } : x));
  const markAllRead = () => setNotifications(n => n.map(x => ({ ...x, read: true })));
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="p-5 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell size={20} className="text-violet-400" />
          <h1 className="font-display text-2xl font-extrabold text-white">Notifications</h1>
          {unread > 0 && (
            <span className="text-xs font-bold px-2.5 py-1 rounded-full text-white" style={{ background: '#7c3aed' }}>{unread}</span>
          )}
        </div>
        <button onClick={markAllRead} className="text-xs font-bold text-violet-400 hover:text-violet-300 transition-colors">Mark all read</button>
      </div>
      <div className="space-y-2">
        {notifications.map((n, i) => (
          <motion.div key={n.id}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}
            onClick={() => markRead(n.id)}
            className="flex items-start gap-4 p-4 rounded-2xl border cursor-pointer transition-all"
            style={!n.read
              ? { borderColor: 'rgba(124,58,237,0.2)', background: 'rgba(124,58,237,0.04)' }
              : { borderColor: 'rgba(255,255,255,0.065)' }}
            onMouseEnter={e => e.currentTarget.style.borderColor= !n.read ? 'rgba(124,58,237,0.32)' : 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.borderColor= !n.read ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.065)'}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: colors[n.type].bg, color: colors[n.type].text }}>
              {icons[n.type]}
            </div>
            <div className="flex-1">
              <p className="text-sm leading-relaxed" style={{ color: !n.read ? '#e2e8f0' : '#64748b', fontWeight: !n.read ? '600' : '400' }}>{n.text}</p>
              <p className="text-xs mt-1 font-medium" style={{ color: '#334155' }}>{n.time}</p>
            </div>
            {!n.read && <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: '#7c3aed', boxShadow: '0 0 8px rgba(124,58,237,0.8)' }} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LEADERBOARD
───────────────────────────────────────────── */
function LeaderboardPage() {
  const [period, setPeriod] = useState('Weekly');
  const data       = LEADERBOARD_DATA[period];
  const rankEmoji  = ['🥇', '🥈', '🥉'];

  return (
    <div className="p-5 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <Trophy size={22} style={{ color: '#fbbf24' }} />
        <h1 className="font-display text-2xl font-extrabold text-white">Leaderboard</h1>
      </div>
      <p className="text-sm mb-6" style={{ color: '#475569' }}>Top collaborators ranked by activity, reviews, and match quality.</p>

      <div className="flex gap-2 mb-8">
        {['Weekly', 'Monthly', 'All-Time'].map(p => (
          <button key={p} onClick={() => setPeriod(p)}
            className="px-4 py-2 rounded-xl text-sm font-bold border transition-all"
            style={period === p
              ? { background: 'rgba(124,58,237,0.18)', borderColor: 'rgba(124,58,237,0.5)', color: '#a78bfa' }
              : { background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
            {p}
          </button>
        ))}
      </div>

      {/* Podium */}
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[data[1], data[0], data[2]].map((u, i) => {
          const realRank = [2, 1, 3][i];
          const heights  = ['h-24', 'h-32', 'h-20'];
          const podiumBg    = ['rgba(148,163,184,0.13)', 'rgba(245,158,11,0.13)', 'rgba(180,83,9,0.13)'];
          const podiumBorder= ['rgba(148,163,184,0.2)',  'rgba(245,158,11,0.28)',  'rgba(180,83,9,0.2)'];
          return (
            <motion.div key={u?.rank}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center">
              <img src={u?.img} className="w-12 h-12 rounded-full border-2 shadow-lg mb-2 object-cover"
                style={{ borderColor: 'rgba(255,255,255,0.14)', boxShadow: realRank === 1 ? '0 0 20px rgba(245,158,11,0.5)' : 'none' }} alt="" />
              <p className="font-bold text-xs text-center" style={{ color: '#94a3b8' }}>{u?.name.split(' ')[0]}</p>
              <p className="text-xs" style={{ color: '#475569' }}>{u?.score.toLocaleString()}</p>
              <div className={`w-full ${heights[i]} rounded-t-xl mt-2 flex items-center justify-center border`}
                style={{ background: podiumBg[realRank - 1], borderColor: podiumBorder[realRank - 1] }}>
                <span className="text-2xl">{rankEmoji[realRank - 1]}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-2">
        {data.map((u, i) => (
          <motion.div key={`${period}-${u.rank}`}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 p-4 rounded-2xl border transition-all"
            style={u.isYou
              ? { borderColor: 'rgba(124,58,237,0.3)', background: 'rgba(124,58,237,0.07)' }
              : { borderColor: 'rgba(255,255,255,0.065)' }}
            onMouseEnter={e => { if (!u.isYou) e.currentTarget.style.borderColor='rgba(255,255,255,0.12)'; }}
            onMouseLeave={e => { if (!u.isYou) e.currentTarget.style.borderColor='rgba(255,255,255,0.065)'; }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-extrabold shrink-0"
              style={{ background: i < 3 ? 'transparent' : 'rgba(255,255,255,0.04)', color: i < 3 ? undefined : '#64748b' }}>
              {i < 3 ? rankEmoji[i] : `#${u.rank}`}
            </div>
            <img src={u.img} className="w-10 h-10 rounded-full border object-cover" style={{ borderColor: 'rgba(255,255,255,0.13)' }} alt="" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-bold text-sm text-white">{u.name}</p>
                {u.isYou && <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full text-white" style={{ background: '#7c3aed' }}>You</span>}
              </div>
              <p className="text-xs" style={{ color: '#475569' }}>{u.handle}</p>
            </div>
            <div className="text-right">
              <p className="font-extrabold text-white text-sm">{u.score.toLocaleString()}</p>
              <p className="text-xs font-bold" style={{ color: u.delta.startsWith('+') ? '#34d399' : u.delta === '—' ? '#475569' : '#f87171' }}>{u.delta}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANALYTICS PAGE
───────────────────────────────────────────── */
function AnalyticsPage() {
  const [activeMetric, setActiveMetric] = useState('views');
  const metrics = {
    views:    { label: 'Profile Views', data: CHART_DATA.views,    color: '#7c3aed', total: '7,842',  change: '+24%' },
    earnings: { label: 'Earnings ($)',  data: CHART_DATA.earnings,  color: '#14b8a6', total: '$12,700', change: '+38%' },
    matches:  { label: 'AI Matches',    data: CHART_DATA.matches,   color: '#0ea5e9', total: '239',     change: '+61%' },
  };
  const m      = metrics[activeMetric];
  const maxVal = Math.max(...m.data);

  return (
    <div className="p-5 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-2 mb-2">
        <BarChart2 size={20} className="text-violet-400" />
        <h1 className="font-display text-2xl font-extrabold text-white">Analytics</h1>
      </div>
      <p className="text-sm mb-8" style={{ color: '#475569' }}>Your comprehensive performance overview.</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Earnings',   value: '$12,700', delta: '+38%', icon: <Wallet size={17} />,   color: '#14b8a6' },
          { label: 'Profile Views',    value: '7,842',   delta: '+24%', icon: <Eye size={17} />,      color: '#7c3aed' },
          { label: 'Conversion Rate',  value: '6.4%',    delta: '+1.2%',icon: <Target size={17} />,   color: '#0ea5e9' },
          { label: 'Response Rate',    value: '92%',     delta: '+8%',  icon: <Activity size={17} />, color: '#f59e0b' },
        ].map((kpi, i) => (
          <motion.div key={kpi.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="glass rounded-2xl border p-5 card-lift" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3" style={{ background: `${kpi.color}1f` }}>
              <span style={{ color: kpi.color }}>{kpi.icon}</span>
            </div>
            <div className="text-xl font-extrabold text-white">{kpi.value}</div>
            <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{kpi.label}</div>
            <div className="text-xs font-bold mt-1" style={{ color: '#34d399' }}>{kpi.delta} this month</div>
          </motion.div>
        ))}
      </div>

      {/* Bar Chart */}
      <GlassCard className="p-5 md:p-6 mb-6">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div>
            <h2 className="font-bold" style={{ color: '#e2e8f0' }}>{m.label}</h2>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold" style={{ color: m.color }}>{m.total}</span>
              <span className="text-xs font-bold" style={{ color: '#34d399' }}>{m.change} vs last year</span>
            </div>
          </div>
          <div className="flex gap-2">
            {Object.entries(metrics).map(([k, v]) => (
              <button key={k} onClick={() => setActiveMetric(k)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold border transition-all"
                style={activeMetric === k
                  ? { background: `${v.color}22`, borderColor: `${v.color}55`, color: v.color }
                  : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)', color: '#64748b' }}>
                {v.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-1.5 h-40">
          {m.data.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
              <motion.div
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ delay: i * 0.04, duration: 0.5 }}
                style={{ height: `${(val / maxVal) * 100}%`, background: `linear-gradient(180deg, ${m.color}, ${m.color}60)`, originY: 1 }}
                className="w-full rounded-t-lg opacity-75 hover:opacity-100 transition-opacity cursor-pointer relative group">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold opacity-0 group-hover:opacity-100 transition rounded px-1 whitespace-nowrap"
                  style={{ color: '#94a3b8', background: '#1e1b4b' }}>
                  {val}
                </div>
              </motion.div>
              <span className="text-[9px] font-medium" style={{ color: '#334155' }}>{CHART_LABELS[i]}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-5 md:p-6">
          <h3 className="font-bold mb-5" style={{ color: '#e2e8f0' }}>Earnings Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: 'Video Editing',    amount: '$5,200', pct: 41, color: '#7c3aed' },
              { label: 'Brand Campaigns',  amount: '$4,100', pct: 32, color: '#0ea5e9' },
              { label: 'Thumbnail Design', amount: '$2,200', pct: 17, color: '#14b8a6' },
              { label: 'Audio Work',       amount: '$1,200', pct: 9,  color: '#f59e0b' },
            ].map((row, i) => (
              <div key={row.label}>
                <div className="flex justify-between text-xs font-semibold mb-1" style={{ color: '#94a3b8' }}>
                  <span>{row.label}</span><span>{row.amount}</span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${row.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full" style={{ background: row.color }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5 md:p-6">
          <h3 className="font-bold mb-5" style={{ color: '#e2e8f0' }}>Goals Progress</h3>
          <div className="space-y-5">
            {[
              { goal: '$20K Annual Revenue', current: 12700, target: 20000, color: '#14b8a6' },
              { goal: '500 AI Matches',      current: 239,   target: 500,   color: '#7c3aed' },
              { goal: '25 Collaborations',   current: 12,    target: 25,    color: '#0ea5e9' },
            ].map((g, i) => (
              <div key={g.goal}>
                <div className="flex justify-between text-xs font-semibold mb-2" style={{ color: '#64748b' }}>
                  <span>{g.goal}</span>
                  <span style={{ color: g.color }}>{Math.round((g.current / g.target) * 100)}%</span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${(g.current / g.target) * 100}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.15 }}
                    className="h-full rounded-full" style={{ background: g.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-5 border-t" style={{ borderColor: 'rgba(255,255,255,0.065)' }}>
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: '#334155' }}>Audience Breakdown</h4>
            {[{ label: 'Creators', pct: 62, color: '#7c3aed' }, { label: 'Providers', pct: 28, color: '#14b8a6' }, { label: 'Brands', pct: 10, color: '#f59e0b' }].map((d, i) => (
              <div key={d.label} className="flex items-center gap-3 mb-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-xs font-medium flex-1" style={{ color: '#64748b' }}>{d.label}</span>
                <div className="w-28 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${d.pct}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-full rounded-full" style={{ background: d.color }} />
                </div>
                <span className="text-xs font-bold w-7 text-right" style={{ color: '#475569' }}>{d.pct}%</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SAVED PAGE
───────────────────────────────────────────── */
function SavedPage({ savedProfiles, onSaveToggle }) {
  return (
    <div className="p-5 md:p-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-1">
        <Bookmark size={20} className="text-violet-400" />
        <h1 className="font-display text-2xl font-extrabold text-white">Saved Profiles</h1>
      </div>
      <p className="text-sm mb-6" style={{ color: '#475569' }}>Your bookmarked creators and providers.</p>
      {savedProfiles.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mx-auto mb-4">
            <Bookmark size={28} style={{ color: '#334155' }} />
          </div>
          <h3 className="font-bold mb-1" style={{ color: '#64748b' }}>No saved profiles yet</h3>
          <p className="text-sm" style={{ color: '#334155' }}>Browse the Explore tab and bookmark profiles you like.</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {savedProfiles.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <ProfileCard profile={p} isSaved={true} onSave={() => onSaveToggle(p)} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROFILE PAGE
───────────────────────────────────────────── */
function ProfilePage({ userRole }) {
  const skills     = ['Video Editing', 'Motion Graphics', 'Color Grading', 'Reels', 'YouTube', 'TikTok'];
  const [activeTab, setActiveTab]   = useState('overview');
  const [busyDates, setBusyDates]   = useState([8, 9, 14, 15, 22]);
  const today        = new Date();
  const daysInMonth  = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDay     = new Date(today.getFullYear(), today.getMonth(), 1).getDay();
  const monthName    = today.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="p-5 md:p-8 max-w-4xl mx-auto">
      <h1 className="font-display text-2xl font-extrabold text-white mb-6">My Profile</h1>

      <GlassCard className="overflow-hidden mb-6">
        <div className="h-36" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(79,70,229,0.28), rgba(14,165,233,0.18))' }} />
        <div className="px-5 md:px-6 pb-6">
          <div className="flex items-end justify-between -mt-10 mb-4">
            <div className="relative">
              <img src="https://i.pravatar.cc/150?u=currentuser" className="w-20 h-20 rounded-2xl border-4 shadow-xl object-cover"
                style={{ borderColor: '#05050f', boxShadow: '0 0 30px rgba(124,58,237,0.4)' }} alt="Avatar" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2" style={{ borderColor: '#05050f', background: '#14b8a6', boxShadow: '0 0 8px rgba(20,184,166,0.8)' }} />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 glass border text-sm font-bold rounded-xl transition-all"
              style={{ borderColor: 'rgba(255,255,255,0.09)', color: '#94a3b8' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(124,58,237,0.38)'; e.currentTarget.style.color='#f1f5f9'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.09)'; e.currentTarget.style.color='#94a3b8'; }}>
              <PenTool size={13} /> Edit Profile
            </button>
          </div>
          <h2 className="text-xl font-extrabold text-white mb-0.5">Alex Creator</h2>
          <p className="text-sm mb-3" style={{ color: '#475569' }}>{userRole === 'provider' ? 'Service Provider' : 'Content Creator'} · Los Angeles, CA</p>
          <p className="text-sm leading-relaxed mb-4" style={{ color: '#94a3b8' }}>
            Digital content creator specializing in lifestyle storytelling. Building high-level collaborations to scale viewership and establish premium industry connections.
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => (
              <span key={s} className="px-3 py-1 text-xs font-semibold rounded-full border"
                style={{ background: 'rgba(124,58,237,0.1)', borderColor: 'rgba(124,58,237,0.22)', color: '#a78bfa' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 glass rounded-2xl p-1.5 inline-flex flex-wrap">
        {[['overview', '📊 Overview'], ['achievements', '🏅 Achievements'], ['calendar', '📅 Availability']].map(([id, label]) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={activeTab === id
              ? { background: 'rgba(124,58,237,0.28)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.38)' }
              : { color: '#64748b', border: '1px solid transparent' }}>
            {label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Profile Views',  value: '1,284', icon: <Eye size={20} />,       color: '#7c3aed' },
                { label: 'Collaborations', value: '12',    icon: <Briefcase size={20} />, color: '#0ea5e9' },
                { label: 'Avg Rating',     value: '4.9 ★', icon: <Award size={20} />,     color: '#f59e0b' },
              ].map(stat => (
                <GlassCard key={stat.label} className="p-5 text-center card-lift">
                  <div className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ background: `${stat.color}1f` }}>
                    <span style={{ color: stat.color }}>{stat.icon}</span>
                  </div>
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: '#475569' }}>{stat.label}</div>
                </GlassCard>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div key="achievements" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div key={a.id}
                  initial={{ opacity: 0, scale: 0.88 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.07 }}
                  className={`glass rounded-2xl border p-5 text-center transition-all ${a.earned ? 'card-lift' : 'opacity-40'}`}
                  style={{ borderColor: a.earned ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.065)', background: a.earned ? 'rgba(124,58,237,0.05)' : undefined }}>
                  <div className={`text-4xl mb-3 ${!a.earned ? 'grayscale' : ''}`}>{a.icon}</div>
                  <h3 className="font-extrabold text-sm text-white mb-1">{a.title}</h3>
                  <p className="text-xs leading-relaxed" style={{ color: '#64748b' }}>{a.desc}</p>
                  {a.earned
                    ? <span className="inline-flex items-center gap-1 mt-3 text-[10px] font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(20,184,166,0.18)', color: '#34d399', border: '1px solid rgba(20,184,166,0.2)' }}><CheckCircle2 size={9} /> Earned</span>
                    : <span className="inline-block mt-3 text-[10px] font-bold rounded-full px-2 py-1" style={{ color: '#475569', background: 'rgba(255,255,255,0.04)' }}>🔒 Locked</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'calendar' && (
          <motion.div key="calendar" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <GlassCard className="p-5 md:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-white">{monthName}</h3>
                <div className="flex items-center gap-4 text-xs font-bold">
                  <span className="flex items-center gap-1.5" style={{ color: '#64748b' }}>
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: '#7c3aed' }} /> Busy
                  </span>
                  <span className="flex items-center gap-1.5" style={{ color: '#64748b' }}>
                    <span className="w-3 h-3 rounded-sm inline-block" style={{ background: 'rgba(255,255,255,0.07)' }} /> Free
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center mb-2">
                {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                  <div key={d} className="text-xs font-bold py-1" style={{ color: '#334155' }}>{d}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                  const isBusy  = busyDates.includes(day);
                  const isToday = day === today.getDate();
                  return (
                    <motion.button key={day} whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                      onClick={() => setBusyDates(prev => prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day])}
                      className="aspect-square rounded-xl text-sm font-bold flex items-center justify-center transition-all"
                      style={isBusy
                        ? { background: 'rgba(124,58,237,0.28)', color: '#c4b5fd', border: '1px solid rgba(124,58,237,0.4)', boxShadow: '0 0 12px rgba(124,58,237,0.2)' }
                        : isToday
                        ? { background: 'rgba(255,255,255,0.06)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }
                        : { color: '#475569', border: '1px solid transparent' }}>
                      {day}
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-xs mt-4 text-center" style={{ color: '#334155' }}>Click dates to mark as busy/available</p>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SETTINGS PAGE
───────────────────────────────────────────── */
function SettingsPage({ setView }) {
  const [settings, setSettings] = useState({
    emailNotifs: true, aiMatchAlerts: true, weeklyDigest: false,
    publicProfile: true, darkMode: true, twoFactor: false,
  });
  const toggle = (key) => setSettings(s => ({ ...s, [key]: !s[key] }));

  const Toggle = ({ value, onChange }) => (
    <button onClick={onChange}
      className="w-11 h-6 rounded-full relative transition-all shrink-0"
      style={{ background: value ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : 'rgba(255,255,255,0.08)', boxShadow: value ? '0 0 12px rgba(124,58,237,0.4)' : 'none' }}>
      <motion.div animate={{ x: value ? 22 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
    </button>
  );

  const Row = ({ label, sub, control }) => (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm" style={{ color: '#e2e8f0' }}>{label}</p>
        {sub && <p className="text-xs mt-0.5" style={{ color: '#475569' }}>{sub}</p>}
      </div>
      {control}
    </div>
  );

  const Section = ({ title, children }) => (
    <GlassCard className="p-5 md:p-6 mb-4">
      <h3 className="font-bold text-xs uppercase tracking-widest mb-5" style={{ color: '#475569' }}>{title}</h3>
      <div className="space-y-4">{children}</div>
    </GlassCard>
  );

  return (
    <div className="p-5 md:p-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Settings size={20} className="text-violet-400" />
        <h1 className="font-display text-2xl font-extrabold text-white">Settings</h1>
      </div>

      <Section title="Notifications">
        <Row label="Email Notifications"   sub="Receive updates via email"                  control={<Toggle value={settings.emailNotifs}   onChange={() => toggle('emailNotifs')}   />} />
        <Row label="AI Match Alerts"       sub="Get notified of new AI-matched profiles"    control={<Toggle value={settings.aiMatchAlerts} onChange={() => toggle('aiMatchAlerts')} />} />
        <Row label="Weekly Digest"         sub="Summary of your week's activity"            control={<Toggle value={settings.weeklyDigest}  onChange={() => toggle('weeklyDigest')}  />} />
      </Section>
      <Section title="Privacy">
        <Row label="Public Profile"        sub="Show your profile in the Explore feed"      control={<Toggle value={settings.publicProfile} onChange={() => toggle('publicProfile')} />} />
        <Row label="Two-Factor Auth"       sub="Extra security for your account"            control={<Toggle value={settings.twoFactor}     onChange={() => toggle('twoFactor')}     />} />
      </Section>
      <Section title="Appearance">
        <Row label="Dark Mode"             sub="Currently active — light mode coming soon" control={<Toggle value={settings.darkMode}      onChange={() => toggle('darkMode')}      />} />
      </Section>
      <Section title="Account">
        <Row label="Email"    control={<span className="text-sm font-semibold" style={{ color: '#475569' }}>alex@example.com</span>} />
        <Row label="Plan"     control={<span className="px-3 py-1 text-xs font-extrabold rounded-full" style={{ background: 'rgba(124,58,237,0.18)', color: '#a78bfa', border: '1px solid rgba(124,58,237,0.28)' }}>Free</span>} />
        <motion.button whileHover={{ scale: 1.02 }}
          className="w-full py-3 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 glow-violet"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}>
          <Rocket size={15} /> Upgrade to Pro
        </motion.button>
      </Section>

      <div className="rounded-2xl p-5 border" style={{ background: 'rgba(244,63,94,0.05)', borderColor: 'rgba(244,63,94,0.15)' }}>
        <h3 className="font-extrabold text-sm mb-1" style={{ color: '#f87171' }}>Danger Zone</h3>
        <p className="text-xs mb-3" style={{ color: '#475569' }}>Permanently delete your account and all data.</p>
        <button className="px-4 py-2 text-xs font-bold rounded-xl border transition-colors"
          style={{ color: '#f87171', borderColor: 'rgba(244,63,94,0.28)', background: 'transparent' }}
          onMouseEnter={e => e.currentTarget.style.background='rgba(244,63,94,0.07)'}
          onMouseLeave={e => e.currentTarget.style.background='transparent'}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
