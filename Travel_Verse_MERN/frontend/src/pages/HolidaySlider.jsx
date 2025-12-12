import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


const holidayData = [
  { img: "tour-images/beach.jpg", title: "Beach Tours", link: `/tours/search/getBeachTours` },
  { img: "tour-images/wild.jpg", title: "Wildlife Tours", link: "/tours/search/getWildTours" },
  { img: "tour-images/adventure.jpg", title: "Special Interest Tours", link: "/tours/search/getSiTours" },
  { img: "tour-images/dev.webp", title: "Devotional Tours", link: "/tours/search/getDevTours" },
  { img: "tour-images/heritage.jpg", title: "Heritage Tours", link: "/tours/search/getOldTours" },
  { img: "tour-images/cultural.jpg", title: "Cultural Tours", link: "/tours/search/getCulTours" },
  { img: "tour-images/educational.jpg", title: "Educational Tours", link: "/tours" },
  { img: "tour-images/honeymoon.cms", title: "Honeymoon Tours", link: "/tours/search/getHoneyTours" },
  { img: "tour-images/Hill-Tours.jpg", title: "Hill Station Tours", link: "/tours/search/getHillTours" },
];

// Custom Next Arrow Component
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300"
      aria-label="Next"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800 dark:text-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

// Custom Previous Arrow Component
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors duration-300"
      aria-label="Previous"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-800 dark:text-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
};

const HolidaySlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h6 className="mb-4 px-3 py-1 inline-block bg-blue-500 text-white dark:bg-orange-500 rounded-lg font-medium  dark:text-white-100">
           
            Holidays by Interest
            </h6>
          
          <Link
            to="/tours"
            className="text-blue-600 hover:text-blue-800 dark:text-orange-500 dark:hover:text-orange-400 transition-colors duration-300 no-underline"
          >
            View All Tours →
          </Link>
        </div>

        {/* Slider */}
        <Slider {...settings}>
          {holidayData.map((holiday, index) => (
            <div key={index} className="px-3">
              <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link to={holiday.link} className="no-underline">
                  <img
                    src={holiday.img}
                    alt={holiday.title}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                </Link>
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                    <Link
                      to={holiday.link}
                      className="text-blue-600 hover:text-blue-800 dark:text-orange-500 dark:hover:text-orange-400 no-underline"
                    >
                      {holiday.title}
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HolidaySlider;