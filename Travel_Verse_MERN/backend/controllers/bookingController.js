import Booking from "../models/Booking.js"

export const createBooking = async (req, res) => {

    const newBooking = new Booking(req.body)
    try {
        const savedBooking = await  newBooking.save()
        res.status(200).json({success: true, message: 'successful', data:savedBooking})
    } catch (error) {
        res.status(500).json({success: false, message: error})
    }

}

export const getBooking = async(req,res) => {
    const id =  req.params.id

    try {
        const book =await Booking.findById(id)
        res.status(200).json({success:true, message:"successful" ,data:book})
    } catch (error) {
        res.status(404).json({success: false, message: error})
    }
}



export const getAllBooking = async(req,res) => {
    const id =  req.params.id

    try {
        const books =await Booking.findById(id)
        res.status(200).json({success:true, message:"successful" ,data:books})
    } catch (error) {
        res.status(500).json({success: false, message: error})
    }
}