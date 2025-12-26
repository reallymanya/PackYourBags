import Tour from "../models/Tour.js"
import Review from '../models/Review.js'

export const createReview = async (req,res) => {

    const tourId = req.params.tourId
    const newReview = new Review({
        ...req.body,
        productId: tourId  // Set the productId to link the review to the tour
    }) 
 try {

    const savedReview = await newReview.save()
    await Tour.findByIdAndUpdate(tourId, {
        $push:{
            reviews: savedReview._id
        }
    })

    res.status(200).json({success:true, message:"Review Submit", data: savedReview})
    
    
 } catch (error) {
    res.status(500).json({success: false, message:"failed to submit"})
    
 }   

}

export const deleteReview = async (req, res) => {
    const id = req.params.id;
    try {
        const review = await Review.findById(id);
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        // Remove review from tour's reviews array
        await Tour.findByIdAndUpdate(review.productId, {
            $pull: { reviews: id }
        });

        await Review.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to delete review" });
    }
};

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find({})
            .populate({
                path: 'productId',
                select: 'title',
                model: 'Tour'
            })
            .sort({ createdAt: -1 });
        res.status(200).json({ success: true, message: "Reviews fetched successfully", data: reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ success: false, message: "Failed to fetch reviews" });
    }
};