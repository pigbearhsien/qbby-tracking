import Market from "../models/market";

exports.createMarket = async (req, res) => {
  const studentId = req.body.studentId;
  const initialMarket = req.body.initialMarket;
  initialMarket.map((com) => {
    new Market({
      studentId: studentId,
      type: com.type,
      item: com.item,
      status: com.status,
    }).save();
  });

  await res.send({ msg: "createMarket" });
};

exports.getMarket = async (req, res) => {
  const studentId = req.query.studentId;
  const type = req.query.type;
  const items = Market.collection
    .find({ studentId: studentId, type: type })
    .sort({ item: 1 });
  let marketList = new Set();
  if (!items) res.status(403).send([]);
  else {
    await items.forEach((item) => {
      console.log("time");
      marketList.add(item);
    });
    marketList = Array.from(marketList);
    marketList = marketList;
    await res.status(200).send({ marketList: marketList, msg: "getMarket" });
  }
};

exports.purchaseItem = async (req, res) => {
  const studentId = req.body.studentId;
  const type = req.body.type;
  const item = req.body.item;
  const status = "purchased";
  await Market.updateOne(
    { studentId: studentId, type: type, item: item },
    { status: status }
  );
  await res.send({ msg: "purchaseItem" });
};
