import Todo from "../../../models/Todo";

export default {
  Query: {
    seeTodo: async (_, args) => {
      const { todoId } = args;
      return await Todo.findOne({ _id: todoId });
    }
  }
}