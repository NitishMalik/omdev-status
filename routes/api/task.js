const express = require('express'),
	router = express.Router(),
	passport = require('passport'),
	Profile = require('../../models/Profile'),
	User = require('../../models/User');

const validatieTaskInput = require('../../validations/task');

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
