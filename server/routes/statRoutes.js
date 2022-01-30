const jwtSimple = require("jwt-simple");
const secret = require("../config/keys").jwtSecret;

const statManager = require("../controllers/stats");

function restrict(req, res, next) {

    let user = jwtSimple.decode(req.header("Authorization"), secret);

    User.findOne({username: user.username}, (err, existingRecord) => {

        if (existingRecord) {
            next();
        } else {
            res.status(401).json({message: "Unauthenticated request made to protected resource!"});
        }
    });
}

module.exports = (app) => {
    app.get("/stats/alltime", (req, res) => statManager.fetchAllTime(req, res));
};