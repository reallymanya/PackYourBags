import React from "react";
import TourList from "./TourList";

const WildTourList = () => {
  return (
    <TourList
      endpoint="getWildTours"
      title="Wildlife Tours"
    />
  );
};

export default WildTourList;