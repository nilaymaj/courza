const Joi = require('@hapi/joi');
const { IITK_EMAIL_REGEX, COURSE_CODE_REGEX } = require('./constants');
const { ValidationError } = require('./errors');

exports.$ = Joi.extend((joi) => ({
  type: 'iitkEmail',
  base: joi.string().email(),
  messages: {
    base: '"{{#label}}" must be a valid IITK email ID',
  },
  validate(value, helpers) {
    const res = value.match(IITK_EMAIL_REGEX);
    if (!res) helpers.error('iitkEmail.base');
  },
})).extend((joi) => ({
  type: 'courseCode',
  base: joi.string(),
  messages: {
    base: '"{{#label}}" must have valid course code format',
  },
  validate(value, helpers) {
    const res = value.match(COURSE_CODE_REGEX);
    if (!res) helpers.error('courseCode.base');
  },
}));

/**
 * Validates body against given validation constraints
 *
 * @param {Object} body The data to be validated
 * @param {Object} constraints Constraints to validate against
 */
exports.validate = function validate(body, constraints) {
  const { err } = constraints.validate(body);
  if (err) throw new ValidationError(err.details[0].message);
};
