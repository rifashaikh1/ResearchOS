export const LINEAGE_NODES = [
  // ── Data source ───────────────────────────────────────────────────────────
  {
    id: 'src-pubmed', type: 'dataset', label: 'PubMed Source', sublabel: 'NCBI FTP · XML · 1.8M docs',
    x: 60, y: 300, status: 'active', updatedAt: 'Jan 1, 2024',
    meta: { Source: 'NCBI PubMed FTP', Format: 'gzipped XML', 'Total Records': '1,800,000', License: 'Open Access' },
    kgX: 365, kgY: 40,
  },
  // ── Dataset versions ──────────────────────────────────────────────────────
  {
    id: 'ds-v1', type: 'dataset_version', label: 'PubMed-2024 V1', sublabel: 'Raw · 1.8M rows · 8 cols',
    x: 292, y: 300, status: 'archived', updatedAt: 'Jan 12, 2024',
    meta: { Version: 'V1', Rows: '1,800,000', Columns: '8', Size: '2.1 GB', Author: 'Alex Chen' },
    kgX: 150, kgY: 220,
  },
  // ── Transformation 1 ──────────────────────────────────────────────────────
  {
    id: 'tr-dedup', type: 'transformation', label: 'Deduplication', sublabel: 'MD5 hash · −40K rows removed',
    x: 524, y: 300, status: 'archived', updatedAt: 'Feb 1, 2024',
    meta: { Method: 'MD5 content hash', 'Records Removed': '40,000', Tool: 'pandas dedupe', Duration: '12 min' },
    kgX: 560, kgY: 150,
  },
  {
    id: 'ds-v2', type: 'dataset_version', label: 'PubMed-2024 V2', sublabel: 'Cleaned · 1.76M rows',
    x: 756, y: 300, status: 'archived', updatedAt: 'Feb 3, 2024',
    meta: { Version: 'V2', Rows: '1,760,000', Columns: '8', Size: '2.0 GB', Author: 'Alex Chen' },
    kgX: 680, kgY: 300,
  },
  // ── Parallel transforms ───────────────────────────────────────────────────
  {
    id: 'tr-tokenize', type: 'transformation', label: 'Tokenization', sublabel: 'BERT WordPiece · max 512 tok',
    x: 988, y: 160, status: 'archived', updatedAt: 'Mar 10, 2024',
    meta: { Tokenizer: 'BERT WordPiece', 'Max Length': '512', Vocab: '30,522', Tool: 'HuggingFace tokenizers' },
    kgX: 700, kgY: 460,
  },
  {
    id: 'tr-mesh', type: 'transformation', label: 'MeSH Annotation', sublabel: '29K MeSH terms mapped',
    x: 988, y: 480, status: 'archived', updatedAt: 'Apr 2, 2024',
    meta: { Taxonomy: 'MeSH 2024', Terms: '29,841', Tool: 'MetaMap', Coverage: '93%' },
    kgX: 560, kgY: 500,
  },
  // ── V3 + expand ───────────────────────────────────────────────────────────
  {
    id: 'ds-v3', type: 'dataset_version', label: 'PubMed-2024 V3', sublabel: 'Enriched · 2.1M rows · 12 cols',
    x: 1220, y: 300, status: 'archived', updatedAt: 'Apr 18, 2024',
    meta: { Version: 'V3', Rows: '2,100,000', Columns: '12', Size: '2.7 GB', Author: 'Sarah Kim' },
    kgX: 400, kgY: 600,
  },
  {
    id: 'tr-expand', type: 'transformation', label: 'Data Expansion', sublabel: '+300K 2024 records · backfill',
    x: 1452, y: 300, status: 'active', updatedAt: 'Sep 10, 2024',
    meta: { 'Records Added': '300,000', Period: '2024 YTD', Tool: 'PubMed E-utilities', Duration: '28 min' },
    kgX: 220, kgY: 580,
  },
  {
    id: 'ds-v4', type: 'dataset_version', label: 'PubMed-2024 V4', sublabel: 'Final · 2.4M rows · 14 cols · Active',
    x: 1684, y: 300, status: 'active', updatedAt: 'Sep 15, 2024',
    meta: { Version: 'V4', Rows: '2,400,000', Columns: '14', Size: '3.2 GB', Author: 'Alex Chen', Quality: '91 / 100' },
    kgX: 365, kgY: 400,
  },
  // ── Experiments ───────────────────────────────────────────────────────────
  {
    id: 'exp-bert-base', type: 'experiment', label: 'BERT-Base Baseline', sublabel: 'exp-007 · 1h 22m · V3',
    x: 1916, y: 80, status: 'completed', updatedAt: 'Aug 28, 2024',
    meta: { ID: 'exp-007', Model: 'BERT-Base', 'Learning Rate': '3e-5', Batch: '32', Epochs: '8', GPU: 'A100 80GB' },
    kgX: 80, kgY: 540,
  },
  {
    id: 'exp-roberta', type: 'experiment', label: 'RoBERTa-Large', sublabel: 'exp-008 · 1h 58m · V4',
    x: 1916, y: 300, status: 'completed', updatedAt: 'Sep 8, 2024',
    meta: { ID: 'exp-008', Model: 'RoBERTa-Large', 'Learning Rate': '1e-5', Batch: '32', Epochs: '8', GPU: 'A100 80GB' },
    kgX: 180, kgY: 680,
  },
  {
    id: 'exp-bert-large', type: 'experiment', label: 'BERT-Large ft v3', sublabel: 'exp-001 · 2h 14m · V4',
    x: 1916, y: 520, status: 'completed', updatedAt: 'Sep 15, 2024',
    meta: { ID: 'exp-001', Model: 'BERT-Large', 'Learning Rate': '2e-5', Batch: '32', Epochs: '10', GPU: 'A100 80GB' },
    kgX: 550, kgY: 700,
  },
  // ── Models ────────────────────────────────────────────────────────────────
  {
    id: 'model-bert-base', type: 'model', label: 'BERT-Base v1', sublabel: 'epoch-8 · 89.4% acc · 580MB',
    x: 2148, y: 80, status: 'completed', updatedAt: 'Aug 28, 2024',
    meta: { Accuracy: '89.4%', F1: '89.3%', Precision: '88.9%', Recall: '89.8%', Size: '580 MB', AUC: '0.951' },
    kgX: 80, kgY: 680,
  },
  {
    id: 'model-roberta', type: 'model', label: 'RoBERTa-Large v1', sublabel: 'epoch-8 · 92.7% acc · 1.4GB',
    x: 2148, y: 300, status: 'completed', updatedAt: 'Sep 8, 2024',
    meta: { Accuracy: '92.7%', F1: '92.6%', Precision: '92.1%', Recall: '93.2%', Size: '1.4 GB', AUC: '0.968' },
    kgX: 250, kgY: 820,
  },
  {
    id: 'model-bert-large', type: 'model', label: 'BERT-Large v3', sublabel: 'epoch-10 · 94.2% acc · 1.3GB',
    x: 2148, y: 520, status: 'active', updatedAt: 'Sep 15, 2024',
    meta: { Accuracy: '94.2%', F1: '94.2%', Precision: '93.8%', Recall: '94.6%', Size: '1.3 GB', AUC: '0.978' },
    kgX: 550, kgY: 840,
  },
  // ── Evaluations ───────────────────────────────────────────────────────────
  {
    id: 'eval-1', type: 'evaluation', label: 'Eval Run A', sublabel: 'V3 test split · 240K samples',
    x: 2380, y: 80, status: 'completed', updatedAt: 'Aug 28, 2024',
    meta: { Dataset: 'PubMed-2024 V3 test', Samples: '240,000', Split: '10%', Duration: '18 min', Hardware: 'A100 80GB' },
    kgX: 80, kgY: 820,
  },
  {
    id: 'eval-2', type: 'evaluation', label: 'Eval Run B', sublabel: 'V4 test split · 240K samples',
    x: 2380, y: 300, status: 'completed', updatedAt: 'Sep 8, 2024',
    meta: { Dataset: 'PubMed-2024 V4 test', Samples: '240,000', Split: '10%', Duration: '22 min', Hardware: 'A100 80GB' },
    kgX: 250, kgY: 960,
  },
  {
    id: 'eval-3', type: 'evaluation', label: 'Eval Run C', sublabel: 'V4 test split · 240K samples',
    x: 2380, y: 520, status: 'completed', updatedAt: 'Sep 15, 2024',
    meta: { Dataset: 'PubMed-2024 V4 test', Samples: '240,000', Split: '10%', Duration: '25 min', Hardware: 'A100 80GB' },
    kgX: 550, kgY: 980,
  },
  // ── Results ───────────────────────────────────────────────────────────────
  {
    id: 'result-1', type: 'result', label: 'Acc 89.4%  F1 89.3%', sublabel: 'BERT-Base · Rank #3',
    x: 2612, y: 80, status: 'completed', updatedAt: 'Aug 28, 2024',
    meta: { Accuracy: '89.4%', F1: '89.3%', Precision: '88.9%', Recall: '89.8%', AUC: '0.951', Rank: '#3 of 3' },
    kgX: 80, kgY: 960,
  },
  {
    id: 'result-2', type: 'result', label: 'Acc 92.7%  F1 92.6%', sublabel: 'RoBERTa-Large · Rank #2',
    x: 2612, y: 300, status: 'completed', updatedAt: 'Sep 8, 2024',
    meta: { Accuracy: '92.7%', F1: '92.6%', Precision: '92.1%', Recall: '93.2%', AUC: '0.968', Rank: '#2 of 3' },
    kgX: 250, kgY: 1080,
  },
  {
    id: 'result-3', type: 'result', label: 'Acc 94.2%  F1 94.2%', sublabel: 'BERT-Large · Best result',
    x: 2612, y: 520, status: 'best', updatedAt: 'Sep 15, 2024',
    meta: { Accuracy: '94.2%', F1: '94.2%', Precision: '93.8%', Recall: '94.6%', AUC: '0.978', Rank: '#1 — Best Run' },
    kgX: 550, kgY: 1100,
  },
];

