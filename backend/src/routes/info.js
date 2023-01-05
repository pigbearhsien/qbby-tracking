import Info from "../models/info";
import bcrypt from 'bcrypt';

exports.findUserInfo = async (req, res) => {
  const studentId = req.query.userId;
  const password = req.query.password;

  Info.find({ studentId: studentId }).exec((err, data) => {
    if (data.length === 0) {
      res.send({ message: "nouser", contents: [] })
    } else if (bcrypt.compareSync(password, data[0].password)) {
      res.status(200).send({ message: "success", contents: data })
    } else {
      res.send({ message: "wrongpassword", contents: [] })
    }
  });
};

exports.createLoginInfo = async (req, res) => {
  const body = req.body;
  Info.find({
    studentId: body.studentId,
  }).exec((err, data) => {
    if (data.length !== 0) {
      res.send({message: "userexist"})
    } else {
      body.password = bcrypt.hashSync(body.password, 10)
      new Info(body).save();
      res.send({message: "success"})
    }
  });
};

exports.createMonsterData = async (req, res) => {
  console.log("monster");
};

exports.getDailyCheckInfo = async (req, res) => {
  // console.log(req.query)
  const userId = req.query.userId;
  const User = await Info.find({ studentId: userId });
  if (!User) res.send({ msg: "no user", lasgLoginTime: "" });
  else res.send({ msg: "success", lastLoginTime: User[0].lastLoginTime });
};

exports.updateLoginTime = async (req, res) => {
  const userId = req.body.params.studentId;
  const time = new Date().toString();
  const User = await Info.findOneAndUpdate(
    { studentId: userId },
    { lastLoginTime: time }
  );
  if (!User) res.send({ msg: "no user" });
  else res.send({ msg: "success" });
};

exports.getMoneyandExp = async (req, res) => {
  const userId = req.query.userId;
  const User = await Info.find({ studentId: userId });
  console.log(User[0].level);
  if (!User) res.send({ msg: "no user", MONEY: 0, LEVEL: 0, EXP: 0 });
  else
    res.send({
      msg: "success",
      MONEY: User[0].money,
      LEVEL: User[0].level,
      EXP: User[0].experience,
    });
};

exports.updateMoneyandExp = async (req, res) => {
  const userInfo = req.body.params;
  console.log(userInfo);
  const User = await Info.findOneAndUpdate(
    { studentId: userInfo.studentId },
    { money: userInfo.money }
  );
  await Info.findOneAndUpdate(
    { studentId: userInfo.studentId },
    { experience: userInfo.exp }
  );
  await Info.findOneAndUpdate(
    { studentId: userInfo.studentId },
    { level: userInfo.level }
  );
  if (!User) res.send({ msg: "no user", MONEY: 0, LEVEL: 0, EXP: 0 });
  else
    res.send({
      msg: "success",
      MONEY_post: userInfo.money,
      LEVEL_post: userInfo.level,
      EXP_post: userInfo.exp,
    });
};

exports.deductMoney = async (req, res) => {
  const id = req.body.studentId
  const money = req.body.money
  await Info.findOneAndUpdate(
    {studentId: id},
    {money: money}
  )
  res.send("success")
}

exports.buyHeadProfile = async (req, res) => {
  const username = req.body.username;
  const studentId = req.body.studentId;
  const profileHead = req.body.profileHead;
  await Info.updateOne(
    { username: username, studentId: studentId },
    { profileHead: profileHead }
  );
  res.send({ msg: "buyHeadProfile" });
  console.log("Head updated.");
};


exports.buyMonster = async (req, res) => {
  const username = req.body.username;
  const studentId = req.body.studentId;
  const monster = req.body.monster;
  await Info.updateOne(
    { username: username, studentId: studentId },
    { monster: monster }
  );
  res.send({ msg: "buyMonster" });
  console.log("Monster updated.");
};

exports.updateStudyTime = async (req, res) => {
  const id = req.body.params.studentId;
  const time = req.body.params.studyTime;
}

exports.updateStudyTime = async (req, res) =>{
  const id = req.body.studentId;
  const time = req.body.studyTime;
  const User = await Info.findOneAndUpdate(
    { studentId: id },
    { studyTime: time }
  );
  if (!User) res.send({ msg: "no user" });
  else res.send({ msg: "success" });
};

exports.getStudyTime = async (req, res) => {
  console.log("in getStudyTime")
  console.log(req.query)
  const userId = req.query.userId;
  const User = await Info.find({ studentId: userId });
  console.log(User)
  if (!User) res.send({ msg: "no user", studyTime: 0 })
  else{
    res.send({
      msg: "success",
      studyTime: User[0].studyTime
    });
  }
};
