import Info from "../models/info";

exports.getTimerRecords = async (req, res) => {
  let Id = req.query.studentId;
  try {
    const user = await Info.findOne({ studentId: Id });
    res.send({ timerRecords: user.timerRecords });
  } catch (e) {
    throw new Error("Query error: " + e);
  }
};

exports.createTimerRecord = async (req, res) => {
  let Id = req.body.studentId;
  let newRecord = req.body.newRecord;
  try {
    const user = await Info.findOne({ studentId: Id });
    user.timerRecords.push(newRecord);
    user.save();
  } catch (e) {
    throw new Error("Query error: " + e);
  }
};

exports.deleteTimerRecord = async (req, res) => {
  let filter = { studentId: req.body.studentId };
  let update = { timerRecords: req.body.new };
  try {
    const doc = await Info.findOneAndUpdate(filter, update);
    doc.save();
  } catch (e) {
    throw new Error("Query error: " + e);
  }
};
