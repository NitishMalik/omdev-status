const Validator = require("validator"),
  isEmpty = require("./is-empty");

module.exports = function validateTaskInput(data) {
  let errors = {};

  data.taskName = !isEmpty(data.taskName) ? data.taskName : "";
  data.app = !isEmpty(data.app) ? data.app : "";
  data.project = !isEmpty(data.project) ? data.project : "";
  data.from = !isEmpty(data.from) ? data.from : "";
  data.to = !isEmpty(data.to) ? data.to : "";
  data.dependencies = !isEmpty(data.dependencies) ? data.dependencies : "";

  if (Validator.isEmpty(data.taskName)) {
    errors.taskName = "task name is required";
  }

  if (Validator.isEmpty(data.project)) {
    errors.project = "project name is required";
  }

  if (Validator.isEmpty(data.app)) {
    errors.app = "app name is required";
  }

  if (Validator.isEmpty(data.from)) {
    errors.from = "task from date is required";
  }

  if (Validator.isEmpty(data.to)) {
    errors.to = "task to date is required";
  }

  if (Validator.isEmpty(data.dependencies)) {
    errors.dependencies = "task dependencies is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
