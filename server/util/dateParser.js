const DATE_STR_LEN = 10;

/*
Takes two strings in yyyy-mm-dd format. If first one is bigger than the second
one, returns false.
*/
exports.validateDates = (startDate, endDate) => {

    if (!startDate || !endDate) {
        return undefined;
    }

    let startYear = parseInt(startDate.substring(0, 4));
    let startMonth = parseInt(startDate.substring(5, 7));
    let startDay = parseInt(startDate.substring(8, 10));
    let endYear = parseInt(endDate.substring(0, 4));
    let endMonth = parseInt(endDate.substring(5, 7));
    let endDay = parseInt(endDate.substring(8, 10));

    if (startYear > endYear) {
        return undefined;
    }

    if (startYear == endYear && startMonth > endMonth) {
        return undefined;
    }

    if (startYear == endYear && startMonth == endMonth && startDay > endDay) {
        return undefined;
    }

    return [new Date(startDate + " 00:00"), new Date(endDate + " 00:00")];
};