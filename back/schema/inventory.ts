import { Context } from "../context";
export const typeDef = /* GraphQL */ `
  type Inventory @auth(requires: "") {
    id: ID!
  }
  type Query {
    getInventory(id: ID!): Inventory
  }
  type Mutation {
    createInventory(name: String): Inventory
  }
`;
export const resolvers = {
  Query: {},
  Mutation: {},
  Inventory: {},
};
