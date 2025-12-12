import express from "express";
import { createTour, deleteTour, getAllTour, getBeachTour, getFeatureTour, getSingleTour, getTourBySearch, getTourCount, updateTour ,
    getCulTour, getWildTour, getSiTour, getDevTour,getOldTour,getHoneyTour,getHillTour
} from "../controllers/tourControlller.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();
//crete
router.post('/', verifyAdmin, createTour);
//update
router.put('/:id', verifyAdmin, updateTour);
//delete
router.delete('/:id', verifyAdmin,  deleteTour);
//get single tour
router.get('/:id', getSingleTour);
router.get('/', getAllTour);
router.get("/search/getTourBySearch", getTourBySearch)
router.get("/search/getTourCount", getTourCount)
router.get("/search/getFeaturedTours", getFeatureTour)
router.get("/search/getBeachTours", getBeachTour)
router.get("/search/getWildTours", getWildTour)
router.get("/search/getSiTours", getSiTour)
router.get("/search/getDevTours", getDevTour)
router.get("/search/getOldTours", getOldTour)
router.get("/search/getCulTours", getCulTour)
router.get("/search/getHoneyTours", getHoneyTour)
router.get("/search/getHillTours", getHillTour)



export default router;