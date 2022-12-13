import ExpBar from "../components/expBar";
import MainDrawer from "../components/mainDrawer";
import MoneyBar from "../components/moneyBar";
import Profile from "../components/profile";
import TodoList from "../components/todoList";
import "./mainPage.css";
import bgImg from "../assets/Background70.png";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api",
});

const MainPage = ({ setPage }) => {
  const storeTest = async () => {
    await instance.post("createLoginInfo/", {
      username: "Vincent",
      studentId: "B10901059",
      password: "20021214",
      experience: 5432,
      money: 1000,
    });
  };

  return (
    <div
      className="Background"
      style={{ backgroundImage: `url(${bgImg})`, backgroundSize: "cover" }}
      onClick={() => {
        storeTest();
      }}
    >
      <div className="header">
        <Profile></Profile>
        <ExpBar></ExpBar>
        <MoneyBar></MoneyBar>
      </div>
      <div className="body">
        <div className="sideBar">
          <div className="sideBar-child1">
            <MainDrawer setPage={setPage}></MainDrawer>
            <p style={{ marginTop: "3vh", fontSize: "4vh", fontWeight: "700" }}>
              Menu
            </p>
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
