import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ showAddBtn = true }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <div className="brand-icon">🎓</div>
        <span>TeamHub</span>
        <span className="nav-dot"></span>
      </Link>
      <div className="navbar-links">
        <Link to="/members" className="btn btn-secondary btn-sm">
          👥 View Members
        </Link>
        {showAddBtn && (
          <Link to="/add" className="btn btn-primary btn-sm">
            + Add Member
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
