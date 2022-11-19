import "antd/dist/antd.css";
import React from "react";
import { Segmented } from "antd";
import { DollarOutlined } from "@ant-design/icons";

const MoneyBar = () => {
  let money = 20000;

  return (
    <div>
      <Segmented
        options={[
          {
            label: money,
            value: "Money",
            icon: <DollarOutlined />,
          },
        ]}
        style={{ backgroundColor: "#F9EE90" }}
      />
    </div>
  );
};

export default MoneyBar;
