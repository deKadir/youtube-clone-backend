import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Category', Schema);
