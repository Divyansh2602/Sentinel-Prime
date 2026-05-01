import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [currentView, setCurrentView] = useState('metrics'); // metrics, logs, scans
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/me?token=${token}`);
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

  const toggleScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 5000);
  };

  return (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-tertiary/5 rounded-full blur-[120px]"></div>
      </div>

      {/* SideNavBar (Desktop) */}
      <aside className="hidden md:flex flex-col h-screen w-72 fixed left-0 top-0 bg-surface-container-lowest/80 backdrop-blur-xl border-r border-outline-variant/20 z-40">
        <div className="p-8 border-b border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg power-gradient-bg flex items-center justify-center shadow-[0_0_20px_rgba(123,208,255,0.4)]">
              <span className="material-symbols-outlined text-on-primary">shield</span>
            </div>
            <div>
              <h2 className="font-headline font-bold text-xl power-gradient-text tracking-tight">Sentinel Prime</h2>
              <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-[0.2em] font-bold">Security Core v2.4</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <button 
            onClick={toggleScan}
            disabled={isScanning}
            className={`w-full py-3 px-4 rounded-md font-label text-sm font-bold flex items-center justify-center gap-2 transition-all active:scale-95 ${isScanning ? 'bg-surface-container-highest text-primary animate-pulse' : 'power-gradient-bg text-on-primary shadow-[0_0_20px_rgba(123,208,255,0.2)] hover:shadow-[0_0_30px_rgba(123,208,255,0.4)]'}`}
          >
            <span className="material-symbols-outlined text-[18px]">{isScanning ? 'sync' : 'radar'}</span>
            {isScanning ? 'Executing Scan...' : 'Global System Scan'}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 space-y-2">
          <p className="px-4 py-2 font-label text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Main Console</p>
          <button 
            onClick={() => setCurrentView('metrics')}
            className={`w-full flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 ${currentView === 'metrics' ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(123,208,255,0.1)]' : 'text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface'}`}
          >
            <span className={`material-symbols-outlined text-[22px] ${currentView === 'metrics' ? 'fill-1' : ''}`} style={{ fontVariationSettings: currentView === 'metrics' ? "'FILL' 1" : "" }}>analytics</span>
            <span className="font-label text-sm font-semibold">Security Metrics</span>
          </button>
          <button 
            onClick={() => setCurrentView('logs')}
            className={`w-full flex items-center gap-4 p-3.5 rounded-xl transition-all duration-300 ${currentView === 'logs' ? 'bg-primary/10 text-primary border border-primary/20 shadow-[0_0_15px_rgba(123,208,255,0.1)]' : 'text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface'}`}
          >
            <span className={`material-symbols-outlined text-[22px] ${currentView === 'logs' ? 'fill-1' : ''}`} style={{ fontVariationSettings: currentView === 'logs' ? "'FILL' 1" : "" }}>security</span>
            <span className="font-label text-sm font-semibold">Vulnerability Logs</span>
          </button>
          
          <div className="pt-6">
            <p className="px-4 py-2 font-label text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">System Status</p>
            <div className="px-4 py-3 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-label text-xs text-on-surface-variant">Database</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary status-pulse"></span>
                  <span className="font-label text-[10px] text-tertiary font-bold uppercase">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-label text-xs text-on-surface-variant">API Cluster</span>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-tertiary status-pulse"></span>
                  <span className="font-label text-[10px] text-tertiary font-bold uppercase">Active</span>
                </div>
              </div>
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-outline-variant/10">
          <div className="bg-surface-container-high/50 rounded-2xl p-4 flex items-center gap-3 border border-outline-variant/10">
            <div className="w-10 h-10 rounded-full power-gradient-bg flex items-center justify-center text-on-primary font-bold shadow-lg">
              {username ? username.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-label text-xs font-bold text-on-surface truncate">{username || 'Operative'}</p>
              <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-tighter">System Admin</p>
            </div>
            <button onClick={handleLogout} className="p-2 text-on-surface-variant hover:text-error transition-colors">
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 min-h-screen flex flex-col z-10 relative">
        <header className="px-10 py-8 flex justify-between items-center sticky top-0 bg-surface/40 backdrop-blur-md z-30">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary status-pulse"></span>
              <p className="font-label text-[10px] text-primary uppercase tracking-[0.3em] font-bold">Terminal Connected</p>
            </div>
            <h1 className="font-headline font-black text-4xl tracking-tight text-on-surface">
              {currentView === 'metrics' ? 'Security Metrics' : 'Vulnerability Logs'}
            </h1>
          </div>
          <div className="flex gap-3">
             <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3 border border-outline-variant/20 hover:border-primary/30 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-primary text-[20px]">notifications</span>
                <span className="w-5 h-5 rounded-full bg-error text-[10px] flex items-center justify-center font-bold text-on-error">3</span>
             </div>
             <div className="glass-panel px-4 py-2 rounded-lg flex items-center gap-3 border border-outline-variant/20">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px]">calendar_today</span>
                <span className="font-label text-xs font-semibold">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
             </div>
          </div>
        </header>
        
        <div className="p-10 space-y-8 max-w-7xl w-full">
          {currentView === 'metrics' ? (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Score Widget */}
                <div className="glass-panel rounded-3xl p-8 glow-card relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="material-symbols-outlined text-6xl text-primary">security</span>
                  </div>
                  <h3 className="font-headline text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                    Infrastructure Health
                  </h3>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="font-headline text-6xl font-black text-on-surface">78</span>
                      <span className="font-label text-xl text-on-surface-variant ml-2">/ 100</span>
                    </div>
                    <div className="text-right pb-2">
                      <p className="text-tertiary font-bold text-sm flex items-center justify-end gap-1">
                        <span className="material-symbols-outlined text-sm">trending_up</span>
                        +12%
                      </p>
                      <p className="text-[10px] text-on-surface-variant uppercase font-bold">vs last week</p>
                    </div>
                  </div>
                  <div className="mt-8 h-2 bg-surface-container-highest rounded-full overflow-hidden">
                    <div className="h-full power-gradient-bg w-[78%] rounded-full shadow-[0_0_15px_#7bd0ff]"></div>
                  </div>
                </div>

                {/* Threat Widget */}
                <div className="glass-panel rounded-3xl p-8 glow-card group">
                   <h3 className="font-headline text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-error rounded-full"></span>
                    Active Threats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-error/5 border border-error/10">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-error">warning</span>
                        <span className="font-label text-sm font-semibold">Critical CVEs</span>
                      </div>
                      <span className="font-headline text-xl font-bold text-error">04</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">info</span>
                        <span className="font-label text-sm font-semibold">Medium Risks</span>
                      </div>
                      <span className="font-headline text-xl font-bold text-primary">12</span>
                    </div>
                  </div>
                </div>

                {/* Scan Status Widget */}
                <div className="glass-panel rounded-3xl p-8 glow-card relative overflow-hidden">
                  {isScanning && <div className="scan-line"></div>}
                  <h3 className="font-headline text-lg font-bold mb-6 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-tertiary rounded-full"></span>
                    Scan Coverage
                  </h3>
                  <div className="flex items-center justify-center h-24">
                     <div className="text-center">
                        <p className="font-headline text-4xl font-black text-on-surface">94.2%</p>
                        <p className="font-label text-[10px] text-on-surface-variant uppercase tracking-widest mt-1">Global Coverage</p>
                     </div>
                  </div>
                  <div className="mt-4 flex gap-1 h-1.5">
                    {[1,2,3,4,5,6,7,8,9,10].map(i => (
                      <div key={i} className={`flex-1 rounded-full ${i <= 9 ? 'bg-tertiary' : 'bg-surface-container-highest'}`}></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Alerts List */}
              <div className="glass-panel rounded-3xl p-8">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-headline text-xl font-bold">Real-time Security Feed</h3>
                  <button className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">View All History</button>
                </div>
                <div className="space-y-4">
                  {[
                    { type: 'error', msg: 'High-severity vulnerability detected in Payment API', time: '2 mins ago', id: 'CVE-2024-1021' },
                    { type: 'primary', msg: 'New repository initialized and scan queued', time: '14 mins ago', id: 'REPO-ALPHA' },
                    { type: 'tertiary', msg: 'Successful automated patch applied to Auth layer', time: '1 hour ago', id: 'PATCH-772' }
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 rounded-2xl bg-surface-container-high/40 border border-outline-variant/10 hover:bg-surface-container-high transition-all group cursor-pointer">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg ${alert.type === 'error' ? 'bg-error/10 text-error' : alert.type === 'primary' ? 'bg-primary/10 text-primary' : 'bg-tertiary/10 text-tertiary'}`}>
                        <span className="material-symbols-outlined">{alert.type === 'error' ? 'dangerous' : alert.type === 'primary' ? 'new_releases' : 'check_circle'}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-body text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{alert.msg}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-label text-[10px] text-on-surface-variant uppercase font-bold">{alert.id}</span>
                          <span className="w-1 h-1 bg-outline-variant rounded-full"></span>
                          <span className="font-label text-[10px] text-on-surface-variant uppercase font-bold">{alert.time}</span>
                        </div>
                      </div>
                      <button className="p-2 rounded-lg hover:bg-surface-container-highest transition-colors">
                        <span className="material-symbols-outlined text-on-surface-variant">arrow_forward</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="glass-panel rounded-3xl overflow-hidden border border-outline-variant/20">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-high/50 border-b border-outline-variant/20">
                      <th className="px-8 py-5 font-label text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Severity</th>
                      <th className="px-8 py-5 font-label text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Vulnerability</th>
                      <th className="px-8 py-5 font-label text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Status</th>
                      <th className="px-8 py-5 font-label text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {[
                      { sev: 'Critical', name: 'SQL Injection in /api/v1/user/search', status: 'In Progress', color: 'error' },
                      { sev: 'High', name: 'Insecure JWT Signing Secret', status: 'Open', color: 'error' },
                      { sev: 'Medium', name: 'Cross-Site Scripting (XSS) in Comments', status: 'Mitigated', color: 'primary' },
                      { sev: 'Low', name: 'Information Disclosure (Server Header)', status: 'Ignored', color: 'on-surface-variant' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-surface-container-high/30 transition-colors group">
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${row.sev === 'Critical' ? 'bg-error/20 text-error' : row.sev === 'High' ? 'bg-error/10 text-error' : row.sev === 'Medium' ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                            {row.sev}
                          </span>
                        </td>
                        <td className="px-8 py-6">
                           <p className="font-body text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{row.name}</p>
                           <p className="font-label text-[10px] text-on-surface-variant uppercase font-bold mt-1">Detected 4 hours ago • Sentinel Scan Engine</p>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2">
                             <div className={`w-1.5 h-1.5 rounded-full bg-${row.color}`}></div>
                             <span className="font-label text-xs font-semibold">{row.status}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                           <button className="px-4 py-1.5 rounded-lg border border-outline-variant/30 text-[10px] font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary hover:border-primary transition-all">Remediate</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
