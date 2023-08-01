import express from "express";
import devicesRouter from "./devices";

const router = express.Router();

router.use("/devices", devicesRouter);

export default router;