const express     = require("express"),
      mongoose    = require("mongoose"),
      bodyparser  = require('body-parser'),
      passport    = require('passport'),
      users       = require('./routes/api/users'),
      posts       = require('./routes/api/posts'),
      profile     = require('./routes/api/profile');      

const app = express();

//Body parser middleware
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//Get DB config
const db = require("./config/keys").mongoURI;

//Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
//Passport config
require('./config/passport')(passport);

//Use routes
app.use("/api/users", users);
app.use("/api/posts", posts);
app.use("/api/profile", profile);

//setting app port
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));
