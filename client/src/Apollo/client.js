import { ApolloClient, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        isLoggedIn: {
          read() {
            return Boolean(localStorage.getItem("token")) || false
          }
        }
      }
    }
  }
})

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache,
  resolvers: {
    Mutation: {
      logUserIn: (_, { token }) => {
        localStorage.setItem("token", token);
        return null;
      },
      logUserOut: () => {
        localStorage.removeItem("token");
        window.location = '/';
        return null;
      }
    }
  },
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
})

export default client;

/* import ApolloClient from 'apollo-boost';
import { defaults, resolvers } from './localStorage';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  clientState: {
    defaults,
    resolvers
  },
  headers: {
    "Authorization": `Bearer ${localStorage.getItem("token")}`
  }
})

export default client; */