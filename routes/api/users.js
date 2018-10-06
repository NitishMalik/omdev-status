const express = require('express'),
	router = express.Router(),
	User = require('../../models/User'),
	bcrypt = require('bcryptjs'),
	jwt = require('jsonwebtoken'),
	keys = require('../../config/keys'),
	passport = require('passport'),
	gravatar = require('gravatar');

//Load input validations
const validateRegisterInputs = require('../../validations/register');
const validateLoginInputs = require('../../validations/login');

//@route   GET api/users/test
//@desc    Tests users route
//@access  public
router.get('/test', (req, res) => res.json({ msg: 'Users work !!' }));

//@route   POST api/users/register
//@desc    Register User
//@access  public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInputs(req.body);
	//validation check
	if (!isValid) {
		return res.status(400).json(errors);
	}
	User.findOne({ email: req.body.email }).then((user) => {
		if (user) {
			errors.email = 'Email already exists !!';
			return res.status(400).json(errors);
		} else {
			const avatar = gravatar.url(req.body.email, {
				s: '200', // Size
				r: 'pg', // Rating
				d: 'mm' // Default
			});

			const newUser = new User({
				name: req.body.name,
				email: req.body.email,
				avatar,
				password: req.body.password
			});

			//TODO: Use _pick from loadash - Sample
			//var body =_pick(req.body, ['email','password']);
			//var user = new User(body);

			//Encrypting password
			bcrypt.genSalt(10, (err, salt) => {
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					newUser.password = hash;
					newUser.save().then((user) => res.json(user)).catch((err) => console.log(err));
				});
			});
		}
	});
});

//@route   POST api/users/login
//@desc    Login User
//@access  public
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInputs(req.body);
	//validation check
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const email = req.body.email;
	const password = req.body.password;

	User.findOne({ email }).then((user) => {
		if (!user) {
			errors.email = 'User not found';
			return res.status(404).json(errors);
		}

		//Match password if user found
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// Create JWT payload
				const payload = {
					id: user._id,
					name: user.name,
					avatar: user.avatar
				};
				//Sign the token if user matched
				jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
					res.json({
						success: true,
						token: 'Bearer ' + token // Bearer is a certain protocol
						//token will be passed in header so appending bearer in token
					});
				});
			} else {
				errors.password = 'Password Incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

//@route   GET api/users/current
//@desc    Current Page
//@access  private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		id: req.user.id,
		name: req.user.name,
		email: req.user.email
	});
});

module.exports = router;
