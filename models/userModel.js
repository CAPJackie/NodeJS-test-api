// @ts-nocheck
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { USER_ROLES } from '../utils/constants.js';

const { USER, ADMIN } = USER_ROLES;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please tell us your username!'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: Date,
  roles: {
    type: [
      {
        type: String,
        enum: [USER, ADMIN]
      }
    ],
    default: [USER]
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.updatedAt = Date.now();

  next();
});

userSchema.methods.checkCorrectPassword = async (
  candidatePassword,
  userPassword
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

export default User;
