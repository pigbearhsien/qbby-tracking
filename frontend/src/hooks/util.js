import { useEffect, useState, useContext, createContext } from "react";

const infoContext = createContext({
  username: "",
  userId: "",
  setUserName: () => {},
  setUserId: () => {},
});

const InfoProvider = (props) => {
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  return (
    <infoContext.Provider
      value={{
        userName,
        userId,
        setUserName,
        setUserId,
      }}
      {...props}
    />
  );
};

const useInfo = () => useContext(infoContext);

export { InfoProvider, useInfo };
