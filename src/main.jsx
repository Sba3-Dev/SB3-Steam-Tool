import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const themes = {
  red: { name: 'Black and red', accent: '#b94660', accent2: '#d05b76', bg: '#090609', panel: '#170b12' },
  black: { name: 'Classic black', accent: '#8b8f99', accent2: '#c3c7ce', bg: '#090a0c', panel: '#15171b' },
  midnight: { name: 'Midnight blue', accent: '#238fca', accent2: '#58b8e8', bg: '#071018', panel: '#0d1d29' },
  graphite: { name: 'Graphite', accent: '#477fbe', accent2: '#78a7df', bg: '#0b1118', panel: '#121c28' },
  silver: { name: 'Calm silver', accent: '#31a9c1', accent2: '#67d2e2', bg: '#081214', panel: '#102326' },
  purple: { name: 'Soft purple', accent: '#8f5ac2', accent2: '#bd8ae8', bg: '#0e0915', panel: '#1b1026' },
  turquoise: { name: 'Calm turquoise', accent: '#36a9a4', accent2: '#69d4c8', bg: '#071211', panel: '#0e2422' },
  white: { name: 'White', accent: '#eeeeee', accent2: '#ffffff', bg: '#0f0f0f', panel: '#202020' }
};
const sampleGames = [
  { id: 1, name: 'Game Library', category: 'Your Steam library', detail: 'Connect your library to show your games here', icon: '▦' },
  { id: 2, name: 'Manifest Manager', category: 'Game data', detail: 'Manage authorized manifest metadata', icon: '▤' },
  { id: 3, name: 'Downloads', category: 'Queue', detail: 'Your download requests will appear here', icon: '⇩' }
];

function App() {
  const [theme, setTheme] = useState(localStorage.getItem('sb3-steam-theme') || 'red');
  const [page, setPage] = useState('home');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState('Ready');
  const selectedTheme = themes[theme] || themes.red;
  const filtered = useMemo(() => sampleGames.filter(g => (g.name + g.category).toLowerCase().includes(query.toLowerCase())), [query]);
  const chooseTheme = key => { setTheme(key); localStorage.setItem('sb3-steam-theme', key); };
  const nav = [{id:'home',label:'Overview',icon:'⌂'},{id:'library',label:'Library',icon:'▦'},{id:'downloads',label:'Downloads',icon:'⇩'},{id:'updates',label:'Changelog',icon:'◷'}];
  return <div className="app" style={{'--accent':selectedTheme.accent,'--accent2':selectedTheme.accent2,'--bg':selectedTheme.bg,'--panel':selectedTheme.panel}}>
    <div className="ambient ambient-a"/><div className="ambient ambient-b"/><div className="grid-layer"/>
    <header className="topbar">
      <div className="brand"><div className="brand-logo">SB3</div><div><b>SB3 Steam Tool</b><small>Sba3 Dev · Desktop</small></div></div>
      <div className="search"><span>⌕</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search games and tools…"/></div>
      <button className="icon-btn" onClick={()=>setSettingsOpen(true)} title="Settings">⚙</button>
      <div className="version">v0.0.1</div>
    </header>
    <div className="layout">
      <aside className="sidebar">
        <div className="side-label">WORKSPACE</div>
        {nav.map(item=><button key={item.id} className={'nav-item '+(page===item.id?'active':'')} onClick={()=>setPage(item.id)}><span>{item.icon}</span>{item.label}</button>)}
        <div className="side-bottom"><div className="online-dot"/>Local interface ready</div>
      </aside>
      <main className="content">
        <section className="welcome">
          <div><div className="eyebrow">SB3 STEAM TOOL · VERSION 0.0.1</div><h1>{page==='home'?'Welcome back.':nav.find(n=>n.id===page)?.label || 'SB3 Steam Tool'}</h1><p>A clean workspace for your Steam library and download requests.</p></div>
          <div className="hero-mark">S</div>
        </section>
        <div className="section-head"><div><h2>{page==='home'?'Quick access':page==='library'?'Game library':page==='downloads'?'Download queue':'Release notes'}</h2><span>{page==='downloads'?'One active request at a time':'Your workspace'}</span></div><span className="status"><i/> {notice}</span></div>
        {page==='updates' ? <article className="release"><div className="release-top"><b>SB3 Steam Tool</b><span>v0.0.1 · Initial release</span></div><h3>Project foundation</h3><ul><li>Initial desktop interface and navigation</li><li>Theme selection and persistent preferences</li><li>Prepared sections for library, downloads and settings</li></ul></article> :
          <div className="cards">{(page==='downloads'?[{id:4,name:'No active downloads',category:'The queue is currently empty',detail:'When connected, your requests will be listed here.',icon:'⇩'}]:filtered).map(game=><article className="game-card" key={game.id}><div className="game-icon">{game.icon}</div><div className="game-copy"><b>{game.name}</b><span>{game.category}</span><p>{game.detail}</p></div><button className="subtle-btn" onClick={()=>setNotice('Backend connection is not configured yet')}>Details</button></article>)}</div>}
        <footer className="footer"><span>SB3 Steam Tool</span><span>v0.0.1 · Frontend preview</span></footer>
      </main>
    </div>
    {settingsOpen&&<div className="modal-backdrop" onClick={()=>setSettingsOpen(false)}><section className="settings-modal" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setSettingsOpen(false)}>×</button><div className="eyebrow">PREFERENCES</div><h2>Settings</h2><p>Customize the look and feel of SB3 Steam Tool.</p><div className="setting-block"><h3>App color</h3><div className="theme-grid">{Object.entries(themes).map(([key,t])=><button key={key} className={'theme-choice '+(theme===key?'selected':'')} onClick={()=>chooseTheme(key)}><i style={{background:t.accent}}/><span>{t.name}</span></button>)}</div></div><div className="setting-block"><h3>Application</h3><div className="setting-row"><span>Current version</span><b>v0.0.1</b></div><div className="setting-row"><span>Update channel</span><b>Stable</b></div></div><div className="modal-actions"><button className="primary-btn" onClick={()=>setSettingsOpen(false)}>Done</button></div></section></div>}
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
