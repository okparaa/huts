import { MapperKind, getDirective, mapSchema } from "@graphql-tools/utils";
import { GraphQLSchema, defaultFieldResolver } from "graphql";
import jwt from "jsonwebtoken";

const authDirective = (
  directiveName: string,
  getUserFn: (
    req: Request
  ) => Promise<{ hasRole: (roles: string[]) => boolean }>
) => {
  const typeDirectiveArgumentMaps: Record<string, any> = {};
  return {
    authDirectiveTypeDefs: `directive @${directiveName}(
        requires: String = ""
      ) on OBJECT | FIELD_DEFINITION
    `,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.TYPE]: (type) => {
          const authDirective = getDirective(schema, type, directiveName)?.[0];
          if (authDirective) {
            typeDirectiveArgumentMaps[type.name] = authDirective;
          }
          console.log("okpara", type.name, authDirective);

          return undefined;
        },
        [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
          const authDirective =
            getDirective(schema, fieldConfig, directiveName)?.[0] ??
            typeDirectiveArgumentMaps[typeName];
          if (authDirective) {
            const { requires } = authDirective;

            if (requires) {
              const { resolve = defaultFieldResolver } = fieldConfig;
              fieldConfig.resolve = async (source, args, context, info) => {
                const user = await getUserFn(context.req);
                if (!user.hasRole(requires.split(","))) {
                  //requires is a string saparated by comma
                  throw new Error("not authorized");
                }
                return resolve(source, args, context, info);
              };
              return fieldConfig;
            }
          }
        },
      }),
  };
};

const getUser = async (req: Request) => {
  const secret = process.env.JWT_SECRET;
  const decoded = await jwt;
  console.log("decoded", decoded);
  const uroles = ["UNKNOWN", "USER", "REVIEWER", "ADMIN"];
  return {
    hasRole: (roles: string[]) => {
      const roleIndex = uroles.some((role) => roles.indexOf(role) >= 0);
      return roleIndex;
    },
  };
};

export default authDirective;

export { getUser };
