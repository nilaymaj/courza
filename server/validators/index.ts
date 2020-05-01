import { $ } from '../utils/validator';

export const newCourseValidator = $.object({
  name: $.string().required(),
  code: $.courseCode().required(),
}).unknown();

export const newChatValidator = $.object({
  title: $.string().min(5).max(30).required(),
}).unknown();

export const newMessageValidator = $.object({
  content: $.string().min(1).max(1024).required(),
}).unknown();
