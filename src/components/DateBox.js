import React from 'react';
import { displayDate } from '../utils/dateUtils';

export default function DateBox({date,tasks}){
  return (
    <div className="date-box">
      <div className="date-header">{displayDate(date)}</div>
      <div className="date-content">
        {tasks.length===0 && <div className="muted" style={{fontSize:13}}>No tasks scheduled for this day.</div>}
        {tasks.map(t=> (
          <div key={t.id} style={{display:'flex', justifyContent:'space-between', padding:'8px 0', borderBottom:'1px solid var(--border)'}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:500, fontSize:14}}>{t.title}</div>
              {t.description && <div className="muted" style={{fontSize:12}}>{t.description}</div>}
            </div>
            <div style={{alignSelf:'center', fontWeight:700, fontSize:14}}>
              {t.status==='completed' ? <span style={{color:'var(--success)'}}>✓</span> : 
               t.status==='missed' ? <span style={{color:'var(--danger)'}}>✕</span> : 
               <span className="muted">—</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
