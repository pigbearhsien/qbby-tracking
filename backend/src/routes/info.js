import Info from "../models/info";

exports.findUserInfo = async (req, res) => {
  const studentId = req.query.userId;
  const password = req.query.password;

  Info.find({ studentId: studentId, password: password }).exec((err, data) => {
    if (data.length === 0) res.send({ message: "nouser", contents: [] });
    else res.status(200).send({ message: "success", contents: data });
  });
};

exports.createLoginInfo = async (req, res) => {
  const body = req.body;
  let flag = false;
  Info.find({
    username: body.username,
    studentId: body.userId,
    password: body.password,
  }).exec((err, data) => {
    if (data.length === 0) flag = true;
  });
  if (!flag) new Info(body).save();
};

exports.createMonsterData = async (req, res) => {
  console.log("monster");
};

exports.buyHeadProfile = async (req, res) => {
  const username = req.body.username;
  const studentId = req.body.studentId;
  const profileHead = req.body.profileHead;
  await Info.updateOne(
    { username: username, studentId: studentId },
    { profileHead: profileHead }
  );

  console.log("Head updated.");
};
