import Like from "../../../models/Like";
import Todo from "../../../models/Todo";

export default {
  Mutation: {
    toggleLike: async (_, { todoId }, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const { user } = req;
      const todo = await Todo.findById({ _id: todoId });
      const like = await Like.findOne({ user: user._id, todo: todoId });
      console.log(like)
      console.log(todo);
      try {
        if (todo) {
          if (like) {
            console.log("✅ Like found");
            console.log(like._id)
            const idx = todo.likes.indexOf(like._id);
            if (idx > -1) todo.likes.splice(idx, 1);
            await Like.deleteOne({ user: user._id, todo: todoId });
          } else {
            console.log("❌ Like Not Found")
            const newLike = await Like.create({ user: user._id, todo: todoId });
            todo.likes.push(newLike);
          }
          await todo.save();
        } else {
          throw Error("Todo not found");
        }
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
}