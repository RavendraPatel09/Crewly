import { Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Moved Home back to App.jsx for simplicity as a component definition, or we can inline it
const Home = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center text-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="z-10 text-center max-w-2xl px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-7xl mb-6">
          Social<span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-sky-400">Connect</span>
        </h1>
        <p className="mt-4 text-xl text-slate-300 leading-relaxed mb-10">
          The premier hub connecting Instagram creators with elite freelance talent.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/login" className="px-8 py-4 bg-violet-600 hover:bg-violet-700 transition-all rounded-xl font-semibold shadow-lg shadow-violet-600/30">
            Sign In
          </Link>
          <Link to="/signup" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 transition-all rounded-xl font-semibold border border-slate-700 block mt-2 sm:mt-0">
            Create Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
