const Validator = require("validator");
const isEmpty = require("../is-empty");

module.exports = function ValidatePostInput(data) {
  let errors = {};

  //Making sure the entries are of string type for the validator to work

  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.text)) {
    errors.text = "text is required";
  }
  if (!Validator.isLength(data.text, { min: 10, max: 400 })) {
    errors.text =
      "The post should be atleast 10 characters long and less than 400 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
