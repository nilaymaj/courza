// @flow
const { Schema, model: mongoModel } = require('mongoose');

// export const DbTypes = Schema.Types;
// export class DbSchema extends Schema {
//   /**
//    * Creates new Schema object with given model structure
//    *
//    * @param {Object} rawSchema Raw schema defining the model structure
//    * @param {boolean} [noTimestamp] Set to true if model should not have automatic timestamps
//    * @returns {DbSchema} Schema object with given structure
//    */
//   constructor(rawSchema: Object, noTimestamp?: boolean) {
//     const timestampSettings = {
//       timestamps: {
//         createdAt: '.created',
//         updatedAt: '.modified'
//       }
//     };
//     super(rawSchema, !noTimestamp && timestampSettings);
//   }

//   /**
//    * Creates new Model object with the schema
//    *
//    * @param {string} modelName Name of the model - this decides the collection name
//    * @returns {Model} Model object corresponding to given collection
//    */
//   model(modelName: string) {
//     return mongoModel(modelName, this);
//   }
// }

function dbSchema(rawSchema, noTimestamp) {
  const timestampSettings = {
    timestamps: {
      createdAt: '.created',
      updatedAt: '.modified'
    }
  };
  Schema.call(this, rawSchema, !noTimestamp && timestampSettings);
}

dbSchema.prototype = Object.create(Schema.prototype);
dbSchema.prototype.constructor = dbSchema;

dbSchema.prototype.model = function model(modelName) {
  return mongoModel(modelName, this);
};

exports.DbSchema = dbSchema;
exports.DbTypes = Schema.Types;