export const LINEAGE_EDGES = [
  { id: 'e0',  source: 'src-pubmed',    target: 'ds-v1',          label: 'GENERATED' },
  { id: 'e1',  source: 'ds-v1',         target: 'tr-dedup',        label: 'USED_IN' },
  { id: 'e2',  source: 'tr-dedup',      target: 'ds-v2',           label: 'GENERATED' },
  { id: 'e3',  source: 'ds-v2',         target: 'tr-tokenize',     label: 'USED_IN' },
  { id: 'e4',  source: 'ds-v2',         target: 'tr-mesh',         label: 'USED_IN' },
  { id: 'e5',  source: 'tr-tokenize',   target: 'ds-v3',           label: 'GENERATED' },
  { id: 'e6',  source: 'tr-mesh',       target: 'ds-v3',           label: 'GENERATED' },
  { id: 'e7',  source: 'ds-v3',         target: 'tr-expand',       label: 'USED_IN' },
  { id: 'e7b', source: 'ds-v3',         target: 'exp-bert-base',   label: 'USED_IN' },
  { id: 'e8',  source: 'tr-expand',     target: 'ds-v4',           label: 'GENERATED' },
  { id: 'e9',  source: 'ds-v4',         target: 'exp-roberta',     label: 'USED_IN' },
  { id: 'e10', source: 'ds-v4',         target: 'exp-bert-large',  label: 'USED_IN' },
  { id: 'e11', source: 'exp-bert-base', target: 'model-bert-base', label: 'GENERATED' },
  { id: 'e12', source: 'exp-roberta',   target: 'model-roberta',   label: 'GENERATED' },
  { id: 'e13', source: 'exp-bert-large',target: 'model-bert-large',label: 'GENERATED' },
  { id: 'e14', source: 'model-bert-base',  target: 'eval-1',       label: 'EVALUATED_BY' },
  { id: 'e15', source: 'model-roberta',    target: 'eval-2',       label: 'EVALUATED_BY' },
  { id: 'e16', source: 'model-bert-large', target: 'eval-3',       label: 'EVALUATED_BY' },
  { id: 'e17', source: 'eval-1',        target: 'result-1',        label: 'PRODUCED' },
  { id: 'e18', source: 'eval-2',        target: 'result-2',        label: 'PRODUCED' },
  { id: 'e19', source: 'eval-3',        target: 'result-3',        label: 'PRODUCED' },
];

