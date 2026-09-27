import { useState } from 'react';
import './Experiments.css';

const experiments = [
  { name: 'Transformer fine-tune v3', project: 'NLP Research Q4', dataset: 'PubMed-2024', model: 'BERT-Large', status: 'completed', accuracy: 94.2, loss: 0.082, duration: '2h 14m', gpu: 'A100', started: '2 hours ago' },
  { name: 'ResNet ablation study', project: 'Vision Models', dataset: 'ImageNet-subset', model: 'ResNet-50', status: 'running', accuracy: 87.1, loss: 0.213, duration: '1h 03m', gpu: 'V100', started: 'Running' },
  { name: 'LLM prompt comparison', project: 'NLP Research Q4', dataset: 'arXiv-CS', model: 'Llama-3-70B', status: 'completed', accuracy: 91.8, loss: 0.124, duration: '45m', gpu: 'A100', started: '1 day ago' },
  { name: 'Cross-lingual NER', project: 'MultiLingual', dataset: 'MultiNERD', model: 'XLM-R', status: 'failed', accuracy: null, loss: null, duration: '22m', gpu: 'T4', started: '2 days ago' },
  { name: 'Time-series forecast v2', project: 'Climate Analysis', dataset: 'Climate-NOAA', model: 'Temporal Fusion', status: 'completed', accuracy: 88.9, loss: 0.156, duration: '3h 42m', gpu: 'A100', started: '3 days ago' },
  { name: 'Drug interaction GNN', project: 'BioMed Research', dataset: 'DrugBank-2024', model: 'GraphSAGE', status: 'queued', accuracy: null, loss: null, duration: '—', gpu: 'A100', started: 'Queued' },
];

export default function Experiments() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? experiments : experiments.filter(e => e.status === filter);

  return (
    <div className="experiments-container">
      <div className="experiments-header">
        <div>
          <h1 className="experiments-title">Experiments</h1>
          <p className="experiments-subtitle">Track and compare your ML training runs</p>
        </div>
        <button className="experiments-new-btn">
          <svg width="14" height="14" fill="none" viewBox="0 0 14 14"><path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          New Experiment
        </button>
      </div>

      <div className="experiments-filter-tabs">
        {['all', 'running', 'completed', 'failed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`experiments-filter-btn ${filter === f ? 'active' : 'inactive'}`}
          >
            {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="experiments-table-card card-shadow">
        <div className="experiments-table-header">
          {['Experiment', 'Dataset · Model', 'Status', 'Accuracy', 'Duration', 'Started'].map(h => (
            <p key={h} className="experiments-th">{h}</p>
          ))}
        </div>
        <div className="experiments-table-body">
          {filtered.map((exp, i) => (
            <div key={i} className="experiments-row">
              <div>
                <p className="experiments-cell-name">{exp.name}</p>
                <p className="experiments-cell-project">{exp.project}</p>
              </div>
              <div>
                <p className="experiments-cell-dataset">{exp.dataset}</p>
                <p className="experiments-cell-model">{exp.model}</p>
              </div>
              <div>
                <span className={`experiments-status-pill ${exp.status}`}>
                  <span className={`experiments-status-dot ${exp.status} ${exp.status === 'running' ? 'animate-pulse' : ''}`} />
                  {exp.status.charAt(0).toUpperCase() + exp.status.slice(1)}
                </span>
              </div>
              <p className="experiments-cell-acc">
                {exp.accuracy != null ? `${exp.accuracy}%` : '—'}
              </p>
              <p className="experiments-cell-dur">{exp.duration}</p>
              <p className="experiments-cell-started">{exp.started}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
