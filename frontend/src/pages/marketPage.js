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
import Profile from "../components/profile";
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
  const { userName, userId, profileHead, market, setProfileHead, setMarket } =
    useInfo();
  const [popUp, setPopUp] = useState(false);
  const [headType, setHeadType] = useState("");
  const [head, setHead] = useState(""); //for mapping
  const [purchase, setPurchase] = useState(false);

  const getMarket = async () => {
    const {
      data: { marketList, msg },
    } = await instance.get("/getMarket", { params: { studentId: userId } });
    console.log(msg);

    setMarket(marketList);
  };

  const purchaseItem = async () => {
    const {
      data: { msg },
    } = await instance.put("/purchaseItem", {
      studentId: userId,
      item: profileHead,
    });
    setPurchase(true);
  };

  const saveProfileHead = async () => {
    const {
      data: { msg },
    } = await instance.put("/buyHeadProfile", {
      username: userName,
      studentId: userId,
      profileHead: profileHead,
    });
  };

  useEffect(() => {
    getMarket();
  }, []);

  useEffect(() => {
    console.log(market);
  }, [market]);

  useEffect(() => {
    saveProfileHead();
    purchaseItem();
  }, [profileHead]);

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
        <div
          style={{
            fontSize: "4vh",
            fontWeight: "900",
          }}
        >
          Menu
        </div>
      </div>
      <div className="itemsWrapper">
        <div className="items">
          <div className="itemRow">
            <MarketItem
              name="Angel"
              item={market[0]?.item ?? profileAngel}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
              status={market[0]?.status ?? "unPurchase"}
            ></MarketItem>
            <MarketItem
              name="Cat"
              item={market[1]?.item ?? profileCat}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
              status={market[1]?.status ?? "unPurchase"}
            ></MarketItem>
            <MarketItem
              name="CupCake"
              item={market[2]?.item ?? profileCupCake}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
              status={market[2]?.status ?? "unPurchase"}
            ></MarketItem>
          </div>
          <div className="itemRow">
            <MarketItem
              name="Robot"
              item={market[3]?.item ?? profileRobot}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
              status={market[3]?.status ?? "unPurchase"}
            ></MarketItem>
            <MarketItem
              name="Star"
              item={market[4]?.item ?? profileStar}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
              status={market[4]?.status ?? "unPurchase"}
            ></MarketItem>
            <MarketItem
              name="Woman"
              item={market[5]?.item ?? profileWoman}
              setPopUp={setPopUp}
              setHead={setHead}
              setHeadType={setHeadType}
              status={market[5]?.status ?? "unPurchase"}
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
