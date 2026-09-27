const RIFA = {
  id: 'rifa', name: 'Rifa Hassan', initials: 'RH', role: 'Contributor',
  email: 'r.hassan@mit.edu', affiliation: 'MIT CSAIL', joinedAt: 'Jan 10, 2024',
  avatarColor: '#8B5CF6', contributions: 14, lastActive: '2 hours ago',
};
const AMAN = {
  id: 'aman', name: 'Aman Verma', initials: 'AV', role: 'Contributor',
  email: 'a.verma@stanford.edu', affiliation: 'Stanford NLP', joinedAt: 'Jan 12, 2024',
  avatarColor: '#0F9D8A', contributions: 22, lastActive: '1 hour ago',
};
const SARA = {
  id: 'sara', name: 'Sara Okonkwo', initials: 'SO', role: 'Contributor',
  email: 's.okonkwo@cambridge.ac.uk', affiliation: 'Cambridge AI', joinedAt: 'Feb 1, 2024',
  avatarColor: '#F59E0B', contributions: 18, lastActive: '30 min ago',
};
const PROF = {
  id: 'prof', name: 'Prof. David Lin', initials: 'DL', role: 'Reviewer',
  email: 'd.lin@mit.edu', affiliation: 'MIT CSAIL (PI)', joinedAt: 'Jan 5, 2024',
  avatarColor: '#3B82F6', contributions: 9, lastActive: '3 hours ago',
};
const ALEX = {
  id: 'alex', name: 'Alex Chen', initials: 'AC', role: 'Project Admin',
  email: 'a.chen@mit.edu', affiliation: 'MIT CSAIL', joinedAt: 'Jan 1, 2024',
  avatarColor: '#22C7D6', contributions: 31, lastActive: 'Just now',
};
const MARCUS = {
  id: 'marcus', name: 'Marcus Lee', initials: 'ML', role: 'Contributor',
  email: 'm.lee@caltech.edu', affiliation: 'Caltech Vision Lab', joinedAt: 'Mar 5, 2024',
  avatarColor: '#EF4444', contributions: 11, lastActive: '1 day ago',
};
const PRIYA = {
  id: 'priya', name: 'Priya Nair', initials: 'PN', role: 'Contributor',
  email: 'p.nair@iit.ac.in', affiliation: 'IIT Bombay', joinedAt: 'Feb 14, 2024',
  avatarColor: '#EC4899', contributions: 16, lastActive: '4 hours ago',
};
const SARAH = {
  id: 'sarah', name: 'Sarah Kim', initials: 'SK', role: 'Contributor',
  email: 's.kim@kaist.ac.kr', affiliation: 'KAIST AI', joinedAt: 'Mar 20, 2024',
  avatarColor: '#10B981', contributions: 8, lastActive: '2 days ago',
};

export const CONTRIBUTORS_MAP = {
  rifa: RIFA, aman: AMAN, sara: SARA, prof: PROF,
  alex: ALEX, marcus: MARCUS, priya: PRIYA, sarah: SARAH,
};

