import mongoose from 'mongoose';

const LikeSchema = mongoose.Schema({
  todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'todo'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
});

const Like = mongoose.model("like", LikeSchema);

export default Like;