import { Request, Response } from "express";
import { AggregationService } from "../services/aggregation.service";

export class AggregationController {
  private aggregationService: AggregationService = new AggregationService();

  public async getCasesByCity(req: Request, res: Response): Promise<void> {
    const { startDate, endDate } = req.query;

    try {
      const data = await this.aggregationService.getCasesByCity(
        new Date(startDate as string),
        new Date(endDate as string)
      );
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send("Error fetching data");
    }
  }
}
