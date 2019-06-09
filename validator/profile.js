const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function ValidateProfileInput(data) {
  let errors = {};

  //Making sure the entries are of string type for the validator to work

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle has to be between 2 and 40";
  }
  if (Validator.isEmpty(data.handle)) {
    errors.handle = "handle is required";
  }
  if (Validator.isEmpty(data.status)) {
    errors.status = "status is required";
  }
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "skills is required";
  }

  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Invalid Website URL";
    }
  }

  if (!isEmpty(data.youtube)) {
    if (!Validator.isURL(data.Youtube)) {
      errors.website = "Invalid Website URL";
    }
  }
  if (!isEmpty(data.Facebook)) {
    if (!Validator.isURL(data.Facebook)) {
      errors.Facebook = "Invalid facebook URL";
    }
  }
  if (!isEmpty(data.Twitter)) {
    if (!Validator.isURL(data.Twitter)) {
      errors.Twitter = "Invalid twitter URL";
    }
  }
  if (!isEmpty(data.Instagram)) {
    if (!Validator.isURL(data.Instagram)) {
      errors.Instagram = "Invalid Instagram URL";
    }
  }
  if (!isEmpty(data.LinkedIn)) {
    if (!Validator.isURL(data.LinkedIn)) {
      errors.LinkedIn = "Invalid LinkedIn URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
