import infoRoute from "./info";
import timerRoute from "./timer";
import calendarRoute from "./calender";
import todoRoute from "./todo";
import marketRoute from "./market";
import { Info } from "@mui/icons-material";

const wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);

function main(app) {
  app.post("/api/createLoginInfo", wrap(infoRoute.createLoginInfo));
  app.post("/api/createMonsterData", wrap(infoRoute.createMonsterData));
  app.get("/api/findUserInfo", wrap(infoRoute.findUserInfo));
  app.get("/api/getDailyCheckInfo", wrap(infoRoute.getDailyCheckInfo))
  app.post("/api/updateLoginTime", wrap(infoRoute.updateLoginTime));
  app.get("/api/getMoneyandExp", wrap(infoRoute.getMoneyandExp))
  app.post("/api/updateMoneyandExp", wrap(infoRoute.updateMoneyandExp))
  app.put("/api/buyHeadProfile", wrap(infoRoute.buyHeadProfile));
  app.post("/api/updateStudyTime", wrap(infoRoute.updateStudyTime))


  app.get("/api/getTimerRecords", wrap(timerRoute.getTimerRecords));
  app.post("/api/createTimerRecord", wrap(timerRoute.createTimerRecord));
  app.post("/api/deleteTimerRecord", wrap(timerRoute.deleteTimerRecord));

  app.get("/api/getTodo", wrap(todoRoute.getTodo));
  app.post("/api/addTodo", wrap(todoRoute.addTodo));
  app.put("/api/checkTodo", wrap(todoRoute.checkTodo));
  app.delete("/api/deleteTodo", wrap(todoRoute.deleteTodo));

  app.post("/api/createCalendarEvent", wrap(calendarRoute.createCalendarEvent));
  app.post("/api/deleteCalendarEvent", wrap(calendarRoute.deleteCalendarEvent));
  app.get("/api/getCalendarEvent", wrap(calendarRoute.getCalendarEvent));
  app.post("/api/checkEventCounted", wrap(calendarRoute.checkEventCounted))

  app.post("/api/createMarket", wrap(marketRoute.createMarket));
  app.get("/api/getMarket", wrap(marketRoute.getMarket));
  app.put("/api/purchaseItem", wrap(marketRoute.purchaseItem));
}

export default main;
