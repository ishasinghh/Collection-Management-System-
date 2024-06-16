// controllers/import.controller.ts
import { Request, Response } from "express";
import { ImportService } from "../services/import.service";

export class ImportController {
  private importService: ImportService;

  constructor() {
    this.importService = new ImportService();
  }

  public async importData(req?: Request, res?: Response): Promise<void> {
    try {
      if (req && res) {
        await this.importService.importData();
        res
          .status(200)
          .send("Scheduled data import job completed successfully");
      } else {
        await this.importService.importData();
      }
    } catch (error) {
      console.error("Scheduled job failed");
      if (res) {
        res.status(500).send("Scheduled job failed");
      }
    }
  }
}
