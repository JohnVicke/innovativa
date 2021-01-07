import express from "express";
import { getAllPopularTimes, getPopularTime, insertPopularTime } from "../controllers/PopularTimesController";

const router = express.Router();

router.get("/", getAllPopularTimes);
router.get("/:place/:floor", getPopularTime);
router.post("/", insertPopularTime);

export default router;
