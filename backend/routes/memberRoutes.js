const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Member = require('../models/Member');

// ─── Multer Configuration ────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    // Rename: timestamp + original extension
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mime = allowedTypes.test(file.mimetype);
  if (ext && mime) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (jpeg, jpg, png, gif, webp)'));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

// ─── POST /api/members ────────────────────────────────────────────────────────
// Accept multipart/form-data (text fields + image)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, role, email, contact } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required.' });
    }

    const imageFilename = req.file ? req.file.filename : '';

    const newMember = new Member({
      name: name.trim(),
      role: role ? role.trim() : '',
      email: email ? email.trim() : '',
      contact: contact ? contact.trim() : '',
      image: imageFilename,
    });

    const saved = await newMember.save();
    res.status(201).json({ message: 'Member added successfully!', member: saved });
  } catch (err) {
    console.error('POST /api/members error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// ─── GET /api/members ─────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    console.error('GET /api/members error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// ─── GET /api/members/:id ─────────────────────────────────────────────────────
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found.' });
    }
    res.json(member);
  } catch (err) {
    console.error('GET /api/members/:id error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
