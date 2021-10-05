const CronJob = require("cron").CronJob; // 引入
const index = require("./index"); // 定时每次执行的任务
const utils = require('./utils/utils')

console.log("cron job 開始");

const clockInJob = (success, fail) => {
    // success成功回调, fail失败回调
    let succeed = false; // 今天是否打卡成功
    let today = new Date().getDate(); // 今天的日期
    // Seconds: 0-59
    // Minutes: 0-59
    // Hours: 0-23
    // Day of Month: 1-31
    // Months: 0-11 (Jan-Dec)
    // Day of Week: 0-6 (Sun-Sat)
    const job = new CronJob(
        "0 35 9 * * 1-6",
        async onComplete => {
            // 計算假日
            if (utils.isHoliday()) {
                return
            }
            // 主任务, 参数分别代表任务时间, 任务, 任务完成回调
            const _today = new Date().getDate(); //任务执行时的日期
            // 新增 隨機延遲
            await utils.randomSleep(5);

            if (today !== _today) {
                // 如果任务执行的日期和之前的日期不一样说明已经是第二天了
                succeed = false; // 第二天, 还没打卡, succeed  = false
                today = _today;
            }
            if (!succeed) {
                try {
                    await index('clockin');
                } catch (err) {
                    fail && fail();
                    onComplete("失败!");
                    succeed = false;
                    return;
                }
                succeed = true;
                success && success();
                onComplete("成功!");
            }
        },
        s => {
            // onComplete
            console.log(s, new Date().toLocaleString());
            console.log("----------");
        }
    );
    job.start(); // 任务开始
};

const clockOutJob = (success, fail) => {
    // success成功回调, fail失败回调
    let succeed = false; // 今天是否打卡成功
    let today = new Date().getDate(); // 今天的日期
    const job = new CronJob(
        "0 30 18 * * 1-6",
        async onComplete => {
            // 計算假日
            if (utils.isHoliday()) {
                return
            }
            // 主任务, 参数分别代表任务时间, 任务, 任务完成回调
            const _today = new Date().getDate(); //任务执行时的日期
            // 新增 隨機延遲
            await utils.randomSleep(5);

            if (today !== _today) {
                // 如果任务执行的日期和之前的日期不一样说明已经是第二天了
                succeed = false; // 第二天, 还没打卡, succeed  = false
                today = _today;
            }
            if (!succeed) {
                try {
                    await index('clockout');
                } catch (err) {
                    fail && fail();
                    onComplete("失败!");
                    succeed = false;
                    return;
                }
                succeed = true;
                success && success();
                onComplete("成功!");
            }
        },
        s => {
            // onComplete
            console.log(s, new Date().toLocaleString());
            console.log("----------");
        }
    );
    job.start(); // 任务开始
};

const success = () => {
    console.log(`打卡成功 ${new Date().toLocaleString()}`);
};

const fail = () => {
    console.log(`打卡失败! ${new Date().toLocaleString()}`);
};

clockInJob(success, fail);
clockOutJob(success, fail);

