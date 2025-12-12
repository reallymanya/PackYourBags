import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  const { _id, title, photo, city, price, featured, reviews, desc } = tour;

  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
  const avgRating = totalRating === 0 ? '' : (totalRating / reviews?.length).toFixed(1);

  return (
    <div className="mt-4 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105 hover:shadow-2xl hover:border-green-400 dark:hover:border-green-500 dark:bg-gray-800">
      <div className="relative">
        <img src={photo} alt={title} className="w-full h-56 object-cover" />
        {featured && (
          <span className="absolute top-2 left-2 text-xs font-semibold py-1 px-3 rounded-md shadow-md flex items-center gap-1 bg-blue-500 dark:bg-orange-500 ">
            <i className="ri-fire-line" ></i> Trending
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1">
            <i className="ri-map-pin-line"></i> {city}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {totalRating === 0 ? 'Not Rated' : avgRating}
            {totalRating > 0 && <span>({reviews.length} reviews)</span>}
          </span>
        </div>

        <h5 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
          <Link to={`/tours/${_id}`} className="no-underline hover:no-underline">
            {title}
          </Link>
        </h5>

        <p className="prose mt-2 mb-4 line-clamp-3 text-gray-600 dark:text-gray-300">
          {desc}
        </p>

        <div className="flex justify-between items-center">
          <h5 className="text-xl font-bold text-blue-500 dark:text-orange-500 px-2 py-1">
            ${price} <span className="text-sm">/per person</span>
          </h5>

          <button className="bg-green-500 dark:bg-green-600 py-2 px-4 rounded-md shadow hover:bg-green-600 dark:hover:bg-green-700 hover:scale-105 transform transition-all">
            <Link to={`/tours/${_id}`} className="no-underline text-white hover:text-white">
              Book Now
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;