import ExpBar from "../components/expBar";
import MainDrawer from "../components/mainDrawer";
import MoneyBar from "../components/moneyBar";
import Profile from "../components/profile";
import TodoList from "../components/todoList";
import "./mainPage.css";
import bgImg from "../assets/Background70.png";

const MainPage = ({ setPage }) => {
  return (
    <div className="Background" style={{ backgroundImage: `url(${bgImg})` , backgroundSize: "cover"}}>
      <div className="header">
        <Profile></Profile>
        <ExpBar></ExpBar>
        <MoneyBar></MoneyBar>
      </div>
      <div className="body">
        <div className="sideBar">
          <div className="sideBar-child1">
            <MainDrawer setPage={setPage}></MainDrawer>
            <p style={{ marginTop: "3vh", fontSize: "4vh" }}>選單</p>
          </div>
        </div>
        <div className="Monster"></div>
        <div className="ToDo">
          <TodoList></TodoList>
        </div>
      </div>
      <div className="footer"></div>
    </div>
  );
};

export default MainPage;
