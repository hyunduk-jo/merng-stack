import Like from "../../models/Like";
import Todo from "../../models/Todo";

export default {
  Todo: {
    isLiked: async (parent, _, { req }) => {
      const { user } = req;
      const todos = await Todo.findOne({ _id: parent._id });
      //console.log(user.userName);
      //console.log(todos.likes);
      //console.log(todos.likes.includes(user._id))
      try {
        if (todos.likes.includes(user._id)) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e.message);
        return false;
      }
    },
    likesCount: async (parent) => {
      const todo = await Todo.findOne({ _id: parent._id });
      return todo.likes.length;
    }
  }
}