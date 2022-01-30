const routineEditor = require("../controllers/routines");

const jwtSimple = require("jwt-simple");
const secret = require("../config/keys").jwtSecret;

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
    app.post("/add", (req, res) => routineEditor.addHabit(req, res));
    app.get("/getroutine", (req, res) => routineEditor.getRoutine(req, res));
    app.post("/completetask", (req, res) => routineEditor.completeTask(req, res));
    app.delete("/deletetask", (req, res) => routineEditor.deleteTask(req, res));
};