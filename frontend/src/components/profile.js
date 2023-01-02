import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import baby from "../assets/profileBaby.gif";
import { useInfo } from "../hooks/util";
import profileMan from "../assets/man.png";
import "./profile.css";

const Profile = () => {
  const { userName, userId } = useInfo();

  return (
    <>
      <div className="profileWrapper">
        <div
          className="profileHead"
          style={{
            backgroundImage: `url(${profileMan})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
          }}
        ></div>
        <div className="nameWrapper">
          <div className="userName">{userName}</div>
        </div>
      </div>
    </>
  );
};
export default Profile;
