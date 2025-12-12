import React, { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";

const VideoCarousel = memo(() => {
  const videos = useMemo(() => [
  {
    src: require("../../assets/Himalayas.mp4"),
    text: "Experience the Offroading of Himalayas",
    alt: "Offroading motorcycle in Himalayas"
  }
,  
  
  { 
    src: require("../../assets/Tropical.webm"), 
    text: "Discover tropical beach paradises",
    alt: "Aerial view of tropical beach with crystal clear waters"
  },
  { 
    src: require("../../assets/forest.webm"), 
    text: "Explore the Secrets of Untouched Rainforests",
    alt: "Sunlight streaming through dense forest canopy"
  },
  { 
    src: require("../../assets/Agua-natural.webm"), 
    text: "Experience nature's waterfalls",
    alt: "Close-up of natural waterfall cascading over rocks"
  },
  
], []);


  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const timeoutRef = useRef(null);

  // Functional update to handle wrap-around
  const changeSlide = useCallback((delta) => {
    setCurrentIndex(prev => (prev + delta + videos.length) % videos.length);
  }, [videos.length]);

  // Auto-advance with reset on interaction
  useEffect(() => {
    timeoutRef.current = setTimeout(() => changeSlide(1), 9000);
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, changeSlide]);

  // Preload next video in DOM
  const nextIndex = (currentIndex + 1) % videos.length;

  return (
    <div 
      className="relative w-full h-[80vh] overflow-hidden rounded-lg shadow-lg"

  aria-label="Nature video carousel"
    >
      {/* Active Video */}
      <video
        key={currentIndex}
        ref={videoRef}
        className="w-full h-full object-cover animate-fadeIn"
        autoPlay
        muted
        playsInline
        preload="auto"
        aria-label={videos[currentIndex].alt}
      >
        <source src={videos[currentIndex].src} type="video/mp4" />
      </video>

      {/* Hidden Preload Video */}
      <video 
        hidden 
        src={videos[nextIndex].src} 
        preload="auto" 
        aria-hidden="true"
      />

      {/* Accessible Slide Announcement */}
      <div aria-live="polite" className="sr-only">
        Now showing: {videos[currentIndex].text}
      </div>

      {/* Text Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
        <p className="text-white text-center text-lg md:text-2xl font-semibold tracking-wide">
          {videos[currentIndex].text}
        </p>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {videos.map((_, i) => (
          <button
            key={i}
            onClick={() => changeSlide(i - currentIndex)}
            className={`h-2 w-2 right-2 rounded-full transition-all duration-300 ${
              i === currentIndex ? 'bg-white scale-110' : 'bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`View ${videos[i].text}`}
            aria-current={i === currentIndex ? "true" : undefined}
          />
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={() => changeSlide(-1)}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white bg-black/30 rounded-full backdrop-blur-sm transition-all hover:scale-110"
        aria-label={`Previous: ${videos[(currentIndex - 1 + videos.length) % videos.length].text}`}
      >
        ←
      </button>
      <button
        onClick={() => changeSlide(1)}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/80 hover:text-white bg-black/30 rounded-full backdrop-blur-sm transition-all hover:scale-110"
        aria-label={`Next: ${videos[nextIndex].text}`}
      >
        →
      </button>
    </div>
  );
});

export default VideoCarousel;