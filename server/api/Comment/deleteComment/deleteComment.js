import Todo from "../../../models/Todo";

export default {
  Mutation: {
    deleteComment: async (_, args, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const { todoId, commentId } = args;
      const { user } = req;
      const todo = await Todo.findById({ _id: todoId });
      try {
        if (todo) {
          const comment = todo.comments.findIndex((idx) => idx.id === commentId);
          //console.log(comment);
          //console.log(todo.comments[comment])
          if (todo.comments[comment].userName === user.userName) {
            todo.comments.splice(comment, 1);
            await todo.save();
          } else {
            throw Error("❌ Can't delete comment");
          }
        } else {
          throw Error("❌ Todo not found")
        }
        return true;
      } catch (e) {
        console.log(e.message);
        return false;
      }
    }
  }
}