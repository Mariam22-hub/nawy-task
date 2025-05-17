import React from "react";
import Link from "next/link";
import {
  FaBath,
  FaBed,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import { ListingType } from "@/models/types";
import { fetchListingById } from "@/lib/api";

interface Props {
  params: {
    id: string;
  };
}

const ListingDetails = async ({ params }: Props) => {
  const { id } = await params;

  let listing: ListingType | null = null;
  let error: string | null = null;

  try {
    listing = await fetchListingById(id);
  } 
  catch (err) {
    console.error("Error fetching listing:", err);
    error = "Failed to fetch listing. Please try again.";
  }

  if (error || !listing) {
    return (
      <main className="p-4 flex flex-col max-w-6xl mx-auto min-h-screen">
        <h2 className="text-xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-2xl">
          {error}
        </h2>
        <Link href="/" className="text-blue-600 mt-4 text-center hover:underline transition-colors">
          &larr; Back to Listings
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          // src={null}
          alt={listing.title}
          className="w-full h-64 sm:h-80 md:h-96 lg:h-[400px] object-cover"
        />
        
        <div className="flex flex-col max-w-4xl mx-auto p-4 md:p-6 lg:p-8 gap-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 flex-grow">
              {listing.title}
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-blue-950">
              ${listing.price.toLocaleString()}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <p className="bg-red-900 w-full sm:w-auto px-4 py-1 text-white text-center rounded-md">
              {listing.type.toLowerCase() === 'rent' ? 'For Rent' : 'For Sale'}
            </p>
          </div>
          
          <div className="mt-4 space-y-2 text-sm md:text-base">
            <p className="flex items-center gap-2 text-slate-600">
              <FaMapMarkerAlt className="text-blue-950 flex-shrink-0" />
              <span>{listing.location}</span>
            </p>
            
            <p className="flex items-center gap-2 text-slate-600">
              <AiOutlineNumber className="text-gray-700 flex-shrink-0" />
              <span>Unit Number: {listing.unitNumber}</span>
            </p>
            
            <div className="text-slate-800">
              <span className="font-semibold text-black">Project: </span>
              {listing.project}
            </div>
          </div>
          
          <div className="my-6 bg-gray-50 p-4 rounded-lg">
            <ul className="flex flex-wrap gap-6 justify-start">
              <li className="flex items-center gap-1 whitespace-nowrap text-blue-950">
                <FaBed className="text-lg" />
                <span className="font-medium">
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </span>
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap text-blue-950">
                <FaBath className="text-lg" />
                <span className="font-medium">
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </span>
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap text-blue-950">
                <AiOutlineNumber className="text-lg" />
                <span className="font-medium">{listing.area} m²</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-2">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-slate-800 leading-relaxed">
              {listing.description}
            </p>
          </div>
          
          <Link 
            href="/" 
            className="mt-8 inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            &larr; Back to Listings
          </Link>
        </div>
      </div>
    </main>
  );
};

export default ListingDetails;