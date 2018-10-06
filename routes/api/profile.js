const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Profile = require('../../models/Profile'),
	User = require('../../models/User');

//Load Validatons
const validateProfileInput = require('../../validations/profile');
const validatieTaskInput = require('../../validations/task');

//@route   GET api/profile/test
//@desc    Tests profile route
//@access  public
router.get('/test', (req, res) => res.json({ msg: 'Profile work !!' }));

//@route   GET api/profile
//@desc    Get current users profile
//@access  private

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};
	Profile.findOne({ user: req.user.id })
		.populate('user', [ 'name', 'email', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = ' There is no profile for this user';
				return res.status(404).json(errors);
			}

			res.json(profile);
		})
		.catch((err) => res.status(404).json(err));
});

//@route   GET api/profile/all
//@desc    Get all profiles
//@access  public
router.get('/all', (req, res) => {
	const errors = {};

	Profile.find()
		.populate('user', [ 'name', 'email', 'avatar' ])
		.then((profiles) => {
			if (!profiles) {
				errors.noprofile = ' No profiles found';
				return res.status(404).json(errors);
			}
			res.json(profiles);
		})
		.catch((error) => res.status(404).json({ profile: 'No profiles found' }));
});

//@route   GET api/profile/handle/:handle
//@desc    Get user profile by handle
//@access  public
router.get('/handle/:handle', (req, res) => {
	const errors = {};

	Profile.findOne({ handle: req.params.handle })
		.populate('user', [ 'name', 'email', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = ' No profile found for this handle';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((error) => res.status(404).json(error));
});

//@route   GET api/profile/user/:user_id
//@desc    Get user profile by handle
//@access  public
router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate('user', [ 'name', 'email', 'avatar' ])
		.then((profile) => {
			if (!profile) {
				errors.noprofile = ' No profile found for this handle';
				res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch((error) => res.status(404).json({ profile: 'No profile for this user' }));
});

//@route   POST api/profile
//@desc    Create or Edit user profile
//@access  private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);
	//Check validation
	if (!isValid) {
		return res.status(400).json(errors);
	}

	//Get Fields
	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.project) profileFields.project = req.body.project;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.status) profileFields.status = req.body.status;
	//Skills - Split into array
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}

	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;

	Profile.findOne({ user: req.user.id }).then((profile) => {
		//Update
		if (profile) {
			Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true }).then((profile) =>
				res.json(profile)
			);
		} else {
			//Create

			//Check if handle exists
			Profile.findOne({ handle: profileFields.handle }).then((profile) => {
				if (profile) {
					errors.handle = 'That handle already exists';
					res.status(400).json(errors);
				}

				//Save Profile
				new Profile(profileFields).save().then((profile) => res.json(profile));
			});
		}
	});
});

//@route   POST api/profile/task
//@desc    Add task to profile
//@access  private
router.post('/task', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatieTaskInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			const newTask = {
				name: req.body.name,
				application: req.body.application,
				details: req.body.details,
				from: req.body.from,
				to: req.body.to,
				dependencies: req.body.dependencies
			};

			//Add to task array
			console.log(profile);
			profile.task.unshift(newTask);

			profile.save().then((profile) => res.json(profile));
		})
		.catch((err) => res.status(404).json({ task: 'Something wrong with the task creation' }));
});

//@route   Delete api/profile/task/:task_id
//@desc    Delete the task
//@access  private
router.delete('/task/:task_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id })
		.then((profile) => {
			const removeIndex = profile.task.map((item) => item.id).indexOf(req.params.task_id);

			profile.task.splice(removeIndex, 1);
			profile.save().then((profile) => res.json(profile));
		})
		.catch((err) => res.status(404).json({ task: 'Something wrong while deleting task' }));
});

//@route   Delete api/profile
//@desc    Delete user and profile
//@access  private
router.delete('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOneAndRemove({ user: req.user.id })
		.then(() => {
			User.findOneAndRemove({ _id: req.user.id }).then(() => res.json({ success: true }));
		})
		.catch((err) => res.status(404).json({ task: 'Something wrong while deleting Profile' }));
});

module.exports = router;
