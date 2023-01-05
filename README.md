---
title: Readme
# YAML
---
# (Group 102) Qbby - tracking and planning
[TOC]
## Demo 影片連結
上傳中
## 網路服務說明
Qbby的發想是，將計時器、行事曆、代辦事項，結合像發票怪獸一樣養成、搜集怪獸的方式，讓使用者更有動力、更專注地完成每日任務和活動。
因此，主要的功能有以下三個：

- TODO list：隨時新增代辦事項，新加入的事項會顯示在最下面，完成後點擊左邊的怪獸 icon，若想刪除則點擊右邊的垃圾桶 icon。
- 計時器：當使用者開始專注時，即按下 ”start”，之後，使用者隨時可以停止並點擊 ”save record“ 把當次紀錄存入資料庫。存紀錄時，會要求使用者輸入當次紀錄的 tag，如「作業」、「數學」...等。右邊的面板除了顯示當天的專注紀錄之外，也可以選取過去的日期查看過去的專注紀錄，面板的右上角會顯示每一日的總專注時長。
- 行事曆：行事曆有四種顯示方式，分別是月檢視、週檢視、日檢視以及清單顯示。使用月檢視時，可以單擊某日新增當日活動，也可以按住某日再拖曳滑鼠新增連續日期的活動。在月檢視新增的活動只有日期沒有時間，若要新增有詳細時間的活動可以至週檢視或日檢視新增。每次新增活動時，會要求使用者選擇活動類型，不同活動類型在行事曆上顯示的顏色也不同。

除了主要功能之外，加入的怪獸元素，其經驗值、錢幣、升等級的規則如下：
- 時間：
每日統計的時間包含：
昨日總 StudyTime
昨日結束的所有 Calendar Event
- 等級：
隨著等級提升，升級所需經驗值也會隨之提升，以120為基底。
Lv.1 -> Lv.2: 120exp
Lv.2 -> Lv.3: 240exp
Lv.3 -> Lv.4: 480exp 以此類推。
等級提升也會使怪獸產生金錢的能力提升，Lv.1 的怪獸每分鐘能產 $1，Lv.2 $2/min 以此類推
- 金錢：
金錢的產生方式如『等級』所提，由時間換成金錢並隨等級提升而增加5
- 經驗值：
由時間兌換而成，結算的 StudyTime & EventTime 總和以分鐘計，1 min -> 1exp
結算方式：
於每日 5 am 更新資料，結算所有『時間』，兌換時間成金錢與經驗值並刷新紀錄。
會於每日 5 am 後的第一次登入跳出 popup 畫面告知結算結果並更新。
若要更改更新時間，詳見 ReadMe.md
- 商城：
商城內容為各種不同外觀的頭像以及怪獸，供使用者選擇。當使用者取得相對應數量之金幣時，便能根據自己的喜好，更換其他外觀。
商品共有三種狀態，分別為purchase、apply、disapply。點選purchase能夠購買商品；點選apply能夠套用已購買之商品；點選disapply能夠將外觀恢復為預設值。
右側提供切換品項的功能，有頭像與怪獸兩種品項供選擇。


## Deploy 連結
https://qbby-tracking-and-planning.up.railway.app/


## 使用框架/模組/原始碼
- **Frontend**: ReactJS, MUI, axios
- **Backend**: MongoDB
- **Reference**: FullCalendar
- **Deployment**: Railway


## 專題製作心得
**@蔡承恩**
>這次做期末專題真的獲益良多，第一次和組員認真且頻繁的使用GitHub合作，讓我對Github的使用以及好處有更多的了解與熟悉，對未來更多的專案合作有相當大的幫助。除此之外，因為是一個全端的專題，從前端後端甚至是美工都有很多地方需要討論與解決，也讓我的溝通與討論能力精進了不少，當然還有技術上能力的提升，以及查資料的方法都因為此專案有很多的進步與成長。專題的結果也相當滿意！希望助教與教授還有未來更多的使用者都會喜歡此服務，若有任何問題與指教也歡迎跟我們說。

**@林咏毅**
>這是我第一次用GitHub 和同學一起從頭開始做一個專案，過程中雖然常常會遇到問題，但看到成品還是覺得超有成就感！做的時候不僅複習了上課內容以及熟悉GitHub操作外，也認知到要成為一個好的工程師很不容易。感謝教授和助教這學期的指導！

**@謝芝嫻**
>這次的專題對於第一次碰網路服務的我是非常有挑戰性的任務，要把這學期的所學全部運用，就好像一場超大型不限時的黑客松，好險我們這組開始的很早，每週按部就班地把進度往前推，幾乎沒遇到什麼阻礙，只有最後一週才發現忘記在gitignore新增node_module導致把整個node_module都推上去。我想我最大的收穫是和他人團隊合作完成大型專案的經驗，包括用gitHub協作、基本的命名常識...等，此外，這也是我第一次引用外部UI，以及把使用者的帳號密碼加密，總而言之，看到成品真的很感動，未來也會繼續往這條路努力邁進。



## 安裝流程與測試方法


**Download Repo**
```g
$ git clone https://github.com/lin-1214/wpFinal.git
$ cd wpFinal
$ yarn install:all
 ```
 
**Create .env & Connect to MongoDB**
```g
$ cd backend
$ touch .env
 ```
**Key in your mongoDB link**
<font color="gray">**in ./backend/.env**</font>
```g
MONGO_URL = mongodb+srv://...
 ```
**Start playing with Qbby !!**
<font color="gray">**in ./wpFinal**</font>
```g
$ yarn server
 ```
```g
$ yarn start   
 ```
**Special Testing**

- Testing **Daily Reset Function** (default at 5am)
<font color="gray">**in ./wpFinal/frontend/src/pages/mainPage.js**</font>
    ```javascript=61
  const checkEventCounted = async () => {
    // check event's EXP counted or not
    let now = new Date();
    let threshold = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      5,   // hours
      0,    // minutes
      0    // seconds
      // change here to have different reset time
      // for example 17, 4, 25 means 17:04:25 would reset
    );
    
    ...
     ```
- Testing **Purchase Function in Market** 
    ><font color="gray">**We gave every new User $5000, which is enough to buy any of items in the Market. In this case, you can change profile and monster on your own to test these function.**</font>

- **Other functions** such as Calendar, StudyTimer can be test directly
## 組員分工
**@蔡承恩**
- Calendar: frontend&backend
- MainPage: frontend&backend
    - EXP and Money Counting
- Market: backend
    - Deduct Money

**@林咏毅**
- TodoList: frontend&backend
- MainPage: frontend&backend
    - mainDrawer & TodoList
- Market: frontend&backend

**@謝芝嫻**
- 美工繪圖：怪獸、背景
- CSS: 各頁面的排版與美編設計
- MainPage: frontend
- Calendar: frontend
- Timer: frontend&backend
