const axios = require("axios");
const SERVER_IP = require("./config.js").SERVER_IP;

const BASE_URL = "http://localhost:5000";

exports.signUp = async function signUp(user, after) {

    let res = {};

    try {
        res = await axios.post(BASE_URL + "/signup", user);
        //signing up returns a token
        localStorage.setItem("token", res.data.token);
        after();
        return res.data.token;
    } catch (e) {
        return undefined;
    }
};

exports.signIn = async function signIn(user, after) {
    
    try {
        let payload = user;
        let res = await axios.post(BASE_URL + "/signin", payload);
        //signing in returns a token
        localStorage.setItem("token", res.data.token);
        after();
        return res.data.token;
    } catch (e) {
        return undefined;
    }
};
