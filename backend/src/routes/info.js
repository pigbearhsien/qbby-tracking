import Info from "../models/info";

exports.findUserInfo = async (req, res) => {
  const userId = req.query.userId;
  const password = req.query.password;

  Info.find({ studentId: userId, password: password }).exec((err, data) => {
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

exports.getDailyCheckInfo = async (req, res) => {
  // console.log(req.query)
  const userId = req.query.userId;
  const User = await Info.find({ studentId: userId })
  if(!User) res.send({msg: "no user", lasgLoginTime: ""})
  else res.send({msg: "success", lastLoginTime: User[0].lastLoginTime})
}

exports.updateLoginTime = async (req, res) => {
  const userId = req.body.params.studentId;
  const time = new Date().toString()
  const User = await Info.findOneAndUpdate({studentId: userId}, {lastLoginTime: time})
  if(!User) res.send({msg: "no user"})
  else res.send({msg: "success"})
}

exports.getMoneyandExp = async (req, res) => {
  const userId = req.query.userId;
  const User = await Info.find({ studentId: userId })
  console.log(User[0].level)
  if(!User) res.send({msg: "no user", MONEY: 0, LEVEL: 0, EXP: 0})
  else res.send({msg: "success", MONEY: User[0].money, LEVEL: User[0].level, EXP: User[0].experience})
}

exports.updateMoneyandExp = async (req, res) => {
  const userInfo = req.body.params;
  console.log(userInfo)
  const User = await Info.findOneAndUpdate({studentId: userInfo.studentId}, {money: userInfo.money})
  await Info.findOneAndUpdate({studentId: userInfo.studentId}, {experience: userInfo.exp})
  await Info.findOneAndUpdate({studentId: userInfo.studentId}, {level: userInfo.level})
  if(!User) res.send({msg: "no user", MONEY: 0, LEVEL: 0, EXP: 0})
  else res.send({msg: "success", MONEY_post: userInfo.money, LEVEL_post: userInfo.level, EXP_post: userInfo.exp})
}