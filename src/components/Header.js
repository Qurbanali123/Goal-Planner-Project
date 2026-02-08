import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header({view, setView, onExport, onImport}){
  return (
    <header className="header">
      <div className="brand">
        <h2 style={{margin:0, color:'var(--primary)', letterSpacing:'-0.5px'}}>GoalPlanner</h2>
      </div>
      
      <div style={{display:'flex', gap:24, alignItems:'center'}}>
        <nav className="nav-buttons">
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
          <NavLink to="/skills">Skills</NavLink>
        </nav>

        <div className="view-switcher" style={{display:'flex', gap:4, background:'#f1f5f9', padding:4, borderRadius:8}}>
          {['daily', 'monthly', 'yearly'].map(v => (
            <button 
              key={v}
              onClick={() => setView(v)}
              className="btn btn-sm"
              style={{
                border: 'none',
                background: view === v ? 'white' : 'transparent',
                boxShadow: view === v ? 'var(--shadow-sm)' : 'none',
                textTransform: 'capitalize'
              }}
            >
              {v}
            </button>
          ))}
        </div>

        <div style={{display:'flex', gap:8, alignItems:'center', borderLeft:'1px solid var(--border)', paddingLeft:16}}>
          <button className="btn btn-sm" onClick={onExport} title="Backup data">
            Export
          </button>
          <label className="btn btn-sm" style={{cursor:'pointer', margin:0}} title="Restore data">
            <input 
              type="file" 
              accept="application/json" 
              style={{display:'none'}} 
              onChange={onImport} 
            /> 
            Import
          </label>
        </div>
      </div>
    </header>
  );
}
