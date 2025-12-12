import React from "react";
import TourList from "./TourList";

const BeachTourList = () => {
  return (
    <TourList
      endpoint="getBeachTours"
      title="Beach Tours"
    />
  );
};

export default BeachTourList;