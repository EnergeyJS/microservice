import { Field } from 'type-graphql';
import { InputType, ArgsType } from 'type-graphql';

import { User } from './User.model';

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field({ nullable : true })
  email: string;

  @Field({ nullable : true })
  name: string;

  @Field({ nullable : true })
  password: string;
}

@InputType()
export class UpdateUserInput implements Partial<User> {
  @Field({ nullable : true })
  email: string;

  @Field({ nullable : true })
  name: string;
}
