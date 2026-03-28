import React from 'react';

const ActionList = ({ actions }) => {
  if (!actions || actions.length === 0) return null;

  return (
    <div className="action-card fade-in">
      <h3><i className="ph ph-lightning"></i> Suggested Actions</h3>
      <ul style={{ paddingLeft: '20px', color: 'var(--text-secondary)' }}>
        {actions.map((action, idx) => (
          <li key={idx} style={{ marginBottom: '12px', fontSize: '0.95rem' }}>{action}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActionList;
