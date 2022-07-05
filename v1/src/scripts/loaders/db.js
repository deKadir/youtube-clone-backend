import mongoose from 'mongoose';

const connectToDb = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log('Database connection succeed!');
    })
    .catch((e) => console.error(e.message));
};
export default connectToDb;
