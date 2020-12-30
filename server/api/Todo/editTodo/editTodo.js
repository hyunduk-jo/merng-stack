import Todo from "../../../models/Todo";

export default {
  Mutation: {
    editTodo: async (_, args, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const { todo, action, _id } = args;
      try {
        if (action === "DELETE") {
          await Todo.findByIdAndDelete({ _id });
        } else if (action === "EDIT") {
          await Todo.findByIdAndUpdate({ _id }, { todo });
        }
        return true;
      } catch (e) {
        console.log(e.message);
        return false;
      }
    }
  }
}