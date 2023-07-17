import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { graphql } from 'graphql';
import { createContext } from './context.js';
import { createGqlResponseSchema, gqlResponseSchema, gqlSchema } from './schemas.js';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { prisma } = fastify;
      const { query, variables } = req.body;
      const result = await graphql({
        schema: gqlSchema,
        source: query,
        variableValues: variables,
        contextValue: createContext(prisma),
      });
      return result;
    },
  });
};

export default plugin;
