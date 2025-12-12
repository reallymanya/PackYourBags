import React from 'react'
import {Container, Row, Col} from 'reactstrap';

import { useNavigate } from "react-router-dom";
import SearchBar from '../shared/SearchBar';
import ServiceList from '../services/ServiceList';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList';
import MasonryImagesGallery from '../components/Image-gallery/MasonryImagesGallery';
import Testimonial from '../components/Testimonial/Testimonial';
import ExperienceSection from '../shared/ExperienceSection';
import HeroSection from '../components/HeroSection/HeroSection';
import HolidaySlider from './HolidaySlider';
import VideoCarousel from '../components/Carousel/VideoCarousel';
import HimalayaHero from "../components/HimalayaHero/HimalayaHero";



const Home = () => {

  const navigate = useNavigate();
  return (
    <>


<VideoCarousel /> 
  <HeroSection/>
  <SearchBar/>
  <HolidaySlider/>
 
    
    
   
    {/* {===========================================================featured}================ */}
    <section className=" dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <Row>
          <Col lg="12">
            <h6 className="mb-4 px-3 py-1 inline-block bg-blue-500 text-white dark:bg-orange-500 rounded-lg font-medium  dark:text-white-100">
            Ultimate Travel Picks for Your Next Adventure!

            </h6>
            <h6 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Our Most Popular Tours
              
            </h6>
          </Col>

         <FeaturedTourList/>
        </Row>
      </Container>
    </section>
     {/* {===========================================================featured} end================ */}
      

      <div className="w-full flex justify-center">
      <button
        className="w-40 mx-8 bg-blue-500 dark:bg-orange-500 text-white font-semibold py-2 rounded-lg shadow-lg hover:bg-blue-400 dark:hover:bg-orange-300 transition duration-300 text-center"
        onClick={() => navigate("/tours")}
      >
        Explore More....
      </button>
    </div>


    <ServiceList />
    <ExperienceSection/>
      
      
     
       <section className=" dark:bg-gray-900 transition-colors duration-300">
      <Container>
        <Row>
          <Col lg="12">
          <h6 className="mb-4 px-3 py-1 inline-block bg-blue-500 text-white dark:bg-orange-500 rounded-lg font-medium  dark:text-white-100"> 
          Wanderlust Chronicles: Stunning Travel Snaps!
          </h6>

            
            <h6 className="text-2xl text-gray-900 dark:text-white">
              Visit our customer tour gallery
            </h6>
          </Col>
          <Col lg="12">
            <MasonryImagesGallery/>
          </Col>
        </Row>
      </Container>
    </section>

       {/* {===========================================================gallery end================ */}
        {/* {===========================================================testimonial section start================ */}
        <section>
          <Container>
            <Row>
              
              <Col lg='12'>
              <h6 className="mb-4 px-3 py-1 inline-block bg-blue-500 dark:bg-orange-500 rounded-lg  font-medium text-white">
        Testimonial

            </h6>

            <h6 className="text-2xl font-bold mb-[2.5rem] mt-[1rem] text-gray-900 dark:text-white">
            What Our Happy Travelers Say!
            </h6>
              
              
             
              </Col>
              <Col lg='12'>
              <Testimonial/>
              </Col>
            </Row>
          </Container>
        </section>
         {/* {===========================================================end================ */}
        
         

    </>
  )
}

export default Home