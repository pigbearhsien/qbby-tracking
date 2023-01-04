import { useEffect, useState } from "react";
import { useInfo } from "../hooks/util";
import MainDrawer from "../components/mainDrawer";
import MarketItem from "../components/marketItem";
import MkImg from "../assets/Market4xxc.png";
import "./marketPage.css";
import profileCat from "../assets/cat.png";
import profileStar from "../assets/star.png";
import profileWoman from "../assets/woman.png";
import profileAngel from "../assets/angel.png";
import profileRobot from "../assets/robot.png";
import profileCupCake from "../assets/cupcake.png";
import Popup from "reactjs-popup";
import instance from "../hooks/api";

const marketList = {
  Cat: 1500,
  Star: 2000,
  Woman: 1500,
  Angel: 2500,
  Robot: 3000,
  CupCake: 3500,
};

const MarketPage = ({ setPage }) => {
  const { userName, userId, profileHead, setProfileHead } = useInfo();
  const [popUp, setPopUp] = useState(false);
  const [headType, setHeadType] = useState("");
  const [head, setHead] = useState(""); //for mapping
  const [market, setMarket] = useState([]);
  const [purchase, setPurchase] = useState(false);

  const getMarket = async () => {
    const {
      data: { marketList },
    } = await instance.get("/getMarket", { params: { studentId: userId } });

    setMarket(marketList);
  };

  const purchaseItem = async () => {
    instance.put("/purchaseItem", {
      studentId: userId,
      item: profileHead,
    });
    console.log("pur!");
    setPurchase(true);
  };

  const saveProfileHead = async () => {
    await instance.put("/buyHeadProfile", {
      username: userName,
      studentId: userId,
      profileHead: profileHead,
    });
  };

  useEffect(() => {
    console.log(market);
  }, [market]);

  useEffect(() => {
    console.log("in");
    saveProfileHead();
    purchaseItem();
  }, [popUp]);

  useEffect(() => {
    if (purchase) {
      getMarket();
      setPurchase(false);
    }
  }, [purchase]);

  return (
    <div
      className="marketWrapper"
      style={{
        backgroundImage: `url(${MkImg})`,
        backgroundSize: "cover",
      }}
    >
      <div className="menuWrapper">
        <MainDrawer setPage={setPage}></MainDrawer>
        <p
          style={{
            marginTop: "3vh",
            fontSize: "4vh",
            fontWeight: "900",
          }}
        >
          Menu
        </p>
      </div>
      <div className="itemsWrapper">
        <div className="items">
          <div className="itemRow">
            <MarketItem
              name="Cat"
              item={profileCat}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
            ></MarketItem>
            <MarketItem
              name="Star"
              item={profileStar}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
            ></MarketItem>
            <MarketItem
              name="Angel"
              item={profileAngel}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
            ></MarketItem>
          </div>
          <div className="itemRow">
            <MarketItem
              name="Robot"
              item={profileRobot}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
            ></MarketItem>
            <MarketItem
              name="Woman"
              item={profileWoman}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
            ></MarketItem>
            <MarketItem
              name="CupCake"
              item={profileCupCake}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
            ></MarketItem>
          </div>
        </div>
      </div>
      <Popup
        open={popUp}
        onClose={() => {
          setPopUp(false);
        }}
        contentStyle={{
          width: "40%",
          height: "40%",
          border: "double 1vh black",
          userSelect: "none",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className="popUpContentWrapper">
          <div className="popUpImageWrapper">
            <div
              className="popUpImage"
              style={{
                backgroundImage: `url(${headType})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
            ></div>
          </div>
          <div className="popUpDescriptionWrapper">
            <div className="popUpDescription">
              <div className="descriptionContent">
                <div>
                  The item "{head}" cost {marketList[head]} dollar.
                </div>
                <div>Are you sure to purchase "{head}"?</div>
              </div>
              <div className="confirmBtnWrapper">
                <button
                  className="confirmBtn"
                  onClick={() => {
                    setPopUp(false);
                    setProfileHead(headType);
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      </Popup>
    </div>
  );
};
export default MarketPage;
