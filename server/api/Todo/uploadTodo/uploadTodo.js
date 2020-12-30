import Todo from "../../../models/Todo";

export default {
  Mutation: {
    uploadTodo: async (_, { todo }, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const { user } = req;
      try {
        const newTodo = await Todo.create({
          todo,
          user: user._id
        })
        console.log(newTodo);
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
}