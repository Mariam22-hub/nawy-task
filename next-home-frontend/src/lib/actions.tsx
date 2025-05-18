"use server"

import { createListing } from "@/app/api/listing_apis";
import { revalidatePath } from "next/cache";
import { ListingSchemaClient } from "./validation";
import { ActionResponse, extractListingFromFormData, ListingType } from "@/models/types";


export async function createListingAction(prevState: ActionResponse | null, formData: FormData):
Promise<ActionResponse> {
  try {
    const data = extractListingFromFormData(formData);
    const validatedData = ListingSchemaClient.safeParse(data);
    
    if (!validatedData.success){
      console.log("error returned data", formData);
      
      return {
        success: false,  
        message: "Invalid form fields",      
        errors: validatedData.error.flatten().fieldErrors,
        fields: data
      }
    }



    await createListing(data);
    revalidatePath("/"); 
    return {
      success: true,
      message: "Success"
    };
  } 
  catch (error) {
    throw new Error("Failed to create listing. Please try again.");
  }
}