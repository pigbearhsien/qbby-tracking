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
import monsterGreen from "../assets/greenMon.png";
import monsterRed from "../assets/redMon.png";
import monsterOrange from "../assets/orangeMon.png";
import monsterPurple from "../assets/purpleMon.png";
import Popup from "reactjs-popup";
import RtImg from "../assets/rotate.png";
import instance from "../hooks/api";
import { ImRadioChecked } from "react-icons/im";

const marketList = {
  Cat: 1500,
  Star: 2000,
  Woman: 1500,
  Angel: 2500,
  Robot: 3000,
  CupCake: 3500,
  MonsterGreen: 5000,
  MonsterRed: 5000,
  MonsterOrange: 5000,
  MonsterPurple: 5000,
};

const MarketPage = ({ setPage }) => {
  const {
    userName,
    userId,
    profileHead,
    monster,
    market,
    setProfileHead,
    setMonster,
    setMarket,
  } = useInfo();

  const [popUp, setPopUp] = useState(false);
  const [headType, setHeadType] = useState("");
  const [head, setHead] = useState(""); //for mapping
  const [monsType, setMonsType] = useState("");
  const [mons, setMons] = useState("");
  const [purchase, setPurchase] = useState(false);
  const [mode, setMode] = useState("profileHead");
  const [rotate, setRotate] = useState("false");
  const [purchaseWarn, setPurchaseWarn] = useState(["none", "", "Confirm"]);
  const [enoughMoney, setEnoughMoney] = useState(false);
  const [money, setMoney] = useState(0);

  const deductMoney = async () => {
    let MoneyDeduct = 0;
    if (mode === "profileHead"){
      if(head==="")return
      MoneyDeduct = money - marketList[head];
    }
    else{
      if(mons==="")return
      MoneyDeduct = money - marketList[mons];
    }
    const {
      data: { msg },
    } = await instance.post("deductMoney", {
      studentId: userId,
      money: MoneyDeduct,
    });
  };

  const getMoney = async () => {
    const {
      data: { msg, MONEY, EXP, LEVEL },
    } = await instance.get("getMoneyandExp/", {
      params: { userId: userId },
    });

    setMoney(MONEY);
  };

  useEffect(() => {
    if (popUp === true) {
      if(mode === "profileHead"){
        if (marketList[head] <= money) setEnoughMoney(true);
        else setEnoughMoney(false);
      }
      else{
        if (marketList[mons] <= money) setEnoughMoney(true);
        else setEnoughMoney(false);
      }
    }
  }, [popUp]);

  useEffect(() => {
    getMoney();
  }, []);

  useEffect(() => {
    if (enoughMoney === true) {
      setPurchaseWarn(["", "none", "Confirm"]);
    } else if (enoughMoney === false) {
      setPurchaseWarn(["none", "", "Cancel"]);
    }
  }, [enoughMoney]);

  const getMarket = async (type) => {
    const {
      data: { marketList, msg },
    } = await instance.get("/getMarket", {
      params: { studentId: userId, type: type },
    });

    setMarket(marketList);
  };

  const purchaseProfile = async (type) => {
    const {
      data: { msg },
    } = await instance.put("/purchaseItem", {
      studentId: userId,
      type: type,
      item: profileHead,
    });
    setPurchase(true);
  };

  const purchaseMonster = async (type) => {
    const {
      data: { msg },
    } = await instance.put("/purchaseItem", {
      studentId: userId,
      type: type,
      item: monster,
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

  const saveMonster = async () => {
    const {
      data: { msg },
    } = await instance.put("/buyMonster", {
      username: userName,
      studentId: userId,
      monster: monster,
    });
  };

  useEffect(() => {
    getMarket("profileHead");
  }, []);

  useEffect(() => {}, [market]);

  useEffect(() => {
    saveProfileHead();
    purchaseProfile("profileHead");
  }, [profileHead]);

  useEffect(() => {
    saveMonster();
    purchaseMonster("monster");
  }, [monster]);

  useEffect(() => {
    if (purchase) {
      console.log("head", head, "mons", mons)
      deductMoney();
      getMarket(mode);
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
      <div className="marketStyleWrapper">
        <div className="optionsWrapper">
          <div className="options">
            <div
              className="optionTitle"
              style={{
                color: `${mode === "profileHead" ? "#4b683a" : "gray"}`,
              }}
            >
              Profile
            </div>
            <button
              className="optionPic"
              style={{
                backgroundImage: `url(${RtImg})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center",
              }}
              onClick={() => {
                if (mode === "profileHead") {
                  setMode("monster");
                  getMarket("monster");
                } else if (mode === "monster") {
                  setMode("profileHead");
                  getMarket("profileHead");
                }
                setRotate("true");
              }}
              rotate={rotate}
              onAnimationEnd={() => setRotate("false")}
            ></button>
            <div
              className="optionTitle"
              style={{ color: `${mode === "monster" ? "#4b683a" : "gray"}` }}
            >
              Monster
            </div>
          </div>
        </div>
        <div className="itemsWrapper">
          <div className="items">
            {mode === "profileHead" ? (
              <>
                <div className="itemRow">
                  <MarketItem
                    name="Angel"
                    item={market[0]?.item ?? profileAngel}
                    mode={mode}
                    setPopUp={setPopUp}
                    setHead={setHead}
                    setHeadType={setHeadType}
                    status={market[0]?.status ?? "unPurchase"}
                  ></MarketItem>
                  <MarketItem
                    name="Cat"
                    item={market[1]?.item ?? profileCat}
                    mode={mode}
                    setPopUp={setPopUp}
                    setHead={setHead}
                    setHeadType={setHeadType}
                    status={market[1]?.status ?? "unPurchase"}
                  ></MarketItem>
                  <MarketItem
                    name="CupCake"
                    item={market[2]?.item ?? profileCupCake}
                    mode={mode}
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
                    mode={mode}
                    setPopUp={setPopUp}
                    setHead={setHead}
                    setHeadType={setHeadType}
                    status={market[3]?.status ?? "unPurchase"}
                  ></MarketItem>
                  <MarketItem
                    name="Star"
                    item={market[4]?.item ?? profileStar}
                    mode={mode}
                    setPopUp={setPopUp}
                    setHead={setHead}
                    setHeadType={setHeadType}
                    status={market[4]?.status ?? "unPurchase"}
                  ></MarketItem>
                  <MarketItem
                    name="Woman"
                    item={market[5]?.item ?? profileWoman}
                    mode={mode}
                    setPopUp={setPopUp}
                    setHead={setHead}
                    setHeadType={setHeadType}
                    status={market[5]?.status ?? "unPurchase"}
                  ></MarketItem>
                </div>
              </>
            ) : (
              <>
                <div className="itemRow">
                  <MarketItem
                    name="MonsterGreen"
                    item={market[0]?.item ?? monsterGreen}
                    mode={mode}
                    setPopUp={setPopUp}
                    setMons={setMons}
                    setMonsType={setMonsType}
                    status={market[0]?.status ?? "unPurchase"}
                  ></MarketItem>
                  <MarketItem
                    name="MonsterOrange"
                    item={market[1]?.item ?? monsterOrange}
                    mode={mode}
                    setPopUp={setPopUp}
                    setMons={setMons}
                    setMonsType={setMonsType}
                    status={market[1]?.status ?? "unPurchase"}
                  ></MarketItem>
                </div>
                <div className="itemRow">
                  <MarketItem
                    name="MonsterRed"
                    item={market[2]?.item ?? monsterRed}
                    mode={mode}
                    setPopUp={setPopUp}
                    setMons={setMons}
                    setMonsType={setMonsType}
                    status={market[2]?.status ?? "unPurchase"}
                  ></MarketItem>
                  <MarketItem
                    name="MonsterPurple"
                    item={market[3]?.item ?? monsterRed}
                    mode={mode}
                    setPopUp={setPopUp}
                    setMons={setMons}
                    setMonsType={setMonsType}
                    status={market[3]?.status ?? "unPurchase"}
                  ></MarketItem>
                </div>
              </>
            )}
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
            {mode === "profileHead" ? (
              <div
                className="popUpImage"
                style={{
                  backgroundImage: `url(${headType})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              ></div>
            ) : (
              <div
                className="popUpImage"
                style={{
                  backgroundImage: `url(${monsType})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                }}
              ></div>
            )}
          </div>
          <div className="popUpDescriptionWrapper">
            <div className="popUpDescription">
              <div className="descriptionContent">
                {mode === "profileHead" ? (
                  <>
                    <div>
                      The item "{head}" cost {marketList[head]} dollar.
                    </div>
                    <div style={{ display: purchaseWarn[0] }}>
                      Are you sure to purchase "{head}"?
                    </div>
                    <div style={{ color: "red", display: purchaseWarn[1] }}>
                      You don't have enough money !{" "}
                    </div>
                  </>
                ) : (
                  <>
                    <div>This monster cost {marketList[mons]} dollar.</div>

                    <div style={{ display: purchaseWarn[0] }}>
                      Are you sure to purchase this monster?
                    </div>
                    <div style={{ color: "red", display: purchaseWarn[1] }}>
                      You don't have enough money !{" "}
                    </div>
                  </>
                )}
              </div>
              <div className="confirmBtnWrapper">
                <button
                  className="confirmBtn"
                  onClick={() => {
                    setPopUp(false);

                    if (mode === "profileHead") {
                      if (enoughMoney) {
                        setProfileHead(headType);
                      }
                    } else if (mode === "monster") {
                      if (enoughMoney) setMonster(monsType);
                    }
                  }}
                >
                  {purchaseWarn[2]}
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