export const PROJECTS = [
  {
    id: 'nlp-q4',
    name: 'NLP Research Q4',
    description: 'Biomedical text classification using transformer models on PubMed corpus. Goal: >94% F1 on clinical entity recognition by Q4 2024.',
    projectId: 'PRJ-0042',
    admin: 'Alex Chen',
    adminId: 'alex',
    status: 'active',
    visibility: 'team',
    tags: ['NLP', 'biomedical', 'transformers', 'classification'],
    createdAt: 'Jan 1, 2024',
    lastActivity: '30 minutes ago',
    contributors: [ALEX, RIFA, AMAN, SARA, PROF],
    activity: [
      { id: 'a1', contributorId: 'sara', action: 'completed', resource: 'Experiment #5 (BERT-Large ft v3)', resourceType: 'experiment', resourceId: 'exp-001', detail: '94.2% accuracy — new best', timestamp: 'Sep 15, 2024 · 14:32', timeAgo: '30 min ago' },
      { id: 'a2', contributorId: 'prof', action: 'reviewed', resource: 'Experiment #5 results', resourceType: 'review', detail: 'Approved for publication', timestamp: 'Sep 15, 2024 · 14:15', timeAgo: '45 min ago' },
      { id: 'a3', contributorId: 'alex', action: 'uploaded', resource: 'PubMed-2024 V4', resourceType: 'dataset', resourceId: 'pubmed-2024', timestamp: 'Sep 15, 2024 · 11:08', timeAgo: '4 hours ago' },
      { id: 'a4', contributorId: 'aman', action: 'created', resource: 'PubMed-2024 V2 (Cleaned)', resourceType: 'dataset', resourceId: 'pubmed-2024', detail: 'Deduplication + encoding fixes', timestamp: 'Sep 14, 2024 · 09:21', timeAgo: '1 day ago' },
      { id: 'a5', contributorId: 'sara', action: 'started', resource: 'Experiment #4 (RoBERTa-Large)', resourceType: 'experiment', resourceId: 'exp-008', timestamp: 'Sep 13, 2024 · 16:44', timeAgo: '2 days ago' },
      { id: 'a6', contributorId: 'rifa', action: 'uploaded', resource: 'PubMed-2024 V1', resourceType: 'dataset', resourceId: 'pubmed-2024', detail: 'Initial raw corpus upload', timestamp: 'Jan 12, 2024 · 10:00', timeAgo: 'Jan 12' },
      { id: 'a7', contributorId: 'aman', action: 'created', resource: 'Tokenization Transform', resourceType: 'pipeline', detail: 'BERT WordPiece tokenizer', timestamp: 'Mar 10, 2024 · 14:00', timeAgo: 'Mar 10' },
      { id: 'a8', contributorId: 'prof', action: 'commented', resource: 'BERT-Base baseline results', resourceType: 'review', detail: '"Good baseline. Try larger model."', timestamp: 'Aug 29, 2024 · 09:12', timeAgo: 'Aug 29' },
      { id: 'a9', contributorId: 'alex', action: 'invited', resource: 'Sara Okonkwo', resourceType: 'member', timestamp: 'Feb 1, 2024 · 15:30', timeAgo: 'Feb 1' },
      { id: 'a10', contributorId: 'sara', action: 'completed', resource: 'Experiment #3 (BERT-Base Baseline)', resourceType: 'experiment', resourceId: 'exp-007', detail: '89.4% accuracy', timestamp: 'Aug 28, 2024 · 17:05', timeAgo: 'Aug 28' },
    ],
    datasets: [
      { id: 'pubmed-v1', name: 'PubMed-2024', version: 'V1', createdBy: 'rifa', modifiedBy: 'rifa', modifiedAt: 'Jan 12', size: '2.1 GB', rows: 1800000, type: 'NLP' },
      { id: 'pubmed-v2', name: 'PubMed-2024', version: 'V2', createdBy: 'aman', modifiedBy: 'aman', modifiedAt: 'Feb 3', size: '2.0 GB', rows: 1760000, type: 'NLP' },
      { id: 'pubmed-v3', name: 'PubMed-2024', version: 'V3', createdBy: 'aman', modifiedBy: 'sara', modifiedAt: 'Apr 18', size: '2.7 GB', rows: 2100000, type: 'NLP' },
      { id: 'pubmed-v4', name: 'PubMed-2024', version: 'V4', createdBy: 'alex', modifiedBy: 'alex', modifiedAt: '2h ago', size: '3.2 GB', rows: 2400000, type: 'NLP' },
    ],
    experiments: [
      { id: 'exp-007', name: 'BERT-Base Baseline', model: 'BERT-Base', status: 'completed', accuracy: 89.4, createdBy: 'sara', date: 'Aug 28' },
      { id: 'exp-008', name: 'RoBERTa-Large run', model: 'RoBERTa-Large', status: 'completed', accuracy: 92.7, createdBy: 'sara', date: 'Sep 8' },
      { id: 'exp-001', name: 'BERT-Large ft v3', model: 'BERT-Large', status: 'completed', accuracy: 94.2, createdBy: 'sara', date: 'Sep 15' },
    ],
    documents: [
      { id: 'doc-1', title: 'Research Protocol v2', type: 'protocol', createdBy: 'alex', updatedAt: 'Sep 10', size: '84 KB', snippet: 'Defines the experimental setup, model selection criteria, and evaluation protocol for Q4 NLP research.' },
      { id: 'doc-2', title: 'BERT-Large Results Report', type: 'report', createdBy: 'sara', updatedAt: 'Sep 15', size: '210 KB', snippet: 'Detailed analysis of BERT-Large fine-tuning results. Best accuracy 94.2% on PubMed test split.' },
      { id: 'doc-3', title: 'Meeting Notes — Sep 12', type: 'notes', createdBy: 'prof', updatedAt: 'Sep 12', size: '18 KB', snippet: 'Discussed warm-up strategy and data augmentation. Prof Lin suggested early stopping at epoch 8.' },
      { id: 'doc-4', title: 'NLP Q4 Draft Paper', type: 'paper', createdBy: 'aman', updatedAt: 'Sep 14', size: '540 KB', snippet: 'Working draft of the IEEE submission. Sections 1–4 complete. Conclusion pending experiment results.' },
    ],
    pipelines: [
      { id: 'pipe-1', name: 'PubMed Preprocessing', steps: 4, lastRun: '2h ago', status: 'active', createdBy: 'aman' },
      { id: 'pipe-2', name: 'Fine-tune Training', steps: 6, lastRun: 'Sep 15', status: 'active', createdBy: 'sara' },
      { id: 'pipe-3', name: 'Evaluation Pipeline', steps: 3, lastRun: 'Sep 15', status: 'active', createdBy: 'alex' },
    ],
    lineageNodes: [
      { id: 'l-ds-v1', label: 'PubMed V1', type: 'dataset', contributorId: 'rifa', x: 280, y: 50, status: 'archived' },
      { id: 'l-clean', label: 'Cleaning', type: 'transformation', contributorId: 'aman', x: 280, y: 160, status: 'archived' },
      { id: 'l-ds-v2', label: 'PubMed V2', type: 'dataset', contributorId: 'aman', x: 280, y: 270, status: 'archived' },
      { id: 'l-feat', label: 'Feature Engineering', type: 'transformation', contributorId: 'aman', x: 280, y: 380, status: 'archived' },
      { id: 'l-ds-v3', label: 'PubMed V3', type: 'dataset', contributorId: 'sara', x: 280, y: 490, status: 'archived' },
      { id: 'l-exp5', label: 'Experiment #5', type: 'experiment', contributorId: 'sara', x: 280, y: 600, status: 'completed' },
      { id: 'l-review', label: 'Prof. Review', type: 'transformation', contributorId: 'prof', x: 280, y: 710, status: 'completed' },
      { id: 'l-result', label: '94.2% Result', type: 'result', contributorId: 'sara', x: 280, y: 820, status: 'active' },
    ],
  },
  {
    id: 'vision-models',
    name: 'Vision Models Research',
    description: 'Computer vision ablation studies using CNN architectures on curated ImageNet subsets.',
    projectId: 'PRJ-0039',
    admin: 'Marcus Lee',
    adminId: 'marcus',
    status: 'active',
    visibility: 'team',
    tags: ['vision', 'CNN', 'classification', 'ImageNet'],
    createdAt: 'Mar 1, 2024',
    lastActivity: '1 day ago',
    contributors: [MARCUS, ALEX, SARAH],
    activity: [
      { id: 'b1', contributorId: 'marcus', action: 'started', resource: 'ResNet ablation study', resourceType: 'experiment', timestamp: 'Sep 17, 2024 · 08:00', timeAgo: '1 day ago' },
      { id: 'b2', contributorId: 'sarah', action: 'uploaded', resource: 'ImageNet-subset V2', resourceType: 'dataset', timestamp: 'Jul 20, 2024', timeAgo: 'Jul 20' },
      { id: 'b3', contributorId: 'marcus', action: 'created', resource: 'ImageNet-subset V1', resourceType: 'dataset', timestamp: 'Mar 1, 2024', timeAgo: 'Mar 1' },
    ],
    datasets: [
      { id: 'img-v1', name: 'ImageNet-subset', version: 'V1', createdBy: 'marcus', modifiedBy: 'marcus', modifiedAt: 'Mar 1', size: '12.1 GB', rows: 128000, type: 'Vision' },
      { id: 'img-v2', name: 'ImageNet-subset', version: 'V2', createdBy: 'sarah', modifiedBy: 'marcus', modifiedAt: '1 day ago', size: '12.7 GB', rows: 130000, type: 'Vision' },
    ],
    experiments: [
      { id: 'exp-002', name: 'ResNet ablation study', model: 'ResNet-50', status: 'running', accuracy: 87.1, createdBy: 'marcus', date: 'Sep 17' },
    ],
    documents: [
      { id: 'doc-5', title: 'Vision Lab Setup Notes', type: 'notes', createdBy: 'marcus', updatedAt: 'Mar 5', size: '22 KB', snippet: 'GPU cluster setup, data pipeline configuration, and ImageNet preprocessing guidelines.' },
    ],
    pipelines: [
      { id: 'pipe-4', name: 'Image Augmentation', steps: 3, lastRun: '1 day ago', status: 'active', createdBy: 'marcus' },
    ],
    lineageNodes: [
      { id: 'v-ds-v1', label: 'ImageNet V1', type: 'dataset', contributorId: 'marcus', x: 280, y: 50, status: 'archived' },
      { id: 'v-clean', label: 'Class Balancing', type: 'transformation', contributorId: 'sarah', x: 280, y: 160, status: 'completed' },
      { id: 'v-ds-v2', label: 'ImageNet V2', type: 'dataset', contributorId: 'sarah', x: 280, y: 270, status: 'active' },
      { id: 'v-exp', label: 'ResNet Ablation', type: 'experiment', contributorId: 'marcus', x: 280, y: 380, status: 'completed' },
      { id: 'v-result', label: '87.1% Acc', type: 'result', contributorId: 'marcus', x: 280, y: 490, status: 'active' },
    ],
  },
  {
    id: 'climate-analysis',
    name: 'Climate Analysis',
    description: 'Time-series forecasting of global climate patterns using NOAA station data and temporal transformers.',
    projectId: 'PRJ-0031',
    admin: 'Priya Nair',
    adminId: 'priya',
    status: 'active',
    visibility: 'public',
    tags: ['climate', 'time-series', 'forecasting'],
    createdAt: 'Nov 5, 2023',
    lastActivity: '3 days ago',
    contributors: [PRIYA, ALEX],
    activity: [
      { id: 'c1', contributorId: 'priya', action: 'completed', resource: 'Time-series forecast v2', resourceType: 'experiment', timestamp: 'Sep 12, 2024', timeAgo: '3 days ago' },
      { id: 'c2', contributorId: 'alex', action: 'modified', resource: 'Climate-NOAA V4', resourceType: 'dataset', timestamp: 'Aug 31, 2024', timeAgo: 'Aug 31' },
    ],
    datasets: [
      { id: 'clim-v4', name: 'Climate-NOAA', version: 'V4', createdBy: 'priya', modifiedBy: 'alex', modifiedAt: '3 days ago', size: '8.1 GB', rows: 18200000, type: 'Tabular' },
    ],
    experiments: [
      { id: 'exp-005', name: 'Time-series forecast v2', model: 'TFT', status: 'completed', accuracy: 88.9, createdBy: 'priya', date: 'Sep 12' },
    ],
    documents: [],
    pipelines: [
      { id: 'pipe-5', name: 'NOAA Data Pipeline', steps: 5, lastRun: '3 days ago', status: 'active', createdBy: 'priya' },
    ],
    lineageNodes: [
      { id: 'c-ds', label: 'Climate-NOAA V4', type: 'dataset', contributorId: 'priya', x: 280, y: 50, status: 'active' },
      { id: 'c-exp', label: 'Forecast Exp v2', type: 'experiment', contributorId: 'priya', x: 280, y: 160, status: 'completed' },
      { id: 'c-result', label: '88.9% Acc', type: 'result', contributorId: 'priya', x: 280, y: 270, status: 'active' },
    ],
  },
];

export const LINEAGE_EDGE_IDS = {
  'nlp-q4': [
    ['l-ds-v1', 'l-clean'], ['l-clean', 'l-ds-v2'], ['l-ds-v2', 'l-feat'],
    ['l-feat', 'l-ds-v3'], ['l-ds-v3', 'l-exp5'], ['l-exp5', 'l-review'],
    ['l-review', 'l-result'],
  ],
  'vision-models': [
    ['v-ds-v1', 'v-clean'], ['v-clean', 'v-ds-v2'], ['v-ds-v2', 'v-exp'], ['v-exp', 'v-result'],
  ],
  'climate-analysis': [
    ['c-ds', 'c-exp'], ['c-exp', 'c-result'],
  ],
};
