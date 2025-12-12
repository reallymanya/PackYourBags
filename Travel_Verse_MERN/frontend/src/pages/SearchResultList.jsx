import React, { useState } from 'react'
import { Col, Container, Row } from 'reactstrap'

import {useLocation} from 'react-router-dom'

import TourCard from './../shared/TourCard'




const SearchResultList = () => {

  const location = useLocation()

  const [data] = useState(location.state)

 
  return (
    <>
    
    
    <section>
      <Container>
      
        <Row>
           {
            data.length === 0 ? <h4>No Tour Found </h4> :
            data?.map(tour=> <Col lg='3' className='mb-4' key={tour._id}>{""}<TourCard tour={tour}></TourCard></Col>)
          } 
          
        </Row>
      </Container>
    </section>
    
    </>
  )
}

export default SearchResultList