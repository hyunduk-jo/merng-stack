import Todo from "../../../models/Todo"

export default {
  Query: {
    seeTodos: async () => {
      return await Todo.find({}).populate("user").populate("like");
    }
  }
}