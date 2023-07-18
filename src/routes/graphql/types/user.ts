import { Post, User } from '@prisma/client';
import DataLoader from 'dataloader';
import {
  GraphQLFieldResolver,
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Context } from '../context.js';
import { PostType } from './post.js';
import { ProfileType } from './profile.js';
import { UUIDType } from './uuid.js';

// ----------------------------------------------------------------
export const UserType = new GraphQLObjectType<User, Context>({
  name: 'User',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: { type: ProfileType, resolve: resolveProfile },
    posts: { type: new GraphQLList(PostType), resolve: resolvePosts },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: resolveUserSubscribedTo,
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: resolveSubscribedToUser,
    },
  }),
});

// ----------------------------------------------------------------
// Resolvers
// ----------------------------------------------------------------
const resolveProfile: GraphQLFieldResolver<User, Context> = (
  source,
  _args,
  ctx,
  info,
) => {
  let loader = ctx.loaders.get(info.fieldNodes);
  if (!loader) {
    loader = new DataLoader(async (ids: readonly string[]) => {
      const profiles = await ctx.prisma.profile.findMany({
        where: { userId: { in: [...ids] } },
      });
      return ids.map((id) => profiles.find((profile) => profile.userId === id));
    });
    ctx.loaders.set(info.fieldNodes, loader);
  }
  return loader.load(source.id);
};

// ----------------------------------------------------------------
const resolvePosts: GraphQLFieldResolver<User, Context> = (source, _args, ctx, info) => {
  let loader = ctx.loaders.get(info.fieldNodes);
  if (!loader) {
    loader = new DataLoader(async (ids: readonly string[]) => {
      const posts = await ctx.prisma.post.findMany({
        where: { authorId: { in: [...ids] } },
      });
      const groupedPosts = posts.reduce(
        (acc, post) => {
          if (!acc[post.authorId]) acc[post.authorId] = [];
          acc[post.authorId].push(post);
          return acc;
        },
        {} as Record<string, Post[]>,
      );
      return ids.map((id) => groupedPosts[id]);
    });
    ctx.loaders.set(info.fieldNodes, loader);
  }
  return loader.load(source.id);
};

// ----------------------------------------------------------------
const resolveUserSubscribedTo: GraphQLFieldResolver<User, Context> = async (
  source,
  _args,
  ctx,
  info,
) => {
  let loader = ctx.loaders.get(info.fieldNodes);
  if (!loader) {
    loader = new DataLoader(async (ids: readonly string[]) => {
      const subs = await ctx.prisma.subscribersOnAuthors.findMany({
        where: { subscriberId: { in: [...ids] } },
        select: { subscriberId: true, author: true },
      });
      const groupedAuthors = subs.reduce(
        (acc, { subscriberId, author }) => {
          if (!acc[subscriberId]) acc[subscriberId] = [];
          acc[subscriberId].push(author);
          return acc;
        },
        {} as Record<string, User[]>,
      );
      return ids.map((id) => groupedAuthors[id]);
    });
    ctx.loaders.set(info.fieldNodes, loader);
  }
  return loader.load(source.id);
};

// ----------------------------------------------------------------
const resolveSubscribedToUser: GraphQLFieldResolver<User, Context> = async (
  source,
  _args,
  ctx,
  info,
) => {
  let loader = ctx.loaders.get(info.fieldNodes);
  if (!loader) {
    loader = new DataLoader(async (ids: readonly string[]) => {
      const subs = await ctx.prisma.subscribersOnAuthors.findMany({
        where: { authorId: { in: [...ids] } },
        select: { authorId: true, subsriber: true },
      });
      const groupedSubsribers = subs.reduce(
        (acc, { authorId, subsriber }) => {
          if (!acc[authorId]) acc[authorId] = [];
          acc[authorId].push(subsriber);
          return acc;
        },
        {} as Record<string, User[]>,
      );
      return ids.map((id) => groupedSubsribers[id]);
    });
    ctx.loaders.set(info.fieldNodes, loader);
  }
  return loader.load(source.id);
};
