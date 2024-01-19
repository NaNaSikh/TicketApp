const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    password: String,
    myTicket: Array,
    myTicketCategory: Array,
    ticketNumber: Array
}); 

module.exports = mongoose.model("users" , userSchema);