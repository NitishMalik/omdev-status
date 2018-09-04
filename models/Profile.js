const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref:'users'
    },
    handle : {
        type : String, 
        required : true,
        max:40
    },
    project : {
        type : String
    },
    location:{
        type : String 
    }, 
    status:{
        type: String,
        required: true
    },
    skills :{
        type:[String],
        required: true
    },
    Task: [
        {
            name:{
                type: String, 
                required : true
            },
            application:{
                type: String, 
                required:true
            },
            details:{
                type: String 
            },
            from: {
                type : Date,
                required : true
            },
            to:{
                type: Date
            },
            dependencies:{
                type:String
            }
        }
    ],
    social:{
        youtube:{
            type: String
        },
        linkedin:{
            type:String
        }
    },
    date:{
        type: Date, 
        default: Date.now
    }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);