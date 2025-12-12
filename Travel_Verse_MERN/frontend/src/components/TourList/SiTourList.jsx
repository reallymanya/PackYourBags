import React from "react";
import TourList from "./TourList";

const SiTourList = () => {
  return (
    <TourList
      endpoint="getSiTours"
      title="Special Interest Tours"
    />
  );
};

export default SiTourList;