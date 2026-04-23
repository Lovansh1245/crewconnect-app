import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_URL = 'http://localhost:5000/api/members';
const IMG_BASE = 'http://localhost:5000/uploads/';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetchMember();
    // eslint-disable-next-line
  }, [id]);

  const fetchMember = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      setMember(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Member not found.');
      } else {
        setError('Failed to load member details. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Format date nicely
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="page details-page">
      <Navbar />

      <div className="details-content" style={{ position: 'relative', zIndex: 1 }}>
        <Link to="/members" className="back-link">← Back to Members</Link>

        {/* Spinner */}
        {loading && (
          <div className="spinner-wrap">
            <div className="spinner"></div>
            <span>Loading member details...</span>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="alert alert-error">
            {error}
            <button
              className="btn btn-secondary btn-sm"
              style={{ marginLeft: 'auto' }}
              onClick={() => navigate('/members')}
            >
              Go Back
            </button>
          </div>
        )}

        {/* Details Card */}
        {!loading && member && (
          <div className="details-card" id="member-details-card">
            {/* Cover */}
            <div className="details-cover">
              <div className="details-avatar-wrap">
                {member.image ? (
                  <img
                    src={`${IMG_BASE}${member.image}`}
                    alt={member.name}
                    className="details-avatar"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="details-avatar-placeholder">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="details-body">
              <h1 className="details-name" id="member-name">{member.name}</h1>

              {member.role && (
                <div className="details-role-badge">
                  💼 {member.role}
                </div>
              )}

              {/* Info Grid */}
              <div className="details-info-grid">
                <div className="info-item">
                  <div className="info-label">📧 Email</div>
                  <div className={`info-value ${!member.email ? 'empty' : ''}`}>
                    {member.email || 'Not provided'}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">📞 Contact</div>
                  <div className={`info-value ${!member.contact ? 'empty' : ''}`}>
                    {member.contact || 'Not provided'}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">🎭 Role</div>
                  <div className={`info-value ${!member.role ? 'empty' : ''}`}>
                    {member.role || 'Not assigned'}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">📅 Joined On</div>
                  <div className="info-value">
                    {formatDate(member.createdAt)}
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-label">🆔 Member ID</div>
                  <div className="info-value" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {member._id}
                  </div>
                </div>

                {member.image && (
                  <div className="info-item">
                    <div className="info-label">🖼 Photo</div>
                    <div className="info-value" style={{ fontSize: '0.82rem' }}>
                      <a
                        href={`${IMG_BASE}${member.image}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: 'var(--accent)' }}
                      >
                        View original ↗
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="details-footer">
                <Link to="/members" className="btn btn-secondary" id="back-to-members-btn">
                  ← All Members
                </Link>
                <Link to="/add" className="btn btn-primary" id="add-another-btn">
                  + Add Another
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDetails;
