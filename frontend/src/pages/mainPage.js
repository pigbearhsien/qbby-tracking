import ExpBar from "../components/expBar";
import MoneyBar from "../components/moneyBar";
import Profile from "../components/profile";
import MainDrawer from "../components/mainDrawer";
import "./mainPage.css";

const MainPage = () => {
  return (
    <div className="Background">
      <Profile></Profile>
      <ExpBar></ExpBar>
      <MoneyBar></MoneyBar>
      <div className="ToDo"></div>
      <div className="Select_Bar">
        <MainDrawer></MainDrawer>
      </div>
      <div className="Monster"></div>
    </div>
  );
};

export default MainPage;
