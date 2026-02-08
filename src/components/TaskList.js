import React, {useState} from 'react';
import TaskItem from './TaskItem';
import { format } from 'date-fns';

export default function TaskList({tasks,onAdd,onToggle,onFail,onDelete,onEdit,view}){
  const [form, setForm] = useState({title:'',description:'',priority:'Medium',date:format(new Date(),'yyyy-MM-dd')});

  const submit = (e)=>{
    e.preventDefault();
    if(!form.title) return;
    onAdd({...form});
    setForm({title:'',description:'',priority:'Medium',date:format(new Date(),'yyyy-MM-dd')});
  }

  return (
    <div className="task-list-container">
      <div className="card mb-4">
        <h3 className="mb-4">Create New Task</h3>
        <form onSubmit={submit} style={{display:'grid', gap:16}}>
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12}}>
            <input 
              placeholder="What needs to be done?" 
              value={form.title} 
              onChange={e=>setForm({...form,title:e.target.value})} 
            />
            <input 
              placeholder="Add details (optional)" 
              value={form.description} 
              onChange={e=>setForm({...form,description:e.target.value})} 
            />
          </div>
          <div style={{display:'flex', gap:12, alignItems:'center'}}>
            <div style={{flex:1, display:'flex', gap:8}}>
              <select 
                style={{flex:1}}
                value={form.priority} 
                onChange={e=>setForm({...form,priority:e.target.value})}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
              <input 
                style={{flex:1}}
                type="date" 
                value={form.date} 
                onChange={e=>setForm({...form,date:e.target.value})} 
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Task</button>
          </div>
        </form>
      </div>

      <div className="tasks-feed">
        <h3 className="mb-4">Upcoming Tasks</h3>
        {tasks.length===0 && (
          <div className="card text-center" style={{padding:48}}>
            <div className="muted">No tasks planned yet. Start by adding one above!</div>
          </div>
        )}
        {tasks.map(t=> (
          <TaskItem key={t.id} task={t} onToggle={onToggle} onFail={onFail} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    </div>
  )
}
