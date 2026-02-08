import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { GradientCard, PriorityBadge, EmptyState } from '../components/UIComponents';
import { format, addDays, add } from 'date-fns';

const DailyTasksPage = () => {
  const {
    tasks,
    toggleTask,
    markTaskMissed,
    deleteTask,
    editTask,
    addTask,
  } = useContext(AppContext);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
  });

  const dateStr = format(selectedDate, 'yyyy-MM-dd');
  
  const dayTasks = useMemo(() => {
    let filtered = tasks.filter((t) => t.date === dateStr);

    if (searchTerm) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priorityFilter !== 'All') {
      filtered = filtered.filter((t) => t.priority === priorityFilter);
    }

    return filtered;
  }, [tasks, dateStr, searchTerm, priorityFilter]);

  const stats = {
    total: dayTasks.length,
    completed: dayTasks.filter((t) => t.status === 'completed').length,
    missed: dayTasks.filter((t) => t.status === 'missed').length,
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskForm.title.trim()) {
      addTask({
        ...taskForm,
        date: dateStr,
        type: 'daily',
      });
      setTaskForm({ title: '', description: '', priority: 'Medium' });
      setShowTaskModal(false);
    }
  };

  const handlePrevDate = () => {
    setSelectedDate(add(selectedDate, { days: -1 }));
  };

  const handleNextDate = () => {
    setSelectedDate(addDays(selectedDate, 1));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="daily-tasks-page">
      {/* Date Navigation */}
      <section className="date-navigation">
        <button className="nav-btn prev-btn" onClick={handlePrevDate} title="Previous day">
          ←
        </button>
        
        <div className="date-display">
          <h2>{format(selectedDate, 'EEEE')}</h2>
          <p>{format(selectedDate, 'MMMM dd, yyyy')}</p>
        </div>

        <button className="nav-btn today-btn" onClick={handleToday}>
          Today
        </button>

        <button className="nav-btn next-btn" onClick={handleNextDate} title="Next day">
          →
        </button>
      </section>

      {/* Stats */}
      <section className="day-stats">
        <GradientCard className="stat-card gradient-primary">
          <div className="stat-content">
            <span className="stat-icon">📊</span>
            <div>
              <p className="stat-label">Total Tasks</p>
              <p className="stat-big-number">{stats.total}</p>
            </div>
          </div>
        </GradientCard>

        <GradientCard className="stat-card gradient-success">
          <div className="stat-content">
            <span className="stat-icon">✅</span>
            <div>
              <p className="stat-label">Completed</p>
              <p className="stat-big-number">{stats.completed}</p>
            </div>
          </div>
        </GradientCard>

        <GradientCard className="stat-card gradient-danger">
          <div className="stat-content">
            <span className="stat-icon">❌</span>
            <div>
              <p className="stat-label">Missed</p>
              <p className="stat-big-number">{stats.missed}</p>
            </div>
          </div>
        </GradientCard>
      </section>

      {/* Filters and Search */}
      <section className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="🔍 Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          {['All', 'High', 'Medium', 'Low'].map((priority) => (
            <button
              key={priority}
              className={`filter-btn ${priorityFilter === priority ? 'active' : ''}`}
              onClick={() => setPriorityFilter(priority)}
            >
              {priority}
            </button>
          ))}
        </div>

        <button
          className="add-task-btn-main"
          onClick={() => setShowTaskModal(true)}
        >
          ➕ Add Task
        </button>
      </section>

      {/* Tasks List */}
      <section className="tasks-list-section">
        {dayTasks.length === 0 ? (
          <EmptyState
            icon="🎉"
            title={searchTerm || priorityFilter !== 'All' ? 'No matching tasks' : 'No tasks for this day'}
            message="Create a new task to get started!"
          />
        ) : (
          <div className="tasks-list">
            {dayTasks.map((task) => (
              <GradientCard key={task.id} className={`task-card task-${task.status}`}>
                <div className="task-content">
                  <div className="task-left">
                    <input
                      type="checkbox"
                      checked={task.status === 'completed'}
                      onChange={() => toggleTask(task.id)}
                      className="task-checkbox"
                    />
                    <div className="task-info">
                      <h4 className={task.status === 'completed' ? 'completed-text' : ''}>
                        {task.title}
                      </h4>
                      {task.description && (
                        <p className="task-desc">{task.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="task-right">
                    <PriorityBadge priority={task.priority} />
                    <span className={`status-badge status-${task.status}`}>
                      {task.status}
                    </span>

                    <div className="task-actions">
                      <button
                        className="action-btn miss-btn"
                        onClick={() => markTaskMissed(task.id)}
                        title="Mark as missed"
                      >
                        ✕
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => deleteTask(task.id)}
                        title="Delete task"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </GradientCard>
            ))}
          </div>
        )}
      </section>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Task for {format(selectedDate, 'MMM dd')}</h3>
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
                  autoFocus
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
    </div>
  );
};

export default DailyTasksPage;
