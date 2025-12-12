import React from "react";
import TourList from "./TourList";

const HeritageTourList = () => {
  return (
    <TourList
      endpoint="getOldTours"
      title="Heritage Tours"
    />
  );
};

export default HeritageTourList;