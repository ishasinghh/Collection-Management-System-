import { Router } from "express";
import { ImportController } from "../controllers/import.controller";

const router = Router();
const importController = new ImportController();

router.post("/v1/import", (req, res) => importController.importData(req, res));

export default router;
