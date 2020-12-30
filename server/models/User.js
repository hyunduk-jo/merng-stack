import mongoose, { Schema } from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  userName: {
    type: String,
    unique: true,
    required: true
  },
  loginSecret: {
    type: String,
    default: null
  },
  todos: {
    type: Schema.Types.ObjectId,
    ref: 'todos'
  }
});

const User = mongoose.model('user', UserSchema);

export default User;