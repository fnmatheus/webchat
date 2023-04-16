import mongoose from 'mongoose';

const Friends = new mongoose.Schema({
  _id: String,
  friends: [String],
  requests: [String],
});

export default mongoose.model('Friends', Friends);
