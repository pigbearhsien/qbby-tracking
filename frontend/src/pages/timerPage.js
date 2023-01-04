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
            fontSize: "150%",
            fontWeight: "900",
            fontFamily: "Comic Sans MS"
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
