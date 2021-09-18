const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./schema/resolvers");

dotenv.config();
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URL;

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({ app: app });
  app.use((req, res) => {
    res.send("express apollo server is running");
  });
  await mongoose.connect(URL, {
    useNewUrlParser: true,
  });
  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
    )
  );
};

startServer();
