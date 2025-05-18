import React from "react";
import ListingCard, { ListingType } from "./ListingCard";
import { fetchListings } from "@/app/api/listing_apis";
import PaginationContainer from "./PaginationContainer";

const LIMIT = parseInt(process.env.NEXT_PUBLIC_LISTINGS_LIMIT || "10");

interface ListingsProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

export const Listings = async ({ searchParams }: ListingsProps) => {
  const searchQuery = await searchParams;
  const page = searchQuery?.search ? 1 : parseInt(searchQuery.page || "1");
  const query = searchQuery?.search || "";

  try {
    const { listings, totalPages } = await fetchListings(page, LIMIT, query);

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
          {listings.map((listing: ListingType) => (
            <ListingCard key={listing._id} listing={listing} />
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
