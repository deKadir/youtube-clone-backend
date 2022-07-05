import mongoose from 'mongoose';

const Schema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Channel',
    },
    title: { type: String, required: true },
    caption: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    length: {
      type: Number,
      required: true,
    },
    viewerCount: {
      type: Number,
      default: 0,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: 'Category',
    },
    commentSettings: {
      type: String,
      enum: ['Enabled', 'Disabled', 'Restrict'],
      default: 'Enabled',
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    private: {
      type: Boolean,
      default: false,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    dislikeCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model('Video', Schema);
