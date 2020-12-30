import User from "../../../models/User";
import { generateToken } from "../../../src/utils"

export default {
  Mutation: {
    confirmSecret: async (_, { email, secret }) => {
      const user = await User.findOne({ email });
      const token = generateToken(user._id);
      try {
        if (secret === user.loginSecret) {
          await User.findOneAndUpdate({ email }, { loginSecret: null })
          return token;
        } else {
          throw Error("❌ Wrong email/secret combination");
        }
      } catch (e) {
        console.log(e.message);
      }
    }
  }
}