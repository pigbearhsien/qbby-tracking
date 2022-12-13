import React, { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NumbersRoundedIcon from "@mui/icons-material/NumbersRounded";
import LockPersonRoundedIcon from "@mui/icons-material/LockPersonRounded";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./loginPage.css";

const LogInPage = ({ setLogIn }) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [checkErr, setCheckErr] = useState(false);
  const [mode, setMode] = useState("SignIn");

  return (
    <div className="loginPage">
      <div className="loginWrapper">
        <div className="loginTitle">
          <h3>Welcome Back !</h3>
        </div>
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
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {/*{mode === "SignIn" ? <VisibilityOff /> : <Visibility />}*/}
                    <LockPersonRoundedIcon />
                  </InputAdornment>
                ),
              }}
              variant="standard"
              helperText={checkErr ? "Invalid entry" : ""}
            />
          </div>
        </div>
        <div className="loginButtons">
          <button
            className="btn btn-lg btn-outline-info"
            type="button"
            onClick={() => {
              if (mode === "SignIn") {
                if (userId && password) setLogIn(true);
                else setCheckErr(true);
              } else if (mode === "Register") {
                if (userName && userId && password) setLogIn(true);
                else setCheckErr(true);
              }
            }}
          >
            SignIn
          </button>
          {/*<button
            className="btn btn-lg btn-outline-info"
            type="button"
            onClick={() => {
              setLogIn(true);
            }}
          >
            Register
          </button>*/}
        </div>
      </div>
    </div>
  );
};

export default LogInPage;
