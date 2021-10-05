/**
 * 
 * @param {Date} today 
 * @returns 
 */
const isHoliday = (today = new Date()) => {
    // https://lovefree365.pixnet.net/blog/post/405231785-%E3%80%902022%E8%A1%8C%E4%BA%8B%E6%9B%86%28%E6%B0%91%E5%9C%8B111%E5%B9%B4%29%E3%80%91%E5%9C%8B%E5%AE%9A%E5%81%87%E6%97%A5%2C%E9%80%A3%E5%81%87%E8%A3%9C%E7%8F%AD%2C
    const holidayArray = [
        "2021-10-11", // 國慶日補假(10/11)，放假1日
        "2021-12-31", // 元旦 補假
        "2022-01-31",
        "2022-02-01",
        "2022-02-02",
        "2022-02-03",
        "2022-02-04",
        "2022-02-28",
        "2022-04-04",
        "2022-04-05",
        "2022-06-03",
        "2022-09-09",
        "2022-10-10",
    ]
    const checkDate = (x) => {
        return new Date(x).setHours(0, 0, 0, 0) == new Date(today).setHours(0, 0, 0, 0);
    }

    // 週六補班
    const workDayArray = [
        "2022-01-22"
    ]
    const isSaturday = today.getDay() === 6
    if (workDayArray.some(checkDate)) {
        console.log('### 補班', today.toLocaleString())
        return false;
    } else if (isSaturday) {
        return true;
    }

    const isHoliday = holidayArray.some(checkDate);
    if (isHoliday) {
        console.log('### 國定假日', today.toLocaleString())
    }
    return isHoliday
}

/**
 * 
 * @param {number} minutes 
 * @returns 
 */
const randomSleep = async (minutes) => {
    const randomTime = Math.random() * minutes * 60 + Math.random() * 60
    return new Promise(r => setTimeout(r, randomTime * 1000));
}


module.exports = {
    isHoliday,
    randomSleep,
}