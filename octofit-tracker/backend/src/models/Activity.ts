import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories: { type: Number, required: false },
  date: { type: Date, default: () => new Date() },
});

const Activity = mongoose.model('Activity', activitySchema);
export default Activity;
