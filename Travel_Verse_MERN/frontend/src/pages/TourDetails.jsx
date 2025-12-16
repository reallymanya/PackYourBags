import React, { useContext, useEffect, useRef, useState } from 'react';
import { Container, Row, Col, Form, ListGroup } from 'reactstrap';
import { useParams } from 'react-router-dom';
import avatar from '../assets/images/avatar.jpg';
import Booking from '../components/Booking/Booking.jsx';
import useFetch from './../hooks/useFetch.js';
import { BASE_URL } from './../utils/config.js';
import { AuthContext } from './../context/AuthContext.js';

function TourDetails() {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const { id } = useParams();

  const reviewMsgRef = useRef('');
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(id ? `${BASE_URL}/tours/${id}` : null);

  const { title, desc, price, reviews, address, photo, city, distance, maxGroupSize } = tour || {};

  const totalRating = reviews?.reduce((acc, item) => acc + item.rating, 0);
  const avgRating =
    totalRating === 0
      ? ''
      : totalRating === 1
      ? totalRating
      : (totalRating / reviews?.length).toFixed(1);

  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user || user === undefined || user === null) {
        alert('Please sign in to submit a review.');
        return;
      }

      if (!reviewText || !tourRating) {
        alert('Please provide a review and rating.');
        return;
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating,
      };

      const res = await fetch(`${BASE_URL}/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj),
      });

      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert('Review submitted successfully!');
      reviewMsgRef.current.value = ''; // Clear the input field
      setTourRating(null); // Reset the rating
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div className="text-center py-5">Error: {error}</div>;

  return (
    <section className="dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <Row>
          <Col lg="8" className="mb-8 lg:mb-0">
            <div className="tour__content">
              <img src={photo} alt={title} className="w-full h-auto rounded-lg" />
              <div className="tour__info mt-4">
                <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                <div className="flex items-center gap-5 mt-2">
                  <span className="tour__rating flex items-center gap-1 text-gray-900 dark:text-white">
                    <i className="ri-star-fill text-yellow-500" />
                    {avgRating === 0 ? 'Not rated' : `${avgRating} (${reviews?.length} reviews)`}
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    <i className="ri-map-pin-user-fill" /> {address}
                  </span>
                </div>

                <div className="tour__extra-details mt-4 dark:text-white">
                  <span className="flex flex-wrap gap-4">
                    {/* City */}
                    <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                      <i className="ri-map-pin-2-line text-blue-500 dark:text-orange-500 text-lg"></i>
                      <span className="text-gray-900 dark:text-white">{city}</span>
                    </span>

                    {/* Price */}
                    <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                      <i className="ri-money-rupee-circle-line text-blue-500 dark:text-orange-500 text-lg"></i>
                      <span className="text-gray-900 dark:text-white">₹{price}/per person</span>
                    </span>

                    {/* Distance */}
                    <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                      <i className="ri-map-pin-time-line text-blue-500 dark:text-orange-500 text-lg"></i>
                      <span className="text-gray-900 dark:text-white">{distance} km</span>
                    </span>

                    {/* Group Size */}
                    <span className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300">
                      <i className="ri-group-line text-blue-500 dark:text-orange-500 text-lg"></i>
                      <span className="text-gray-900 dark:text-white">{maxGroupSize} people</span>
                    </span>
                  </span>
                </div>

                <h5 className="text-xl mt-6 text-gray-900 dark:text-white">Description</h5>
                <p className="text-gray-700 dark:text-gray-300">{desc}</p>
              </div>

              {/* ====================={tour reviews section}========================= */}
              <div className="tour__reviews mt-6">
                <h4 className="text-2xl text-gray-900 dark:text-white">
                  Reviews ({reviews?.length} reviews)
                </h4>
                <Form onSubmit={submitHandler}>
                  <div className="flex items-center gap-3 mb-4 rating__group">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <span
                        key={rating}
                        onClick={() => setTourRating(rating)}
                        className={`cursor-pointer text-gray-900 dark:text-white hover:text-yellow-500 dark:hover:text-yellow-500 ${
                          tourRating === rating ? 'text-yellow-500' : ''
                        }`}
                      >
                        <i className="ri-star-s-fill" />
                      </span>
                    ))}
                  </div>
                  <div className="review__input mt-2">
                    <input
                      type="text"
                      ref={reviewMsgRef}
                      placeholder="Share your thoughts"
                      className="p-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-black"
                      required
                    />
                    <button
                      className="btn primary__btn mt-4 w-full py-2 bg-blue-500 dark:bg-orange-500 text-white hover:bg-blue-400 dark:hover:bg-orange-400 transition-colors duration-300"
                      type="submit"
                    >
                      Submit Review
                    </button>
                  </div>
                </Form>
                <ListGroup className="user__reviews mt-6">
                  {reviews?.map((review) => (
                    <div
                      key={review._id}
                      className="review__item flex gap-4 p-4 border-b border-gray-200 dark:border-gray-700"
                    >
                      <img src={avatar} alt={review.username} className="w-16 h-16 rounded-full" />
                      <div className="w-full">
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="text-xl text-gray-900 dark:text-white">{review.username}</h5>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {new Date(review.createdAt).toLocaleDateString('en-US', options)}
                            </p>
                          </div>
                          <span className="flex items-center text-yellow-500">
                            {review.rating} <i className="ri-star-s-fill" />
                          </span>
                        </div>
                        <h6 className="mt-2 text-gray-700 dark:text-gray-300">{review.reviewText}</h6>
                      </div>
                    </div>
                  ))}
                </ListGroup>
              </div>
              {/* ====================={tour reviews section end}===================== */}
            </div>
          </Col>
          <Col lg="4">
            <Booking tour={tour} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default TourDetails;