import { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import listingRoutes from "../routes/listingRouter.js";
import config from "../config/index.js";
import swaggerRouter from "../swagger.js";

export default async ({app}: {app: Application}) => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(config.api.prefix, listingRoutes);
    app.use("/api", swaggerRouter);
    app.use((req, res, next) => {
        const error = new Error(`Not found - ${req.originalUrl}`);
        console.log(error)
        res.status(404);
        next(error);
    });
    console.log("Express initialized.");
}