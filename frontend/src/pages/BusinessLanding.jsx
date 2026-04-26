import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ArrowRight, PlayCircle, BookOpen, 
  Users, BarChart3, Star, CheckCircle2, 
  Mail, ChevronRight
} from 'lucide-react';

/* ── Inline Social Icons ── */
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
  </svg>
);
const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#1a365d"/>
  </svg>
);

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const FEATURED_CONTENT = [
  {
    id: 1,
    title: 'The Future of B2B Content Strategy in 2026',
    category: 'Industry Insights',
    date: 'April 22, 2026',
    excerpt: 'Discover how AI and authentic storytelling are reshaping the way enterprises connect with their audiences.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Building Trust Through Transparent Communication',
    category: 'Expert Analysis',
    date: 'April 18, 2026',
    excerpt: 'Why modern consumers demand radical transparency and how your brand can deliver it effectively.',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Metrics That Matter: Moving Beyond Vanity',
    category: 'Actionable Guides',
    date: 'April 12, 2026',
    excerpt: 'A comprehensive framework for measuring content ROI that aligns directly with your business objectives.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    title: 'VP of Marketing, TechCorp',
    content: "The insights provided have fundamentally transformed our approach to audience building. We've seen a 40% increase in qualified inbound leads.",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150'
  },
  {
    id: 2,
    name: 'Marcus Chen',
    title: 'Founder, Elevate Partners',
    content: "Authoritative, actionable, and always ahead of the curve. This is the only industry newsletter I consistently read from top to bottom.",
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150'
  }
];

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */

