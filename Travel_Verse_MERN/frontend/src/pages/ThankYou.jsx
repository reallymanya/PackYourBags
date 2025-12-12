import React, { useEffect } from 'react';
import { Button, Col, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const ThankYou = () => {
  
  useEffect(() => {
    // Trigger confetti effect when the component mounts
    confetti({
      particleCount: 300,
      spread: 150,
      origin: { y: 0.6 },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00e6','#de1028'],
    });
  }, []);

  return (
    <section className="bg-gray-200 min-h-fit flex items-center justify-center">
      <Container>
        <Row>
          <Col lg="12" className="text-center">
            <div className="thank__you animate__animated animate__fadeIn">
              <span className="text-blue-500 dark:text-orange-500 text-6xl mb-4 animate__animated animate__bounceIn">
                <i className="ri-checkbox-circle-line"></i>
              </span>
              <h1 className="text-4xl font-semibold mb-3">Thank You</h1>
              <h3 className="mb-4 text-lg">Your tour is booked</h3>
              <Button className="btn primary__btn w-25">
                <Link to="/home">Back to home</Link>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ThankYou;
