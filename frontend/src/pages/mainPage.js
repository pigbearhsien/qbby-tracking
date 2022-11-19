import ExpBar from "../components/expBar";
import MainDrawer from "../components/mainDrawer";
import MoneyBar from "../components/moneyBar";
import Profile from "../components/profile";
import TodoList from "../components/todoList";
import "./mainPage.css";

const MainPage = ({ setPage }) => {
  return (
    <div className="Background">
      <div className="header">
        <Profile></Profile>
        <ExpBar></ExpBar>
        <MoneyBar></MoneyBar>
      </div>
      <div className="body">
        <div className="sideBar">
          <div className="sideBar-child1">
            <MainDrawer setPage={setPage}></MainDrawer>
            <div>選單</div>
          </div>
        </div>
        <div className="Monster"></div>
        <div className="ToDo">
          <TodoList></TodoList>
        </div>
      </div>
      <div className="footer"></div>

export default MainPage;
