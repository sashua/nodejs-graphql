import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
}

export const createContext = (prisma: PrismaClient): Context => ({ prisma });
