const postsResolver = require("./posts");
const usersResolver = require("./users");

module.exports = {
  Post: {
    likeCount(parent) {
      return parent.likes.length;
    },
    commentCount(parent) {
      return parent.comments.length;
    },
  },

  Query: {
    ...postsResolver.Query,
  },
  Mutation: {
    ...usersResolver.Mutation,
    ...postsResolver.Mutation,
  },
};
