import React from "react";
import ListingCard from "./ListingCard";
import { fetchListings } from "@/lib/api";
import PaginationContainer from "./PaginationContainer";

const LIMIT = parseInt(process.env.NEXT_PUBLIC_LISTINGS_LIMIT || "10");

interface ListingsProps {
  searchParams: {
    page?: string;
  };
}

export const Listings = async ({ searchParams }: ListingsProps) => {
  const params = await searchParams
  const page = parseInt(params?.page || "1");

  try {
    const { listings, totalPages } = await fetchListings(page, LIMIT);

    if (!listings || listings.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-gray-500">No listings found.</p>
        </div>
      );
    }

    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing.unitNumber} listing={listing} />
          ))}
        </div>

        <PaginationContainer totalPages={totalPages} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching listings:", error);
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Failed to fetch listings. Please try again.</p>
      </div>
    );
  }
};

export default Listings;
