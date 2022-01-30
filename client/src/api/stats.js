const axios = require("axios");
const SERVER_IP = require("./config").SERVER_IP;

const BASE_URL = "http://localhost:5000";

export const fetchStats = async (startDate, endDate) => {
    let res = {};

    let token = localStorage.getItem("token");

    try {
        res = await axios.get(BASE_URL + "/stats/alltime", {headers: {Authorization: `${token}`, startDate: startDate, endDate: endDate}});
        return res.data;
    } catch (e) {
        return undefined;
    }
};
