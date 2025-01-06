import { Request, Response } from "express";

import logger from "../utils/logger";
import { TourService } from "../services/tour.service";
import { TourQueryParams } from "../models/tour.model";

export class TourController {
  private tourService: TourService;

  constructor() {
    this.tourService = new TourService();
  }

  async createTour(req: Request, res: Response): Promise<void> {
    try {
      const tour = await this.tourService.createTour(req.body);
      res.status(201).json(tour);
    } catch (error) {
      logger.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }

  async getTours(
    req: Request<{}, {}, {}, TourQueryParams>,
    res: Response,
  ): Promise<void> {
    try {
      const queryObj = { ...req.query };
      const tours = await this.tourService.getAllTours(queryObj);
      res.json(tours);
    } catch (error) {
      logger.error(error);
      if (error instanceof Error) {
        res.status(500).json({
          error: error.message,
        });
      }
    }
  }

  async getTourById(req: Request, res: Response): Promise<void> {
    try {
      const tour = await this.tourService.getTourById(req.params.id);
      if (!tour) {
        res.status(404).json({
          message: "Tour not found",
        });
      }
      res.json(tour);
    } catch (error) {
      logger.error(error);
      if (error instanceof Error) {
        res.status(500).json({
          error: error.message,
        });
      }
    }
  }

  async updateTour(req: Request, res: Response): Promise<void> {
    try {
      const tourId = req.params.id;
      const tourData = req.body;
      const tour = await this.tourService.updateTour(tourId, tourData);
    } catch (error) {
      logger.error(error);
      if (error instanceof Error) {
        res.status(500).json({
          error: error.message,
        });
      }
    }
  }

  async deleteTour(req: Request, res: Response): Promise<void> {
    try {
      await this.tourService.deleteTour(req.params.id);
      res.status(404).send();
    } catch (error) {
      logger.error(error);
      if (error instanceof Error) {
        res.status(500).json({
          message: error.message,
        });
      }
    }
  }
}
