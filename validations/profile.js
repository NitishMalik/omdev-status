const Validator = require("validator"),
  isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : "";
  data.lastName = !isEmpty(data.lastName) ? data.lastName : "";
  data.jobRole = !isEmpty(data.jobRole) ? data.jobRole : "";
  data.teamId = !isEmpty(data.teamId) ? data.teamId : "";
  data.location = !isEmpty(data.location) ? data.location : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = "FirstName field is required";
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = "LastName field is required";
  }

  if (Validator.isEmpty(data.teamId)) {
    errors.teamId = "Team field is required";
  }

  if (Validator.isEmpty(data.location)) {
    errors.location = "Location field is required";
  }

  if (Validator.isEmpty(data.jobRole)) {
    errors.jobRole = "JobRole field is required";
  }

  if (Validator.isEmpty(data.skills)) {
    errors.skills = "skills field is required";
  }

  if (!isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valid linkedin URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
