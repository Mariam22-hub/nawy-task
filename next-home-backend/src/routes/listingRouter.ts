import express from "express";
import * as listingController from "../controllers/listingController.js";
import  validate from "../middlewares/validation.js";
import { ListingSchemaDTO } from "../dtos/listing.dto.js";

const router = express.Router();

router.post("/", validate(ListingSchemaDTO), listingController.createListing);
router.get("/", listingController.getAllListings);
router.get("/:id", listingController.getListingById);

export default router;
