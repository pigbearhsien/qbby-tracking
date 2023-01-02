import { Progress } from "antd";
import { useState } from "react";

import "antd/dist/antd.css";
import React from "react";

const ExpBar = () => {
  const [percent, setPercent] = useState(75);

  return (
    <div
      className="progress"
      style={{
        width: 500,
        height: 60,
        display: "flex",
        border: "3px solid black",
      }}
    >
      <div
        className="progress-bar progress-bar-striped progress-bar-animated bg-warning"
        role="progressbar"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ flex: percent / 100 }}
      ></div>
      <p
        className="text-primary"
        style={{
          marginTop: "auto",
          marginBottom: "auto",
          fontSize: "1.2vw",
          fontWeight: "900",
        }}
      >
        EXP: {percent}%
      </p>
    </div>
  );
};

export default ExpBar;