export const NODE_CFG = {
  dataset:         { label: 'Dataset',     accent: '#0F9D8A', accentBg: 'rgba(15,157,138,0.10)', labelColor: '#0F9D8A' },
  dataset_version: { label: 'DS Version',  accent: '#22C7D6', accentBg: 'rgba(34,199,214,0.10)', labelColor: '#22C7D6' },
  transformation:  { label: 'Transform',   accent: '#6366F1', accentBg: 'rgba(99,102,241,0.10)', labelColor: '#6366F1' },
  experiment:      { label: 'Experiment',  accent: '#8B5CF6', accentBg: 'rgba(139,92,246,0.10)', labelColor: '#8B5CF6' },
  model:           { label: 'Model',       accent: '#F59E0B', accentBg: 'rgba(245,158,11,0.10)', labelColor: '#F59E0B' },
  evaluation:      { label: 'Evaluation',  accent: '#3B82F6', accentBg: 'rgba(59,130,246,0.10)', labelColor: '#3B82F6' },
  result:          { label: 'Result',      accent: '#10B981', accentBg: 'rgba(16,185,129,0.10)', labelColor: '#10B981' },
};

export const EDGE_CFG = {
  USED_IN:      { color: '#94A3B8' },
  GENERATED:    { color: '#0F9D8A' },
  EVALUATED_BY: { color: '#6366F1', dash: '5,3' },
  PRODUCED:     { color: '#10B981' },
  DERIVED_FROM: { color: '#F59E0B', dash: '4,4' },
};
