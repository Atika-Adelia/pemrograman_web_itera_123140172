import React from 'react';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-card-info">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      <div className="stat-card-icon">{icon}</div>
    </div>
  );
};

export default StatCard;