export default {
  User: {
    isSelf: (parent, _, { req }) => {
      const { user } = req;
      return user.userName == parent.userName;
    }
  }
}