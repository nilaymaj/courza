const Errors = require('../utils/errors');
const { err } = require('../utils/logger');

module.exports = function controller(handler) {
  return async function(req, res, next) {
    try {
      return await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
