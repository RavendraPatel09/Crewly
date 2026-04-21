import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['creator', 'provider'], required: true },
  
  // Creator specific fields
  handle: { type: String }, // Instagram handle
  requirements: [{ type: String }],
  
  // Provider specific fields
  skills: [{ type: String }], // Editing, Reels, SEO
  portfolioLinks: [{ type: String }],
  pricing: { type: String },
  
  // Common fields
  niche: { type: String },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
