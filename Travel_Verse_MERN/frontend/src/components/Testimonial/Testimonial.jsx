import React from 'react';
import Slider from 'react-slick';
import ava01 from '../../assets/images/ava-1.jpg';
import ava02 from '../../assets/images/ava-2.jpg';
import ava03 from '../../assets/images/ava-3.jpg';

const Testimonial = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className=" dark:bg-gray-900 py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <Slider {...settings}>
          {/* Testimonial 1 */}
          <div className="testimonial p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mx-2 mb-4">
            <p className="text-gray-700 dark:text-gray-300">
              "The trip was absolutely amazing! The guides were knowledgeable, and the itinerary was well-planned. I can't wait to travel with them again!"
            </p>
            <div className="d-flex align-items-center gap-4 mt-4">
              <img src={ava01} className="w-16 h-16 rounded-full" alt="John Doe" />
              <div>
                <h5 className="mb-0 text-gray-900 dark:text-white">John Doe</h5>
                <p className="text-gray-600 dark:text-gray-400">Customer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mx-2 mb-4">
            <p className="text-gray-700 dark:text-gray-300">
              "I had an incredible experience. The team was very professional, and everything was perfectly organized. Highly recommended!"
            </p>
            <div className="d-flex align-items-center gap-4 mt-4">
              <img src={ava02} className="w-16 h-16 rounded-full" alt="Liza de Adam" />
              <div>
                <h5 className="mb-0 text-gray-900 dark:text-white">Liza de Adam</h5>
                <p className="text-gray-600 dark:text-gray-400">Customer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mx-2 mb-4">
            <p className="text-gray-700 dark:text-gray-300">
              "This was the best vacation I've ever had! The destinations were breathtaking. Thank you for an unforgettable experience!"
            </p>
            <div className="d-flex align-items-center gap-4 mt-4">
              <img src={ava03} className="w-16 h-16 rounded-full" alt="John Doe" />
              <div>
                <h5 className="mb-0 text-gray-900 dark:text-white">John Doe</h5>
                <p className="text-gray-600 dark:text-gray-400">Customer</p>
              </div>
            </div>
          </div>

          {/* Testimonial 4 */}
          <div className="testimonial p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md mx-2 mb-4">
            <p className="text-gray-700 dark:text-gray-300">
              "Everything was perfect from start to finish. The team went above and beyond to make our trip special. I will definitely book with them again!"
            </p>
            <div className="d-flex align-items-center gap-4 mt-4">
              <img src={ava02} className="w-16 h-16 rounded-full" alt="Liza de Adam" />
              <div>
                <h5 className="mb-0 text-gray-900 dark:text-white">Liza de Adam</h5>
                <p className="text-gray-600 dark:text-gray-400">Customer</p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Testimonial;