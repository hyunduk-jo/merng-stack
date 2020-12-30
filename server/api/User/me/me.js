export default {
  Query: {
    me: (_, __, { req, isAuthenticated }) => {
      isAuthenticated(req);
      const { user } = req;
      return user;
    }
  }
}