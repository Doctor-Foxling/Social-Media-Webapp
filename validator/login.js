const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function ValidateLoginInput(data) {
  let errors = {};

  //Making sure the entries are of string type for the validator to work

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Invalid Password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
