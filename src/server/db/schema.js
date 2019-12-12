// @flow
import { Schema, model as mongoModel } from 'mongoose';

export const DbTypes = Schema.Types;
export class DbSchema extends Schema {
  constructor(rawSchema: Object, noTimestamp?: boolean) {
    const timestampSettings = {
      timestamps: {
        createdAt: '.created',
        updatedAt: '.modified'
      }
    };
    super(rawSchema, !noTimestamp && timestampSettings);
  }

  model(modelName: string) {
    return mongoModel(modelName, this);
  }
}
