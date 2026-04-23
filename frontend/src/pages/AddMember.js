import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const API_URL = 'http://localhost:5000/api/members';

const AddMember = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    role: '',
    email: '',
    contact: '',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null); // { type: 'success' | 'error', message }
  const [loading, setLoading] = useState(false);

  // ── Handlers ────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    if (errors.image) setErrors((prev) => ({ ...prev, image: '' }));
  };

  // ── Validation ───────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required.';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (form.contact && !/^\+?[\d\s\-()]{7,15}$/.test(form.contact)) {
      newErrors.contact = 'Please enter a valid contact number.';
    }
    return newErrors;
  };

  // ── Submit ───────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setAlert(null);

    try {
      const formData = new FormData();
      formData.append('name', form.name.trim());
      formData.append('role', form.role.trim());
      formData.append('email', form.email.trim());
      formData.append('contact', form.contact.trim());
      if (imageFile) formData.append('image', imageFile);

      await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setAlert({ type: 'success', message: '🎉 Member added successfully!' });

      // Reset
      setForm({ name: '', role: '', email: '', contact: '' });
      setImageFile(null);
      setImagePreview(null);

      // Redirect after short delay
      setTimeout(() => navigate('/members'), 1800);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to add member. Please try again.';
      setAlert({ type: 'error', message: `❌ ${msg}` });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setForm({ name: '', role: '', email: '', contact: '' });
    setImageFile(null);
    setImagePreview(null);
    setErrors({});
    setAlert(null);
  };

  return (
    <div className="page add-page">
      <Navbar />

      <div className="add-content" style={{ position: 'relative', zIndex: 1 }}>
        {/* Page header */}
        <Link to="/" className="back-link">← Back to Home</Link>

        <div className="page-header">
          <h1 className="page-title">Add New Member</h1>
          <p className="page-subtitle">Fill in the details to add a team member</p>
        </div>

        {/* Alert */}
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.message}
          </div>
        )}

        {/* Form Card */}
        <div className="form-card">
          <form onSubmit={handleSubmit} encType="multipart/form-data" id="add-member-form">
            <div className="form-grid">
              {/* Name */}
              <div className="form-group full">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`form-control ${errors.name ? 'error-input' : ''}`}
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.name && <span className="field-error">⚠ {errors.name}</span>}
              </div>

              {/* Role */}
              <div className="form-group">
                <label htmlFor="role">Role / Designation</label>
                <input
                  id="role"
                  name="role"
                  type="text"
                  className="form-control"
                  placeholder="e.g. Team Lead"
                  value={form.role}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-control ${errors.email ? 'error-input' : ''}`}
                  placeholder="e.g. priya@email.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.email && <span className="field-error">⚠ {errors.email}</span>}
              </div>

              {/* Contact */}
              <div className="form-group">
                <label htmlFor="contact">Contact Number</label>
                <input
                  id="contact"
                  name="contact"
                  type="text"
                  className={`form-control ${errors.contact ? 'error-input' : ''}`}
                  placeholder="e.g. +91 9876543210"
                  value={form.contact}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {errors.contact && <span className="field-error">⚠ {errors.contact}</span>}
              </div>

              {/* Image Upload */}
              <div className="form-group full">
                <label>Profile Photo</label>
                <label className="file-upload-label" htmlFor="image-upload">
                  <span className="upload-icon">📸</span>
                  <span>{imageFile ? imageFile.name : 'Click to upload image'}</span>
                  <span style={{ fontSize: '0.78rem' }}>JPEG, PNG, GIF, WEBP • Max 5 MB</span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="img-preview"
                  />
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                id="submit-btn"
                disabled={loading}
              >
                {loading ? '⏳ Saving...' : '✔ Add Member'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={handleReset}
                id="reset-btn"
                disabled={loading}
              >
                ↺ Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMember;
