import { useEffect, useState, useContext, createContext } from "react";
import profileMan from "../assets/man.png";
import monsterYellow from "../assets/yellowMon.png";

const infoContext = createContext({
  username: "",
  userId: "",
  profileHead: "",
  monster: "",
  market: [],
  setUserName: () => {},
  setUserId: () => {},
  setProfileHead: () => {},
  setMonster: () => {},
  setMarket: () => {},
});

const InfoProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [profileHead, setProfileHead] = useState(profileMan);
  const [monster, setMonster] = useState(monsterYellow);
  const [market, setMarket] = useState([]);

  return (
    <infoContext.Provider
      value={{
        userName,
        userId,
        profileHead,
        monster,
        market,
        setUserName,
        setUserId,
        setProfileHead,
        setMonster,
        setMarket,
      }}
      {...props}
    />
  );
};

const useInfo = () => useContext(infoContext);

export { InfoProvider, useInfo };
