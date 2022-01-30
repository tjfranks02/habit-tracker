const auth = require("../controllers/auth");

const jwtSimple = require("jwt-simple");

const User = require("../models/User");
const routineEditor = require("../controllers/routines");
const secret = require("../config/keys").jwtSecret;

module.exports = (app) => {
    app.post("/signin", (req, res) => {auth.signin(req, res)})
    app.post("/signup", (req, res) => {auth.signup(req, res)});
    app.get("/", (req, res) => res.send("Hello there!"));
};
