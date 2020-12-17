import express from "express";
import { getAllPopularTimes, insertPopularTime } from "../controllers/PopularTimesController";

const router = express.Router();

router.get("/", getAllPopularTimes);
router.post("/", insertPopularTime);

export default router;
