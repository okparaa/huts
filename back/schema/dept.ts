import { Context } from "../context";

export const typeDef = /* GraphQL */ `
  type Dept @auth(requires: "USER,ADMIN") {
    id: ID!
    name: String!
    createdAt: String
    updatedAt: String
    users: [User]
  }
  type Query {
    getDepts: [Dept]
    getDept(id: ID!): Dept
    getDeptsLikeName(name: String!): [Dept]
  }
  type Mutation {
    createDept(name: String): Dept
  }
`;

export const resolvers = {
  Query: {
    getDepts: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.dept.findMany();
    },
    getDept: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.dept.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    getDeptsLikeName: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.dept.findMany({
        where: {
          name: { contains: args.name },
        },
      });
    },
  },
  Dept: {
    users: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.user.findMany({
        where: {
          deptId: parent.id,
        },
      });
    },
  },
  Mutation: {
    createDept: async (parent: any, args: any, ctx: Context) => {
      return await ctx.prisma.dept.create({
        data: {
          name: args.name,
        },
      });
    },
  },
};
