import React from 'react';

export const ProgressRing = ({ percentage, size = 120, label = '', color = '#4F46E5' }) => {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-ring-container">
      <svg width={size} height={size} className="progress-ring-svg">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E5E7EB"
          strokeWidth="4"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="4"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="progress-ring-fill"
        />
      </svg>
      <div className="progress-ring-label">
        <div className="progress-ring-percentage">{percentage}%</div>
        {label && <div className="progress-ring-text">{label}</div>}
      </div>
    </div>
  );
};

export const GradientCard = ({ title, children, className = '', onClick = null }) => {
  return (
    <div
      className={`gradient-card ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      {title && <h3 className="card-title">{title}</h3>}
      {children}
    </div>
  );
};

export const TaskStreak = ({ streak }) => {
  if (streak === 0) return null;

  return (
    <div className="task-streak">
      <span className="streak-icon">🔥</span>
      <span className="streak-count">{streak} day streak!</span>
    </div>
  );
};

export const PriorityBadge = ({ priority }) => {
  const priorityClass = priority.toLowerCase();
  return <span className={`priority-badge priority-${priorityClass}`}>{priority}</span>;
};

export const StatusIndicator = ({ status }) => {
  const statusClass = status.toLowerCase();
  return <span className={`status-indicator status-${statusClass}`}>{status}</span>;
};

export const EmptyState = ({ icon = '📭', title = 'No items yet', message = '' }) => {
  return (
    <div className="empty-state">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
    </div>
  );
};

export const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
    </div>
  );
};

export const ActionButton = ({ icon, label, onClick, variant = 'primary', className = '' }) => {
  return (
    <button
      className={`action-button action-${variant} ${className}`}
      onClick={onClick}
      title={label}
    >
      <span className="button-icon">{icon}</span>
      {label && <span className="button-label">{label}</span>}
    </button>
  );
};

export const QuoteOfDay = ({ quote }) => {
  return (
    <div className="quote-container">
      <span className="quote-icon">"</span>
      <p className="quote-text">{quote}</p>
      <span className="quote-icon quote-end">"</span>
    </div>
  );
};
