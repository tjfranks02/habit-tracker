const jwtSimple = require("jwt-simple");

const timeParser = require("../util/timeParser");
const jwtSecret = require("../config/keys").jwtSecret;
const User = require("../models/User");

/*
this is for use when the token has already been verified as belonging to a particular user.
it will decode the token and return the unique username associated with it...
*/
function getUsername(token) {
    let user = jwtSimple.decode(token, jwtSecret);
    return user.sub;
}

exports.addHabit = (req, res, next) => {

    //remember that the request is already verified as being authenticated!
    let habit = req.body.habit;
    let username = getUsername(req.body.token);

    if (!habit || !habit.startTime || !habit.endTime) {
        return res.status(422).json({message: "Can't process request!"});
    }

    //we need to retrieve the current list of habits for this user.
    User.findOne({username: username}, "routine", (err, userRecord) => {

        if (err) {
            return next(err);
        }

        let userRoutine = userRecord.routine;
        let updatedRoutine = timeParser.insertHabit(userRoutine, habit);

        if (!updatedRoutine) {
            return res.status(422).json({message: "Time slot already taken in routine"});
        }
        
        User.updateOne({username: username}, {$inc: {numtasks: 1}, $set: {routine: updatedRoutine}}, () => {
            if (err) {
                return res.status(500).json({message: "Error updating routine."});
            }
        });

        return res.json({routine: updatedRoutine}); 
    }); 
};

exports.getRoutine = (req, res) => {
    let username = getUsername(req.header("Authorization"));

    if (!username) {
        return res.status(422).json({message: "Nope."});
    }

    User.findOne({username: username}, "routine", (err, routine) => {

        if (err) {
            return res.status(500).json({message: "Error fetching routine!"});
        }

        return res.json({routine: routine.routine});
    });
};

/*
called when post request is made to /completeTask. basically marks the task as
completed in the db so that it won't be displayed...
*/
exports.completeTask = (req, res) => {
    let username = getUsername(req.header("Authorization"));
    let startTime = req.body.startTime;

    if (!username) {
        return res.status(422).json({message: "Failed to mark task as completed."});
    }

    User.updateOne({username: username, "routine.startTime": startTime}, {$inc: {numcompleted: 1}, $set: {"routine.$.completed": true}}, (err) => {
        if (err) {
            res.status(500).json({message: "Some kinda error with db."});
        }

        return res.json({success: true});
    });
};

exports.deleteTask = (req, res) => {

    let username = getUsername(req.header("Authorization"));
    let startTime = req.header("Starttime");
    let completed = req.header("Completed");

    let incVal = 0;
    if (completed === "true") {
        incVal -= 1;
    }

    User.updateOne({username: username}, {$inc: {numtasks: -1, numcompleted: incVal}, $pull: {routine: {startTime: startTime}}}, (err) => {
        if (err) {
            return res.status(500).json({message: "Some kinda error with db."});
        }

        return res.json({routine: "Hello there"});
    });
};  