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
  app.post("/api/createTimerUser", wrap(timerRoute.createTimerUser));
  app.get("/api/getTimerRecord", wrap(timerRoute.getTimerRecord));
  app.post("/api/createTimerRecord", wrap(timerRoute.createTimerRecord));
  app.delete("/api/deleteTimerRecord"), wrap(timerRoute.deleteTimerRecord);
  //app.get(
  //"/api/getCommentsByRestaurantId",
  //wrap(commentRoute.GetCommentsByRestaurantId)
  //);
  //app.post("/api/createComment", wrap(commentRoute.CreateComment));
}

export default main;
