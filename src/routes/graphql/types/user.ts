import { User } from '@prisma/client';
import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { Context } from '../context.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UUIDType } from './uuid.js';

export const UserType = new GraphQLObjectType<User, Context>({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: (source, _args, ctx) =>
        ctx.prisma.profile.findUnique({ where: { userId: source.id } }),
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: (source, _args, ctx) =>
        ctx.prisma.post.findMany({ where: { authorId: source.id } }),
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args, ctx) => {
        const authors = (
          await ctx.prisma.subscribersOnAuthors.findMany({
            where: { subscriberId: source.id },
            select: { author: true },
          })
        ).map(({ author }) => author);
        return authors;
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (source, _args, ctx) => {
        const subscribers = (
          await ctx.prisma.subscribersOnAuthors.findMany({
            where: { authorId: source.id },
            select: { subsriber: true },
          })
        ).map(({ subsriber }) => subsriber);
        return subscribers;
      },
    },
  }),
});
