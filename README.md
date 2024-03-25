![image](https://github.com/pigbearhsien/qbby-tracking/blob/main/frontend/src/assets/screenshot.png)

<h1 align="center">Qbby - tracking and planning</h1>
<p align="center">
  <a href="#introduction"><strong>Introduction</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#project-structure"><strong>Project Structure</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#contact-me"><strong>Contact Me</strong></a> 
</p>
<br/>

## **Introduction**

Qbby is an interactive app that combines timers, calendars, and to-do lists with a monster-collecting mechanic, providing users with motivation and focus to complete daily tasks and activities. See <a href="#installation"><strong>Installation</strong></a> to get started right away.

## Demo

[[111-1] Web Programming Final(Group 102) Qbby - tracking and planning](https://youtu.be/LOhZrFLTvCY)

## Features

主要的功能有以下三個：

- TODO list：隨時新增代辦事項，新加入的事項會顯示在最下面，完成後點擊左邊的怪獸 icon，若想刪除則點擊右邊的垃圾桶 icon。
- 計時器：當使用者開始專注時，即按下 ”start”，之後，使用者隨時可以停止並點擊 ”save record“ 把當次紀錄存入資料庫。存紀錄時，會要求使用者輸入當次紀錄的 tag，如「作業」、「數學」...等。右邊的面板除了顯示當天的專注紀錄之外，也可以選取過去的日期查看過去的專注紀錄，面板的右上角會顯示每一日的總專注時長。
- 行事曆：行事曆有四種顯示方式，分別是月檢視、週檢視、日檢視以及清單顯示。使用月檢視時，可以單擊某日新增當日活動，也可以按住某日再拖曳滑鼠新增連續日期的活動。在月檢視新增的活動只有日期沒有時間，若要新增有詳細時間的活動可以至週檢視或日檢視新增。每次新增活動時，會要求使用者選擇活動類型，不同活動類型在行事曆上顯示的顏色也不同。

除了主要功能之外，加入的怪獸元素，其經驗值、錢幣、升等級的規則如下：

- 時間： 每日統計的時間包含： 昨日總 StudyTime 昨日結束的所有 Calendar Event
- 等級： 隨著等級提升，升級所需經驗值也會隨之提升，以 120 為基底。 Lv.1 -> Lv.2: 120exp Lv.2 -> Lv.3: 240exp Lv.3 -> Lv.4: 480exp 以此類推。 等級提升也會使怪獸產生金錢的能力提升，Lv.1 的怪獸每分鐘能產 $1，Lv.2 $2/min 以此類推
- 金錢： 金錢的產生方式如『等級』所提，由時間換成金錢並隨等級提升而增加 5
- 經驗值： 由時間兌換而成，結算的 StudyTime & EventTime 總和以分鐘計，1 min -> 1exp 結算方式： 於每日 5 am 更新資料，結算所有『時間』，兌換時間成金錢與經驗值並刷新紀錄。 會於每日 5 am 後的第一次登入跳出 popup 畫面告知結算結果並更新。 若要更改更新時間，詳見 ReadMe.md
- 商城： 商城內容為各種不同外觀的頭像以及怪獸，供使用者選擇。當使用者取得相對應數量之金幣時，便能根據自己的喜好，更換其他外觀。 商品共有三種狀態，分別為 purchase、apply、disapply。點選 purchase 能夠購買商品；點選 apply 能夠套用已購買之商品；點選 disapply 能夠將外觀恢復為預設值。 右側提供切換品項的功能，有頭像與怪獸兩種品項供選擇。

## Installation

**1. Download Repo**

```
$ git clone https://github.com/pigbearhsien/qbby-tracking.git
$ cd qbby-tracking
$ yarn install:all
```

**2. Create .env file in ./backend**

```
$ cd backend
$ cp .env.example .env
```

**3. Set up the environment variables in .env file in ./backend**

```
MONGO_URL= //your MongoDB link
```

**4. Start the app** **in ./qbby-tracking**

```
$ yarn server
$ yarn start
```

**5. Visit `http://localhost:3000` to view your application**

## Project Structure

File structure:

```
.
├── Dockerfile
├── README.md
├── backend
│   ├── package-lock.json
│   ├── package.json
│   ├── src
│   │   ├── models
│   │   │   ├── calender.js
│   │   │   ├── info.js
│   │   │   ├── market.js
│   │   │   └── todo.js
│   │   ├── routes
│   │   │   ├── calender.js
│   │   │   ├── index.js
│   │   │   ├── info.js
│   │   │   ├── market.js
│   │   │   ├── timer.js
│   │   │   └── todo.js
│   │   └── server.js
│   ├── yarn-error.log
│   └── yarn.lock
├── frontend
│   ├── README.md
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src
│   │   ├── App.css
│   │   ├── App.js
│   │   ├── App.test.js
│   │   ├── assets
│   │   │   ├── Background.png
│   │   │   ├── Background70.png
│   │   │   ├── Market4xxc.png
│   │   │   ├── angel.png
│   │   │   ├── cat.png
│   │   │   ├── clock.png
│   │   │   ├── cupcake.png
│   │   │   ├── greenMon.png
│   │   │   ├── loginPage.png
│   │   │   ├── loginPage_info.png
│   │   │   ├── loginPage_move.png
│   │   │   ├── loginPage_title.png
│   │   │   ├── man.png
│   │   │   ├── menu.png
│   │   │   ├── orangeMon.png
│   │   │   ├── profileBaby.gif
│   │   │   ├── purpleMon.png
│   │   │   ├── redMon.png
│   │   │   ├── robot.png
│   │   │   ├── rotate.png
│   │   │   ├── star.png
│   │   │   ├── thinking.png
│   │   │   ├── woman.png
│   │   │   └── yellowMon.png
│   │   ├── components
│   │   │   ├── calendar.css
│   │   │   ├── calendar.js
│   │   │   ├── expBar.css
│   │   │   ├── expBar.js
│   │   │   ├── mainDrawer.css
│   │   │   ├── mainDrawer.js
│   │   │   ├── marketItem.css
│   │   │   ├── marketItem.js
│   │   │   ├── moneyBar.css
│   │   │   ├── moneyBar.js
│   │   │   ├── profile.css
│   │   │   ├── profile.js
│   │   │   ├── record.css
│   │   │   ├── themePicker.js
│   │   │   ├── timer.css
│   │   │   ├── timer.js
│   │   │   ├── todoList.css
│   │   │   └── todoList.js
│   │   ├── hooks
│   │   │   ├── api.js
│   │   │   └── util.js
│   │   ├── images
│   │   │   ├── banners.gif
│   │   │   └── savemoney.gif
│   │   ├── index.css
│   │   ├── index.js
│   │   ├── logo.svg
│   │   ├── pages
│   │   │   ├── calenderPage.js
│   │   │   ├── loginPage.css
│   │   │   ├── loginPage.js
│   │   │   ├── mainPage.css
│   │   │   ├── mainPage.js
│   │   │   ├── marketPage.css
│   │   │   ├── marketPage.js
│   │   │   ├── popUp.css
│   │   │   ├── timerPage.css
│   │   │   └── timerPage.js
│   │   ├── reportWebVitals.js
│   │   └── setupTests.js
│   └── yarn.lock
├── package-lock.json
├── package.json
└── yarn-error.log
```

## Tech Stack

Qbby is built on the following stack:

- [React](https://react.dev/) - framework
- [MUI](https://mui.com/) - components
- [MongoDB](https://www.mongodb.com) - database
- [FullCalendar](https://fullcalendar.io/) - calendar

## Contact Me

- Email: sally920611@gmail.com
- Facebook: [https://www.facebook.com/hsieh.sally.7/](https://www.facebook.com/hsieh.sally.7/)
