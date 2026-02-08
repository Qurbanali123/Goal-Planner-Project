import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register(ArcElement,BarElement,CategoryScale,LinearScale,Tooltip,Legend);

function aggregate(tasks){
  const total = tasks.length;
  const completed = tasks.filter(t=>t.status==='completed').length;
  const missed = tasks.filter(t=>t.status==='missed').length;
  const pending = total - completed - missed;
  const percent = total? Math.round((completed/total)*100):0;
  return {total,completed,missed,pending,percent};
}

export default function Analytics({tasks}){
  const agg = aggregate(tasks);
  
  const pieData = {
    labels:['Completed','Missed','Pending'],
    datasets:[{
      data:[agg.completed,agg.missed,agg.pending],
      backgroundColor:['#10b981','#ef4444','#f59e0b'],
      borderWidth: 0,
    }]
  }
  
  const barData = {
    labels:['Total','Done','Missed'],
    datasets:[{
      label:'Count',
      data:[agg.total,agg.completed,agg.missed],
      backgroundColor:['#4f46e5','#10b981','#ef4444'],
      borderRadius: 4,
    }]
  }

  return (
    <div className="card">
      <h3 className="mb-4">Performance Insights</h3>
      
      <div className="stats-header mb-4" style={{display:'flex', justifyContent:'space-between'}}>
        <div>
          <div className="muted" style={{fontSize:12, textTransform:'uppercase', fontWeight:600}}>Success Rate</div>
          <div style={{fontSize:24, fontWeight:700, color:'var(--success)'}}>{agg.percent}%</div>
        </div>
        <div style={{textAlign:'right'}}>
          <div className="muted" style={{fontSize:12, textTransform:'uppercase', fontWeight:600}}>Total Tasks</div>
          <div style={{fontSize:24, fontWeight:700}}>{agg.total}</div>
        </div>
      </div>

      <div style={{marginBottom:24}}>
        <Pie 
          data={pieData} 
          options={{
            plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, padding: 15 } } }
          }} 
        />
      </div>

      <div style={{height: 150}}>
        <Bar 
          data={barData} 
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true, grid: { display: false } }, x: { grid: { display: false } } }
          }} 
        />
      </div>
    </div>
  )
}
