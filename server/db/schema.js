import { Schema, model as mongoModel } from 'mongoose';

class dbSchema extends Schema {
  constructor(rawSchema, noTimestamp) {
    super(rawSchema, !noTimestamp && { timestamps: true });
  }

  model(name) {
    return mongoModel(name, this);
  }
}

export const DbSchema = dbSchema;
export const DbTypes = Schema.Types;
