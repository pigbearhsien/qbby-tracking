import Timer from "../models/timer";

exports.createTimerUser = async (req, res) => {
  const body = req.body;
  new Timer(body).save();
};

exports.getTimerRecord = async (req, res) => {
  let qId = req.query.studentId;
  try {
    const qUser = await Timer.findOne({ studentId: qId });
    if (qUser.allRecord.length === 0) {
      res.send({ allRecord: [] });
    } else {
      res.send({ allRecord: qUser.allRecord });
    }
  } catch (e) {
    throw new Error("Query error: " + e);
  }
};

exports.createTimerRecord = async (req, res) => {};

exports.deleteTimerRecord = async (req, res) => {};
