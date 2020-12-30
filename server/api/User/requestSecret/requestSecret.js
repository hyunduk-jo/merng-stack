import User from "../../../models/User"
import { generateSecret, sendSecretMail } from "../../../src/utils";

export default {
  Mutation: {
    requestSecret: async (_, { email }) => {
      const existEmail = await User.findOne({ email });
      try {
        if (existEmail) {
          const loginSecret = generateSecret();
          sendSecretMail(email, loginSecret);
          await User.findOneAndUpdate({ email }, { loginSecret });
        } else {
          throw Error('❌ You are not registerd, create account first');
        }
        return true;
      } catch (e) {
        console.log(e.message);
        return false;
      }
    }
  }
}