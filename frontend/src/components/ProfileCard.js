import React from 'react';

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card glass-panel fade-in">
      <header className="section-header">
        <h2><i className="ph ph-user"></i> Your Profile</h2>
      </header>
      <div className="profile-details">
        {!profile ? (
          <div className="empty-state">
            <i className="ph ph-user-circle-dashed empty-icon"></i>
            <p>Chat with me to build your profile</p>
          </div>
        ) : (
          <div className="profile-grid">
            {profile.type && (
              <div className="profile-item">
                <div className="profile-label">User Type</div>
                <div className="profile-value">{profile.type}</div>
              </div>
            )}
            {profile.risk && (
              <div className="profile-item">
                <div className="profile-label">Risk Profile</div>
                <div className="profile-value">{profile.risk}</div>
              </div>
            )}
            {profile.interests && profile.interests.length > 0 && (
              <div className="profile-item">
                <div className="profile-label">Interests</div>
                <div className="tag-list">
                  {profile.interests.map((interest, idx) => (
                    <span key={idx} className="tag">{interest}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
