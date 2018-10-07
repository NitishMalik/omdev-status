const express = require('express'),
	mongoose = require('mongoose'),
	bodyparser = require('body-parser'),
	passport = require('passport'),
	user = require('./routes/api/user'),
	post = require('./routes/api/post'),
	profile = require('./routes/api/profile'),
	task = require('./routes/api/task'),
	team = require('./routes/api/team'),
	path = require('path'),
	cache = require('./cache');

const app = express();

//Body parser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Get DB config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB Connected'))
	.catch((err) => console.log(err));

//Passport middleware
app.use(passport.initialize());
//Passport config
require('./config/passport')(passport);

//Use routes
app.use('/api/user', user);
app.use('/api/post', post);
app.use('/api/profile', profile);
app.use('/api/task', task);
app.use('/api/teams', team);

//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	//Set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

//setting app port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
