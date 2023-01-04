import { useEffect, useState, useContext, createContext } from "react";
import profileMan from "../assets/man.png";

const infoContext = createContext({
  username: "",
  userId: "",
  profileHead: "",
  market: [],
  setUserName: () => {},
  setUserId: () => {},
  setProfileHead: () => {},
  setMarket: () => {},
});

const InfoProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [profileHead, setProfileHead] = useState(profileMan);
  const [market, setMarket] = useState([]);

  return (
    <infoContext.Provider
      value={{
        userName,
        userId,
        profileHead,
        market,
        setUserName,
        setUserId,
        setProfileHead,
        setMarket,
      }}
      {...props}
    />
  );
};

const useInfo = () => useContext(infoContext);

export { InfoProvider, useInfo };
