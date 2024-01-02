import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef as Dept, resolvers as deptResolvers } from "./dept";
import { typeDef as User, resolvers as userResolvers } from "./user";
import { typeDef as Session, resolvers as sessionResolvers } from "./session";
import { typeDef as Sales, resolvers as salesResolvers } from "./sales";
import {
  typeDef as Inventory,
  resolvers as inventoryResolvers,
} from "./inventory";

import merge from "lodash/merge";
import authDirective, { getUser } from "../auth-directive";
const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective(
  "auth",
  getUser
);

let schema = makeExecutableSchema({
  typeDefs: [authDirectiveTypeDefs, Dept, User, Session, Sales, Inventory],
  resolvers: merge(
    deptResolvers,
    userResolvers,
    sessionResolvers,
    salesResolvers,
    inventoryResolvers
  ),
});

const mergedSchema = authDirectiveTransformer(schema);
export { mergedSchema };
