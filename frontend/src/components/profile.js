import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React from "react";
const Profile = () => (
  <>
    <div>
      <Avatar shape="square" size={100} icon={<UserOutlined />} />
    </div>
  </>
);
export default Profile;
