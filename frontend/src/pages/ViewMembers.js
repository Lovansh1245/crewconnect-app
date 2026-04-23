import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_URL = 'http://localhost:5000/api/members';
const IMG_BASE = 'http://localhost:5000/uploads/';

// Cover gradient variants cycle
const COVER_CLASSES = ['', 'cover-2', 'cover-3', 'cover-4'];

const ViewMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(API_URL);
      setMembers(res.data);
    } catch (err) {
      setError('⚠ Could not load members. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    (m.role && m.role.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="page view-page">
      <Navbar />

      <div className="view-content" style={{ position: 'relative', zIndex: 1 }}>
        {/* Header Row */}
        <div className="page-header-row">
          <div>
            <Link to="/" className="back-link">← Back to Home</Link>
            <h1 className="page-title">Our Team</h1>
            <p className="page-subtitle">
              {members.length} member{members.length !== 1 ? 's' : ''} registered
            </p>
          </div>
          <Link to="/add" className="btn btn-primary" id="add-member-header-btn">
            + Add Member
          </Link>
        </div>

        {/* Search */}
        <div className="form-group" style={{ maxWidth: 360, marginBottom: '1.8rem' }}>
          <input
            id="search-members"
            type="text"
            className="form-control"
            placeholder="🔍  Search by name or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Spinner */}
        {loading ? (
          <div className="spinner-wrap">
            <div className="spinner"></div>
            <span>Loading team members...</span>
          </div>
        ) : (
          <div className="members-grid" id="members-grid">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">👥</div>
                <h3>{search ? 'No matching members' : 'No members yet'}</h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                  {search
                    ? 'Try a different search term.'
                    : 'Start by adding your first team member.'}
                </p>
                {!search && (
                  <Link to="/add" className="btn btn-primary">+ Add First Member</Link>
                )}
              </div>
            ) : (
              filtered.map((member, idx) => (
                <div className="member-card" key={member._id} id={`member-card-${member._id}`}>
                  {/* Cover */}
                  <div className={`member-card-cover ${COVER_CLASSES[idx % 4]}`}>
                    <div className="member-avatar-wrap">
                      {member.image ? (
                        <img
                          src={`${IMG_BASE}${member.image}`}
                          alt={member.name}
                          className="member-avatar"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div className="member-avatar-placeholder">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="member-card-body">
                    <h3 className="member-card-name">{member.name}</h3>
                    <p className="member-card-role">
                      {member.role || <span style={{ color: 'var(--text-muted)' }}>No role set</span>}
                    </p>
                    <Link
                      to={`/members/${member._id}`}
                      className="btn btn-primary btn-sm"
                      id={`view-details-${member._id}`}
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMembers;
