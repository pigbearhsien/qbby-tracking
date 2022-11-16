import ExpBar from "../components/expBar";
import MoneyBar from "../components/moneyBar";
import Profile from "../components/profile";

const MainPage = () => {
  return (
    <div
      className="Background"
      style={{ backgroundColor: "#FDEFE1", height: "100%" }}
    >
      <Profile></Profile>
      <ExpBar></ExpBar>
      <MoneyBar></MoneyBar>
      <div className="ToDo"></div>
      <div className="Select_Bar"></div>
      <div className="Monster"></div>

    </div>
  );
};

export default MainPage;
