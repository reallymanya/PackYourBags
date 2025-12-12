import React, { useState, useRef, useEffect } from "react";

import SearchBar from "./SearchBar";


const videos = [
  require("../assets/ski.mp4"),
  require("../assets/Hiking.mp4"),
  require("../assets/Agua-natural.webm"),
];



const CommonSection = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoChanging, setIsVideoChanging] = useState(false);
  const videoRef = useRef(null);

  // Handle video end event to transition to the next video
  useEffect(() => {
    const handleVideoEnd = () => {
      setIsVideoChanging(true); // Trigger fade-out before changing video
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }, 500); // Wait for fade-out transition to finish
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener("ended", handleVideoEnd);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("ended", handleVideoEnd);
      }
    };
  }, []);

  // Automatic video change every 9 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsVideoChanging(true); // Trigger fade-out before changing video
      setTimeout(() => {
        setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }, 500); // Wait for fade-out transition to finish
    }, 9000); // Change video every 9 seconds

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
    };
  }, []);

  // Handle fading in the new video after it changes
  useEffect(() => {
    if (!isVideoChanging) return;

    // After setting a new video, make it fade in
    setIsVideoChanging(false);
  }, [currentVideoIndex, isVideoChanging]);

  // Change video to the next one
  const goToNextVideo = () => {
    setIsVideoChanging(true); // Trigger fade-out before changing video
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 500); // Wait for fade-out transition to finish
  };

  // Change video to the previous one
  const goToPreviousVideo = () => {
    setIsVideoChanging(true); // Trigger fade-out before changing video
    setTimeout(() => {
      setCurrentVideoIndex(
        (prevIndex) => (prevIndex - 1 + videos.length) % videos.length
      );
    }, 500); // Wait for fade-out transition to finish
  };

  return (
    <div className="relative w-full h-64 md:h-96">
      {/* Video container with smooth crossfade transition */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          isVideoChanging ? "opacity-0" : "opacity-100"
        }`}
      >
        <video
          ref={videoRef}
          key={currentVideoIndex} // Ensures a new component is rendered on video change
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop={false} // Looping is handled manually
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* BlurText for the current video */}
     
      <div className="absolute inset-0 flex items-center justify-center bg-opacity-50">
      <SearchBar/>
      
      </div>

      {/* Navigation buttons */}
      <button
        onClick={goToPreviousVideo}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
        aria-label="Previous video"
      >
        &#8592; {/* Left arrow */}
      </button>
      <button
        onClick={goToNextVideo}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black p-2 rounded-full opacity-75 hover:opacity-100 transition-opacity"
        aria-label="Next video"
      >
        &#8594; {/* Right arrow */}
      </button>
    </div>
  );
};

export default CommonSection;
