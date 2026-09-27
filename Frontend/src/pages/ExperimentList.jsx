import { useState } from 'react';
import { EXPERIMENTS } from '../data/experiments';
import './ExperimentList.css';

function MetricCell({ val }) {
  if (val === null || val === undefined) return <span className="experiment-list-metric-empty">—</span>;
  const level = val >= 92 ? 'high' : val >= 85 ? 'med' : 'low';
  return <span className={`experiment-list-metric-val ${level}`}>{val.toFixed(1)}%</span>;
}

function ExperimentRow({ exp, onSelect, onViewDataset }) {
  return (
    <div
      onClick={onSelect}
      className="experiment-list-row"
    >
      <div style={{ minWidth: 0 }}>
        <p className="experiment-list-cell-name">{exp.name}</p>
        <p className="experiment-list-cell-sub">{exp.id} · {exp.project}</p>
      </div>
      <div style={{ minWidth: 0 }}>
        <p className="experiment-list-cell-primary">{exp.model}</p>
        <p className="experiment-list-cell-sub">{exp.modelFamily}</p>
      </div>
      <div style={{ minWidth: 0 }}>
        <button
          onClick={e => { e.stopPropagation(); onViewDataset?.(exp.datasetId); }}
          className="experiment-list-ds-btn"
        >
          {exp.datasetName}
        </button>
        <p className="experiment-list-cell-sub" style={{ fontFamily: 'monospace' }}>{exp.datasetVersion}</p>
      </div>
      <MetricCell val={exp.accuracy} />
      <MetricCell val={exp.precision} />
      <MetricCell val={exp.recall} />
      <MetricCell val={exp.f1} />
      <span className="experiment-list-cell-time">{exp.executionTime}</span>
      <span className={`experiment-list-status-badge ${exp.status}`}>
        <span className={`experiment-list-status-dot ${exp.status} ${exp.status === 'running' ? 'animate-pulse' : ''}`} />
        {exp.status}
      </span>
      <span className="experiment-list-cell-date">{exp.date.split(',')[0]}</span>
    </div>
  );
}

export default function ExperimentList({ onSelect, onNew, onViewDataset }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date');

  const filtered = EXPERIMENTS
    .filter(e => statusFilter === 'all' || e.status === statusFilter)
    .filter(e => e.name.toLowerCase().includes(search.toLowerCase()) ||
                 e.model.toLowerCase().includes(search.toLowerCase()) ||
                 e.project.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'accuracy') return (b.accuracy ?? -1) - (a.accuracy ?? -1);
      if (sortBy === 'f1') return (b.f1 ?? -1) - (a.f1 ?? -1);
      if (sortBy === 'time') return a.executionSeconds - b.executionSeconds;
      return 0;
    });

  const stats = {
    total: EXPERIMENTS.length,
    running: EXPERIMENTS.filter(e => e.status === 'running').length,
    completed: EXPERIMENTS.filter(e => e.status === 'completed').length,
    best: Math.max(...EXPERIMENTS.filter(e => e.accuracy != null).map(e => e.accuracy)),
  };

  return (
    <div className="experiment-list-container">
      {/* Header */}
      <div className="experiment-list-header">
        <div>
          <h1 className="experiment-list-title">Experiments</h1>
          <p className="experiment-list-subtitle">Track and compare ML training runs across all projects</p>
        </div>
        <button onClick={onNew} className="experiment-list-new-btn">
          <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          New Experiment
        </button>
      </div>

      {/* Summary cards */}
      <div className="experiment-list-stats-grid">
        {[
          { label: 'Total Runs', val: stats.total, sub: 'all time', accentBg: '#E6F7F5', icon: <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M7 2.5v6L4 15h10l-3-6.5V2.5" stroke="#14B8A6" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 2.5h4" stroke="#14B8A6" strokeWidth="1.35" strokeLinecap="round"/><circle cx="6.5" cy="12" r="0.9" fill="#14B8A6"/><circle cx="9.5" cy="11" r="0.7" fill="#14B8A6"/></svg> },
          { label: 'Completed', val: stats.completed, sub: 'successful', accentBg: '#DCFCE7', icon: <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><circle cx="9" cy="9" r="6.5" stroke="#16A34A" strokeWidth="1.35"/><path d="M5.5 9l2.5 2.5 4.5-4.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          { label: 'Running', val: stats.running, sub: 'in progress', accentBg: '#E6F7F5', icon: <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M3 9h3l2.5-5 3 10 2-5H15" stroke="#0F9D8A" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round"/></svg> },
          { label: 'Best Accuracy', val: `${stats.best}%`, sub: 'across all runs', accentBg: '#ECFEFF', icon: <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><path d="M3 12.5L7 8l3.5 3L14 5.5l2.5 2" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 15h12" stroke="#22D3EE" strokeWidth="1.5" strokeLinecap="round"/></svg> },
        ].map(s => (
          <div key={s.label} className="experiment-list-stat-card card-shadow">
            <div className="experiment-list-stat-icon-wrap" style={{ backgroundColor: s.accentBg }}>{s.icon}</div>
            <div>
              <p className="experiment-list-stat-val">{s.val}</p>
              <p className="experiment-list-stat-label">{s.label}</p>
              <p className="experiment-list-stat-sub">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="experiment-list-controls">
        <div className="experiment-list-search-wrap">
          <svg className="experiment-list-search-icon" width="13" height="13" fill="none" viewBox="0 0 13 13">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/><path d="M9 9L11.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search experiments..." className="experiment-list-search-input" />
        </div>
        <div className="experiment-list-filter-group">
          {['all', 'completed', 'running', 'failed', 'queued'].map(f => (
            <button key={f} onClick={() => setStatusFilter(f)} className={`experiment-list-filter-btn ${statusFilter === f ? 'active' : 'inactive'}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="experiment-list-sort-wrap">
          <span className="experiment-list-sort-label">Sort</span>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="experiment-list-sort-select">
            <option value="date">Date</option>
            <option value="accuracy">Accuracy</option>
            <option value="f1">F1 Score</option>
            <option value="time">Exec Time</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="experiment-list-table-card card-shadow">
        <div className="experiment-list-table-header">
          {['Experiment', 'Model', 'Dataset · Version', 'Accuracy', 'Precision', 'Recall', 'F1', 'Exec Time', 'Status', 'Date'].map(h => (
            <p key={h} className="experiment-list-th">{h}</p>
          ))}
        </div>
        <div className="experiment-list-table-body">
          {filtered.map(exp => <ExperimentRow key={exp.id} exp={exp} onSelect={() => onSelect(exp.id)} onViewDataset={onViewDataset} />)}
        </div>
      </div>
    </div>
  );
}
