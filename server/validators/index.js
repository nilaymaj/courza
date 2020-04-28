const { $ } = require('../utils/validator');

exports.newCourseValidator = $.object({
  name: $.string().required(),
  code: $.courseCode().required(),
});

exports.newChatValidator = $.object({
  title: $.string().min(5).max(30).required(),
});
