import { GraphQLFieldConfig, GraphQLNonNull } from 'graphql';
import { Context } from '../context.js';
import { MemberTypeIdType } from '../types/member-type-id.js';
import { MemberTypeType } from '../types/member-type.js';

interface Args {
  id: string;
}

export const memberType: GraphQLFieldConfig<void, Context, Args> = {
  type: MemberTypeType,
  args: { id: { type: new GraphQLNonNull(MemberTypeIdType) } },
  resolve: (_source, { id }, ctx) => ctx.prisma.memberType.findUnique({ where: { id } }),
};
