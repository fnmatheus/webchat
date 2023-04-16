import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  socketId: {
    type: String,
    default: '',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase:true,
  },
  password: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('User', User);
