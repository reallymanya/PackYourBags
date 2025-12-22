import React from "react";


const services = [
  {
    title: "Multi-Day Tours",
    description:
      "Explore different parts of India by joining one of our small-group Shared Tours, or enjoy personalised experiences with family and friends on our Private Tours.",
    icon: <i className="ri-calendar-todo-line text-3xl text-white"></i>,
  },
  {
    title: "Best Tour Guide",
    description: "Explore with expert guides for an enriching travel experience.",
    icon: <i className="ri-user-star-line text-3xl text-white"></i>,
  },
  {
    title: "Independent Travel",
    description:
      "Travel independently and enjoy a worry-free experience. We plan your trip based on your needs and manage all bookings and logistics, so you can fully enjoy!",
    icon: <i className="ri-luggage-cart-line text-3xl text-white"></i>,
  },
  {
    title: "Other Services",
    description:
      "Navigate India with our expert services, including Corporate Tours, School & College Tours, Filming & Media Support, Vehicle & Driver Hire, and Emergency Help.",
    icon: <i className="ri-customer-service-2-line text-3xl text-white"></i>,
  },
];

const ServiceSection = () => {
  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden sm:py-8 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-blue-500 dark:text-orange-500">
          We Offer Our Best Services
        </h2>
        <p className="text-gray-800 dark:text-gray-300"> Tailored Solutions for Every Traveller</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden px-6 pt-8 pb-6 shadow-lg ring-1 ring-gray-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:rounded-lg dark:bg-gray-800 border-2 border-blue-400 dark:border-orange-500"
          >
            <span className="absolute top-8 z-0 h-16 w-16 rounded-full bg-blue-500 dark:bg-orange-500 transition-all duration-300 group-hover:scale-[8]"></span>
            <div className="relative z-10 mx-auto max-w-md">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-blue-500 dark:bg-orange-500 transition-all duration-300 group-hover:bg-blue-400 dark:group-hover:bg-orange-500">
                {service.icon}
              </span>
              <h3 className="mt-6 text-lg font-bold text-gray-900 dark:text-white group-hover:text-white">
                {service.title}
              </h3>
              <p className="space-y-6 pt-4 text-base leading-7 text-gray-600 dark:text-gray-300 transition-all duration-300 group-hover:text-white">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;