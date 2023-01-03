import MyCalendar from "../components/calendar";
import MainDrawer from "../components/mainDrawer";

const CalendarPage = ({ setPage, page }) => {
  return (
    <div style={{ paddingTop: "2vh", paddingLeft: "2vw" }}>
      <link
        id="theme"
        rel="stylesheet"
        href="https://bootswatch.com/5/sketchy/bootstrap.css"
      />
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
      <MyCalendar></MyCalendar>
    </div>
  );
};

export default CalendarPage;
