import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="page home-page">
      {/* Background orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <div className="home-hero" style={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <div className="home-badge">
          🎓 Student Project
        </div>

        {/* Title */}
        <h1 className="home-title">
          Student Team <br />Members Hub
        </h1>

        {/* Subtitle */}
        <p className="home-subtitle">
          Manage your academic team effortlessly. Add members, track roles,
          and keep everyone connected — all in one place.
        </p>

        {/* Action Buttons */}
        <div className="home-actions">
          <Link to="/add" className="btn btn-primary btn-lg" id="add-member-btn">
            ✚ Add Member
          </Link>
          <Link to="/members" className="btn btn-secondary btn-lg" id="view-members-btn">
            👥 View Team
          </Link>
        </div>

        {/* Stats Row */}
        <div className="home-stats">
          <div className="stat-item">
            <span className="stat-value">∞</span>
            <span className="stat-label">Members</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">4</span>
            <span className="stat-label">Pages</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">REST</span>
            <span className="stat-label">API</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">💾</span>
            <span className="stat-label">MongoDB</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
