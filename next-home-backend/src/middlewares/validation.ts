import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } 
    catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        }));

        res.status(400).json({
          status: "error",
          errors: formattedErrors,
        });
      }
      next(error);
    }
  };
};

export default validate;
