import { toDTO } from './../utils/listingToDTO.js';
import { ListingTypeDTO } from "../dtos/listing.dto.js";
import Listing from "../models/Listing.js";
import { ProjectError } from "../utils/globalErrorHandlers.js";
import { ErrorName } from '../models/ErrorName.js';

export const createListing = async (data: ListingTypeDTO) => {
    try{
        // const existingListing = await Listing.findOne({ unitNumber: data.unitNumber });
        // if (existingListing) {
        //     throw new ProjectError({
        //         name: ErrorName.CREATE_LISTING_ERROR,
        //         message: `A listing with unit number ${data.unitNumber} already exists.`,
        //         cause: "Duplicate UnitNumber",
        //     });
        // }

        const newListing = new Listing(data)
        return toDTO(await newListing.save());
    }
    catch (error) {
        if (error instanceof ProjectError) throw error;

        throw new ProjectError({
            name: ErrorName.CREATE_LISTING_ERROR,
            message: "Failed to create listing",
            cause: error,
        });
    }
}

export const getAllListings = async (page: number, limit: number) => {
  try {
    const skip = (page - 1) * limit;
    const [listings, total] = await Promise.all([
      Listing.find().skip(skip).limit(limit),
      Listing.countDocuments(),
    ]);

    return {
      listings: listings.map(toDTO),
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  } 
  catch (error) {
    throw new ProjectError({
      name: ErrorName.FETCH_LISTINGS_ERROR,
      message: "Failed to fetch listings",
      cause: error,
    });
  }
};

export const getListingById = async (id: string) => {
    try {
        const listing = await Listing.findById(id);
        return listing ? toDTO(listing) : null;
    }
    catch (error) {
        throw new ProjectError({
            name: ErrorName.FETCH_LISTING_DETAILS_ERROR,
            message: "Failed to fetch listing details",
            cause: error,
        });
    }
}