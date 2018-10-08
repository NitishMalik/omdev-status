const express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	Post = require('../../models/Post'),
	Profile = require('../../models/Profile');

//validation
const validatePostInput = require('../../validations/post');
//@route   GET api/posts/test
//@desc    Tests posts route
//@access  public
router.get('/test', (req, res) => res.json({ msg: 'Posts work !!' }));

//@route   GET api/posts
//@desc    Get all posts
//@access  public
router.get('/', async (req, res) => {
	Post.find()
		//.cache({ key: req.user.id })
		.sort({ date: -1 })
		.then((posts) => {
			res.json(posts);
		})
		.catch((err) => res.status(404).json({ nopostFound: 'No posts found' }));
});

//@route   GET api/posts/:id
//@desc    Get post by id
//@access  public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch((err) => res.status(404).json({ nopostFound: 'No post found for this id' }));
});

//@route   POST api/posts
//@desc    Create post
//@access  private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	});
	newPost.save().then((post) => res.json(post));
});

//@route   DELETE api/posts/:id
//@desc    Delete post
//@access  private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (post.user.toString() !== req.user.id) {
					return res.status(401).json({ notauthorized: 'User not authorized' });
				}

				post.remove().then(() => res.json({ success: true }));
			})
			.catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
	});
});

//@route   POST api/posts/like/:id
//@desc    Like post
//@access  private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
					return res.status(400).json({ alreadyliked: 'User already liked this post' });
				}

				post.likes.unshift({ user: req.user.id });
				post.save().then((post) => res.json(post));
			})
			.catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
	});
});

//@route   POST api/posts/unlike/:id
//@desc    Unlike post
//@access  private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id)
			.then((post) => {
				if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
					return res.status(400).json({ notliked: 'Not yet liked' });
				}

				//Get remove index
				const removeIndex = post.likes.map((item) => item.user.toString()).indexOf(req.user.id);

				post.likes.splice(removeIndex, 1);
				//Save
				post.save().then((post) => res.json(post));
			})
			.catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
	});
});

//@route   POST api/posts/comment/:id
//@desc    Add comment to post
//@access  private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	Post.findById(req.params.id)
		.then((post) => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			};

			//Add to comments array
			post.comments.unshift(newComment);
			post.save().then((post) => res.json(post));
		})
		.catch((err) => res.status(404).json({ notfound: 'No post found' }));
});

//@route   DELETE api/posts/comment/:id/:comment_id
//@desc    Delete comment from post
//@access  private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			if (post.comments.filter((comment) => comment._id.toString() === req.params.commentY_id).length === 0) {
				return res.status(404).json({ commentnotexists: 'Comment doesnot exists' });
			}

			const removeIndex = post.comments.map((item) => item._id.toString()).indexOf(req.params.comment_id);

			post.comments.splice(removeIndex, 1);
			post.save().then((post) => res.json(post));
		})
		.catch((err) => res.status(404).json({ notfound: 'No post found' }));
});

module.exports = router;
