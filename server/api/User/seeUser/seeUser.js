import User from "../../../models/User"

export default {
  Query: {
    seeUser: async (_, { userName }) => {
      return await User.findOne({ userName });
    }
  }
}