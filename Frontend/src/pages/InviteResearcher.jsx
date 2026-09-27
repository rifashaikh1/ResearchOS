import { useState } from 'react';
import './InviteResearcher.css';

export default function InviteResearcher({ projectName, onClose, onInvite }) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Contributor');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!email.trim()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 900));
    setSent(true);
    onInvite?.(email, role);
  }

  return (
    <div className="invite-res-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="invite-res-modal">
        <div className="invite-res-header">
          <div>
            <h2 className="invite-res-title">Invite Researcher</h2>
            <p className="invite-res-sub">{projectName}</p>
          </div>
          <button onClick={onClose} className="invite-res-close-btn">×</button>
        </div>

        {sent ? (
          <div className="invite-res-success-wrap">
            <div className="invite-res-success-icon">✓</div>
            <p className="invite-res-success-title">Invitation Sent!</p>
            <p className="invite-res-success-desc">{email} has been invited as {role}</p>
            <button onClick={onClose} className="invite-res-done-btn">Done</button>
          </div>
        ) : (
          <div className="invite-res-form">
            <div>
              <label className="invite-res-label">Email Address</label>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="researcher@university.edu"
                className="invite-res-input"
              />
            </div>
            <div>
              <label className="invite-res-label">Role</label>
              <div className="invite-res-roles-grid">
                {[
                  { val: 'Project Admin', desc: 'Full access + settings' },
                  { val: 'Contributor', desc: 'Edit datasets & runs' },
                  { val: 'Reviewer', desc: 'View & comment only' },
                ].map(r => (
                  <button
                    key={r.val}
                    onClick={() => setRole(r.val)}
                    className={`invite-res-role-card ${role === r.val ? 'selected' : ''}`}
                  >
                    <div className="invite-res-role-name">{r.val}</div>
                    <div className="invite-res-role-desc">{r.desc}</div>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="invite-res-label">Personal Message <span className="invite-res-opt-tag">(optional)</span></label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={3}
                placeholder="Hey, join our research project on..."
                className="invite-res-textarea"
              />
            </div>
            <div className="invite-res-btn-row">
              <button onClick={onClose} className="invite-res-cancel-btn">
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={!email.trim() || loading}
                className="invite-res-submit-btn"
              >
                {loading ? (
                  <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                    <path d="M7 1.5A5.5 5.5 0 0 1 12.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                ) : null}
                {loading ? 'Sending…' : 'Send Invite'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