export default function BusinessLanding({ onNavigate }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`);
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]" style={{ fontFamily: "'Inter', sans-serif", color: '#2d3748' }}>
      
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate && onNavigate('landing')}>
            <div className="w-10 h-10 bg-[#1a365d] rounded-lg flex items-center justify-center text-white shadow-md">
              <BookOpen size={20} />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#1a365d]" style={{ fontFamily: "'Playfair Display', serif" }}>
              InsightCorp
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 font-medium text-[15px] text-gray-600">
            <a href="#insights" className="hover:text-[#1a365d] transition-colors">Insights</a>
            <a href="#resources" className="hover:text-[#1a365d] transition-colors">Resources</a>
            <a href="#about" className="hover:text-[#1a365d] transition-colors">About</a>
            <a href="#subscribe" className="hover:text-[#1a365d] transition-colors">Subscribe</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button className="px-6 py-2.5 bg-[#1a365d] text-white font-medium rounded-md hover:bg-[#112440] transition-colors shadow-sm">
              Subscribe for Insights
            </button>
          </div>

          <button className="md:hidden text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-gray-200 overflow-hidden"
            >
              <div className="px-6 py-4 flex flex-col gap-4 font-medium text-gray-700">
                <a href="#insights" onClick={() => setIsMenuOpen(false)}>Insights</a>
                <a href="#resources" onClick={() => setIsMenuOpen(false)}>Resources</a>
                <a href="#about" onClick={() => setIsMenuOpen(false)}>About</a>
                <button className="mt-2 w-full py-3 bg-[#1a365d] text-white rounded-md">
                  Subscribe for Insights
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative bg-[#1a365d] text-white overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-[#1a365d] mix-blend-multiply" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 text-sm font-medium mb-6">
              <Star size={14} className="text-[#f59e0b]" /> Join 10,000+ professionals
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-[1.15] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Strategic Insights for Modern Business Leaders
            </h1>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed max-w-lg">
              Gain the clarity you need to navigate complexity. We share expert analysis, actionable guides, and industry trends to help you build a more resilient enterprise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-[#f59e0b] hover:bg-[#d97706] text-white text-lg font-semibold rounded-md transition-colors shadow-lg flex items-center justify-center gap-2">
                Subscribe for Insights <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-medium rounded-md transition-colors border border-white/20 flex items-center justify-center gap-2">
                <PlayCircle size={20} /> Explore Resources
              </button>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#1a365d] to-transparent opacity-40 rounded-xl" />
            <img 
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000" 
              alt="Business Strategy" 
              className="rounded-xl shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>
      </section>

      {/* ── VALUE PROPOSITION ── */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#1a365d] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Intelligence That Drives Action
            </h2>
            <p className="text-lg text-gray-600">
              We cut through the noise to deliver high-signal content that helps you make better decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <BarChart3 size={32} />, title: "Industry Insights", desc: "Data-backed trends and market analysis to keep you ahead of the curve." },
              { icon: <BookOpen size={32} />, title: "Expert Analysis", desc: "Deep dives into complex business challenges by seasoned practitioners." },
              { icon: <Users size={32} />, title: "Community Discussion", desc: "Connect with a curated network of peers and thought leaders." }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-xl bg-[#f7f9fc] border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center text-[#1a365d] shadow-sm mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-[#1a365d] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED CONTENT ── */}
      <section id="insights" className="py-24 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-[#1a365d] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                Latest Perspectives
              </h2>
              <p className="text-lg text-gray-600">Explore our most recent analysis and guides.</p>
            </div>
            <button className="hidden md:flex items-center gap-2 text-[#1a365d] font-semibold hover:text-[#f59e0b] transition-colors">
              View All Content <ArrowRight size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {FEATURED_CONTENT.map((post, i) => (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-[#1a365d] rounded uppercase tracking-wider">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-bold text-[#1a365d] mb-3 leading-snug group-hover:text-[#f59e0b] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-[#1a365d] font-semibold text-sm">
                    Read Article <ChevronRight size={16} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <button className="w-full mt-10 md:hidden py-4 border-2 border-[#1a365d] text-[#1a365d] font-bold rounded-md">
            View All Content
          </button>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1a365d] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Trusted by Industry Leaders
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div 
                key={testimonial.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#f7f9fc] p-8 rounded-xl border border-gray-100 relative"
              >
                <div className="text-[#f59e0b] mb-6 flex gap-1">
                  {[1,2,3,4,5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p className="text-lg text-gray-700 italic mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-[#1a365d]">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / EXPERTISE ── */}
      <section id="about" className="py-24 bg-[#1a365d] text-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
              Decades of Strategic Excellence
            </h2>
            <p className="text-blue-100 text-lg mb-6 leading-relaxed">
              InsightCorp was founded on a simple premise: in an age of information overload, clarity is the ultimate competitive advantage.
            </p>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              Our team of analysts, former executives, and strategists distill complex market dynamics into clear, actionable intelligence for over 10,000 subscribers worldwide.
            </p>
            
            <div className="space-y-4 mb-8">
              {['Fortune 500 consulting experience', 'Award-winning research methodologies', 'Proprietary data analysis engine'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-[#f59e0b] shrink-0" />
                  <span className="text-white font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000" 
              alt="Our Team" 
              className="rounded-xl shadow-2xl"
            />
            <div className="absolute -bottom-8 -left-8 bg-white text-[#1a365d] p-6 rounded-xl shadow-xl border border-gray-100 hidden sm:block">
              <div className="font-bold text-4xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>15+</div>
              <div className="text-gray-600 font-medium">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER SUBSCRIPTION ── */}
      <section id="subscribe" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#f7f9fc] rounded-full opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#f7f9fc] rounded-full opacity-50 pointer-events-none" />
        
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-[#1a365d]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#1a365d]">
            <Mail size={32} />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1a365d] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Insights You Need, Weekly
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Join 10,000+ professionals receiving our flagship newsletter. Every Tuesday, get exclusive analysis, frameworks, and tools directly to your inbox.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-xl mx-auto bg-white p-2 rounded-lg shadow-lg border border-gray-200 flex flex-col sm:flex-row gap-2">
            <input 
              type="email" 
              placeholder="Enter your professional email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 outline-none text-gray-700 bg-transparent"
            />
            <button type="submit" className="bg-[#1a365d] hover:bg-[#112440] text-white px-8 py-3 rounded-md font-bold transition-colors">
              Get Weekly Insights
            </button>
          </form>
          <p className="text-sm text-gray-400 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0b172a] text-white py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center text-[#1a365d]">
                <BookOpen size={16} />
              </div>
              <span className="font-bold text-xl tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                InsightCorp
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Empowering modern business leaders with clarity, strategy, and actionable intelligence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><LinkedinIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><YoutubeIcon /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 tracking-wider text-sm uppercase text-gray-300">Content</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Latest Articles</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Industry Reports</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Strategic Frameworks</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Webinars & Events</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 tracking-wider text-sm uppercase text-gray-300">Company</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 tracking-wider text-sm uppercase text-gray-300">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Stay updated with our latest insights.</p>
            <div className="flex bg-white/5 rounded p-1 border border-white/10">
              <input type="email" placeholder="Email address" className="bg-transparent text-sm text-white px-3 w-full outline-none" />
              <button className="bg-[#f59e0b] hover:bg-[#d97706] text-white p-2 rounded transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 InsightCorp. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
