import { $ } from '../utils/validator';

export const newCourseValidator = $.object({
  name: $.string().required(),
  code: $.string()
    // .courseCode()
    .required()
});

export const newChatValidator = $.object({
  title: $.string()
    .min(5)
    .max(30)
    .required()
});
