import Todo from "../models/todo";

exports.getTodo = async (req, res) => {
  const studentId = req.query.studentId;
  const todos = Todo.collection.find({ studentId: studentId });
  let eventList = new Set();
  if (!todos) res.status(403).send([]);
  else {
    await todos.forEach((todo) => {
      eventList.add(todo);
    });
    eventList = Array.from(eventList);
    res.status(200).send({ eventList: eventList });
  }
  console.log("updated");
};

exports.addTodo = async (req, res) => {
  const body = req.body;
  //console.log(body);
  new Todo(body).save();
  console.log("added");
};

exports.checkTodo = async (req, res) => {
  const studentId = req.body.studentId;
  const event = req.body.event;
  const body = req.body;
  await Todo.updateOne({ studentId: studentId, event: event }, body);
  console.log("checked");
};

exports.deleteTodo = async (req, res) => {
  const studentId = req.query.studentId;
  const event = req.query.event;
  //console.log(studentId);
  await Todo.collection.deleteMany({ studentId: studentId, event: event });
  console.log("deleted");
};
