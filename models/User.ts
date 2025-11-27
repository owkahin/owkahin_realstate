import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please provide a username'],
    unique: true,
    trim: true,
    maxlength: [20, 'Username cannot be more than 20 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email',
    ],
  },
  password: {
    type: String,
    required: function(this: any) {
      // Password only required for local auth
      return this.authProvider === 'local';
    },
    minlength: [6, 'Password cannot be less than 6 characters'],
    select: false, // Don't return password by default
  },
  fullName: {
    type: String,
    required: [true, 'Please provide a full name'],
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values while maintaining uniqueness
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    maxlength: [160, 'Bio cannot be more than 160 characters'],
    default: '',
  },
  phone: {
    type: String,
    maxlength: [20, 'Phone number cannot be more than 20 characters'],
    default: '',
  },
  location: {
    type: String,
    maxlength: [100, 'Location cannot be more than 100 characters'],
    default: '',
  },
  profilePic: {
    type: String,
    default: '', // URL to image or base64 string
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

console.log('Registering User model');
export default mongoose.models.User || mongoose.model('User', UserSchema);
