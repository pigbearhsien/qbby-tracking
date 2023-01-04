import "./marketItem.css";
import instance from "../hooks/api";
import Popup from "reactjs-popup";
import { useInfo } from "../hooks/util";
import profileMan from "../assets/man.png";

const MarketItem = (props) => {
  const { userName, userId, profileHead, setProfileHead } = useInfo();
  const updateProfileHead = async () => {
    const {
      data: { msg },
    } = await instance.put("/buyHeadProfile", {
      username: userName,
      studentId: userId,
      profileHead: props.item,
    });

    console.log(msg);
  };

  return (
    <div className="itemOutline">
      <div className="itemPic">
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
      </div>
      <div className="buyButton">
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
      </div>
    </div>
  );
};

export default MarketItem;
