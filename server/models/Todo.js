import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'like'
  }],
  comments: [{
    text: String,
    userName: String
  }]
});

const Todo = mongoose.model('todo', TodoSchema);

export default Todo;