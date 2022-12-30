import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
import baby from "../assets/profileBaby.gif"
const Profile = () => (
  <>
    <div>
      <img src={baby} style={{width: "8vw", borderRadius: "3vw", padding: "0.2vw", backgroundColor: "black", opacity: "0.9"}}></img>
    </div>
  </>
);
export default Profile;
