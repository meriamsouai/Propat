const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: function() { return !this.googleId && !this.facebookId; } },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  userType: { type: String, enum: ['client', 'enterprise'], required: true },
  companyName: { type: String, required: function() { return this.userType === 'enterprise'; } },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  newsletter: { type: Boolean, default: false },
  googleId: { type: String },
  facebookId: { type: String },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);