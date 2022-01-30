const scheduler = require("node-schedule");
const Session = require("../models/Session");
const User = require("../models/User");

const resetStats = () => {
    let date = new Date();
    date.setDate(date.getDate() - 1);

    let dateString = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    
    User.find({}, (err, userRecords) => {

        if (err || !userRecords) {
            return;
        }

        //for each user record, insert a daily summary of their routine
        let sessionDetails = userRecords.map((user) => {
            return {numcompleted: user.numcompleted, numtasks: user.numtasks, username: user.username, date: date, dateString: dateString};
        });

        Session.insertMany(sessionDetails, (err) => {
            if (err) {
                return;
            }
        });

        User.updateMany({}, {$set: {numcompleted: 0, "routine.$[].completed": false}}, (err) => {
            if (err) {
                return;
            }
        })
    });
};

const job = scheduler.scheduleJob("0 0 0 * * *", () => {
    resetStats();
});