const puppeteer = require('puppeteer');
require('dotenv').config();

const loginFn = async (page) => {
    await page.goto("https://cloud.nueip.com/login", { waitUntil: "domcontentloaded" }); //页面跳转, 第二个参数为可选options, 这里表示等待页面结构加载完成, 无需等待img等资源
    console.log("登录页加载成功!"); //控制台输出一下进度

    const secret = {
        inputCompany: process.env["inputCompany"],
        inputID: process.env["inputID"],
        inputPassword: process.env["inputPassword"],
    }

    await page.evaluate((secret) => {
        //在当前页面执行js代码, 也就是在浏览器环境执行代码, 可以使用所有的浏览器API
        const inputCompany = document.querySelector("input[name=inputCompany]")
        const inputID = document.querySelector("input[name=inputID]"); //用户名input
        const inputPassword = document.querySelector("input[name=inputPassword]"); //密码input
        const loginInput = document.getElementById("login-button"); //登陆按钮

        inputCompany.value = secret.inputCompany,
            inputID.value = secret.inputID; //输入用户名密码
        inputPassword.value = secret.inputPassword;
        loginInput.click(); //点击登陆
    }, secret);

    await page.waitForNavigation(); //因为要跳转页面, 所以这里等待页面导航
    // 查找打卡选项入口在哪, 我的打卡入口登陆后->推荐列表->本科生健康状况申报
    console.log("登陆成功!");

}

const main = async (action) => {
    const browser = await puppeteer.launch({
        //启动
        ignoreDefaultArgs: ['--disable-extensions'],
        headless: true // 是否以无头模式运行, 默认ture. 无头就是不打开Chrome图形界面, 更快.
    });
    const page = await browser.newPage(); // 打开一个页面, page就是后序将要操作的
    page.setDefaultNavigationTimeout(120000); // 设置页面的打开超时时间, 因为我要打卡的是学校的垃圾服务器, 超时时间设置了2分钟

    try {
        // 登陆
        await loginFn(page)

        await page.evaluate((buttonId) => {
            document.getElementById(buttonId).click();
        }, action);

        console.log(`${action} 成功`);

        await browser.close(); //关闭浏览器结束
    } catch (err) {
        console.log("签到过程出错了!");
        await browser.close();
        throw err;
    }
};

module.exports = main