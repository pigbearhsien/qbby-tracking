import StudyTimer from "../components/timer";
import MainDrawer from "../components/mainDrawer";
import "./timerPage.css";

const TimerPage = ({ setPage }) => {
  return (
    <div className="Timer">
      <div className="menuWrapper">
        <MainDrawer setPage={setPage}></MainDrawer>
        <div
          style={{
            fontSize: "4vh",
            fontWeight: "900",
          }}
        >
          Menu
        </div>
      </div>
      <StudyTimer></StudyTimer>
    </div>
  );
};

export default TimerPage;
