import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/me?token=${token}`);
        if (response.ok) {
          const data = await response.json();
          setUsername(data.username);
        } else {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error('Failed to fetch user', err);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col md:flex-row">
      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-[#060e20] border-r border-slate-800/20 z-40">
        <div className="p-6 pb-2 border-b border-surface-container/50">
          <h2 className="font-headline font-bold text-xl text-primary tracking-tight">Sentinel Prime</h2>
          <p className="font-label text-xs text-on-surface-variant mt-1 uppercase tracking-wider">Fortified Archive v2.4</p>
        </div>
        <div className="p-4">
          <button className="w-full py-2.5 px-4 rounded-md power-gradient-bg text-on-primary font-label text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:opacity-90">
            <span className="material-symbols-outlined text-[18px]">play_arrow</span>
            Run Global Scan
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <a className="flex items-center gap-3 p-3 rounded-md bg-[#2d3449] text-sky-300 font-semibold font-label text-sm transition-all ease-in-out duration-200" href="#">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
            Security Metrics
          </a>
          <a className="flex items-center gap-3 p-3 rounded-md text-slate-400 font-label text-sm hover:bg-[#2d3449]/50 hover:text-white transition-all ease-in-out duration-200" href="#">
            <span className="material-symbols-outlined text-[20px]">security</span>
            Vulnerability Logs
          </a>
        </nav>
        <div className="p-3 border-t border-surface-container/50 space-y-1">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 p-3 rounded-md text-slate-400 font-label text-sm hover:bg-[#2d3449]/50 hover:text-error transition-all ease-in-out duration-200">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Logout
          </button>
          <div className="mt-4 p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-primary font-bold">
              {username ? username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-col hidden lg:flex">
              <span className="font-label text-xs font-semibold text-on-surface">{username || 'Operative'}</span>
              <span className="font-label text-[10px] text-on-surface-variant">System Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col bg-surface">
        <div className="hidden md:flex justify-between items-center px-8 py-6 w-full sticky top-0 z-30 bg-surface/90 backdrop-blur-md">
          <div>
            <h1 className="font-headline font-extrabold text-3xl tracking-tight text-on-surface">Dashboard</h1>
            <p className="font-label text-sm text-on-surface-variant uppercase tracking-wider mt-1">Welcome back, {username}</p>
          </div>
        </div>
        
        <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-4 bg-surface-container-low rounded-xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
              <div>
                <h2 className="font-headline text-lg font-semibold text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">shield</span>
                  Global Security Score
                </h2>
                <p className="font-body text-sm text-on-surface-variant mt-1">Overall infrastructure health</p>
              </div>
              <div className="flex flex-col items-center justify-center flex-1 my-4">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" fill="none" r="45" stroke="#171f33" strokeWidth="8"></circle>
                    <circle cx="50" cy="50" fill="none" r="45" stroke="#4edea3" strokeDasharray="283" strokeDashoffset="60" strokeLinecap="round" strokeWidth="8"></circle>
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="font-headline text-5xl font-extrabold text-tertiary tracking-tighter">78</span>
                    <span className="font-label text-xs text-on-surface-variant uppercase tracking-widest mt-1">/ 100</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 bg-surface-container-low rounded-xl p-6 flex flex-col min-h-[300px]">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-headline text-lg font-semibold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">warning</span>
                    System Alerts
                  </h2>
                  <p className="font-body text-sm text-on-surface-variant mt-1">Recent activity and vulnerabilities</p>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3">
                <div className="bg-surface-container-highest p-4 rounded-lg border-l-4 border-error flex items-center justify-between">
                   <div>
                      <p className="font-semibold font-body text-on-surface text-sm">Critical CVE Detected in payment-gateway-v2</p>
                      <p className="font-label text-xs text-on-surface-variant mt-1">Action required immediately</p>
                   </div>
                   <button className="text-primary text-sm font-semibold hover:underline">View</button>
                </div>
                <div className="bg-surface-container-highest p-4 rounded-lg border-l-4 border-primary flex items-center justify-between">
                   <div>
                      <p className="font-semibold font-body text-on-surface text-sm">Routine Scan Completed Successfully</p>
                      <p className="font-label text-xs text-on-surface-variant mt-1">2 hours ago</p>
                   </div>
                   <button className="text-primary text-sm font-semibold hover:underline">Log</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
