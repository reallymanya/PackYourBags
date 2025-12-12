import TourCard from "../../shared/TourCard"
import {Col} from 'reactstrap'
import useFetch from './../../hooks/useFetch'
import { BASE_URL } from "../../utils/config"

const FeaturedTourList = () => {

  const {data : featuredTours, loading, error} = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);


  return (


    
    <>
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

          {/* Featured Tours */}
          {!loading && !error && (
            <>
              {featuredTours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour.id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
            </>
          )}
    </>
  )

}

export default FeaturedTourList