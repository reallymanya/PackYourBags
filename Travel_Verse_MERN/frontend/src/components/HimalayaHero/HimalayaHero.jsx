import React from "react";

const HimalayaHero = () => {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "75vh",
        overflow: "hidden",
      }}
    >
      <video
        src="/himalaya.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "50px",
          fontWeight: "bold",
          textShadow: "2px 2px 15px rgba(0,0,0,0.8)",
          textAlign: "center",
        }}
      >
        Experience the Offroading of Himalayas
      </div>
    </section>
  );
};

export default HimalayaHero;
