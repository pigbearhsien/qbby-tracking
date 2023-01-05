import { Progress } from "antd";
import { useState } from "react";

import "antd/dist/antd.css";
import React from "react";
import "./expBar.css";
import { rgbToHex } from "@mui/system";

const ExpBar = ({ exp, level }) => {
  return (
    <>
      <div className="levelBarWrapper">Lv. {level}</div>
      <div
        className="progress"
        style={{
          margin: "0",
          width: 500,
          height: 60,
          display: "flex",
          border: "3px solid black",
          borderRadius: "30px",
        }}
      >
        <div
          className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
          style={{
            flex:
              (exp - (Math.pow(2, level - 1) - 1) * 120) /
              (120 * Math.pow(2, level)),
          }}
        ></div>
        <p
          style={{
            color: "rgb(105, 71, 29)",
            marginTop: "auto",
            marginLeft: "0.2vw",
            marginBottom: "auto",
            fontSize: "1.2vw",
            fontWeight: "1000",
          }}
        >
          {Math.round(
            ((exp - (Math.pow(2, level - 1) - 1) * 120) /
              (120 * Math.pow(2, level))) *
              100
          )}{" "}
          %
        </p>
      </div>
    </>
  );
};

export default ExpBar;
