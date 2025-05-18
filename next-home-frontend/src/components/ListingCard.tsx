import React from 'react';
import Link from 'next/link';
import { ListingType } from '@/models/types';


const ListingCard = ({ listing }: { listing: ListingType }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative h-48 bg-slate-200">
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.title || "Listing Image"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-slate-400">
            {/* You can keep your SVG placeholder here */}
            <svg
              className="w-12 h-12"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{listing.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">{listing.unitNumber}</span>
        </div>

        <p className="text-sm text-slate-500 mb-1">
          {listing.project} • {listing.location}
        </p>

        <div className="flex items-center gap-4 text-sm text-slate-700 my-3">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            {listing.bedrooms} {listing.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}
          </div>
          <div className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {listing.area} m²
          </div>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-slate-100">
          <span className="font-bold text-lg text-blue-600">EGP {listing.price}</span>
          <Link
            href={`/listing-details/${listing._id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium transition duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export type { ListingType };
export default ListingCard;
