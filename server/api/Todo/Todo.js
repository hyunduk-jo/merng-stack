import Like from "../../models/Like";

export default {
  Todo: {
    isLiked: async (parent, _, { req }) => {
      const { user } = req;
      try {
        const like = await Like.findOne({ todo: parent._id }).populate('user');
        if (!like) throw Error("❌ No Like Found");
        if (like.user.userName === user.userName) {
          return true;
        }
      } catch (e) {
        //console.log(e.message);
        return false;
      };
    }
  }
}