const { gql } = require("apollo-server");

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    image: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    body: String!
    username: String!
    id: ID!
    createdAt: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }

  #input
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  #Query
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  #mutation
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!, image: String!): Post!
    deletePost(postId: ID!): String
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: String!): Post!
    likePost(postId: ID!): Post!
  }
`;

module.exports = typeDefs;
