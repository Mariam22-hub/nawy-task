import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Router } from "express";

const router = Router();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Listings API",
    version: "1.0.0",
    description: "API documentation for the Listings CRUD application",
  },
  servers: [
    {
      url: "http://localhost:8000/api",
      description: "Development Server",
    },
  ],
  components: {
    schemas: {
      ListingTypeDTO: {
        type: "object",
        properties: {
          title: { type: "string", example: "Luxury Apartment" },
          unitNumber: { type: "string", example: "A-101" },
          project: { type: "string", example: "Palm Heights" },
          price: { type: "string", example: "1500000" },
          bedrooms: { type: "integer", example: 3 },
          bathrooms: { type: "integer", example: 2 },
          area: { type: "number", example: 120 },
          location: { type: "string", example: "Downtown, Miami" },
          description: { type: "string", example: "A luxurious 3-bedroom apartment with sea view." },
          image: { type: "string", example: "https://example.com/image.jpg" },
          type: { type: "string", enum: ["rent", "sale"], example: "rent" },
        },
        required: ["title", "unitNumber", "project", "price", "bedrooms", "bathrooms", "area", "location", "description", "type"],
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
