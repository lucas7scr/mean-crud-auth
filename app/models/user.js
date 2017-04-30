const mongoose = require('mongoose')
const bcrypt   = require('bcrypt')

const UserSchema = mongoose.Schema({
    username:{
        type: String,
        index:true
    },
    password:{
        type:String
    },
    email:{
        type: String
    },
    name:{
        type:String
    }
});