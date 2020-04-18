const { Schema, model: mongoModel } = require('mongoose');

function dbSchema(rawSchema, noTimestamp) {
  const timestampSettings = {
    timestamps: true
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
