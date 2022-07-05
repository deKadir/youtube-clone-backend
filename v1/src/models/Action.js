import mongoose from 'mongoose';

//Like or dislike action schema

const Schema = new mongoose.Schema({
  test: String,
});

export default mongoose.model('Action', Schema);
