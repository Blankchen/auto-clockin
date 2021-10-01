### 參考 
https://juejin.cn/post/6844904097867366414
### 安裝步驟
1. 專案內 
```
npm install
```
2. 複製 .env.example 改名為 .env 在裡面填入帳號密碼
3. 全域安裝 pm2
```
npm install -g pm2
```
4. 開始執行程式
```
pm2 start cron
```
5. 觀看 log
```
pm2 log
```