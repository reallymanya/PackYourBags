import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../pages/Home";
import Tours from "../pages/Tours";
import TourDetails from "../pages/TourDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchResultList from "../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import VerifyEmail from "../pages/VerifyEmail";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import BeachTourList from "../components/TourList/BeachTourList";
import WildTourList from "../components/TourList/WildTourList";
import SiTourList from "../components/TourList/SiTourList";
import CulTourList from "../components/TourList/CulTourList";
import DevTourList from "../components/TourList/DevTourList";
import HeritageTourList from "../components/TourList/HeritageTourList";
import HoneyTourList from "../components/TourList/HoneyTourList";
import HillTourList from "../components/TourList/HillTourList";
import MyBookings from "../pages/MyBookings";


const AppRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/tours/search" element={<SearchResultList />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/tours/search/getBeachTours" element={<BeachTourList/>} />
        <Route path="/tours/search/getWildTours" element={<WildTourList/>} />
        <Route path="/tours/search/getSiTours" element={<SiTourList/>} />
        <Route path="/tours/search/getCulTours" element={<CulTourList/>} />
        <Route path="/tours/search/getDevTours" element={<DevTourList/>} />
        <Route path="/tours/search/getOldTours" element={<HeritageTourList/>} />
        <Route path="/tours/search/getHoneyTours" element={<HoneyTourList/>} />
        <Route path="/tours/search/getHillTours" element={<HillTourList/>} />
        <Route path="/my-bookings" element={<MyBookings />} />

        
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
