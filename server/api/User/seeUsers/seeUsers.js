import User from "../../../models/User";

export default {
  Query: {
    seeUsers: async () => await User.find({})
  }
}