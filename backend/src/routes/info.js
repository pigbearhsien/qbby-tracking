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
  //console.log(body);
  new Info(body).save();
};

exports.createMonsterData = async (req, res) => {
  console.log("monster");
};
