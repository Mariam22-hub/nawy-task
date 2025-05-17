import mongoose from "mongoose";
import { ListingTypeDTO } from "../dtos/listing.dto.js";
import { IListing } from "../models/Listing.js";

export const toDTO = (listing: IListing): ListingTypeDTO => {
  return {
    _id: listing._id,
    title: listing.title,
    project: listing.project,
    price: listing.price,
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    area: listing.area,
    location: listing.location,
    description: listing.description,
    type: listing.type,
    unitNumber: listing.unitNumber,
    image: listing.image
  };
};