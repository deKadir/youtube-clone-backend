import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: String,
    subscribers: { type: Number, default: 0 },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Channel', Schema);
