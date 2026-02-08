import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ProgressRing, GradientCard, TaskStreak, QuoteOfDay, ActionButton, EmptyState } from '../components/UIComponents';
import { format } from 'date-fns';

const HomePage = () => {
  const navigate = useNavigate();
  const {
    getTodaysTasks,
    skills,
    getDailyQuote,
    getTaskStats,
    getTaskStreak,
    addTask,
    addSkill,
  } = useContext(AppContext);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
  });
  const [skillName, setSkillName] = useState('');

  const todaysTasks = getTodaysTasks();
  const stats = getTaskStats(todaysTasks);
  const streak = getTaskStreak();
  const quote = getDailyQuote();
  const activeSkills = skills.filter((s) => s.status === 'active');

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskForm.title.trim()) {
      addTask({
        ...taskForm,
        date: format(new Date(), 'yyyy-MM-dd'),
        type: 'daily',
      });
      setTaskForm({ title: '', description: '', priority: 'Medium' });
      setShowTaskModal(false);
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (skillName.trim()) {
      addSkill({ name: skillName });
      setSkillName('');
      setShowSkillModal(false);
    }
  };

  return (
    <div className="home-page">
      {/* Quote of the Day */}
      <section className="quote-section">
        <QuoteOfDay quote={quote} />
      </section>

      {/* Quick Stats */}
      <section className="stats-section">
        <h2>Today's Overview</h2>
        <div className="stats-grid">
          <GradientCard title="Today's Progress" className="gradient-primary">
            <div className="stats-content">
              <ProgressRing percentage={stats.percentage} label="Completion" color="#10B981" />
              <div className="stats-details">
                <div className="stat-item">
                  <span className="stat-label">Total Tasks</span>
                  <span className="stat-value">{stats.total}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Completed</span>
                  <span className="stat-value completed">{stats.completed}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Missed</span>
                  <span className="stat-value missed">{stats.missed}</span>
                </div>
              </div>
            </div>
          </GradientCard>

          <GradientCard title="Skill Progress" className="gradient-secondary">
            <div className="skill-stats">
              <div className="skill-count">
                <div className="count-number">{activeSkills.length}</div>
                <div className="count-label">Active Skills</div>
              </div>
              <TaskStreak streak={streak} />
            </div>
          </GradientCard>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="action-section">
        <button className="add-btn add-task-btn" onClick={() => setShowTaskModal(true)}>
          <span className="btn-icon">➕</span>
          <span className="btn-text">Add New Task</span>
        </button>
        <button className="add-btn add-skill-btn" onClick={() => setShowSkillModal(true)}>
          <span className="btn-icon">⭐</span>
          <span className="btn-text">Add New Skill</span>
        </button>
      </section>

      {/* Today's Tasks */}
      <section className="today-tasks-section">
        <div className="section-header">
          <h2>Today's Tasks</h2>
          <button
            className="view-all-btn"
            onClick={() => navigate('/daily-tasks')}
          >
            View All →
          </button>
        </div>

        {todaysTasks.length === 0 ? (
          <EmptyState
            icon="✨"
            title="No tasks yet"
            message="Add a task to get started on your goals!"
          />
        ) : (
          <div className="tasks-preview">
            {todaysTasks.slice(0, 3).map((task) => (
              <GradientCard key={task.id} className="task-preview-card">
                <div className="task-preview-header">
                  <h4>{task.title}</h4>
                  <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
                    {task.priority}
                  </span>
                </div>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
                <div className="task-status">
                  <span className={`status-indicator status-${task.status}`}>
                    {task.status}
                  </span>
                </div>
              </GradientCard>
            ))}
            {todaysTasks.length > 3 && (
              <div className="more-tasks">
                <p>+{todaysTasks.length - 3} more tasks</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Active Skills */}
      <section className="active-skills-section">
        <div className="section-header">
          <h2>Skills in Progress</h2>
          {activeSkills.length > 0 && (
            <button
              className="view-all-btn"
              onClick={() => navigate('/skills')}
            >
              View All →
            </button>
          )}
        </div>

        {activeSkills.length === 0 ? (
          <EmptyState
            icon="🎓"
            title="No active skills"
            message="Start learning a new skill today!"
          />
        ) : (
          <div className="skills-preview">
            {activeSkills.slice(0, 3).map((skill) => (
              <GradientCard key={skill.id} className="skill-preview-card">
                <div className="skill-name">⭐ {skill.name}</div>
              </GradientCard>
            ))}
            {activeSkills.length > 3 && (
              <div className="more-skills">
                <p>+{activeSkills.length - 3} more skills</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Task Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Task</h3>
              <button
                className="modal-close"
                onClick={() => setShowTaskModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddTask} className="modal-form">
              <div className="form-group">
                <label>Task Title *</label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, title: e.target.value })
                  }
                  placeholder="Enter task title"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={taskForm.description}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, description: e.target.value })
                  }
                  placeholder="Enter task description"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Priority</label>
                <select
                  value={taskForm.priority}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, priority: e.target.value })
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <button type="submit" className="submit-btn">
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Skill Modal */}
      {showSkillModal && (
        <div className="modal-overlay" onClick={() => setShowSkillModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Skill</h3>
              <button
                className="modal-close"
                onClick={() => setShowSkillModal(false)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleAddSkill} className="modal-form">
              <div className="form-group">
                <label>Skill Name *</label>
                <input
                  type="text"
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="Enter skill name (e.g., React, Python, Cooking)"
                  required
                />
              </div>
              <button type="submit" className="submit-btn">
                Add Skill
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
