import React, { useMemo, memo } from "react";
import Lottie from "react-lottie";
import heroImg02 from "../../assets/images/heroImg02.jpg";
import heroImg03 from "../../assets/images/hero-img03.jpg";
import travelAnimation from "../../assets/animation/travel.json";
import exploreAnimation from "../../assets/animation/explorer.json";


// Animation options (static, can be defined outside the component)
const defaultAnimationOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
};

const AnimationBlock = memo(({ animationData }) => {
  const animationOptions = useMemo(() => ({
    ...defaultAnimationOptions,
    animationData,
  }), [animationData]);

  return (
    <div 
      className="relative rounded-full overflow-hidden dark:bg-gray-800 shadow-lg flex items-center justify-center"
      role="img"
      aria-label="Animated travel illustration"
    >
      <Lottie
        options={animationOptions}
        aria-hidden="true"
        isClickToPauseDisabled
      />
    </div>
  );
});

const ImageBlock = memo(({ src, alt }) => (
  <div className="rounded-xl overflow-hidden shadow-lg">
    <img 
      src={src} 
      alt={alt}
      loading="lazy" 
      className="w-full h-full object-cover aspect-square rounded-xl"
      width="400"
      height="400"
      decoding="async"
      aria-hidden="true"
    />
  </div>
));

const HeroSection = () => {
  return (
    <header className="font-sans bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
      <section 
        className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12"
        aria-labelledby="hero-heading"
      >
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="max-w-xl text-center lg:text-left space-y-4">
  <div className="inline-block px-3 py-1 bg-blue-500 text-white dark:bg-orange-500 rounded-full text-sm">
    Everything You Need to Know Before You Go
  </div>
  <h1 
    id="hero-heading"
    className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white"
  >
    Turn Your Travels into Extraordinary{" "}
    <span className="text-blue-600 dark:text-orange-400">
      Adventures
    </span>
  </h1>
  <p className="text-gray-600 dark:text-gray-300">
    Travel isn’t just about destinations—it’s about creating unforgettable experiences while respecting the planet and its people. With us, every journey is designed to inspire, connect, and make a positive impact.
  </p>
  <div className="space-y-2">
    {[
      { icon: "🌍", label: "Explore", text: "Discover landscapes and hidden gems" },
      { icon: "🤝", label: "Connect", text: "Engage with local cultures and empower communities." },
      { icon: "🌱", label: "Sustain", text: "Travel green and protect the planet." },
    ].map((item, index) => (
      <div key={index} className="flex items-center">
        <span aria-hidden="true">{item.icon}</span>
        <span className="ml-2">
          <strong>{item.label}:</strong> {item.text}
        </span>
      </div>
    ))}
  </div>
  <p className="text-gray-600 dark:text-gray-300">
    Join us in redefining travel—where every adventure is meaningful and every journey makes a difference.
  </p>
</div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-[320px]">
            <AnimationBlock animationData={travelAnimation} />
            <ImageBlock 
              src={heroImg02} 
              alt="Eco-lodge nestled in rainforest canopy" 
            />
            <ImageBlock 
              src={heroImg03} 
              alt="Local artisan demonstrating traditional craft" 
            />
            <AnimationBlock animationData={exploreAnimation} />
          </div>
        </div>
      </section>
    </header>
  );
};

export default memo(HeroSection);