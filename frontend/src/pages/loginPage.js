import React, { useState, useEffect } from "react";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import "./loginPage.css";
import instance from "../hooks/api";
import Popup from "reactjs-popup";
import { useInfo } from "../hooks/util";
import lgImg from "../assets/loginPage.png";
import lgWrapperImg from "../assets/loginPage_info.png";
import lgTitleImg from "../assets/loginPage_title.png";
import profileCat from "../assets/cat.png";
import profileStar from "../assets/star.png";
import profileWoman from "../assets/woman.png";
import profileAngel from "../assets/angel.png";
import profileRobot from "../assets/robot.png";
import profileCupCake from "../assets/cupcake.png";

const initialMarket = [
  {
    type: "profileHead",
    item: profileCat,
    status: "unPurchase",
  },
  {
    type: "profiledHead",
    item: profileStar,
    status: "unPurchase",
  },
  {
    type: "profiledHead",
    item: profileWoman,
    status: "unPurchase",
  },
  {
    type: "profiledHead",
    item: profileAngel,
    status: "unPurchase",
  },
  {
    type: "profiledHead",
    item: profileRobot,
    status: "unPurchase",
  },
  {
    type: "profiledHead",
    item: profileCupCake,
    status: "unPurchase",
  },
];

const LogInPage = ({ setLogIn }) => {
  const {
    userName,
    userId,
    profileHead,
    setUserName,
    setUserId,
    setProfileHead,
  } = useInfo();
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState(0);
  const [money, setMoney] = useState(0);
  const [checkErr, setCheckErr] = useState(false);
  const [mode, setMode] = useState("SignIn");
  const [popUp, setPopUp] = useState(false);

  const findUserInfo = async () => {
    const userInfo = await instance.get("/findUserInfo", {
      params: {
        userId: userId,
        password: password,
      },
    });
    //console.log(userInfo.data.message);
    if (userInfo.data.message === "success") {
      setUserName(userInfo.data.contents[0].username);
      setUserId(userInfo.data.contents[0].studentId);
      setProfileHead(userInfo.data.contents[0].profileHead);
      setLogIn(true);
    } else if (userInfo.data.message === "nouser") {
      setCheckErr(true);
    }
  };

  const createLoginInfo = async () => {
    let time = new Date();
    time = time.toString()
    await instance.post("/createLoginInfo", {
      username: userName,
      studentId: userId,
      password: password,
      level: 1,
      profileHead: profileHead,
      experience: 0,
      money: 0,
      timerRecords: [],
      studyTime: 0,
      dailyPopup: false,
      lastLoginTime: time
    });
  };

  const createMarket = async () => {
    await instance.post("/createMarket", {
      studentId: userId,
      initialMarket: initialMarket,
    });
  };

  return (
    <div
      className="loginPage"
      style={{ backgroundImage: `url(${lgImg})`, backgroundSize: "cover" }}
    >
      <div className="instructionWrapper">
        <div className="instruction">
          <button
            className="insBody"
            onClick={() => {
              setPopUp(true);
            }}
          >
            ?
          </button>
        </div>
      </div>
      <div className="loginOuter">
        <div className="loginBody">
          <div
            className="loginTitle"
            style={{
              backgroundImage: `url(${lgTitleImg})`,
              backgroundSize: "cover",
              backgroundPositionX: "center",
              backgroundPositionY: "center",
            }}
          ></div>
          <div
            className="loginWrapper"
            style={{
              backgroundImage: `url(${lgWrapperImg})`,
              backgroundSize: "130% 130%",
              backgroundPositionX: "center",
              backgroundPositionY: "center",
            }}
          >
            <div className="loginInput">
              <div className="switchBar">
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        onChange={() => {
                          if (mode === "SignIn") setMode("Register");
                          else if (mode === "Register") setMode("SignIn");
                        }}
                        color="warning"
                      />
                    }
                    label="Register"
                  />
                </FormGroup>
              </div>
              {mode === "Register" ? (
                <div className="userNameWrapper">
                  <TextField
                    error={checkErr}
                    id="input-with-icon-textfield"
                    label="Username"
                    fullWidth
                    color="warning"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <AccountCircle />
                        </InputAdornment>
                      ),
                    }}
                    variant="standard"
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="idWrapper">
                <TextField
                  error={checkErr}
                  id="input-with-icon-textfield"
                  label="Student ID"
                  fullWidth
                  color="warning"
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <NumbersRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
              </div>
              <div className="passWordWrapper">
                <TextField
                  error={checkErr}
                  type={mode === "SignIn" ? "password" : "text"}
                  id="input-with-icon-textfield"
                  label="Password"
                  color="warning"
                  fullWidth
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockPersonRoundedIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                  helperText={checkErr ? "Invalid Entry :(" : ""}
                />
              </div>
            </div>
            <div className="loginButtons">
              <button
                className="loginBtn"
                type="button"
                onClick={() => {
                  if (mode === "SignIn") {
                    findUserInfo();
                  } else if (mode === "Register") {
                    if (userName && userId && password) {
                      createLoginInfo();
                      createMarket();
                      setLogIn(true);
                    } else setCheckErr(true);
                  }
                }}
              >
                SignIn
              </button>
            </div>
          </div>
        </div>
      </div>
      <Popup
        open={popUp}
        contentStyle={{
          width: "40%",
          height: "60%",
          border: "solid 4px black",
          borderRadius: "8%",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#f1fff9",
        }}
        onClose={() => setPopUp(false)}
      >
        <div className="insTitle">Welcome to QBBY!</div>
        <div className="insContents">
          In QBBY, there are 4 pages, and each of them has differnt functions.
          Functions of each page are listed below :
          <ul>
            <li>Homepage -</li>
            <li>Calendar - </li>
            <li>Timer - </li>
            <li>Market - </li>
          </ul>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            🐾Press the button and start petting your QBBY🐾
          </div>
        </div>
        <button
          className="insBtn"
          onClick={() => {
            setPopUp(false);
          }}
        >
          Confirm
        </button>
      </Popup>
    </div>
  );
};

export default LogInPage;
