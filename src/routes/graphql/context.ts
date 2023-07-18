import { PrismaClient } from '@prisma/client';
import DataLoader from 'dataloader';
import { FieldNode } from 'graphql';

export interface Context {
  prisma: PrismaClient;
  loaders: WeakMap<readonly FieldNode[], DataLoader<unknown, unknown>>;
}

export const createContext = (prisma: PrismaClient): Context => ({
  prisma,
  loaders: new WeakMap(),
});
