const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req }),
});

const PORT = process.env.PORT || 5000;
const URI = process.env.MONGOLAB_URI;

mongoose
  .connect(URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    return server.listen({
      port: PORT,
    });
  })
  .then((res) => {
    console.log(`server running at ${res.url}`);
  });
