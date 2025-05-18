import { Request, Response } from "express";
import { ListingTypeDTO } from "../dtos/listing.dto.js";
import * as listingService from '../services/listingService.js'
import { ProjectError } from "../utils/globalErrorHandlers.js";


/**
 * @swagger
 * /v1/:
 *   post:
 *     summary: Create a new listing
 *     tags: [Listings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListingTypeDTO'
 *     responses:
 *       201:
 *         description: Listing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListingTypeDTO'
 *       400:
 *         description: Validation error or invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid data provided"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
export const createListing = async (req: Request, res: Response) => {
  try {
    const data: ListingTypeDTO = req.body;
    const listing = await listingService.createListing(data);
    res.status(201).json(listing);
  } 
  catch (error) {
    if (error instanceof ProjectError)
        res.status(400).json({ error: error });
    else console.log(error)
  }
};


/**
 * @swagger
 * /v1/:
 *   get:
 *     summary: Get all listings
 *     tags: [Listings]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of listings per page
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: A list of listings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 listings:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/ListingTypeDTO'
 *                 totalPages:
 *                   type: integer
 *                 currentPage:
 *                   type: integer
 */
export const getAllListings = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";

    const data = await listingService.getAllListings(page, limit, search);
    res.status(200).json(data);
  } 
  catch (error) {
    res.status(500).json({ error: "Failed to fetch listings" });
  }
};


/**
 * @swagger
 * /v1/{id}:
 *   get:
 *     summary: Get a listing by ID
 *     tags: [Listings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: A single listing
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListingTypeDTO'
 *       404:
 *         description: Listing not found
 */
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
