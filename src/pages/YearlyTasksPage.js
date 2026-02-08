import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { GradientCard, PriorityBadge, EmptyState } from '../components/UIComponents';
import { format, getYear } from 'date-fns';

const YearlyTasksPage = () => {
  const {
    tasks,
    toggleTask,
    markTaskMissed,
    deleteTask,
    addTask,
    getTasksByYear,
  } = useContext(AppContext);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [expandedMonths, setExpandedMonths] = useState({});
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    date: format(new Date(), 'yyyy-MM-dd'),
  });

  const yearTasks = useMemo(() => {
    return getTasksByYear(selectedYear);
  }, [tasks, selectedYear, getTasksByYear]);

  const tasksByMonth = useMemo(() => {
    const grouped = {};
    yearTasks.forEach((task) => {
      const month = task.date.split('-')[1];
      const monthNum = parseInt(month);
      if (!grouped[monthNum]) {
        grouped[monthNum] = [];
      }
      grouped[monthNum].push(task);
    });

    // Apply filters
    const filtered = {};
    Object.entries(grouped).forEach(([month, monthTasks]) => {
      let filteredTasks = monthTasks;

      if (searchTerm) {
        filteredTasks = filteredTasks.filter(
          (t) =>
            t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (priorityFilter !== 'All') {
        filteredTasks = filteredTasks.filter((t) => t.priority === priorityFilter);
      }

      if (filteredTasks.length > 0) {
        filtered[month] = filteredTasks;
      }
    });

    return filtered;
  }, [yearTasks, searchTerm, priorityFilter]);

  const stats = {
    total: yearTasks.length,
    completed: yearTasks.filter((t) => t.status === 'completed').length,
    missed: yearTasks.filter((t) => t.status === 'missed').length,
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskForm.title.trim()) {
      addTask({
        ...taskForm,
        type: 'yearly',
      });
      setTaskForm({
        title: '',
        description: '',
        priority: 'Medium',
        date: format(new Date(), 'yyyy-MM-dd'),
      });
      setShowTaskModal(false);
    }
  };

  const handlePrevYear = () => {
    setSelectedYear(selectedYear - 1);
  };

  const handleNextYear = () => {
    setSelectedYear(selectedYear + 1);
  };

  const toggleMonthExpanded = (month) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const sortedMonths = Object.keys(tasksByMonth).map(Number).sort((a, b) => a - b);

  return (
    <div className="yearly-tasks-page">
      {/* Year Navigation */}
      <section className="year-navigation">
        <button className="nav-btn" onClick={handlePrevYear} title="Previous year">
          ←
        </button>

        <div className="year-display">
          <h2>{selectedYear}</h2>
        </div>

        <button className="nav-btn" onClick={handleNextYear} title="Next year">
          →
        </button>
      </section>

      {/* Stats */}
      <section className="year-stats">
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

        <GradientCard className="stat-card gradient-warning">
          <div className="stat-content">
            <span className="stat-icon">⏳</span>
            <div>
              <p className="stat-label">Pending</p>
              <p className="stat-big-number">{stats.total - stats.completed - stats.missed}</p>
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

      {/* Tasks by Month */}
      <section className="tasks-by-month">
        {sortedMonths.length === 0 ? (
          <EmptyState
            icon="📭"
            title={searchTerm || priorityFilter !== 'All' ? 'No matching tasks' : 'No tasks this year'}
            message="Add a task to get started!"
          />
        ) : (
          <div className="month-groups">
            {sortedMonths.map((monthNum) => (
              <div key={monthNum} className="month-group">
                <button
                  className="month-header"
                  onClick={() => toggleMonthExpanded(monthNum)}
                >
                  <span className="month-label">{MONTHS[monthNum - 1]}</span>
                  <span className="task-count">{tasksByMonth[monthNum].length} tasks</span>
                  <span className={`expand-icon ${expandedMonths[monthNum] ? 'expanded' : ''}`}>
                    ▼
                  </span>
                </button>

                {expandedMonths[monthNum] && (
                  <div className="month-tasks">
                    {tasksByMonth[monthNum].map((task) => (
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
                              <p className="task-date">
                                {format(new Date(task.date), 'MMMM dd, yyyy')}
                              </p>
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
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="modal-overlay" onClick={() => setShowTaskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Task for {selectedYear}</h3>
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
                <label>Date</label>
                <input
                  type="date"
                  value={taskForm.date}
                  onChange={(e) =>
                    setTaskForm({ ...taskForm, date: e.target.value })
                  }
                  required
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

export default YearlyTasksPage;
