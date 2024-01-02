import { Context } from "../context";

export const typeDef = /* GraphQL */ `
  type Session @auth(requires: "") {
    id: ID!
    refreshToken: String
    accessToken: String
    createdAt: String
    updatedAt: String
    kode: String
  }
  type Query {
    getSession(id: ID!): Session
  }
  type Mutation {
    createSession(name: String): Session
  }
`;

export const resolvers = {
  Query: {},
  Mutation: {},
  Session: {},
};
