import { react, useState } from "react";
import { Button } from "@mui/material";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { FcLibrary, FcCalendar, FcClock, FcList } from "react-icons/fc";
import { FaShoppingBag } from "react-icons/fa";
import "./mainDrawer.css";
import menuImg from "../assets/menu.png";
import { width } from "@mui/system";

const MainDrawer = ({ setPage }) => {
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);
  const childIconSize = 25;

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const goToMain = () => {
    setAnchor(null);

    setPage("Main");
  };

  const goToCalendar = () => {
    setAnchor(null);

    setPage("Calendar");
  };

  const goToMarket = () => {
    setAnchor(null);

    setPage("Market");
  };
  const goToTimer = () => {
    setAnchor(null);
    setPage("Timer");
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
        <div className="wrapper" style={{ width: "45px", height: "45px" }}>
          <div
            className="menuImg"
            style={{
              backgroundImage: `url(${menuImg})`,
              width: "100%",
              height: "100%",
            }}
          ></div>
        </div>
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
          <FcLibrary size={childIconSize}></FcLibrary>
          <div className="pages" style={{ marginLeft: "2vh" }}>
            Home
          </div>
        </MenuItem>
        <MenuItem onClick={goToCalendar}>
          <FcCalendar size={childIconSize}></FcCalendar>
          <div className="pages" style={{ marginLeft: "2vh" }}>
            Calendar
          </div>
        </MenuItem>
        <MenuItem onClick={goToTimer}>
          <FcClock size={childIconSize}></FcClock>
          <div className="pages" style={{ marginLeft: "2vh" }}>
            Timer
          </div>
        </MenuItem>
        <MenuItem onClick={goToMarket}>
          <FaShoppingBag size={childIconSize}></FaShoppingBag>
          <div className="pages" style={{ marginLeft: "2vh" }}>
            Market
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MainDrawer;
