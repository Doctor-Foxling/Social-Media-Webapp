const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load Input Valdation

const ValidateProfileInput = require("../../validator/profile");
const ValidateExperienceInput = require("../../validator/experience");
const ValidateEducationInput = require("../../validator/education");

//Load Profile model
const Profile = require("../../modules/Profiles");

//Load USer model
const User = require("../../modules/Users");

// @Route   GET api/profile/test
// @Desc    tests profile route
// @acess   Public
router.get("/test", (req, res) => res.json({ msg: "Profile Work" }));

// @Route   GET api/profile
// @Desc    profile route
// @acess   Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @Route   GET api/profile/handle/:handle    // this is for backend API, handle will be replaced by user handle name at front-end
// @Desc    GET profile by handle
// @acess   Public
router.get("/handle/:handle", (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "The profile doesn't exist";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(400).json(err));
});

// @Route   GET api/profile/user/:user_id    // this is for backend API, handle will be replaced by user handle name at front-end
// @Desc    GET profile by user_id
// @acess   Public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "The profile doesn't exist";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err =>
      res.status(404).json({ profile: "THere is no profile for this user" })
    );
});

// @Route   GET api/profile/all    // this is for backend API, handle will be replaced by user handle name at front-end
// @Desc    GET all profiles
// @acess   Public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["name", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = "There are no profiles";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json({ profile: "There are no profiles" }));
});

// @Route   POST api/profile/experience
// @Desc    add experience to the profile
// @acess   Private
router.post(
  "/experience",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newExp = {
        title: req.body.title,
        company: req.body.company,
        location: req.body.location,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current
        // description: req.body.description
      };

      profile.experience.unshift(newExp); // unshift is used to add experience in the beginning instead of push which would add to the end
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @Route   POST DELETE api/profile/experience/:exp_id
// @Desc    Delete an experience from the profile
// @acess   Private
router.delete(
  "/experience/:exp_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove Index
        const removeIndex = profile.experience
          .map(item => item.id)
          .indexOf(req.params.exp_id);

        // SPlice out of array
        profile.experience.splice(removeIndex, 1);

        // Save the profile
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @Route   POST DELETE api/profile/education/:edu_id
// @Desc    Delete an education entry from the profile
// @acess   Private
router.delete(
  "/education/:edu_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        // Get remove Index
        const removeIndex = profile.education
          .map(item => item.id)
          .indexOf(req.params.edu_id);

        // SPlice out of array
        profile.education.splice(removeIndex, 1);

        // Save the profile
        profile.save().then(profile => res.json(profile));
      })
      .catch(err => res.status(404).json(err));
  }
);

// @Route   DELETE api/profile
// @Desc    Delete current user and profile
// @acess   Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

// @Route   POST api/profile/education
// @Desc    add education to the profile
// @acess   Private
router.post(
  "/education",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id }).then(profile => {
      const newEdu = {
        school: req.body.school,
        degree: req.body.degree,
        fieldOfStudy: req.body.fieldOfStudy,
        from: req.body.from,
        to: req.body.to,
        current: req.body.current,
        description: req.body.description
      };

      profile.education.unshift(newEdu); // unshift is used to add education in the beginning instead of push which would add to the end
      profile.save().then(profile => res.json(profile));
    });
  }
);

// @Route   POST api/profile
// @Desc    create or edit the profile
// @acess   Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateProfileInput(req.body);

    // Validate input fields
    if (!isValid) {
      return res.status(404).json(errors);
    }

    // Get Fields
    const profileFields = {};
    profileFields.user = req.user;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.company) profileFields.company = req.body.company;
    if (req.body.website) profileFields.website = req.body.website;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.bio) profileFields.bio = req.body.bio;
    if (req.body.status) profileFields.status = req.body.status;
    if (req.body.githubUserName)
      profileFields.githubUserName = req.body.githubUserName;
    //Skills split into arrays
    if (req.body.skills !== undefined) {
      profileFields.skills = req.body.skills.split(",");
    }

    profileFields.social = {};
    if (req.body.Youtube) profileFields.social.Youtube = req.bodY.Youtube;
    if (req.body.Facebook) profileFields.social.Facebook = req.body.Facebook;
    if (req.body.Instagram) profileFields.social.Instagram = req.body.Instagram;
    if (req.body.Twitter) profileFields.social.Twitter = req.body.Twitter;
    if (req.body.LinkedIn) profileFields.social.LinkedIn = req.body.LinkedIn;

    Profile.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Edit Profile
        Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create Profile

        //Check to see if the handle exists
        Profile.findOne({ handle: profileFields.handle }).then(profile => {
          if (profile) {
            errors.handle = "That handle already exists";
            return res.status(400).json(errors);
          }

          //Save Profile
          new Profile(profileFields).save().then(profile => res.json(profile));
        });
      }
    });
  }
);

module.exports = router;
