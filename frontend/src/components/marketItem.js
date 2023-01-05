import "./marketItem.css";
import instance from "../hooks/api";
import Popup from "reactjs-popup";
import { useInfo } from "../hooks/util";
import profileMan from "../assets/man.png";
import monsterYellow from "../assets/yellowMon.png";

const MarketItem = (props) => {
  const { userName, userId, profileHead, monster, setProfileHead, setMonster } =
    useInfo();
  const updateProfileHead = async () => {
    const {
      data: { msg },
    } = await instance.put("/buyHeadProfile", {
      username: userName,
      studentId: userId,
      profileHead: props.item,
    });
  };

  const updateMonster = async () => {
    const {
      data: { msg },
    } = await instance.put("/buyMonster", {
      username: userName,
      studentId: userId,
      monster: props.item,
    });
  };

  return (
    <div className="itemOutline">
      <div className="itemPic">
        {props.mode === "profileHead" ? (
          <div
            className="item"
            style={{
              backgroundImage: `url(${props.item})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundColor: `${
                props.status === "unPurchase"
                  ? "#b7b1ba"
                  : profileHead === props.item
                  ? "#e92a2a"
                  : "#1fb950"
              }`,
            }}
          ></div>
        ) : (
          <div
            className="item"
            style={{
              backgroundImage: `url(${props.item})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundColor: `${
                props.status === "unPurchase"
                  ? "#b7b1ba"
                  : monster === props.item
                  ? "#e92a2a"
                  : "#1fb950"
              }`,
            }}
          ></div>
        )}
      </div>
      <div className="buyButton">
        {props.mode === "profileHead" ? (
          <div className="button">
            {props.status === "unPurchase" ? (
              <button
                className="buyBtn"
                onClick={() => {
                  props.setPopUp(true);
                  props.setHeadType(props.item);
                  props.setHead(props.name);
                }}
              >
                Purchase
              </button>
            ) : profileHead === props.item ? (
              <button
                className="disApplyBtn"
                onClick={() => {
                  setProfileHead(profileMan);
                  updateProfileHead();
                }}
              >
                Disapply
              </button>
            ) : (
              <button
                className="applyBtn"
                onClick={() => {
                  setProfileHead(props.item);
                  updateProfileHead();
                }}
              >
                Apply
              </button>
            )}
          </div>
        ) : (
          <div className="button">
            {props.status === "unPurchase" ? (
              <button
                className="buyBtn"
                onClick={() => {
                  props.setPopUp(true);
                  props.setMonsType(props.item);
                  props.setMons(props.name);
                }}
              >
                Purchase
              </button>
            ) : monster === props.item ? (
              <button
                className="disApplyBtn"
                onClick={() => {
                  setMonster(monsterYellow);
                  updateMonster();
                }}
              >
                Disapply
              </button>
            ) : (
              <button
                className="applyBtn"
                onClick={() => {
                  setMonster(props.item);
                  updateMonster();
                }}
              >
                Apply
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketItem;
