import { ListingType } from "@/components/ListingCard";
import next from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';


export const fetchListings = async (page: number, limit: number, search: string = "") => {
  try {
    const query = new URLSearchParams({ page: String(page), limit: String(limit), search }).toString();
    const response = await fetch(`${API_URL}/v1/?${query}`, {
        next: { revalidate: 60 }
      });

    if (!response.ok) {
      throw new Error("Failed to fetch listings");
    }

    return await response.json();
  } 
  catch (error) {
    console.error("Error fetching listings:", error);
    return { listings: [], totalPages: 1 };
  }
};

export async function fetchListingById(id: string): Promise<ListingType> {
  try {
    const response = await fetch(`${API_URL}/v1/${id}`,
      {next: { revalidate: 60 }
    });
    
    if (!response.ok) {
      throw new Error(`Error fetching listing: ${response.statusText}`);
    }
    
    const listing = await response.json();
    return listing;
  } 
  catch (error) {
    console.error(`Failed to fetch listing with ID ${id}:`, error);
    throw error;
  }
}

export async function createListing(data: Partial<ListingType>): Promise<ListingType> {
  try {
    const response = await fetch(`${API_URL}/v1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error creating listing: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Failed to create listing:", error);
    throw error;
  }
}