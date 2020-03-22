import { Field } from 'type-graphql';
import { InputType, ArgsType } from 'type-graphql';

import { Book } from './Book.model';

@InputType()
export class CreateBookInput implements Partial<Book> {
  @Field()
  name: string;

  @Field()
  author: string;

  @Field()
  price: number;
}

@InputType()
export class UpdateBookInput implements Partial<Book> {
  @Field({ nullable : true })
  name: string;

  @Field({ nullable : true })
  author: string;

  @Field({ nullable : true })
  price: number;
}
