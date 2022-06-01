const { kStringMaxLength } = require("buffer");
const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:[true, "Username not entered."]
    },
    email:{
        type:String,
        trim:true,
        required:[true, "Email not entered."]
    },
    password:{
        type:String,
        trim:true,
        required:[true, "Password not entered."]
    },
    streetAddress:{
        type:String,
        trim:true,
        required:[true, "Street address not entered."]
    },
    city:{
        type:String,
        trim:true,
        required:[true, "City not entered."]
    },
    state:{
        type:String,
        trim:true,
        required:[true, "State not entered."]
    },
    sellerData:{
        type:Object,
    },
    zipcode:{
        type:String,
        trim:true,
        required:[true, "Zipcode not entered."]
    },
    isSeller:{
        type:Boolean,
        required:[true, "isSeller not entered."]
    },
    image1:{
        type:String,
    },
    image2:{
        type:String
    },
    image3:{
        type:String
    },
    cart:{
        type:Array
    }
})

const User = mongoose.model("User", UserSchema);
module.exports = User;