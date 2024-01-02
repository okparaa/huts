import { Context } from "../context";
export const typeDef = /* GraphQL */ `
  type Sales @auth(requires: "") {
    id: ID!
  }
  type Query {
    getSales(id: ID!): Sales
  }
  type Mutation {
    createSales(name: String): Sales
  }
`;
export const resolvers = {
  Query: {},
  Mutation: {},
  Sales: {},
};
