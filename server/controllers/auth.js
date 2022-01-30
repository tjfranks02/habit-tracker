const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");

const jwtSecret = require("../config/keys").jwtSecret;

const SALT_ROUNDS = 10;

function genToken(userRecord) {
    let token = jwt.encode({sub: userRecord.username}, jwtSecret);
    return token
}

exports.signup = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.status(422).send({message: "Both username and password must be present!"});
    }

    User.findOne({username: username}, (err, existingRecord) => {
        if (err) {
            return next(err);
        }

        if (existingRecord) {
            return res.status(422).send({message: "Username taken!"});
        } else {
            bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
                new User({username: username, password: hash, routine: [], numtasks: 0, numcompleted: 0}).save();
                return res.json({token: genToken({username: username, password: hash})})
            });
        }
    });
};

exports.signin = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        return res.status(422).send({message: "Both username and password must be present!"});
    }

    User.findOne({username: username}, (err, existingRecord) => {
        if (err) {
            return next(err);
        }

        if (!existingRecord) {
            return res.status(422).send({
                message: "Incorrect username or password."
            });
        }

        bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {

            if (err) {
                return res.status(422).send({
                    message: "Couldn't log in."
                })
            }

            bcrypt.compare(password, existingRecord.password, 
                (err, result) => {

                    if (err) {
                        return res.status(422).send({
                            message: "Couldn't log in."
                        })
                    }

                    if (result) {
                        return res.json({token: genToken(existingRecord)});
                    } else {
                        return res.status(422).send({
                            error: "Incorrect username or password."
                        });
                    }
                }
            );
        })
    });

};
