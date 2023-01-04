import ExpBar from "../components/expBar";
import MainDrawer from "../components/mainDrawer";
import MoneyBar from "../components/moneyBar";
import Profile from "../components/profile";
import TodoList from "../components/todoList";
import "./mainPage.css";
import "./popUp.css";
import Popup from "reactjs-popup";
import bgImg from "../assets/Background.png";
import yellowMonImg from "../assets/yellowMon.png";
import chatBubbleImg from "../assets/thinking.png";
import { useState, useEffect } from "react";
import savemoney from "../images/savemoney.gif";
import banners from "../images/banners.gif";
import instance from "../hooks/api";
import { useInfo } from "../hooks/util";
import { height } from "@mui/system";
import axios from "../hooks/api";

const chatContents = [
  "Good Job",
  "Well done!",
  "🤤🤤🤤",
  "YOLO😎",
  "Catch some Z's!",
  "WP is lit🔥",
];

const MainPage = ({ setPage }) => {
  const { userName, userId } = useInfo();
  const [popup, setPopup] = useState(false);
  const [randomSeed, setRandomSeed] = useState(5);
  const [eventTime, setEventTime] = useState(0);
  const [exp, setExp] = useState(0);
  const [money, setMoney] = useState(0);
  const [level, setLevel] = useState(0);
  const textGenerator = () => {
    return <>{chatContents[randomSeed]}</>;
  };

  const getMoneyandExp = async () => {
    const {
      data: { msg, MONEY, EXP, LEVEL },
    } = await axios.get("getMoneyandExp/", {
      params: { userId: userId },
    });
    console.log("getMoneyandExp", LEVEL);
    return { EXP, MONEY, LEVEL };
  };

  const checkEventCounted = async () => {
    // check event's EXP counted or not
    let now = new Date();
    let threshold = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      22,
      26,
      37
    );
    const {
      data: { msg1, lastLoginTime },
    } = await axios.get("getDailyCheckInfo/", {
      params: { userId: userId },
    });
    let last = new Date(lastLoginTime);
    console.log(last, threshold, now);
    if (now > threshold && last < threshold) {
      let {
        data: { msg2, eventTotalTime },
      } = await axios.post("checkEventCounted/", {
        params: { id: userId },
      });
      setEventTime(eventTotalTime / 60);
      let EXP = 0;
      let MONEY = 0;
      let LEVEL = 0;
      await getMoneyandExp().then((Info) => {
        EXP = Info.EXP;
        MONEY = Info.MONEY;
        LEVEL = Info.LEVEL;
      });
      let sum = 0;
      let level_count = 0;
      for (let i = 1; sum < eventTotalTime / 120; i++) {
        sum = Math.pow(2, i) - 1;
        level_count = i;
      }
      const {
        data: { msg4, MONEY_post, LEVEL_post, EXP_post },
      } = await axios.post("/updateMoneyandExp", {
        params: {
          studentId: userId,
          money: MONEY + eventTotalTime,
          exp: EXP + eventTotalTime,
          level: level_count - 1,
        },
      });
      console.log("EXP_Post", EXP_post);
      console.log("MONEY_Post", MONEY_post);

      setExp(EXP_post);
      setMoney(MONEY_post);
      setLevel(LEVEL_post);
      setPopup(true);
    } else {
      let EXP = 0;
      let MONEY = 0;
      let LEVEL = 0;
      await getMoneyandExp().then((Info) => {
        EXP = Info.EXP;
        MONEY = Info.MONEY;
        LEVEL = Info.LEVEL;
      });
      setExp(EXP);
      setMoney(MONEY);
      setLevel(LEVEL);
    }
    const {
      data: { msg3 },
    } = await axios.post("/updateLoginTime", {
      params: { studentId: userId },
    });
  };

  useEffect(() => {
    checkEventCounted();
    // getMoneyandExp().then(Info => {
    //   setExp(Info.EXP)
    //   setMoney(Info.MONEY)
    //   setLevel(Info.LEVEL)
    //   console.log("INFOOOOO", Info.EXP, Info.MONEY)
    // })
    // console.log("EXP", )
    setInterval(() => setRandomSeed(Math.floor(Math.random() * 6)), 6000);
  }, []);

  return (
    <div
      className="Background"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}
    >
      <div className="header">
        <Profile></Profile>
        <ExpBar exp={exp} level={level}></ExpBar>
        <MoneyBar money={money}></MoneyBar>
      </div>
      <div className="body">
        <div className="sideBar">
          <div className="sideBar-child1">
            <div className="menuWrapper">
              <MainDrawer setPage={setPage}></MainDrawer>
              <div
                style={{
                  fontSize: "4vh",
                  fontWeight: "900",
                }}
              >
                Menu
              </div>
            </div>
          </div>
        </div>

        <div className="Monster">
          <div
            className="monsImg"
            style={{
              backgroundImage: `url(${yellowMonImg})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              width: "100vw",
              height: "40vw",
            }}
          >
            <div
              className="ChatBubble"
              style={{
                backgroundImage: `url(${chatBubbleImg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                display: `${true ? "" : "none"}`,
              }}
            >
              <div className="ChatContents">{textGenerator()}</div>
            </div>
          </div>
        </div>

        <div className="ToDo">
          <TodoList></TodoList>
        </div>
      </div>
      <div className="footer"></div>
      <Popup
        open={popup}
        contentStyle={{
          display: "flex",
          userSelect: "none",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0)",
          borderColor: "rgba(255,255,255,0)",
        }}
        closeOnDocumentClick={false}
      >
        <div
          style={{
            backgroundColor: "white",
            height: "35vw",
            width: "30vw",
            borderRadius: "2vw",
            border: "4px solid black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <header style={{ display: "flex", justifyContent: "center" }}>
            <p className="popupTitle">WelCome Back !</p>
          </header>
          <header style={{ display: "flex", justifyContent: "center" }}>
            <img src={banners} style={{ width: "8vw" }}></img>
            <div style={{ width: "18vw" }}>
              <p className="popupsmallTitle">Congratulation!</p>
              <p className="popupwords">
                You worked for {eventTime} hours yesterday
              </p>
            </div>
          </header>
          <header
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={savemoney} style={{ width: "8vw" }}></img>
            <div style={{ width: "18vw", height: "15vh" }}>
              <p className="popupsmallTitle">Money & Exp</p>
              <p className="popupwords">You won 1000 $ and 10000 exp !</p>
            </div>
          </header>
          <header style={{ display: "flex", justifyContent: "center" }}>
            <button className="popupbtn" onClick={() => setPopup(false)}>
              Confirm
            </button>
          </header>
        </div>
      </Popup>
    </div>
  );
};

export default MainPage;
