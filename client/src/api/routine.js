const axios = require("axios");
const SERVER_IP = require("./config").SERVER_IP;

const BASE_URL = "http://localhost:5000";

export async function attemptAddHabit(payload) {
    let res = {};

    try {
        res = await axios.post(BASE_URL + "/add", {habit: payload, token: localStorage.getItem("token")});
        //signing up returns a token
        return res.data.routine;
    } catch (e) {
        return undefined;
    }
};

export async function getRoutine(payload) {
    let res = {};

    try {
        res = await axios.get(BASE_URL + "/getroutine", {headers: {Authorization: `${payload.token}`}});
        //if this works, we will receive a list of habits in return
        return res.data.routine;
    } catch (e) {
        return undefined;
    }
};

export async function completeTask(task, after) {
    let res = {};

    let token = localStorage.getItem("token");
    
    try {
        res = await axios.post(BASE_URL + "/completetask", 
                {startTime: task.startTime}, 
                {headers: {Authorization: `${token}`}}
            );
        after();
        return res.data.routine;
    } catch (e) {
        return undefined;
    }
}

export async function deleteTask(task, after) {
    let res = {};

    let token = localStorage.getItem("token");

    try {
       res = await axios.delete(BASE_URL + "/deletetask", 
            {headers: {Authorization: `${token}`, StartTime: task.startTime, Completed: task.completed}});
        after();
        console.log(res.data.routine);
        return res.data.routine; 
    } catch(e) {
        return undefined;

    }
};
