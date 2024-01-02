import { Context } from "../context";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PubSub } from "graphql-subscriptions";
const pubsub = new PubSub();

let currentNumber = 0;

export const typeDef = /* GraphQL */ `
  type User {
    id: ID!
    surname: String
    firstname: String
    lastname: String
    phone: String
    token: String
    address: String
    active: Boolean
    username: String
    photo_url: String
    hashedPassword: String
    createdAt: String
    updatedAt: String
    dept: Dept
  }
  type Query {
    getUsers: [User]
    getUser(id: ID!): User
    getUserByUsername(username: String!): User
    getUsersLikeSurname(surname: String!): [User]
    currentNumber: Int
    verifyKode(kode: String!, id: String!): User
    signIn(user: loginUserInput!): User
  }
  type Mutation {
    createUser(user: createUserInput!): User
  }
  type Subscription {
    numberIncremented: Int
  }
  input createUserInput {
    surname: String!
    username: String!
    firstname: String!
    lastname: String!
    password: String!
    password_verify: String!
    address: String!
    phone: String!
  }
  input loginUserInput {
    username: String!
    password: String!
  }
`;

export const resolvers = {
  Query: {
    currentNumber() {
      return currentNumber;
    },
    getUsers: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.user.findMany();
    },
    getUserByUsername: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.user.findFirst({
        where: {
          username: args.username,
        },
      });
    },
    signIn: async (parent: any, args: any, ctx: Context) => {
      console.log("login data", args);
      const user = await ctx.prisma.user.findUnique({
        where: {
          username: args.user.username,
        },
      });

      if (!user) {
        return {
          id: "nouser",
          message: "invalid username or password",
        };
      }
      console.log("user data", user);
      const accessToken = jwt.sign(
        {
          id: user?.id,
          auth: "ok",
          ver: "no",
        },
        process.env.JWT_SECRET || "secret",
        { expiresIn: "12h" }
      );

      const kode = Array.from(Array(8), () =>
        Math.floor(Math.random() * 36).toString(36)
      )
        .join("")
        .toUpperCase();

      await ctx.prisma.user.update({
        where: { id: user?.id },
        data: {
          sessions: {
            create: [{ kode: kode, accessToken, refreshToken: accessToken }],
          },
        },
      });
      return {
        id: user?.id,
        token: accessToken,
        username: user?.username,
        phone: user?.phone,
      };
    },
    verifyKode: async (parent: any, args: any, ctx: Context) => {
      const session = await ctx.prisma.session.findFirst({
        where: {
          AND: { kode: args.kode, id: args.id },
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    },
    getUser: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.user.findFirst({
        where: {
          id: args.id,
        },
      });
    },
    getUsersLikeSurname: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.user.findMany({
        where: {
          surname: { contains: args.surname },
        },
      });
    },
  },
  User: {
    dept: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.dept.findFirst({
        where: {
          id: parent.deptId,
        },
      });
    },
  },
  Subscription: {
    numberIncremented: {
      subscribe: () => pubsub.asyncIterator(["NUMBER_INCREMENTED"]),
    },
  },
  Mutation: {
    createUser: async (parent: any, args: any, ctx: Context) => {
      if (args.user.password !== args.user.password_verify) {
        throw new Error("password missmatch");
      }
      const hashedPassword = await bcrypt.hash(
        args.user.password,
        Number(process.env.BCRYPT_COST) || 5
      );
      delete args.user.password;
      delete args.user.password_verify;
      return await ctx.prisma.user.create({
        data: { ...args.user, hashedPassword },
      });
    },
  },
};
function incrementNumber() {
  currentNumber++;
  pubsub.publish("NUMBER_INCREMENTED", { numberIncremented: currentNumber });
  setTimeout(incrementNumber, 1000);
}

// Start incrementing
incrementNumber();
