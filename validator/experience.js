const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function ValidateExperienceInput(data) {
  let errors = {};

  //Making sure the entries are of string type for the validator to work

  data.title = !isEmpty(data.title) ? data.title : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "title field is required";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "company field is required";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "from date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
