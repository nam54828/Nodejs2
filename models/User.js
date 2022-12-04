const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
        minlength: 6,
        maxlength: 20,
    },
    firstname:{
        type: String,
        require: true,
    },
    lastname:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        minlength: 10,
        maxlength: 50,
        unique: true
    },
    phonenumber:{
        type: String,
        require: true,
        minlength: 6,
        maxlength: 12,
    },
    address:{
        type: String,
        require: true,
        minlength: 3,
        maxlength: 50,
    },
    password:{
        type:String,
        require: true,
        minlength: 6
    },
},{timestamps: true}
);

module.exports = mongoose.model("User",userSchema);