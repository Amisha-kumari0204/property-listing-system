import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
    recommendationsReceived: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
