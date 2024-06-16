import { Router } from "express";
import { AggregationController } from "../controllers/aggregation.controller";

const router = Router();
const aggregationController = new AggregationController();

router.get("/v1/cases-by-city", (req, res) =>
  aggregationController.getCasesByCity(req, res)
);

export default router;
