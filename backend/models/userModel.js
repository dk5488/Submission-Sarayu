import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: false },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

