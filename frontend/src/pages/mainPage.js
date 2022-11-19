import ExpBar from "../components/expBar";
import MainDrawer from "../components/mainDrawer";
import MoneyBar from "../components/moneyBar";
import Profile from "../components/profile";

const MainPage = (({setPage}) => {
  return (
    <div
      className="Background"
      style={{ backgroundColor: "#FDEFE1", height: "100%" }}
    >
      <MainDrawer setPage={setPage}></MainDrawer>
      <Profile></Profile>
      <ExpBar></ExpBar>
      <MoneyBar></MoneyBar>

      <div className="ToDo"></div>
      <div className="Select_Bar"></div>
      <div className="Monster"></div>

    </div>
  );
});

export default MainPage;
