const mongoose = require("mongoose");
const {Schema} = mongoose;

const sessionSchema = new Schema({
    username: String,
    date: Date,
    dateString: String,
    numtasks: Number,
    numcompleted: Number
});

//create a new collection called users
module.exports = mongoose.model("sessions", sessionSchema);