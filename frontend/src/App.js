import logo from "./logo.svg";
import "./App.css";
import MainPage from "./pages/mainPage";
import { Hidden } from "@material-ui/core";
import { useCallback, useState } from "react";
import CalendarPage from "./pages/calenderPage";
import MarketPage from "./pages/marketPage";
import TimerPage from "./pages/timerPage";
import LogInPage from "./pages/loginPage";

function App() {
  const [page, setPage] = useState("Main");
  const [logIn, setLogIn] = useState(false);
  if (logIn) {
    if (page == "Main") return <MainPage setPage={setPage}></MainPage>;
    else if (page == "Calendar")
      return <CalendarPage setPage={setPage}></CalendarPage>;
    else if (page == "Market") return <MarketPage setPage={setPage} />;
    else if (page == "Timer")
      return <TimerPage setPage={setPage} page={page} />;
  } else return <LogInPage setLogIn={setLogIn}></LogInPage>;
}

export default App;
