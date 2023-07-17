import { Profile } from '@prisma/client';
import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Context } from '../context.js';
import { MemberTypeIdType } from './member-type-id.js';
import { MemberTypeType } from './member-type.js';
import { UUIDType } from './uuid.js';

export const ProfileType = new GraphQLObjectType<Profile, Context>({
  name: 'Profile',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    memberTypeId: { type: MemberTypeIdType },
    memberType: {
      type: new GraphQLNonNull(MemberTypeType),
      resolve: (source, _args, ctx) =>
        ctx.prisma.memberType.findUnique({ where: { id: source.memberTypeId } }),
    },
  }),
});
