import PopularTimes from "../models/PopularTimes";

const getAllPopularTimes = async (_, res) => {
  try {
    await PopularTimes.find({}, (err, data) => {
      if (err) return res.json({ error: err });
      if (!data.length) return res.json({ error: "No popular times found", data: data });
      return res.json({
        data: data,
      });
    });
  } catch (e) {
    return res.json({ error: e });
  }
};

const insertPopularTime = (req, res) => {
  const body = req.body;
  console.log(req);

  if (!body) return res.status(400).json({ error: "You must provide a popular time object!" });
  const popularTime = new PopularTimes(body);
  if (!popularTime) return res.status(400).json({ error: "Failed to create new popular time object!" });

  popularTime
    .save()
    .then(() => {
      return res.json({
        id: popularTime._id,
        message: "Populartime created",
      });
    })
    .catch((e) => {
      return res.json({
        error: e,
        message: "Populartime save error",
      });
    });
};

export { getAllPopularTimes, insertPopularTime };
