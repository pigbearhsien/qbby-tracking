import { react, useState } from "react";
import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FcMenu, FcLibrary, FcCalendar, FcClock } from "react-icons/fc";
import { FaShoppingBag } from "react-icons/fa";
import "./mainDrawer.css";

const MainDrawer = () => {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const goToMain = () => {
    setAnchor(null);
  };

  const goToCalendar = () => {
    setAnchor(null);
  };

  const goToMarket = () => {
    setAnchor(null);
  };
  const goToTimer = () => {
    setAnchor(null);
  };

  return (
    <div className="mainDrawer">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <FcMenu></FcMenu>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={goToMain}>
          <FcLibrary></FcLibrary>
          <div style={{ marginLeft: "2vh" }}>首頁</div>
        </MenuItem>
        <MenuItem onClick={goToCalendar}>
          <FcCalendar></FcCalendar>
          <div style={{ marginLeft: "2vh" }}>行事曆</div>
        </MenuItem>
        <MenuItem onClick={goToTimer}>
          <FcClock></FcClock>
          <div style={{ marginLeft: "2vh" }}>計時器</div>
        </MenuItem>
        <MenuItem onClick={goToMarket}>
          <FaShoppingBag></FaShoppingBag>
          <div style={{ marginLeft: "2vh" }}>商城</div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MainDrawer;
