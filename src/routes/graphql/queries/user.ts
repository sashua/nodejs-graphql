import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from '../context.js';
import { UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';

interface Args {
  id: string;
}

export const user: GraphQLFieldConfig<void, Context, Args> = {
  type: UserType as GraphQLObjectType<void, Context>,
  args: { id: { type: new GraphQLNonNull(UUIDType) } },
  resolve: (_source, { id }, ctx) => ctx.prisma.user.findUnique({ where: { id } }),
};
