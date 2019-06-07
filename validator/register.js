const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function ValidateRegisterInput(data) {
  let errors = {};

  //Making sure the entries are of string type for the validator to work
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : ""; // THis is the confirmed password

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name size should be between 2 and 30 characters";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = "Invalid Email";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password =
      "Password can't be less than 6 or more than 30 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password = "Password confirmation is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password = "Passwords don't match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
    nome: data.name
  };
};
