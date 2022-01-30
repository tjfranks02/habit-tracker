const User = require("../models/User");
const Session = require("../models/Session");

const jwtSimple = require("jwt-simple");
const jwtSecret = require("../config/keys").jwtSecret;
const dateParser = require("../util/dateParser");

/*
this is for use when the token has already been verified as belonging to a particular user.
it will decode the token and return the unique username associated with it...
*/
function getUsername(token) {
    let user = jwtSimple.decode(token, jwtSecret);
    return user.sub;
}

function yyyymmdd(date) {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + (date.getDate());
}

/*
Taking in statistics for a particular period of time (from 1 day to all time),
generates a bunch of easy to use data for the client side to display in graphs and such.
*/
function compileStats(sessionData) {

    let totalTasks = 0;
    let totalNumComplete = 0;

    for (let index = 0; index < sessionData.length; index++) {
        totalTasks += sessionData[index].numtasks;
        totalNumComplete += sessionData[index].numcompleted;
    }

    let dailyPercentages = sessionData.map(({numtasks, numcompleted}) => numcompleted / numtasks);
    let dates = sessionData.map(({date}) => yyyymmdd(date));

    return {totalTasks: totalTasks, totalComplete: totalNumComplete, dailyPercentages: dailyPercentages, dates: dates};
}

exports.fetchAllTime = (req, res) => {

    let username = getUsername(req.header("Authorization"));
    let startDate = req.header("startDate");
    let endDate = req.header("endDate");

    objs = dateParser.validateDates(startDate, endDate);

    if (!startDate || !endDate || !objs) {
        return res.status(422).json({message: "Invalid pairing of start and end dates."});
    }

    let startDate2 = objs[0];
    let endDate2 = objs[1]; 

    let startDateString = startDate + "T";

    Session.find({username: username, date: {$gt: startDate2, $lt: endDate2}}, (err, sessionData) => {
        if (err) {
            return res.status(422).json({message: "Something went wrong fetching from DB."});
        }

        let statistics = compileStats(sessionData);
        return res.json(statistics);
    });
};