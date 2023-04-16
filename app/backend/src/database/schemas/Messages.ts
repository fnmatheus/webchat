import mongoose from 'mongoose';

const Messages = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
  },
  chats: [{
    users: [String],
    messages: {
      type: String,
    }
  }],
});

export default mongoose.model('Messages', Messages);
