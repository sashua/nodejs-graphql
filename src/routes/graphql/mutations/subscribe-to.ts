import { User } from '@prisma/client';
import { GraphQLFieldConfig, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from '../context.js';
import { UserType } from '../types/user.js';
import { UUIDType } from '../types/uuid.js';

interface Args {
  userId: User['id'];
  authorId: User['id'];
}

export const subscribeTo: GraphQLFieldConfig<void, Context, Args> = {
  type: UserType as GraphQLObjectType,
  args: {
    userId: { type: new GraphQLNonNull(UUIDType) },
    authorId: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_source, { userId, authorId }, ctx) => {
    const result = await ctx.prisma.subscribersOnAuthors.create({
      data: { subscriberId: userId, authorId },
      include: { author: true },
    });
    return result.author;
  },
};
