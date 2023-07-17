import { GraphQLFieldConfig, GraphQLList, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { UserType } from '../types/user.js';

export const users: GraphQLFieldConfig<void, Context, void> = {
  type: new GraphQLNonNull(new GraphQLList(UserType)),
  resolve: (_source, _args, ctx) => ctx.prisma.user.findMany(),
};
