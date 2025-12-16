import React from 'react';
import { Link } from 'react-router-dom';

const TourCard = ({ tour }) => {
  const { _id, title, photo, city, price, featured, reviews, desc } = tour;

  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
  const avgRating = totalRating === 0 ? '' : (totalRating / reviews?.length).toFixed(1);

  return (
    <div className="soft-card h-full flex flex-col relative group">
      <div className="relative overflow-hidden h-64 w-full rounded-t-[24px]">
        <img 
          src={photo} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
        />
        {featured && (
          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-sky-500 font-bold text-xs py-1.5 px-3 rounded-full shadow-sm flex items-center gap-1">
             FEATURED
          </span>
        )}
        <span className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 font-bold text-sm py-1.5 px-4 rounded-full shadow-sm">
           <i className="ri-map-pin-line text-sky-400 mr-1"></i> {city}
        </span>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3">
             <div className="flex items-center gap-1">
                 <i className="ri-star-fill text-yellow-300 text-lg"></i>
                 <span className="text-gray-600 font-bold">
                    {totalRating === 0 ? 'New' : avgRating}
                 </span>
                 {totalRating > 0 && <span className="text-gray-400 text-sm">({reviews.length})</span>}
             </div>
        </div>

        <h5 className="text-xl font-bold mb-3 text-gray-700 leading-tight">
          <Link to={`/tours/${_id}`} className="hover:text-sky-500 transition-colors">
            {title}
          </Link>
        </h5>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
          <h5 className="text-xl font-bold text-sky-500">
            ₹{price} <span className="text-gray-400 text-sm font-medium">/ person</span>
          </h5>

          <Link to={`/tours/${_id}`}>
            <button className="bg-sky-200 hover:bg-sky-300 text-sky-700 font-bold py-2 px-5 rounded-full shadow-sm hover:shadow-md transition-all transform hover:-translate-y-0.5 text-sm">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TourCard;