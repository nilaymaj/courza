import Joi from '@hapi/joi';
import { IITK_EMAIL_REGEX, COURSE_CODE_REGEX } from './constants';
import { ValidationError } from './errors';

const $ = Joi.extend((joi) => ({
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
 * @param {any} body The data to be validated
 * @param {Joi.Schema} constraints Constraints to validate against
 */
const validate = (body: any, constraints: Joi.Schema) => {
  const { error } = constraints.validate(body);
  if (error) throw new ValidationError(error.details[0].message);
};

export const validateCourse = (body: { name: string; code: string }) => {
  validate(
    body,
    $.object({
      name: $.string().required(),
      code: $.courseCode().required(),
    }).unknown()
  );
};

export const validateChat = (body: { title: string }) => {
  validate(
    body,
    $.object({
      title: $.string().min(5).max(30).required(),
    }).unknown()
  );
};

export const validateMessage = (body: { content: string }) => {
  validate(
    body,
    $.object({
      content: $.string().min(1).max(1024).required(),
    }).unknown()
  );
};
