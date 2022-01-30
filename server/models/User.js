const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    numtasks: Number,
    numcompleted: Number,
    routine: [{
        startTime: String,
        endTime: String,
        description: String,
        name: String,
        completed: Boolean
    }]
});

//create a new collection called users
module.exports = mongoose.model("users", userSchema);
