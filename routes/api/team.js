const express = require('express'),
	router = express.Router(),
	Team = require('../../models/Team');

//@route   GET api/team/all
//@desc    Get all teams
//@access  public
router.get('/', (req, res) => {
	const errors = {};
	Team.find()
		.then((teams) => {
			if (!teams) {
				errors.noTeams = ' No teams found';
				return res.status(404).json(errors);
			}
			res.json(teams);
		})
		.catch((error) => res.status(404).json({ team: 'No teams found' }));
});

module.exports = router;
