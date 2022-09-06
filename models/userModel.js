const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please tell us your name!']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date,
  roles: [
    {
      type: String,
      enum: ['Admin', 'User'],
      default: 'User'
    }
  ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;

// users:
// - username: String
// - password: String (debe almacenarse con el algoritmo sha256)
// - createdAt: Date
// - updatedAt: Date
// - roles: array (Admin, User)
