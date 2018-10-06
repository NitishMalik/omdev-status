const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name: {
        type:String, 
        required:true
    },
    email: {
        type:String, 
        required:true
    },
    password: {
        type:String, 
        required:true
    },
    date: {
        type:Date, 
        default:Date.now
    }
});

UserSchema.methods.customMethod = function(){
    var user = this ;
    //TODO : Custom methods can be created on schema 
}

UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject,["name", "email"]);
};

//TODO: Use A static method 
UserSchema.statics.findByToken = function(token){

}

UserSchema.pre('save', function(next) {
    //TODO: password encryption can happend here before saving
    next();
})

module.exports = User = mongoose.model("users", UserSchema);
