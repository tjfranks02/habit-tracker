const TIME_STR_LEN = 5;

/*
Takes in two times, a start time and an end time and ensures
that the start time is less than or equal to the end time
*/
exports.validateInterval = function(time1, time2) {
    
    let time1h = parseInt(time1.substring(0, 2));
    let time1m = parseInt(time1.substring(3, 5));
    let time2h = parseInt(time2.substring(0, 2));
    let time2m = parseInt(time2.substring(3, 5));

    if (time1h < time2h) {
        return true;
    }
    
    if (time1h === time2h && time1m < time2m) {
        return true;
    }

    return false;
}

/*
Returns true if the first time is smaller than the second time
*/
function timeComparator(time1, time2) {
    let time1h = parseInt(time1.substring(0, 2));
    let time1m = parseInt(time1.substring(3, 5));
    let time2h = parseInt(time2.substring(0, 2));
    let time2m = parseInt(time2.substring(3, 5));

    if (time1h < time2h) {
        return true;
    }
    
    if (time1h === time2h && time1m < time2m) {
        return true;
    }

    return false;
}

function insert(list, index, item) {
    list.splice(index, 0, item);
    return list;
}

function shouldInsert(sTimeList, eTimeList, sTimeNew, eTimeNew, index) {

    if (index !== sTimeList.length && !timeComparator(sTimeNew, sTimeList[index])) {
        return false;
    }

    //type 1 error. can't occur if element being inserted at front of list
    if (index !== 0) {
        if (timeComparator(sTimeNew, eTimeList[index - 1])) {
            return false;
        }
    }

    //type 2 error. can't occur if element being inserted at end of list
    if (index !== sTimeList.length) {
        if (timeComparator(sTimeList[index], eTimeNew)) {
            return false;
        }
    }

    return true;
}  

exports.insertHabit = function(habitList, newHabit) {

    let sTimeNew = newHabit.startTime;
    let eTimeNew = newHabit.endTime;
    let sTimeList = habitList.map(habit => habit.startTime);
    let eTimeList = habitList.map(habit => habit.endTime);

    let returnList = [];

    for (let index = 0; index <= habitList.length; index++) {
        if (shouldInsert(sTimeList, eTimeList, sTimeNew, eTimeNew, index)) {
            //add the element to the list in this position
            returnList = insert(habitList, index, newHabit);
            return [...returnList];
        }
    }
    return undefined;
}