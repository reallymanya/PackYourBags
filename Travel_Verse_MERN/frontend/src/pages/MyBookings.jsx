import React, { useState } from 'react'
import CommonSection from '../shared/CommonSection'
import { Container, Row, Col } from 'reactstrap'
import useFetch from '../hooks/useFetch'
import { BASE_URL } from '../utils/config'
import { Link } from 'react-router-dom'

const MyBookings = () => {
    const { data: bookings, loading, error } = useFetch(`${BASE_URL}/booking/user/all`)
    const [activeTab, setActiveTab] = useState('upcoming');

    // Filter bookings based on date
    const today = new Date();
    const upcomingBookings = bookings?.filter(booking => new Date(booking.bookAt) >= today) || [];
    const pastBookings = bookings?.filter(booking => new Date(booking.bookAt) < today) || [];

    const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            <CommonSection title={"My Journeys"} />
            
            <Container className="mt-8">
                <Row>
                    <Col lg='12'>
                        {/* Dashboard Header & Tabs */}
                        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                            <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                            
                            <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex">
                                <button 
                                    onClick={() => setActiveTab('upcoming')}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'upcoming' ? 'bg-sky-200 text-sky-800 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    Upcoming ({upcomingBookings.length})
                                </button>
                                <button 
                                    onClick={() => setActiveTab('past')}
                                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeTab === 'past' ? 'bg-sky-200 text-sky-800 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    Past Trips ({pastBookings.length})
                                </button>
                            </div>
                        </div>

                        {loading && <h4 className='text-center pt-5 text-gray-500'>Loading your adventures...</h4>}
                        {error && <h4 className='text-center pt-5 text-red-500'>{error}</h4>}

                        {!loading && !error && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {displayBookings.length > 0 ? (
                                    displayBookings.map(booking => (
                                        <BookingCard key={booking._id} booking={booking} status={activeTab} />
                                    ))
                                ) : (
                                    <div className="col-span-full text-center py-12 soft-card">
                                        <div className="mb-4 text-6xl">✈️</div>
                                        <h3 className="text-xl font-bold text-gray-700 mb-2">No {activeTab} bookings found</h3>
                                        <p className="text-gray-500 mb-6">Looks like you haven't planned any trips yet.</p>
                                        <Link to="/tours">
                                            <button className="bg-sky-400 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all transform hover:-translate-y-1">
                                                Explore Tours
                                            </button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const BookingCard = ({ booking, status }) => {
    // Generate a random gradient for the card header if no image is available (assuming generic booking data)
    // In a real app we'd fetch the tour image, but `tourName` is just a string here usually. 
    // If the API provided the tour object, we could use the image. For now, a nice placeholder.
    
    return (
        <div className="soft-card flex flex-col h-full group hover:shadow-lg transition-all duration-300">
            <div className={`h-32 w-full rounded-t-[24px] bg-gradient-to-r ${status === 'upcoming' ? 'from-sky-300 to-blue-400' : 'from-gray-300 to-gray-400'} flex items-center justify-center relative overflow-hidden`}>
                 <i className={`ri-${status === 'upcoming' ? 'plane-line' : 'flag-line'} text-5xl text-white/30 absolute -bottom-2 -right-2 transform rotate-12 group-hover:scale-110 transition-transform`}></i>
                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm uppercase tracking-wider text-gray-600">
                     {status === 'upcoming' ? 'Confirmed' : 'Completed'}
                 </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-1 leading-tight line-clamp-1" title={booking.tourName}>
                    {booking.tourName}
                </h3>
                <p className="text-sm text-gray-500 mb-4 font-medium flex items-center gap-1">
                     <i className="ri-calendar-event-line text-sky-400"></i>
                     {new Date(booking.bookAt).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
                
                <div className="mt-auto border-t border-gray-100 pt-4 grid grid-cols-2 gap-4">
                     <div>
                         <span className="text-xs text-gray-400 font-bold uppercase block">Guests</span>
                         <span className="font-semibold text-gray-700">{booking.guestSize} People</span>
                     </div>
                     <div>
                         <span className="text-xs text-gray-400 font-bold uppercase block">Booked On</span>
                         <span className="text-sm text-gray-600">{new Date(booking.createdAt).toLocaleDateString()}</span>
                     </div>
                </div>
            </div>
        </div>
    )
}

export default MyBookings
