const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    role: {
      type: String,
      trim: true,
      default: '',
    },
    email: {
      type: String,
      trim: true,
      default: '',
    },
    contact: {
      type: String,
      trim: true,
      default: '',
    },
    image: {
      type: String, // stores filename only
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Member', MemberSchema);
