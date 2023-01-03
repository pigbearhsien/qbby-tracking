import { useEffect, useState, useContext, createContext } from "react";
import profileMan from "../assets/man.png";

const infoContext = createContext({
  username: "",
  userId: "",
  profileHead: "",
  setUserName: () => {},
  setUserId: () => {},
  setProfileHead: () => {},
});

const InfoProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [profileHead, setProfileHead] = useState(profileMan);

  return (
    <infoContext.Provider
      value={{
        userName,
        userId,
        profileHead,
        setUserName,
        setUserId,
        setProfileHead,
      }}
      {...props}
    />
  );
};

const useInfo = () => useContext(infoContext);

export { InfoProvider, useInfo };
