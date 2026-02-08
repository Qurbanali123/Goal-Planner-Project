import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { GradientCard, EmptyState } from '../components/UIComponents';

const SkillsPage = () => {
  const {
    skills,
    addSkill,
    toggleSkill,
    markSkillMissed,
    deleteSkill,
    reorderSkill,
  } = useContext(AppContext);

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [skillName, setSkillName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || skill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: skills.length,
    active: skills.filter((s) => s.status === 'active').length,
    completed: skills.filter((s) => s.status === 'completed').length,
    missed: skills.filter((s) => s.status === 'missed').length,
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
    <div className="skills-page">
      {/* Stats */}
      <section className="skills-stats">
        <GradientCard className="stat-card gradient-primary">
          <div className="stat-content">
            <span className="stat-icon">📚</span>
            <div>
              <p className="stat-label">Total Skills</p>
              <p className="stat-big-number">{stats.total}</p>
            </div>
          </div>
        </GradientCard>

        <GradientCard className="stat-card gradient-info">
          <div className="stat-content">
            <span className="stat-icon">🚀</span>
            <div>
              <p className="stat-label">Active</p>
              <p className="stat-big-number">{stats.active}</p>
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
            placeholder="🔍 Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-buttons">
          {['All', 'active', 'completed', 'missed'].map((status) => (
            <button
              key={status}
              className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
              onClick={() => setStatusFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <button
          className="add-task-btn-main"
          onClick={() => setShowSkillModal(true)}
        >
          ⭐ Add Skill
        </button>
      </section>

      {/* Skills List */}
      <section className="skills-list-section">
        {filteredSkills.length === 0 ? (
          <EmptyState
            icon="🎓"
            title={searchTerm || statusFilter !== 'All' ? 'No matching skills' : 'No skills yet'}
            message="Add a new skill to start learning!"
          />
        ) : (
          <div className="skills-grid">
            {filteredSkills.map((skill, index) => (
              <GradientCard key={skill.id} className={`skill-card skill-${skill.status}`}>
                <div className="skill-card-content">
                  <div className="skill-header">
                    <h3 className="skill-name">{skill.name}</h3>
                    <span className={`skill-status status-${skill.status}`}>
                      {skill.status}
                    </span>
                  </div>

                  <div className="skill-actions-row">
                    <div className="skill-checkboxes">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={skill.status === 'completed'}
                          onChange={() => toggleSkill(skill.id)}
                          className="skill-checkbox"
                        />
                        <span className="checkbox-text">Completed</span>
                      </label>
                      <button
                        className="action-btn-small miss-btn"
                        onClick={() => markSkillMissed(skill.id)}
                        title="Mark as missed"
                      >
                        ✕ Miss
                      </button>
                    </div>
                  </div>

                  <div className="skill-priority-controls">
                    <button
                      className="priority-btn"
                      onClick={() => reorderSkill(skill.id, 'up')}
                      title="Move up (prioritize)"
                      disabled={index === 0}
                    >
                      ⬆️ Up
                    </button>
                    <button
                      className="priority-btn"
                      onClick={() => reorderSkill(skill.id, 'down')}
                      title="Move down"
                      disabled={index === filteredSkills.length - 1}
                    >
                      Down ⬇️
                    </button>
                    <button
                      className="delete-btn-skill"
                      onClick={() => deleteSkill(skill.id)}
                      title="Delete skill"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </GradientCard>
            ))}
          </div>
        )}
      </section>

      {/* Add Skill Modal */}
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
                  placeholder="e.g., React, Python, Guitar, Cooking"
                  required
                  autoFocus
                />
              </div>
              <p className="form-hint">
                💡 Tip: You can prioritize your skills by moving them up or down in the list.
              </p>
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

export default SkillsPage;
