import StudyTimer from "../components/timer";
import MainDrawer from "../components/mainDrawer";
import "./timerPage.css";

const TimerPage = ({ setPage }) => {
  return (
    <div className="Timer">
      <div className="menuWrapper">
        <MainDrawer setPage={setPage}></MainDrawer>
        <p
          style={{
            marginTop: "3vh",
            fontSize: "4vh",
            fontWeight: "900",
          }}
        >
          Menu
        </p>
      </div>
      <StudyTimer></StudyTimer>
    </div>
  );
};

export default TimerPage;
