import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property',
    required: true,
  },
  lastMessage: {
    type: String,
    default: '',
  },
  lastMessageAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure participants array has exactly 2 users
ConversationSchema.path('participants').validate(function(value) {
  return value.length === 2;
}, 'A conversation must have exactly 2 participants');

// Index for quick lookup
ConversationSchema.index({ participants: 1 });

export default mongoose.models.Conversation || mongoose.model('Conversation', ConversationSchema);
