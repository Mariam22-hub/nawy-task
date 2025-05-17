import { ListingType } from "@/components/ListingCard";
import next from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

interface ListingsResponse {
  listings: ListingType[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export async function fetchListings(page: number, limit:number): Promise<ListingsResponse> {
  try {
    const response = await fetch(`${API_URL}/v1?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error(`Error fetching listings: ${response}`);
    }

    return response.json()
    // return data;
  } 
  catch (error) {
    console.error('Failed to fetch listings:', error);
    throw error;
  }
}

export async function fetchListingById(id: string): Promise<ListingType> {
  try {
    const response = await fetch(`${API_URL}/v1/${id}`, {
      cache: "no-store"
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