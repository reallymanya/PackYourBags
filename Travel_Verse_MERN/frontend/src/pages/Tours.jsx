import React, { useEffect, useState } from 'react';
import CommonSection from '../shared/CommonSection';
import TourCard from '../shared/TourCard';
import { Col, Container, Row } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import { BASE_URL } from '../utils/config';
import Pagination from './Pagination';

function Tours() {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    if (tourCount) {
      const pages = Math.ceil(tourCount / 8); // Assuming 8 items per page
      setPageCount(pages);
    }
  }, [tourCount]);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page changes
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage); // Update the current page
  };

  return (
    <>
      <CommonSection />
      <section>
        <Container>
          <Row>
            {loading && <h4 className="text-center pt-5">Loading...........</h4>}
            {error && <h4 className="text-center pt-5">{error}</h4>}
            {!loading && !error && (
              <>
                {tours?.map((tour) => (
                  <Col lg="3" key={tour._id}> {/* Use tour._id for MongoDB */}
                    <TourCard tour={tour} />
                  </Col>
                ))}
                <Col lg="12">
                  <Pagination pageCount={pageCount} currentPage={page} onPageChange={handlePageChange} />
                </Col>
              </>
            )}
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Tours;