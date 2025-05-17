import { Request, Response } from "express";
import { ListingTypeDTO } from "../dtos/listing.dto.js";
import * as listingService from '../services/listingService.js'
import { ProjectError } from "../utils/globalErrorHandlers.js";

export const createListing = async (req: Request, res: Response) => {
  try {
    const data: ListingTypeDTO = req.body;
    const listing = await listingService.createListing(data);
    res.status(201).json(listing);
  } 
  catch (error) {
    if (error instanceof ProjectError)
        res.status(400).json({ error: error.message });
    else console.log(error)
  }
};

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const data = await listingService.getAllListings(page, limit);
    res.status(200).json(data);
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const listing = await listingService.getListingById(id);
    
    if (!listing) {
      res.status(404).json({ message: "Listing not found" }); 
      return;
    }
    
    res.status(200).json(listing);
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch listing" });
  }
};
