import StudyTimer from "../components/timer";
import MainDrawer from "../components/mainDrawer";

const TimerPage = ({ setPage }) => {
  return (
    <div className="Timer">
      <MainDrawer setPage={setPage}></MainDrawer>
      <StudyTimer></StudyTimer>
    </div>
  );
};

export default TimerPage;
