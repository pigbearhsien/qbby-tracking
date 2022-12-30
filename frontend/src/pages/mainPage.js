import ExpBar from "../components/expBar";
import MainDrawer from "../components/mainDrawer";
import MoneyBar from "../components/moneyBar";
import Profile from "../components/profile";
import TodoList from "../components/todoList";
import "./mainPage.css";
import "./popUp.css";
import Popup from "reactjs-popup";
import bgImg from "../assets/Background70.png";
import useSelection from "antd/es/table/hooks/useSelection";
import { useState } from "react";
import savemoney from "../images/savemoney.gif";
import banners from "../images/banners.gif";
import instance from "../hooks/api";

const MainPage = ({ setPage }) => {
  const [popup, setPopup] = useState(true);

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
            <MainDrawer setPage={setPage}></MainDrawer>
            <p
              style={{
                marginTop: "3vh",
                fontSize: "4vh",
                fontWeight: "700",
                fontFamily: "Trebuchet MS",
              }}
            >
              Menu
            </p>
          </div>
        </div>
        <div className="Monster"></div>
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
