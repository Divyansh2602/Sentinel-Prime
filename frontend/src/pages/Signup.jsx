import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.access_token);
        navigate('/dashboard');
      } else {
        setError(data.detail || 'Signup failed');
      }
    } catch (err) {
      setError('Network error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface relative overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-inverse-primary/20 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="glass-panel p-8 rounded-xl w-full max-w-md z-10 border border-outline-variant/30 ambient-shadow">
        <div className="text-center mb-8">
          <h1 className="font-headline font-extrabold text-3xl power-gradient-text tracking-tight mb-2">Sentinel Prime</h1>
          <p className="font-body text-sm text-on-surface-variant">Register new operative</p>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container p-3 rounded-md mb-4 text-sm font-label text-center border border-error/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <div>
            <label className="block font-label text-xs uppercase tracking-wider text-on-surface-variant mb-1">Username</label>
            <input 
              type="text" 
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-surface-container-highest text-on-surface rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-on-surface-variant/50 transition-all font-body text-sm"
              placeholder="Choose a username"
            />
          </div>
          <div>
            <label className="block font-label text-xs uppercase tracking-wider text-on-surface-variant mb-1">Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-highest text-on-surface rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-on-surface-variant/50 transition-all font-body text-sm"
              placeholder="operative@domain.com"
            />
          </div>
          <div>
            <label className="block font-label text-xs uppercase tracking-wider text-on-surface-variant mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container-highest text-on-surface rounded-md px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary border-none placeholder-on-surface-variant/50 transition-all font-body text-sm"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-3 rounded-md power-gradient-bg text-on-primary font-label text-sm font-bold tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(123,208,255,0.3)] mt-2"
          >
            Create Credentials
            <span className="material-symbols-outlined text-[18px]">person_add</span>
          </button>
        </form>

        <p className="mt-6 text-center font-body text-sm text-on-surface-variant">
          Already an operative? <Link to="/login" className="text-primary hover:underline font-semibold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
