const express = require("express"),
  router = express.Router(),
  mongoose = require("mongoose"),
  passport = require("passport"),
  Profile = require("../../models/Profile"),
  User = require("../../models/User");

//Load Validatons
const validateProfileInput = require("../../validations/profile");

//@route   GET api/profile/test
//@desc    Tests profile route
//@access  public
router.get("/test", (req, res) => res.json({ msg: "Profile work !!" }));

//@route   GET api/profile
//@desc    Get current user profile
//@access  private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ uid: req.user.id })
      .populate("user", ["email", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = " There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route   GET api/profile/all
//@desc    Get all profiles
//@access  public
router.get("/all", (req, res) => {
  const errors = {};

  Profile.find()
    .populate("user", ["email", "avatar"])
    .then(profiles => {
      if (!profiles) {
        errors.noprofile = " No profiles found";
        return res.status(404).json(errors);
      }
      res.json(profiles);
    })
    .catch(error => res.status(404).json({ profile: "No profiles found" }));
});

//@route   GET api/profile/:id
//@desc    Get user profile by id
//@access  public
router.get("/:id", (req, res) => {
  const errors = {};

  Profile.findOne({ _id: req.params.id })
    .populate("user", ["email", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = " No profile found for this profile id";
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error => res.status(404).json(error));
});

//@route   GET api/profile/user/:user_id
//@desc    Get user profile by user id
//@access  public
router.get("/user/:user_id", (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate("user", ["email", "avatar"])
    .then(profile => {
      if (!profile) {
        errors.noprofile = " No profile found for this user id";
        res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(error =>
      res.status(404).json({ profile: "No profile for this user" })
    );
});

//@route   POST api/profile
//@desc    Create or Edit user profile
//@access  private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);
    //Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //Get Fields
    const profileFields = {};
    profileFields.uid = req.user.id;
    if (req.body.firstName) profileFields.firstName = req.body.firstName;
    if (req.body.lastName) profileFields.lastName = req.body.lastName;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.teamId) profileFields.teamId = req.body.teamId;
    if (req.body.jobRole) profileFields.jobRole = req.body.jobRole;
    //Skills - Split into array
    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }

    profileFields.social = {};
    if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
    if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

    Profile.findOne({ uid: req.user.id }).then(profile => {
      //Update
      if (profile) {
        Profile.findOneAndUpdate(
          { uid: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        //Create and save
        new Profile(profileFields).save().then(profile => res.json(profile));
      }
    });
  }
);

module.exports = router;
