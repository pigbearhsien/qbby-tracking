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
  const [popup, setPopup] = useState(true);
  const [randomSeed, setRandomSeed] = useState(5);
  const textGenerator = () => {
    return <>{chatContents[randomSeed]}</>;
  };

  useEffect(() => {
    setInterval(() => setRandomSeed(Math.floor(Math.random() * 6)), 6000);
  }, []);

  return (
    <div
      className="Background"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}
    >
      <div className="header">
        <Profile></Profile>
        <ExpBar></ExpBar>
        <MoneyBar></MoneyBar>
      </div>
      <div className="body">
        <div className="sideBar">
          <div className="sideBar-child1">
            <div className="menuWrapper">
              <MainDrawer setPage={setPage}></MainDrawer>
              <p
                style={{
                  marginTop: "3vh",
                  fontSize: "4vh",
                  fontWeight: "900",
                  color: "black",
                }}
              >
                Menu
              </p>
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
            }}
          >
            <div
              className="ChatBubble"
              style={{
                backgroundImage: `url(${chatBubbleImg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
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
              <p className="popupwords">You worked for 10 hours yesterday</p>
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
