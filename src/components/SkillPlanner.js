import React, {useState} from 'react';

export default function SkillPlanner({skills,onAdd,onSetPriority}){
  const [name,setName] = useState('');

  const submit = (e)=>{
    e.preventDefault(); 
    if(!name) return; 
    onAdd({name}); 
    setName('');
  }

  return (
    <div className="card">
      <h3 className="mb-4">Priority Skills</h3>
      <form onSubmit={submit} style={{display:'flex', gap:8, marginBottom:16}}>
        <input 
          placeholder="New skill to master..." 
          value={name} 
          onChange={e=>setName(e.target.value)} 
        />
        <button type="submit" className="btn btn-primary btn-sm">Add</button>
      </form>
      <div className="skill-list">
        {skills.length === 0 && <div className="muted text-center" style={{padding: '12px 0'}}>No skills listed.</div>}
        {skills.map((s,idx)=> (
          <div key={s.id} className="skill-item">
            <div className="skill-name">
              <span className="muted" style={{marginRight:8}}>{idx+1}.</span>
              {s.name}
            </div>
            <div style={{display:'flex', gap:4}}>
              <button 
                className="btn btn-sm" 
                onClick={()=>onSetPriority(s.id,'up')}
                title="Move up"
                disabled={idx === 0}
              >
                ↑
              </button>
              <button 
                className="btn btn-sm" 
                onClick={()=>onSetPriority(s.id,'down')}
                title="Move down"
                disabled={idx === skills.length - 1}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
