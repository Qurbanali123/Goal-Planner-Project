import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { GradientCard, ProgressRing } from '../components/UIComponents';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { format, subDays, eachDayOfInterval, subMonths, eachMonthOfInterval, startOfYear, endOfYear } from 'date-fns';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler
);

const AnalyticsPage = () => {
  const { tasks, getTaskStats } = useContext(AppContext);

  const allStats = getTaskStats();

  // Daily data for last 7 days
  const lastSevenDays = useMemo(() => {
    const days = eachDayOfInterval({
      start: subDays(new Date(), 6),
      end: new Date(),
    });

    return days.map((day) => {
      const dateStr = format(day, 'yyyy-MM-dd');
      const dayTasks = tasks.filter((t) => t.date === dateStr);
      const completed = dayTasks.filter((t) => t.status === 'completed').length;
      return {
        date: format(day, 'MMM dd'),
        completed,
        total: dayTasks.length,
        missed: dayTasks.filter((t) => t.status === 'missed').length,
      };
    });
  }, [tasks]);

  // Monthly data for last 6 months
  const lastSixMonths = useMemo(() => {
    const months = eachMonthOfInterval({
      start: subMonths(new Date(), 5),
      end: new Date(),
    });

    return months.map((month) => {
      const monthStr = format(month, 'yyyy-MM');
      const monthTasks = tasks.filter((t) => t.date.startsWith(monthStr));
      const completed = monthTasks.filter((t) => t.status === 'completed').length;
      return {
        month: format(month, 'MMM'),
        completed,
        total: monthTasks.length,
        missed: monthTasks.filter((t) => t.status === 'missed').length,
      };
    });
  }, [tasks]);

  // Yearly data for all years
  const yearlyData = useMemo(() => {
    const years = new Set(tasks.map((t) => t.date.split('-')[0]));
    return Array.from(years).map((year) => {
      const yearTasks = tasks.filter((t) => t.date.startsWith(year));
      const completed = yearTasks.filter((t) => t.status === 'completed').length;
      return {
        year,
        completed,
        total: yearTasks.length,
        missed: yearTasks.filter((t) => t.status === 'missed').length,
      };
    });
  }, [tasks]);

  // Status distribution
  const statusDistribution = useMemo(() => {
    return {
      completed: tasks.filter((t) => t.status === 'completed').length,
      missed: tasks.filter((t) => t.status === 'missed').length,
      pending: tasks.filter((t) => t.status === 'pending').length,
    };
  }, [tasks]);

  // Priority distribution
  const priorityDistribution = useMemo(() => {
    return {
      High: tasks.filter((t) => t.priority === 'High').length,
      Medium: tasks.filter((t) => t.priority === 'Medium').length,
      Low: tasks.filter((t) => t.priority === 'Low').length,
    };
  }, [tasks]);

  // Chart configurations
  const dailyChartData = {
    labels: lastSevenDays.map((d) => d.date),
    datasets: [
      {
        label: 'Completed',
        data: lastSevenDays.map((d) => d.completed),
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        borderRadius: 4,
        fill: true,
      },
      {
        label: 'Missed',
        data: lastSevenDays.map((d) => d.missed),
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
        borderRadius: 4,
        fill: true,
      },
    ],
  };

  const monthlyChartData = {
    labels: lastSixMonths.map((m) => m.month),
    datasets: [
      {
        label: 'Completed',
        data: lastSixMonths.map((m) => m.completed),
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Missed',
        data: lastSixMonths.map((m) => m.missed),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const yearlyChartData = {
    labels: yearlyData.map((y) => y.year),
    datasets: [
      {
        label: 'Completed',
        data: yearlyData.map((y) => y.completed),
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const statusChartData = {
    labels: ['Completed', 'Missed', 'Pending'],
    datasets: [
      {
        label: 'Task Status',
        data: [
          statusDistribution.completed,
          statusDistribution.missed,
          statusDistribution.pending,
        ],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(249, 115, 22, 0.8)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const priorityChartData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [
      {
        label: 'Task Priority',
        data: [
          priorityDistribution.High,
          priorityDistribution.Medium,
          priorityDistribution.Low,
        ],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(249, 115, 22, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(249, 115, 22, 1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 12 },
          padding: 15,
          usePointStyle: true,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(200, 200, 200, 0.1)',
        },
        ticks: {
          font: { size: 11 },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 11 },
        },
      },
    },
  };

  return (
    <div className="analytics-page">
      {/* Overall Statistics */}
      <section className="overall-stats">
        <h2>Overall Statistics</h2>
        <div className="stats-grid-4">
          <GradientCard className="stat-card gradient-primary">
            <div className="stat-content">
              <span className="stat-icon">📊</span>
              <div>
                <p className="stat-label">Total Tasks</p>
                <p className="stat-big-number">{allStats.total}</p>
              </div>
            </div>
          </GradientCard>

          <GradientCard className="stat-card gradient-success">
            <div className="stat-content">
              <span className="stat-icon">✅</span>
              <div>
                <p className="stat-label">Completed</p>
                <p className="stat-big-number">{allStats.completed}</p>
              </div>
            </div>
          </GradientCard>

          <GradientCard className="stat-card gradient-danger">
            <div className="stat-content">
              <span className="stat-icon">❌</span>
              <div>
                <p className="stat-label">Missed</p>
                <p className="stat-big-number">{allStats.missed}</p>
              </div>
            </div>
          </GradientCard>

          <GradientCard className="stat-card gradient-info">
            <div className="stat-content">
              <span className="stat-icon">📈</span>
              <div>
                <p className="stat-label">Completion Rate</p>
                <p className="stat-big-number">{allStats.percentage}%</p>
              </div>
            </div>
          </GradientCard>
        </div>
      </section>

      {/* Progress Rings */}
      <section className="progress-rings-section">
        <GradientCard title="Overall Progress" className="gradient-primary">
          <div className="progress-rings-container">
            <ProgressRing percentage={allStats.percentage} label="Completion" color="#4F46E5" size={150} />
          </div>
        </GradientCard>
      </section>

      {/* Daily Progress Chart */}
      <section className="chart-section">
        <GradientCard title="Daily Progress (Last 7 Days)" className="gradient-chart">
          <div className="chart-container">
            <Bar data={dailyChartData} options={chartOptions} />
          </div>
        </GradientCard>
      </section>

      {/* Monthly Progress Chart */}
      <section className="chart-section">
        <GradientCard title="Monthly Progress (Last 6 Months)" className="gradient-chart">
          <div className="chart-container">
            <Bar data={monthlyChartData} options={chartOptions} />
          </div>
        </GradientCard>
      </section>

      {/* Yearly Progress Chart */}
      {yearlyData.length > 0 && (
        <section className="chart-section">
          <GradientCard title="Yearly Progress" className="gradient-chart">
            <div className="chart-container">
              <Bar data={yearlyChartData} options={chartOptions} />
            </div>
          </GradientCard>
        </section>
      )}

      {/* Status and Priority Distribution */}
      <section className="distribution-section">
        <GradientCard title="Task Status Distribution" className="gradient-chart">
          <div className="chart-container pie-container">
            <Pie data={statusChartData} options={{ ...chartOptions, scales: {} }} />
          </div>
        </GradientCard>

        <GradientCard title="Task Priority Distribution" className="gradient-chart">
          <div className="chart-container pie-container">
            <Pie data={priorityChartData} options={{ ...chartOptions, scales: {} }} />
          </div>
        </GradientCard>
      </section>

      {/* Detailed Stats */}
      <section className="detailed-stats">
        <GradientCard title="Detailed Breakdown" className="gradient-secondary">
          <div className="detailed-stats-table">
            <div className="stat-row">
              <span className="label">Total Tasks Created:</span>
              <span className="value">{allStats.total}</span>
            </div>
            <div className="stat-row">
              <span className="label">✅ Successfully Completed:</span>
              <span className="value completed">{allStats.completed}</span>
            </div>
            <div className="stat-row">
              <span className="label">❌ Tasks Missed:</span>
              <span className="value missed">{allStats.missed}</span>
            </div>
            <div className="stat-row">
              <span className="label">⏳ Still Pending:</span>
              <span className="value pending">{allStats.total - allStats.completed - allStats.missed}</span>
            </div>
            <div className="stat-row">
              <span className="label">📊 Completion Percentage:</span>
              <span className="value">{allStats.percentage}%</span>
            </div>
          </div>
        </GradientCard>
      </section>
    </div>
  );
};

export default AnalyticsPage;
