const mongoose = require('mongoose');


const TicketSchema = new mongoose.Schema({
    category: String,
    eventName: String,
    description: String,
    numberOfSeats: Number,
    Price: Number
}); 

module.exports = mongoose.model("musictickets" , TicketSchema);
