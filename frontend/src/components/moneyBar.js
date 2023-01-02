import React from "react";
import { ImCoinDollar } from "react-icons/im";
import "./moneyBar.css";

const MoneyBar = () => {
  let money = 20000;

  return (
    <div className="moneyBarWrapper">
      <ImCoinDollar style={{ margin: "auto" }}></ImCoinDollar>
      {money}
    </div>
  );
};

export default MoneyBar;
