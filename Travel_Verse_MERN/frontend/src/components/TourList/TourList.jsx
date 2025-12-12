import React from "react";
import TourCard from "../../shared/TourCard";
import { Col, Container, Row } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";

const TourList = ({ endpoint, title }) => {
  const { data: tourList, loading, error } = useFetch(`${BASE_URL}/tours/search/${endpoint}`);

  return (
    <section className="dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          {title}
        </h2>
        <Row>
          {/* Loading State */}
          {loading && (
            <Col lg="12" className="text-center">
              <h4 className="text-gray-600 dark:text-gray-300">Loading...</h4>
            </Col>
          )}

          {/* Error State */}
          {error && (
            <Col lg="12" className="text-center">
              <h4 className="text-red-500 dark:text-red-400">{error}</h4>
            </Col>
          )}

          {/* Tours List */}
          {!loading && !error && (
            <>
              {tourList?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
            </>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default TourList;