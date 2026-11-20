import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const themes = {
  red:{name:'Black and red',accent:'#921d2d',accent2:'#b52a3c',bg:'#050505',panel:'#0d0b0c'},
  black:{name:'Classic black',accent:'#8b8f99',accent2:'#c3c7ce',bg:'#090a0c',panel:'#15171b'},
  midnight:{name:'Midnight blue',accent:'#238fca',accent2:'#58b8e8',bg:'#071018',panel:'#0d1d29'},
  graphite:{name:'Graphite',accent:'#477fbe',accent2:'#78a7df',bg:'#0b1118',panel:'#121c28'},
  silver:{name:'Calm silver',accent:'#31a9c1',accent2:'#67d2e2',bg:'#081214',panel:'#102326'},
  purple:{name:'Soft purple',accent:'#8f5ac2',accent2:'#bd8ae8',bg:'#0e0915',panel:'#1b1026'},
  turquoise:{name:'Calm turquoise',accent:'#36a9a4',accent2:'#69d4c8',bg:'#071211',panel:'#0e2422'},
  white:{name:'White',accent:'#eeeeee',accent2:'#ffffff',bg:'#0f0f0f',panel:'#202020'}
};
const games = [
  {id:'library',name:'Steam Library',category:'Your collection',detail:'Your eligible games will appear here once the account connection is configured.',icon:'▦'},
  {id:'manifest',name:'Game information',category:'Game details',detail:'Browse metadata and manifests you are authorized to access.',icon:'▤'},
  {id:'downloads',name:'Download queue',category:'Queue',detail:'Your download requests and their progress will appear here.',icon:'⇩'}
];
const inviteUrl = 'https://discord.gg/WcknYK29Hq';

