export default {
  Query: {
    isMyComment: async (_, { userName }, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const { user: loggedInUser } = req;
      try {
        if (userName === loggedInUser.userName) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        console.log(e.message);
        return false;
      }
    }
  }
}