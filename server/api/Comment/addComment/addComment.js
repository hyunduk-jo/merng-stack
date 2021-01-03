import Todo from "../../../models/Todo";

export default {
  Mutation: {
    addComment: async (_, args, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const { text, todoId } = args;
      const { user } = req;
      const todo = await Todo.findById({ _id: todoId });
      if (todo) {
        todo.comments.unshift({ text, userName: user.userName });
      } else {
        throw Error("❌ Can't add comment");
      }
      await todo.save();
      return todo.comments[0];
    }
  }
}