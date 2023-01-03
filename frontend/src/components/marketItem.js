import "./marketItem.css";
import Popup from "reactjs-popup";

const marketItem = (props) => {
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
          }}
        ></div>
      </div>
      <div className="buyButton">
        <div className="button">
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
        </div>
      </div>
    </div>
  );
};

export default marketItem;
