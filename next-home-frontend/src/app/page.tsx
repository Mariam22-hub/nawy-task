import React from 'react';
import Listings from '@/components/Listings';
import Link from 'next/link';

const Home = ({ searchParams }: { searchParams: { page?: string, search?: string } }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-8 px-4">

      <div className="w-full max-w-6xl mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Find Your Dream Apartment</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Browse our exclusive collection of premium apartments and properties across the best locations
        </p>
      </div>
    
      <div className="w-full max-w-6xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Featured Listings</h2>
          <Link 
          href="/create-listing"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Add New Listing
        </Link>
        </div>
        <Listings searchParams={searchParams}/>
      </div>

      <div className="w-full max-w-6xl mt-16 bg-blue-600 rounded-lg shadow-lg p-8 text-center text-white">
        <h2 className="text-2xl font-bold mb-4">Looking to sell or rent your property?</h2>
        <p className="mb-6">Our team of experts will help you get the best value for your property</p>
        <Link href="/create-listing" className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-md font-medium transition duration-300">
          List Your Property
        </Link>
      </div>
    </div>
  );
};

export default Home;
