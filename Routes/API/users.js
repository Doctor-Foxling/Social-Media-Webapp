const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//Load Input validation
const validateRegisterInput = require("../../validator/register");
const ValidateLoginInput = require("../../validator/login");

//Load USer model
const User = require("../../modules/Users");

// @Route   GET api/users/test
// @Desc    tests users route
// @acess   Public
router.get("/test", (req, res) => res.json({ msg: "USers Work" }));

// @Route   GET api/users/register
// @Desc    register the user
// @acess   Public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  }); // 'findOne' is a mongose method
  // this will work because the express app is using body-parser
  // with mogoose, u can use callbacks or pormises, we're using promise here
  //body-parser extract the entire body portion of an incoming request stream and exposes it on req.body . The middleware was a part of Express.js earlier but now you have to install it separately. This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.
});

// @Route   GET api/users/login
// @Desc    login User/ Return web token
// @acess   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = ValidateLoginInput(req.body);

  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "Email does not exist";
      return res.status(404).json(errors);
    } else {
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Matched
          const payload = { id: user.id, name: user.name, avatar: user.avatar }; // Create JWT payload

          // Sign Token
          jwt.sign(
            payload,
            keys.SecretOrKey,
            { expiresIn: "1h" },
            (err, token) => {
              res.json({
                success: true,
                token: "bearer " + token // the way we format the token in the header is by putting the word bearer which is a certain type of protocol so we are attaching it to the token so we don't have to do it when we actually make the request
              });
            }
          );
        } else {
          errors.password = "password incorrect";
          return res.status(404).json(errors);
        }
      });
    }
  });
});

// @Route   GET api/users/current
// @Desc    get current user
// @acess   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
