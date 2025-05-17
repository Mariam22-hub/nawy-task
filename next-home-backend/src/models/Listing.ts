import mongoose, { Schema, Document } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IListing extends Document {
  _id: string;
  title: string;
  unitNumber: string;
  project: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  location: string;
  description: string;
  image: string;
  type: "rent" | "sale";
}

const ListingSchema = new Schema<IListing>(
  {
    _id: {type: String, default: uuidv4},
    title: { type: String, required: true, minlength: 3 },
    unitNumber: { type: String, required: true, unique: true },
    project: { type: String, required: true, minlength: 3 },
    price: { type: String, required: true },
    bedrooms: { type: Number, required: true, min: 1, max: 10 },
    bathrooms: { type: Number, required: true, min: 1, max: 10 },
    area: { type: Number, required: true, min: 20 },
    location: { type: String, required: true, minlength: 3 },
    description: { type: String, required: true, minlength: 10 },
    image: { type: String, required: false },
    type: { type: String, enum: ["rent", "sale"], required: true },
  },
  {
    timestamps: true,
  }
);

const Listing = mongoose.model<IListing>("Listing", ListingSchema);
export default Listing;
