const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const options ={};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretForToken ;

module.exports = passport => {
    passport.use(new JwtStrategy(options,(jwt_payload, done)=>{    
       User.findById(jwt_payload.id)
            .then(user => {
                //console.log(user);
                if(user){
                    return done(null, user);
                }else{
                    return done(null, false);
                }
            })
            .catch(err => console.log(err));    
    }))
}