import React from 'react';
import { displayDate } from '../utils/dateUtils';

export default function TaskItem({task,onToggle,onFail,onDelete,onEdit}){
  const priorityClass = `priority-tag priority-${task.priority.toLowerCase()}`;
  const isCompleted = task.status === 'completed';
  const isMissed = task.status === 'missed';

  return (
    <div className={`task ${isCompleted ? 'task-completed' : ''}`}>
      <div className="task-info">
        <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:4}}>
          <h4>{task.title}</h4>
          <span className={priorityClass}>{task.priority}</span>
          {task.status !== 'pending' && (
            <span className="status-badge">
              {task.status.toUpperCase()}
            </span>
          )}
        </div>
        {task.description && <div className="muted" style={{marginBottom:4}}>{task.description}</div>}
        <div className="muted" style={{fontSize:12}}>
          Planned for {displayDate(task.date)}
        </div>
      </div>
      
      <div className="task-controls">
        <button 
          className={`btn btn-sm ${isCompleted ? 'btn-primary' : ''}`} 
          onClick={()=>onToggle(task.id)}
          title="Mark as complete"
        >
          {isCompleted ? '✓ Done' : 'Complete'}
        </button>
        <button 
          className={`btn btn-sm ${isMissed ? 'btn-primary' : ''}`}
          onClick={()=>onFail(task.id)}
          title="Mark as missed"
        >
          {isMissed ? '✕ Missed' : 'Missed'}
        </button>
        <button className="btn btn-sm" onClick={()=>onEdit(task.id)}>Edit</button>
        <button className="btn btn-sm" onClick={()=>onDelete(task.id)} style={{color:'var(--danger)'}}>Delete</button>
      </div>
    </div>
  )
}
