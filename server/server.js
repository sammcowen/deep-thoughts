const express = require('express');
// import apolloserver

const {ApolloServer} = require('apollo-server-express');

// import our typeDefs and resolvers 
const {typeDefs, resolvers} = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// create a new apollo server
const server = new ApolloServer ({
  typeDefs,
  resolvers
});
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create anew instance of an apollo server with graphql schema 
const startApolloServer = async(typeDefs,resolvers) => {
await server.start();
  // integrate our apollo server with the express application as middleware
  server.applyMiddleware({app});


db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    // log where we can go to test our graphql api
    console.log(`Use graphql at http://localhost:${PORT}${server.graphqlPath}`);
  })
})
};

// call the async function to start the server
startApolloServer(typeDefs, resolvers);