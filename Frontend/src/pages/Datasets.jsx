import { useState } from 'react';
import './Datasets.css';

const datasets = [
  { name: 'PubMed-2024', desc: 'Biomedical abstracts and full-text articles', type: 'NLP', versions: 4, size: '3.2 GB', rows: '2.4M', updated: '2 hours ago', status: 'active', tags: ['biomedical', 'text'] },
  { name: 'ImageNet-subset', desc: '100-class subset of ImageNet for rapid prototyping', type: 'Vision', versions: 2, size: '12.7 GB', rows: '130K', updated: '1 day ago', status: 'active', tags: ['images', 'classification'] },
  { name: 'Climate-NOAA', desc: 'Historical climate measurements from NOAA stations', type: 'Tabular', versions: 6, size: '8.1 GB', rows: '18.2M', updated: '3 days ago', status: 'active', tags: ['climate', 'time-series'] },
  { name: 'arXiv-CS', desc: 'Computer science papers from arXiv 2010–2024', type: 'NLP', versions: 3, size: '1.9 GB', rows: '890K', updated: '5 days ago', status: 'active', tags: ['papers', 'NLP'] },
  { name: 'MultiNERD', desc: 'Multilingual named entity recognition corpus', type: 'NLP', versions: 1, size: '640 MB', rows: '370K', updated: '1 week ago', status: 'archived', tags: ['NER', 'multilingual'] },
  { name: 'DrugBank-2024', desc: 'Pharmaceutical compounds and interaction data', type: 'Tabular', versions: 2, size: '450 MB', rows: '14K', updated: '2 weeks ago', status: 'active', tags: ['biomedical', 'chemistry'] },
];

export default function Datasets() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? datasets : datasets.filter(d => d.type === filter);

  return (
    <div className="datasets-container">
      <div className="datasets-header">
        <div>
          <h1 className="datasets-title">Datasets</h1>
          <p className="datasets-subtitle">Manage your data sources and version history</p>
        </div>
        <button className="datasets-upload-btn">
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Upload Dataset
        </button>
      </div>

      {/* Filter tabs */}
      <div className="datasets-filter-tabs">
        {['all', 'NLP', 'Vision', 'Tabular'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`datasets-filter-tab ${filter === f ? 'active' : ''}`}
          >
            {f === 'all' ? 'All Types' : f}
          </button>
        ))}
      </div>

      <div className="datasets-grid">
        {filtered.map((ds, i) => (
          <div key={i} className="datasets-card">
            <div className="datasets-card-top">
              <div className="datasets-card-icon-wrap">
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18"><ellipse cx="9" cy="5" rx="6" ry="2.25" stroke="#0F9D8A" strokeWidth="1.5"/><path d="M3 5v5c0 1.24 2.69 2.25 6 2.25S15 11.24 15 10V5" stroke="#0F9D8A" strokeWidth="1.5"/><path d="M3 10v3c0 1.24 2.69 2.25 6 2.25S15 14.24 15 13v-3" stroke="#0F9D8A" strokeWidth="1.5"/></svg>
              </div>
              <div className="datasets-badges-wrap">
                <span className={`datasets-type-badge ${ds.type}`}>{ds.type}</span>
                {ds.status === 'archived' && <span className="datasets-archived-badge">Archived</span>}
              </div>
            </div>
            <h3 className="datasets-card-title">{ds.name}</h3>
            <p className="datasets-card-desc">{ds.desc}</p>
            <div className="datasets-stats-grid">
              <div className="datasets-stat-box">
                <p className="datasets-stat-label">Versions</p>
                <p className="datasets-stat-val">{ds.versions}</p>
              </div>
              <div className="datasets-stat-box">
                <p className="datasets-stat-label">Size</p>
                <p className="datasets-stat-val">{ds.size}</p>
              </div>
              <div className="datasets-stat-box">
                <p className="datasets-stat-label">Rows</p>
                <p className="datasets-stat-val">{ds.rows}</p>
              </div>
            </div>
            <div className="datasets-card-footer">
              <div className="datasets-tags-wrap">
                {ds.tags.map(tag => (
                  <span key={tag} className="datasets-tag-pill">{tag}</span>
                ))}
              </div>
              <span className="datasets-time-text">{ds.updated}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
