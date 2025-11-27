import mongoose from 'mongoose';

const ContactRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending',
  },
  message: {
    type: String,
    default: 'Hi, I\'m interested in your property.',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent duplicate requests
ContactRequestSchema.index({ sender: 1, receiver: 1, property: 1 }, { unique: true });

export default mongoose.models.ContactRequest || mongoose.model('ContactRequest', ContactRequestSchema);
