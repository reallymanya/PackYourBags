import React from "react";
import TourList from "./TourList";

const DevTourList = () => {
  return (
    <TourList
      endpoint="getDevTours"
      title="Devotional Tours"
    />
  );
};

export default DevTourList;