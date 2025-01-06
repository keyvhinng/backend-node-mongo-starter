import mongoose, { Document } from "mongoose";

export interface ITour extends Document {
  name: string;
  difficulty: number;
  rating: number;
  price: number;
}

export interface TourQueryParams {
  difficulty?: number;
  page?: string;
  sort?: string;
  limit?: string;
  fields?: string;
}

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  difficulty: Number,
  rating: Number,
  price: Number,
});

export const Tour = mongoose.model<ITour>("Tour", tourSchema);
