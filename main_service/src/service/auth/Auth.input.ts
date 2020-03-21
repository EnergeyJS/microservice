import { Field } from 'type-graphql';
import { InputType, ArgsType } from 'type-graphql';

@ArgsType()
export class loginInput {
  @Field({ nullable : true })
  email: string;

  @Field({ nullable : true })
  password: string;
}