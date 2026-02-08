import { format, subDays, parseISO } from 'date-fns';

/**
 * Calculate task completion statistics
 * @param {Array} tasks - Array of task objects
 * @returns {Object} Statistics object
 */
export const calculateTaskStats = (tasks) => {
  const completed = tasks.filter((t) => t.status === 'completed').length;
  const missed = tasks.filter((t) => t.status === 'missed').length;
  const total = tasks.length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return { completed, missed, total, percentage };
};

/**
 * Calculate task streak (consecutive days with all tasks completed)
 * @param {Array} tasks - Array of task objects
 * @returns {number} Number of consecutive days
 */
export const calculateTaskStreak = (tasks) => {
  const today = new Date();
  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const dateStr = format(currentDate, 'yyyy-MM-dd');
    const dayTasks = tasks.filter((t) => t.date === dateStr);

    if (dayTasks.length === 0) break;

    const allCompleted = dayTasks.every((t) => t.status === 'completed');
    if (!allCompleted) break;

    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
  }

  return streak;
};

/**
 * Group tasks by date
 * @param {Array} tasks - Array of task objects
 * @returns {Object} Tasks grouped by date
 */
export const groupTasksByDate = (tasks) => {
  const grouped = {};
  tasks.forEach((task) => {
    if (!grouped[task.date]) {
      grouped[task.date] = [];
    }
    grouped[task.date].push(task);
  });
  return grouped;
};

/**
 * Group tasks by month
 * @param {Array} tasks - Array of task objects
 * @returns {Object} Tasks grouped by month (YYYY-MM format)
 */
export const groupTasksByMonth = (tasks) => {
  const grouped = {};
  tasks.forEach((task) => {
    const monthKey = task.date.substring(0, 7); // YYYY-MM
    if (!grouped[monthKey]) {
      grouped[monthKey] = [];
    }
    grouped[monthKey].push(task);
  });
  return grouped;
};

/**
 * Get daily task stats for the last N days
 * @param {Array} tasks - Array of task objects
 * @param {number} days - Number of days to analyze
 * @returns {Array} Array of daily stats
 */
export const getDailyStats = (tasks, days = 7) => {
  const stats = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const dateStr = format(date, 'yyyy-MM-dd');
    const dayTasks = tasks.filter((t) => t.date === dateStr);
    const completed = dayTasks.filter((t) => t.status === 'completed').length;
    const missed = dayTasks.filter((t) => t.status === 'missed').length;

    stats.push({
      date: format(date, 'MMM dd'),
      dateStr,
      completed,
      missed,
      total: dayTasks.length,
    });
  }
  return stats;
};

/**
 * Filter tasks by priority
 * @param {Array} tasks - Array of task objects
 * @param {string} priority - Priority level (High, Medium, Low)
 * @returns {Array} Filtered tasks
 */
export const filterTasksByPriority = (tasks, priority) => {
  if (priority === 'All') return tasks;
  return tasks.filter((t) => t.priority === priority);
};

/**
 * Filter tasks by search term
 * @param {Array} tasks - Array of task objects
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered tasks
 */
export const filterTasksBySearch = (tasks, searchTerm) => {
  if (!searchTerm) return tasks;
  const lowerTerm = searchTerm.toLowerCase();
  return tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(lowerTerm) ||
      (t.description && t.description.toLowerCase().includes(lowerTerm))
  );
};

/**
 * Sort tasks by priority
 * @param {Array} tasks - Array of task objects
 * @returns {Array} Sorted tasks
 */
export const sortTasksByPriority = (tasks) => {
  const priorityOrder = { High: 1, Medium: 2, Low: 3 };
  return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
};

/**
 * Get overdue tasks
 * @param {Array} tasks - Array of task objects
 * @returns {Array} Overdue tasks
 */
export const getOverdueTasks = (tasks) => {
  const today = format(new Date(), 'yyyy-MM-dd');
  return tasks.filter(
    (t) => t.date < today && t.status !== 'completed' && t.status !== 'missed'
  );
};

/**
 * Calculate completion rate for a specific date range
 * @param {Array} tasks - Array of task objects
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Object} Completion statistics
 */
export const getCompletionRateInRange = (tasks, startDate, endDate) => {
  const filtered = tasks.filter(
    (t) => t.date >= startDate && t.date <= endDate
  );
  return calculateTaskStats(filtered);
};

/**
 * Get most productive time (best completion rate by day of week)
 * @param {Array} tasks - Array of task objects
 * @returns {Object} Most productive day and stats
 */
export const getMostProductiveDay = (tasks) => {
  const dayStats = {
    Monday: { completed: 0, total: 0 },
    Tuesday: { completed: 0, total: 0 },
    Wednesday: { completed: 0, total: 0 },
    Thursday: { completed: 0, total: 0 },
    Friday: { completed: 0, total: 0 },
    Saturday: { completed: 0, total: 0 },
    Sunday: { completed: 0, total: 0 },
  };

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  tasks.forEach((task) => {
    const date = parseISO(task.date);
    const dayName = dayNames[date.getDay()];
    dayStats[dayName].total++;
    if (task.status === 'completed') {
      dayStats[dayName].completed++;
    }
  });

  let bestDay = null;
  let bestRate = 0;

  Object.entries(dayStats).forEach(([day, stats]) => {
    if (stats.total > 0) {
      const rate = stats.completed / stats.total;
      if (rate > bestRate) {
        bestRate = rate;
        bestDay = day;
      }
    }
  });

  return {
    day: bestDay,
    rate: bestRate,
    stats: dayStats[bestDay] || { completed: 0, total: 0 },
  };
};

/**
 * Get monthly progress summary
 * @param {Array} tasks - Array of task objects
 * @param {number} year - Year
 * @param {number} month - Month (1-12)
 * @returns {Object} Monthly summary
 */
export const getMonthlyProgress = (tasks, year, month) => {
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  const monthTasks = tasks.filter((t) => t.date.startsWith(monthStr));
  return calculateTaskStats(monthTasks);
};

/**
 * Get yearly progress summary
 * @param {Array} tasks - Array of task objects
 * @param {number} year - Year
 * @returns {Object} Yearly summary
 */
export const getYearlyProgress = (tasks, year) => {
  const yearTasks = tasks.filter((t) => t.date.startsWith(year.toString()));
  return calculateTaskStats(yearTasks);
};
