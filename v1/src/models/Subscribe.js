import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Channel',
    },
    to: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Channel',
    },
    notifications: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Subscribe', Schema);
