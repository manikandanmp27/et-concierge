import React from 'react';
import ProfileCard from './ProfileCard';
import RecommendationCards from './RecommendationCards';
import ActionList from './ActionList';

const Sidebar = ({ profile, recommendations, actions }) => {
  return (
    <aside className="sidebar-section">
      <ProfileCard profile={profile} />
      <RecommendationCards recommendations={recommendations} />
      {actions && actions.length > 0 && <ActionList actions={actions} />}
    </aside>
  );
};

export default Sidebar;
