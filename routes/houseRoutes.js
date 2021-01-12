import express from "express";
import { getAllHouses, getFloorsByAbbrv } from "../controllers/HouseController";

const router = express.Router();

router.get("/", getAllHouses);
router.get("/floors/:abbrv", getFloorsByAbbrv);

export default router;
