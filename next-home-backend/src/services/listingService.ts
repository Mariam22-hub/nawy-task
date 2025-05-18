import { toDTO } from './../utils/listingToDTO.js';
import { ListingTypeDTO } from "../dtos/listing.dto.js";
import Listing from "../models/Listing.js";
import { ProjectError } from "../utils/globalErrorHandlers.js";
import { ErrorName } from '../models/ErrorName.js';

export const createListing = async (data: ListingTypeDTO) => {
    try{
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

export const getAllListings = async (page: number, limit: number, search: string) => {
  const skip = (page - 1) * limit;
  const effectivePage = search ? 1 : page;

  const searchQuery = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { unitNumber: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } },
          { project: { $regex: search, $options: "i" } },
        ],
      }
    : {};

  try {
    const listings = await Listing.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await Listing.countDocuments(searchQuery);
    const totalPages = Math.ceil(total / limit);

    return { listings, totalPages, currentPage: effectivePage };
  } 
  catch (error) {
    console.error("Error fetching listings:", error);
    throw new Error("Failed to fetch listings");
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