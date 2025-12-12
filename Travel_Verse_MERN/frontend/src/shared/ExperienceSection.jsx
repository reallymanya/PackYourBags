import React from "react";
import experienceVideo from "../assets/images/experienceVideo.mp4"; 


const ExperienceSection = () => {

 
  return (
    <section className="py-12 mx-10 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 flex flex-wrap items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          <div>
            <p className="mb-4 px-3 py-1 inline-block bg-blue-500 dark:bg-orange-500 rounded-full  font-medium text-white">
              Experience
            </p>
            <h2 className="text-4xl font-bold mb-4 leading-snug text-gray-900 dark:text-white">
              With our all experience <br /> we will serve you
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              Discover the world with our expert guidance. We bring years of experience to ensure your trips are unforgettable, safe, and tailored to your needs.
            </p>
          </div>

          {/* Counters */}
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Counter 1 */}
            <div className="text-center">
              <div className="bg-blue-500 dark:bg-orange-500 text-3xl font-bold rounded-md py-2 px-6 text-white">
                1k+
              </div>
              <h6 className="mt-2 text-gray-700 dark:text-gray-300">Successful Trips</h6>
            </div>
            {/* Counter 2 */}
            <div className="text-center">
              <div className="bg-blue-500 dark:bg-orange-500 text-3xl font-bold rounded-md py-2 px-6 text-white">
                100+
              </div>
              <h6 className="mt-2 text-gray-700 dark:text-gray-300">Regular Clients</h6>
            </div>
            {/* Counter 3 */}
            <div className="text-center">
              <div className="bg-blue-500 dark:bg-orange-500 text-3xl font-bold rounded-md py-2 px-6 text-white">
                5
              </div>
              <h6 className="mt-2 text-gray-700 dark:text-gray-300">Years Experience</h6>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 relative">
          <div className="relative flex justify-center">
            <div className="bg-blue-200 dark:bg-orange-200 rounded-full p-12 lg:p-10 relative z-10">
              {/* Video Element */}
              <video
                className="rounded-full shadow-lg w-full max-w-sm"
                src={experienceVideo}
                autoPlay
                loop
                muted
                playsInline
              ></video>
             
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;