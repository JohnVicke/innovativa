import House from "../models/House";

const getFloorsByAbbrv = async (req, res) => {
  const abbrv = req.paramas.abbrv;
  const filter = {
    abbrv: abbrv,
  };
  try {
    await House.find(filter, (err, data) => {
      if (err) return res.status(500).json({ error: err });
      if (!data.length) return res.status(404).json({ error: "nothing found" });
      return res.json({
        house: data,
      });
    });
  } catch (e) {
    return res.status(404).json({ error: e });
  }
};

const getAllHouses = async (_, res) => {
  try {
    await House.find({}, (err, data) => {
      if (err) return res.status(500).json({ error: err });
      console.log(data);
      return res.json({
        data,
      });
    });
  } catch (e) {
    return res.status(404).json({ e });
  }
};

export { getFloorsByAbbrv, getAllHouses };
