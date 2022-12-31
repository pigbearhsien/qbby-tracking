import MyCalendar from "../components/calendar";
import MainDrawer from "../components/mainDrawer";

const CalendarPage = ({ setPage, page }) => {
  return (
    <div>
      <link
        id="theme"
        rel="stylesheet"
        href="https://bootswatch.com/5/sketchy/bootstrap.css"
      />
      <MainDrawer setPage={setPage}></MainDrawer>
      <MyCalendar></MyCalendar>
    </div>
  );
};

export default CalendarPage;
