import { useState, useRef, useEffect } from 'react';
import './Copilot.css';

const SUGGESTIONS = [
  'Which dataset version gave the highest accuracy?',
  'What changed between Dataset V2 and V3?',
  'Which experiments used learning rate 0.01?',
  'Why did accuracy drop?',
  'Which preprocessing steps were used?',
];

const INITIAL = [
  {
    role: 'assistant',
    content: "Hi Alex! I'm your Research Copilot. I have full context of your datasets, experiments, and research lineage. Ask me anything about your workspace.\n\nYou have **6 datasets**, **8 experiments**, and your best result is **94.2% accuracy** (BERT-Large on PubMed-2024 V4).",
    time: 'Just now',
  },
];

function parseMarkdown(text) {
  return text.split('\n').map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} style={i > 0 ? { marginTop: '6px' } : { margin: 0 }}>
        {parts.map((p, j) =>
          p.startsWith('**') && p.endsWith('**')
            ? <strong key={j} style={{ fontWeight: 600, color: '#0B1220' }}>{p.slice(2, -2)}</strong>
            : p
        )}
      </p>
    );
  });
}

function CardBlock({ card }) {
  const colors = {
    dataset:    { bg: '#E6F7F5', border: '#0F9D8A', label: 'Dataset',    icon: '📦' },
    experiment: { bg: '#EDE9FE', border: '#7C3AED', label: 'Experiment', icon: '🧪' },
    lineage:    { bg: '#DBEAFE', border: '#3B82F6', label: 'Lineage',    icon: '🔗' },
    insight:    { bg: '#FEF3C7', border: '#D97706', label: 'Insight',    icon: '💡' },
  };
  const c = colors[card.type] || colors.dataset;
  return (
    <div className="copilot-card-block" style={{ borderColor: c.border }}>
      <div className="copilot-card-hdr" style={{ backgroundColor: c.bg, color: c.border }}>
        <span>{c.icon}</span>{c.label}: {card.title}
      </div>
      <div className="copilot-card-grid">
        {card.items.map((it, i) => (
          <div key={i} className="copilot-card-item">
            <span className="copilot-card-lbl">{it.label}:</span>
            <span className="copilot-card-val">{it.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Copilot() {
  const [messages, setMessages] = useState(INITIAL);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function send(text) {
    if (!text.trim() || typing) return;
    setMessages(prev => [...prev, { role: 'user', content: text, time: 'Just now' }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: 'assistant', time: 'Just now', ...getReply(text) }]);
    }, 1200 + Math.random() * 400);
  }

  const showSuggestions = messages.length <= 1;

  return (
    <div className="copilot-container">
      {/* Header */}
      <div className="copilot-header">
        <div className="copilot-header-inner">
          <div className="copilot-avatar-icon">
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path d="M9 2C5.69 2 3 4.69 3 8c0 2.8 1.8 5.18 4.33 6.02L9 15.5l1.67-1.48A6 6 0 0015 8c0-3.31-2.69-6-6-6z" fill="white" fillOpacity="0.9"/>
              <path d="M7 8.5h4M9 6.5v4" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="copilot-title-info">
            <h1 className="copilot-title">Research Copilot</h1>
            <p className="copilot-subtitle">AI-powered assistant with full workspace context</p>
          </div>
          <div className="copilot-stats-right">
            <span className="copilot-stats-text">6 datasets · 8 experiments · 1 project</span>
            <div className="copilot-context-badge">
              <div className="copilot-context-dot animate-pulse" />
              Context loaded
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="copilot-messages-area">
        <div className="copilot-messages-inner">
          {messages.map((msg, i) => (
            <div key={i} className={`copilot-msg-row ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="copilot-bot-avatar">
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path d="M7 1.5C4.52 1.5 2.5 3.52 2.5 6c0 2.17 1.4 4 3.33 4.67L7 11.75l1.17-1.08A4.5 4.5 0 0011.5 6c0-2.48-2.02-4.5-4.5-4.5z" fill="white"/>
                  </svg>
                </div>
              )}
              <div className={`copilot-msg-bubble-wrap ${msg.role}`}>
                <div className={`copilot-msg-bubble ${msg.role}`}>
                  {parseMarkdown(msg.content)}
                  {msg.cards?.map((card, ci) => <CardBlock key={ci} card={card} />)}
                </div>
                <p className="copilot-msg-time">{msg.time}</p>
              </div>
            </div>
          ))}

          {typing && (
            <div className="copilot-msg-row assistant">
              <div className="copilot-bot-avatar">
                <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                  <path d="M7 1.5C4.52 1.5 2.5 3.52 2.5 6c0 2.17 1.4 4 3.33 4.67L7 11.75l1.17-1.08A4.5 4.5 0 0011.5 6c0-2.48-2.02-4.5-4.5-4.5z" fill="white"/>
                </svg>
              </div>
              <div className="copilot-typing-bubble">
                <div className="copilot-typing-dots">
                  {[0, 150, 300].map(d => (
                    <div key={d} className="copilot-typing-dot animate-bounce" style={{ animationDelay: `${d}ms` }} />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Suggestions */}
      {showSuggestions && (
        <div className="copilot-suggestions-bar">
          <p className="copilot-suggestions-lbl">Try asking:</p>
          <div className="copilot-suggestions-chips">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => send(s)}
                className="copilot-suggestion-chip"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="copilot-input-bar">
        <div className="copilot-input-inner">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
            placeholder="Ask about datasets, experiments, lineage, accuracy, preprocessing..."
            className="copilot-input-field"
          />
          <button
            onClick={() => send(input)}
            disabled={!input.trim() || typing}
            className="copilot-send-btn"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M2 8L14 2L8 14L7 9L2 8Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" fill="white"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function getReply(query) {
  const q = query.toLowerCase();

  if (q.includes('highest accuracy') || (q.includes('dataset version') && q.includes('accuracy'))) {
    return {
      content: "**PubMed-2024 V4** produced the highest accuracy across all experiments — **94.2%** with BERT-Large fine-tuning (Experiment #5).\n\nHere's the accuracy by dataset version:",
      cards: [
        {
          type: 'dataset',
          title: 'PubMed-2024 Version Comparison',
          items: [
            { label: 'V1', value: '89.4% (BERT-Base, exp-007)' },
            { label: 'V2', value: '90.1% (BERT-Base, exp-002)' },
            { label: 'V3', value: '92.7% (RoBERTa-Large, exp-008)' },
            { label: 'V4 ★', value: '94.2% (BERT-Large, exp-001)' },
          ],
        },
        {
          type: 'insight',
          title: 'Key factor',
          items: [
            { label: 'Change', value: '+300K records via Data Expansion' },
            { label: 'Columns', value: '12 → 14 (+MeSH fields)' },
            { label: 'Size', value: '2.7 GB → 3.2 GB' },
            { label: 'Accuracy gain', value: '+1.5pp over V3' },
          ],
        },
      ],
    };
  }

  if ((q.includes('v2') && q.includes('v3')) || q.includes('changed between')) {
    return {
      content: "Here's what changed between **PubMed-2024 V2** and **V3**:",
      cards: [
        {
          type: 'dataset',
          title: 'V2 → V3 Diff',
          items: [
            { label: 'Rows',    value: '1.76M → 2.1M (+340K)' },
            { label: 'Columns', value: '8 → 12 (+4 cols)' },
            { label: 'Size',    value: '2.0 GB → 2.7 GB' },
            { label: 'Author',  value: 'V2: Aman · V3: Sara' },
          ],
        },
        {
          type: 'lineage',
          title: 'Transformations applied',
          items: [
            { label: 'Step 1', value: 'Tokenization (BERT WordPiece)' },
            { label: 'Step 2', value: 'MeSH Annotation (29K terms)' },
            { label: 'Tool',   value: 'HuggingFace + MetaMap' },
            { label: 'Coverage', value: '93% of abstracts' },
          ],
        },
      ],
    };
  }

  if (q.includes('learning rate') && (q.includes('0.01') || q.includes('lr'))) {
    return {
      content: "No experiments in your workspace used **learning rate 0.01** — that's higher than typical for BERT fine-tuning. Here are your experiments by learning rate:",
      cards: [
        {
          type: 'experiment',
          title: 'Experiments by Learning Rate',
          items: [
            { label: '2e-5',  value: 'BERT-Large ft v3 (94.2%)' },
            { label: '3e-5',  value: 'BERT-Base Baseline (89.4%)' },
            { label: '1e-5',  value: 'RoBERTa-Large (92.7%)' },
            { label: '5e-5',  value: 'Climate TFT (88.9%)' },
          ],
        },
        {
          type: 'insight',
          title: 'Recommendation',
          items: [
            { label: 'Best LR',  value: '2e-5 (BERT-Large)' },
            { label: 'Avoid',    value: '>5e-5 (causes instability)' },
            { label: 'Pattern',  value: 'Lower LR → higher F1 on PubMed' },
            { label: 'Tip',      value: 'Use warmup_steps=500' },
          ],
        },
      ],
    };
  }

  if (q.includes('accuracy drop') || q.includes('why did') || q.includes('dropped')) {
    return {
      content: "Based on your experiment logs, accuracy drops in your workspace correlate with three causes:\n\n**1. Dataset shift** — V1 test set had 6% duplicate abstracts, inflating baseline metrics by ~2pp.\n\n**2. Learning rate too high** — Experiments with LR > 4e-5 showed loss spikes at epoch 3–4.\n\n**3. Batch size mismatch** — Running with batch=16 vs batch=32 produces ~1.5% lower accuracy on PubMed.",
      cards: [
        {
          type: 'experiment',
          title: 'Affected Experiments',
          items: [
            { label: 'exp-002', value: 'LR spike at epoch 4 → 88.1%' },
            { label: 'exp-004', value: 'Batch=16 underfit → 86.9%' },
            { label: 'exp-007', value: 'Dedup issue → 89.4% (adjusted)' },
            { label: 'Recovery', value: 'Standardized to LR=2e-5, batch=32' },
          ],
        },
      ],
    };
  }

  if (q.includes('preprocessing') || q.includes('preprocessing steps') || q.includes('pipeline')) {
    return {
      content: "Your **PubMed-2024** pipeline includes the following preprocessing steps recorded in the lineage graph:",
      cards: [
        {
          type: 'lineage',
          title: 'Preprocessing Pipeline',
          items: [
            { label: 'Step 1', value: 'Deduplication (MD5 hash)' },
            { label: 'Step 2', value: 'BERT WordPiece Tokenization' },
            { label: 'Step 3', value: 'MeSH Annotation (MetaMap)' },
            { label: 'Step 4', value: 'Data Expansion (+300K records)' },
          ],
        },
        {
          type: 'insight',
          title: 'Impact on accuracy',
          items: [
            { label: 'Dedup',   value: '+0.8% F1 (V1→V2)' },
            { label: 'Tokenize', value: 'Required for BERT' },
            { label: 'MeSH',    value: '+1.4% recall (entity types)' },
            { label: 'Expand',  value: '+1.5% overall (V3→V4)' },
          ],
        },
      ],
    };
  }

  if (q.includes('best') && q.includes('model')) {
    return {
      content: "Your best performing model is **BERT-Large** with **94.2% accuracy** (F1: 94.2%, AUC: 0.978) on the PubMed-2024 V4 evaluation set.\n\nLeaderboard:",
      cards: [
        {
          type: 'experiment',
          title: 'Model Leaderboard',
          items: [
            { label: '#1 BERT-Large',   value: '94.2% acc · F1 94.2%' },
            { label: '#2 RoBERTa-Large', value: '92.7% acc · F1 92.6%' },
            { label: '#3 BERT-Base',    value: '89.4% acc · F1 89.3%' },
            { label: 'Running',         value: 'ResNet-50 (87.1% so far)' },
          ],
        },
      ],
    };
  }

  return {
    content: "Based on your workspace, here's a summary:\n\n**6 datasets** across NLP, Vision, and Tabular domains. **8 experiments** completed — best accuracy **94.2%** (BERT-Large on PubMed-2024 V4).\n\nWant me to analyze a specific dataset version, compare experiments, trace a lineage path, or investigate an accuracy drop?",
  };
}
