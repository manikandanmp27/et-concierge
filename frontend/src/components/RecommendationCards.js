import React from 'react';

const RecommendationCards = ({ recommendations }) => {
  return (
    <div className="recommendations-card glass-panel fade-in">
      <header className="section-header">
        <h2><i className="ph ph-star"></i> Recommended for You</h2>
      </header>
      <div className="recommendations-list">
        {!recommendations || recommendations.length === 0 ? (
          <div className="empty-state">
            <i className="ph ph-sparkle empty-icon"></i>
            <p>Recommendations will appear here based on our conversation</p>
          </div>
        ) : (
          recommendations.map((rec, idx) => (
            <div key={idx} className="rec-card">
              <div className="rec-title">
                {rec.title} <i className="ph ph-arrow-up-right"></i>
              </div>
              <div className="rec-reason">{rec.reason}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendationCards;
