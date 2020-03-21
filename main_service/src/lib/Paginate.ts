import { ObjectType, Field, ClassType, Int, InputType } from 'type-graphql';

export function getPaginateModel<TItem>(
  TItemClass: ClassType<TItem>
): ClassType {
  @ObjectType(`${TItemClass.name}PaginateModel`)
  class PaginateBase {
    @Field(() => [TItemClass])
    docs: TItem[];

    @Field(() => Int)
    totalDocs: number;

    @Field(() => Int)
    limit: number;

    @Field(() => Boolean)
    hasPrevPage: boolean;

    @Field(() => Boolean)
    hasNextPage: boolean;

    @Field(() => Int)
    page: number;

    @Field(() => Int)
    totalPages: number;

    @Field(() => Int, { nullable: true })
    prevPage: number;

    @Field(() => Int, { nullable: true })
    nextPage: number;
  }
  return PaginateBase;
}

@InputType()
export class PaginationInput {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;
}
