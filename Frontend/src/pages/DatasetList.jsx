import { useState } from 'react';
import { DATASETS } from '../data/datasets';
import './DatasetList.css';

function QualityBadge({ score }) {
  const level = score >= 90 ? 'high' : score >= 75 ? 'med' : 'low';
  return (
    <div className={`datasetlist-quality-badge ${level}`}>
      <div className="datasetlist-quality-track">
        <div className="datasetlist-quality-fill" style={{ width: `${score}%` }} />
      </div>
      <span className="datasetlist-quality-score">{score}</span>
    </div>
  );
}

function fmt(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

function DatasetIcon({ type }) {
  if (type === 'Vision') return <svg width="15" height="15" fill="none" viewBox="0 0 15 15"><rect x="1.5" y="2.5" width="12" height="10" rx="1.5" stroke="#0F9D8A" strokeWidth="1.4"/><circle cx="7.5" cy="7.5" r="2" stroke="#0F9D8A" strokeWidth="1.2"/></svg>;
  if (type === 'Graph') return <svg width="15" height="15" fill="none" viewBox="0 0 15 15"><circle cx="3" cy="7.5" r="1.5" stroke="#0F9D8A" strokeWidth="1.3"/><circle cx="7.5" cy="3" r="1.5" stroke="#0F9D8A" strokeWidth="1.3"/><circle cx="12" cy="7.5" r="1.5" stroke="#0F9D8A" strokeWidth="1.3"/><circle cx="7.5" cy="12" r="1.5" stroke="#0F9D8A" strokeWidth="1.3"/><path d="M4.5 7.5h1.5M9 7.5h1.5M7.5 4.5v1.5M7.5 9v1.5" stroke="#0F9D8A" strokeWidth="1.2"/></svg>;
  return <svg width="15" height="15" fill="none" viewBox="0 0 15 15"><ellipse cx="7.5" cy="4.5" rx="4.5" ry="1.8" stroke="#0F9D8A" strokeWidth="1.3"/><path d="M3 4.5v3c0 1 2.02 1.8 4.5 1.8S12 8.5 12 7.5v-3" stroke="#0F9D8A" strokeWidth="1.3"/><path d="M3 7.5v3c0 1 2.02 1.8 4.5 1.8S12 11.5 12 10.5v-3" stroke="#0F9D8A" strokeWidth="1.3"/></svg>;
}

function DatasetRow({ ds, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="datasetlist-table-row"
    >
      <div className="datasetlist-info-cell">
        <div className="datasetlist-icon-box">
          <DatasetIcon type={ds.type} />
        </div>
        <div className="datasetlist-name-box">
          <p className="datasetlist-name">{ds.name}</p>
          <p className="datasetlist-owner">{ds.owner}</p>
        </div>
      </div>
      <span className={`datasetlist-type-pill ${ds.type}`}>{ds.type}</span>
      <span className="datasetlist-version-cell">{ds.currentVersion}</span>
      <span className="datasetlist-num-cell">{fmt(ds.rows)}</span>
      <span className="datasetlist-num-cell">{ds.columns}</span>
      <QualityBadge score={ds.qualityScore} />
      <span className="datasetlist-time-cell">{ds.updated}</span>
      <button
        onClick={e => { e.stopPropagation(); onSelect(); }}
        className="datasetlist-open-btn"
      >
        Open
      </button>
    </div>
  );
}

export default function DatasetList({ onSelect, onUpload }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('updated');
  const [search, setSearch] = useState('');

  const filtered = DATASETS
    .filter(d => filter === 'all' || d.type === filter)
    .filter(d => d.name.toLowerCase().includes(search.toLowerCase()) || d.desc.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'quality' ? b.qualityScore - a.qualityScore : sort === 'rows' ? b.rows - a.rows : 0);

  return (
    <div className="datasetlist-container">
      {/* Header */}
      <div className="datasetlist-header">
        <div>
          <h1 className="datasetlist-title">Datasets</h1>
          <p className="datasetlist-subtitle">{DATASETS.length} datasets · {DATASETS.reduce((a, b) => a + b.versions.length, 0)} total versions</p>
        </div>
        <button
          onClick={onUpload}
          className="datasetlist-upload-btn"
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 13 13"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Upload Dataset
        </button>
      </div>

      {/* Controls */}
      <div className="datasetlist-controls">
        <div className="datasetlist-search-wrap">
          <svg className="datasetlist-search-icon" width="13" height="13" fill="none" viewBox="0 0 13 13">
            <circle cx="5.5" cy="5.5" r="4" stroke="currentColor" strokeWidth="1.3"/><path d="M9 9L11.5 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search datasets..."
            className="datasetlist-search-input"
          />
        </div>
        <div className="datasetlist-filter-group">
          {['all', 'NLP', 'Vision', 'Tabular', 'Graph'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`datasetlist-filter-btn ${filter === f ? 'active' : ''}`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
        <div className="datasetlist-sort-wrap">
          <span className="datasetlist-sort-label">Sort by</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="datasetlist-sort-select"
          >
            <option value="updated">Last Updated</option>
            <option value="quality">Quality Score</option>
            <option value="rows">Row Count</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="datasetlist-table-box">
        <div className="datasetlist-table-header">
          {['Dataset', 'Type', 'Version', 'Rows', 'Columns', 'Quality', 'Updated', ''].map((h, idx) => (
            <p key={idx} className="datasetlist-col-header">{h}</p>
          ))}
        </div>
        <div>
          {filtered.map(ds => (
            <DatasetRow key={ds.id} ds={ds} onSelect={() => onSelect(ds.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
