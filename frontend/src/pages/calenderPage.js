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
      <div className="menuWrapper"
        style={{
          marginBottom: "3vh"
        }}
        >
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
      <MyCalendar></MyCalendar>
    </div>
  );
};

export default CalendarPage;
