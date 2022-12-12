import Info from "../models/info";

exports.createLoginInfo = async (req, res) => {
  const body = req.body;
  new Info(body).save();
};

exports.createMonsterData = async (req, res) => {};
