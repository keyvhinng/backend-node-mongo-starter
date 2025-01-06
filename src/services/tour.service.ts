import { ITour, TourQueryParams, Tour } from "../models/tour.model";

function removeKeys<T extends object, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const newObj = { ...obj };
  keys.forEach((key) => delete newObj[key]);
  return newObj;
}

export class TourService {
  async createTour(tourData: Partial<ITour>): Promise<ITour> {
    const tour = new Tour(tourData);
    const savedTour = tour.save();
    return savedTour;
  }

  async getAllTours(query: TourQueryParams): Promise<ITour[]> {
    const queryObj = { ...query };
    const excludedFields = [
      "page",
      "sort",
      "limit",
      "fields",
    ] as (keyof TourQueryParams)[];
    const filteredQueryParams = removeKeys(queryObj, excludedFields);

    return await Tour.find(query);
  }

  async getTourById(id: string): Promise<ITour | null> {
    return await Tour.findById(id);
  }

  async updateTour(
    id: string,
    tourData: Partial<ITour>,
  ): Promise<ITour | null> {
    return await Tour.findByIdAndUpdate(id, tourData, {
      new: true,
    });
  }

  async deleteTour(id: string): Promise<ITour | null> {
    return await Tour.findByIdAndDelete(id);
  }
}
