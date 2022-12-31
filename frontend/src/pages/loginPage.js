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
import { useInfo } from "../hooks/util";
import lgImg from "../assets/loginPage.png";
import lgWrapperImg from "../assets/loginPage_info.png";
import lgTitleImg from "../assets/loginPage_title.png";

const LogInPage = ({ setLogIn }) => {
  const { userName, userId, setUserName, setUserId } = useInfo();
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState(0);
  const [money, setMoney] = useState(0);
  const [checkErr, setCheckErr] = useState(false);
  const [mode, setMode] = useState("SignIn");

  const findUserInfo = async () => {
    const userInfo = await instance.get("/findUserInfo", {
      params: {
        userId: userId,
        password: password,
      },
    });
    //console.log(userInfo.data.message);
    if (userInfo.data.message === "success") {
      setLogIn(true);
    } else if (userInfo.data.message === "nouser") {
      setCheckErr(true);
    }
  };

  const createLoginInfo = async () => {
    await instance.post("/createLoginInfo", {
      username: userName,
      studentId: userId,
      password: password,
      experience: 0,
      money: 0,
    });
  };

  return (
    <div
      className="loginPage"
      style={{ backgroundImage: `url(${lgImg})`, backgroundSize: "cover" }}
    >
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
  );
};

export default LogInPage;
