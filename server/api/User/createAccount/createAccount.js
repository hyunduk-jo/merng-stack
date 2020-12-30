import User from "../../../models/User";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { email, userName } = args;
      try {
        await User.create({ email, userName });
        return true;
      } catch (e) {
        console.log(e.message);
        return false;
      }
    }
  }
}