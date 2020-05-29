import Joi from '@hapi/joi';
import { IITK_EMAIL_REGEX, COURSE_CODE_REGEX } from './constants';
import { ValidationError } from './errors';
import { Metafile } from '../types';

const $ = <Joi.Root>Joi.extend((joi) => ({
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
      // @ts-ignore
      code: $.courseCode().required(),
    }).unknown()
  );
};

export const validateChat = (
  body: { title: string; description?: string },
  titleOnly?: boolean
) => {
  const baseDescrValidator = $.string().min(1).max(1024);
  const descrValidator = titleOnly
    ? baseDescrValidator
    : baseDescrValidator.required();
  validate(
    body,
    $.object({
      title: $.string().min(5).max(64).required(),
      description: descrValidator,
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

export const validatePdf = (body: Metafile) => {
  validate(
    body,
    $.object({
      mimetype: $.string().equal('application/pdf'),
      size: $.number().max(10 * 1000 * 1000), // 10MB
    }).unknown()
  );
};