function App(){
  const [theme,setTheme]=useState(localStorage.getItem('sb3-steam-theme')||'red');
  const [screen,setScreen]=useState('login');
  const [page,setPage]=useState('home');
  const [settingsOpen,setSettingsOpen]=useState(false);
  const [query,setQuery]=useState('');
  const [notice,setNotice]=useState('Frontend preview');
  const [toast,setToast]=useState('');
  const [user,setUser]=useState(null);
  const selected=themes[theme]||themes.red;
  const filtered=useMemo(()=>games.filter(g=>(g.name+g.category+g.detail).toLowerCase().includes(query.toLowerCase())),[query]);
  const chooseTheme=k=>{setTheme(k);localStorage.setItem('sb3-steam-theme',k)};
  const showToast=m=>{setToast(m);window.clearTimeout(showToast.timer);showToast.timer=window.setTimeout(()=>setToast(''),2600)};
  const nav=[{id:'home',label:'Welcome',icon:'⌂'},{id:'library',label:'All games',icon:'▦'},{id:'downloads',label:'Downloads',icon:'⇩'},{id:'updates',label:'Changelog',icon:'◷'}];
  const beginLogin=()=>showToast('Discord OAuth will be enabled when the backend is connected.');
  const goMembership=()=>setScreen('membership');
  const enterPreview=()=>{setUser({name:'Preview User',tag:'Discord connection pending'});setScreen('app')};
  return <div className="app" style={{'--accent':selected.accent,'--accent2':selected.accent2,'--bg':selected.bg,'--panel':selected.panel}}>
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/><div className="ambient ambient-c"/><div className="grid-layer"/>
    {screen==='login'&&<section className="gate-screen">
      <header className="gate-brand"><div className="brand-logo">SB3</div><div><b>SB3 Steam Tool</b><small>Sba3 Dev · 2026</small></div><span className="version">v0.0.1</span></header>
      <div className="gate-card"><div className="gate-logo">SB3</div><div className="eyebrow">WELCOME TO SB3 STEAM TOOL</div><h1>Sign in to continue</h1><p>Sign in with your Discord account to access your workspace and game library.</p><button className="primary-btn wide" onClick={beginLogin}>◎ &nbsp; Sign in with Discord</button><div className="gate-foot">Your account connection is not configured yet.</div></div>
      <footer className="gate-footer"><span>SB3 Steam Tool</span><span>Secure sign-in · Discord</span></footer>
    </section>}
    {screen==='membership'&&<section className="gate-screen"><header className="gate-brand"><div className="brand-logo">SB3</div><div><b>SB3 Steam Tool</b><small>Sba3 Dev · 2026</small></div><span className="version">v0.0.1</span></header><div className="gate-card"><div className="gate-logo">⌂</div><div className="eyebrow">COMMUNITY ACCESS</div><h1>Join the SB3 server</h1><p>Join the official Discord server, then return to the app to verify membership.</p><button className="primary-btn wide" onClick={()=>window.open(inviteUrl,'_blank','noopener,noreferrer')}>Join the Discord server ↗</button><button className="secondary-btn wide" onClick={()=>showToast('Membership verification will be available after Discord OAuth is connected.')}>Refresh membership</button></div><footer className="gate-footer"><span>SB3 Steam Tool</span><button className="text-btn" onClick={()=>setScreen('login')}>Back to sign in</button></footer></section>}
    {screen==='app'&&<>
      <header className="topbar"><div className="brand"><div className="brand-logo">SB3</div><div><b>SB3 Steam Tool</b><small>Sba3 Dev · 2026</small><small>v0.0.1</small></div></div><div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search games…"/></div><button className="icon-btn" onClick={()=>setSettingsOpen(true)}>⚙</button><button className="profile-chip" onClick={()=>showToast('Discord profile will appear after authentication.')}> <span className="profile-avatar">P</span><span>{user?.name||'Account'}</span></button></header>
      <div className="layout"><aside className="sidebar"><div className="side-label">WORKSPACE</div>{nav.map(n=><button key={n.id} className={'nav-item '+(page===n.id?'active':'')} onClick={()=>setPage(n.id)}><span>{n.icon}</span>{n.label}</button>)}<div className="side-bottom"><i className="online-dot"/>Interface ready</div></aside>
      <main className="content">
        {page==='home'&&<><section className="welcome hero-welcome"><div><div className="eyebrow">SB3 STEAM TOOL · VERSION 0.0.1</div><h1>Welcome{user?.name?' back, '+user.name.split(' ')[0]:'.'}</h1><p>Your Steam workspace is ready. Here's your account and app status.</p></div><div className="hero-mark">S</div></section>
          <div className="section-head"><div><h2>Account overview</h2><span>Your connection status</span></div><span className="status"><i/> Preview</span></div>
          <div className="status-grid"><article className="status-card"><div className="status-icon">◉</div><div><b>Discord account</b><span>Waiting for OAuth connection</span></div><em className="pending">Pending</em></article><article className="status-card"><div className="status-icon">⌂</div><div><b>SB3 Discord server</b><span>Membership verification not connected</span></div><em className="pending">Pending</em></article><article className="status-card"><div className="status-icon">↻</div><div><b>Application updates</b><span>Latest published version: v0.0.1</span></div><em className="current">Current UI</em></article></div>
          <div className="section-head"><div><h2>Quick access</h2><span>Jump back into your workspace</span></div></div><div className="cards">{games.map(g=><article className="game-card" key={g.id}><div className="game-icon">{g.icon}</div><div className="game-copy"><b>{g.name}</b><span>{g.category}</span><p>{g.detail}</p></div><button className="subtle-btn" onClick={()=>setPage(g.id==='downloads'?'downloads':'library')}>Open</button></article>)}</div>
          <div className="server-banner"><div><b>Need help or updates?</b><span>Visit the official SB3 community server.</span></div><button className="secondary-btn" onClick={()=>window.open(inviteUrl,'_blank','noopener,noreferrer')}>Open Discord ↗</button></div>
        </>}
        {page==='library'&&<><section className="welcome"><div><div className="eyebrow">YOUR COLLECTION</div><h1>All games</h1><p>Games available to your connected account will be listed here.</p></div><div className="hero-mark">▦</div></section><div className="section-head"><div><h2>Game library</h2><span>{filtered.length} items in preview</span></div></div><div className="cards">{filtered.map(g=><article className="game-card" key={g.id}><div className="game-icon">{g.icon}</div><div className="game-copy"><b>{g.name}</b><span>{g.category}</span><p>{g.detail}</p></div><button className="subtle-btn" onClick={()=>showToast('Connect the backend to load your library.')}>Details</button></article>)}</div></>}
        {page==='downloads'&&<><section className="welcome"><div><div className="eyebrow">ACTIVITY</div><h1>Downloads</h1><p>Track your requests and their status.</p></div><div className="hero-mark">⇩</div></section><div className="empty-panel"><div className="game-icon">⇩</div><b>No download requests yet</b><span>The queue will appear here after the backend is connected.</span></div></>}
        {page==='updates'&&<><section className="welcome"><div><div className="eyebrow">RELEASE HISTORY</div><h1>Changelog</h1><p>What's new in SB3 Steam Tool.</p></div><div className="hero-mark">◷</div></section><article className="release"><div className="release-top"><b>SB3 Steam Tool</b><span>v0.0.1 · Initial release</span></div><h3>Project foundation</h3><ul><li>Initial application shell and navigation.</li><li>Discord sign-in and server-membership gate UI prepared.</li><li>Welcome dashboard with account, community and update status.</li><li>Settings themes and saved preferences.</li></ul></article></>}
        <footer className="footer"><span>SB3 Steam Tool</span><span>v0.0.1 · Frontend preview</span></footer>
      </main></div>
    </>}
    {settingsOpen&&<div className="modal-backdrop" onClick={()=>setSettingsOpen(false)}><section className="settings-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSettingsOpen(false)}>×</button><div className="eyebrow">PREFERENCES</div><h2>Settings</h2><p>Customize the look and feel of SB3 Steam Tool.</p><div className="setting-block"><h3>App color</h3><div className="theme-grid">{Object.entries(themes).map(([key,t])=><button key={key} className={'theme-choice '+(theme===key?'selected':'')} onClick={()=>chooseTheme(key)}><i style={{background:t.accent}}/><span>{t.name}</span></button>)}</div></div><div className="setting-block"><h3>Application</h3><div className="setting-row"><span>Current version</span><b>v0.0.1</b></div><div className="setting-row"><span>Update channel</span><b>Stable</b></div></div><div className="modal-actions"><button className="primary-btn" onClick={()=>setSettingsOpen(false)}>Done</button></div></section></div>}
    {toast&&<div className="toast">{toast}</div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
