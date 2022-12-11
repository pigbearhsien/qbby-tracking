import "antd/dist/antd.css";
import React from "react";
import { Segmented } from "antd";

import { ImCoinDollar } from "react-icons/im";

const MoneyBar = () => {
  let money = 20000;

  return (
    <span className="badge rounded-pill bg-info">
      <ImCoinDollar style={{ margin: "auto" }}></ImCoinDollar>
      {money}
    </span>
    // <div>
    //   <Segmented
    //     options={[
    //       {
    //         label: money,
    //         value: "Money",
    //         icon: <DollarOutlined />,
    //       },
    //     ]}
    //     style={{ backgroundColor: "#F9EE90" }}
    //   />
    // </div>
  );
};

export default MoneyBar;
