import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import galleryImages from "./galleryImages";

const MasonryImagesGallery = () => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 768: 3, 992: 4 }}>
      <Masonry gutter="1rem">
        {galleryImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Gallery image ${index + 1}`} // Add meaningful alt text
            className="masonry__img hover:scale-105 transition-transform duration-300 cursor-pointer rounded-lg"
            style={{ width: "100%", display: "block" }}
            loading="lazy" // Lazy load images for better performance
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
};

export default MasonryImagesGallery;