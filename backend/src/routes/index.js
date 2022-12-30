import infoRoute from "./info";
import timerRoute from "./timer";
import calendarRoute from "./calender";
import todoRoute from "./todo";

const wrap =
  (fn) =>
  (...args) =>
    fn(...args).catch(args[2]);

function main(app) {
  app.post("/api/createLoginInfo", wrap(infoRoute.createLoginInfo));
  app.post("/api/createMonsterData", wrap(infoRoute.createMonsterData));

  app.get("/api/getTimerRecords", wrap(timerRoute.getTimerRecords));
  app.post("/api/createTimerRecord", wrap(timerRoute.createTimerRecord));
  app.post("/api/deleteTimerRecord", wrap(timerRoute.deleteTimerRecord));

  app.get("/api/findUserInfo", wrap(infoRoute.findUserInfo));

  app.post("/api/createCalendarEvent", wrap(calendarRoute.createCalendarEvent));
  app.post("/api/deleteCalendarEvent", wrap(calendarRoute.deleteCalendarEvent));
  app.get("/api/getCalendarEvent", wrap(calendarRoute.getCalendarEvent));

  //app.get(
  //"/api/getCommentsByRestaurantId",
  //wrap(commentRoute.GetCommentsByRestaurantId)
  //);
  //app.post("/api/createComment", wrap(commentRoute.CreateComment));
}

export default main;
