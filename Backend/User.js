const mongodb = require('mongodb');

const userSchema = new mongodb.Schema({
    name: String,
    email: String,
    lastName : String,
    password:String, 
    phoneNumber: mongodb.Int32,
    userName:String
}); 

module.exports = mongodb.model("users", userSchema);