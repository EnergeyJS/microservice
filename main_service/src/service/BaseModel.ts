import { PaginateOptions, PaginateResult } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';
import { ClassType } from 'type-graphql';

export default function getBaseModel<TItem>(): ClassType {
  class BaseModel {
    static paginate: (
      query?: object,
      options?: PaginateOptions,
      callback?: (
        err: Error,
        result: PaginateResult<DocumentType<TItem>>
      ) => void
    ) => Promise<PaginateResult<DocumentType<TItem>>>;
    static aggregatePaginate: (
      query?: object,
      options?: PaginateOptions,
      callback?: (
        err: Error,
        result: PaginateResult<DocumentType<TItem>>
      ) => void
    ) => Promise<PaginateResult<DocumentType<TItem>>>;
  }
  return BaseModel;
}
