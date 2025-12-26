import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {

    const token = req.cookies.accessToken

    if(!token){
        return res.status(401).json({success: false, message: "you are not auth"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            return res.status(401).json({success:false, message:"token is invalid"})
        }

        req.user = user
        next()
    })

}

export const verifyUser = (req, res, next) => {
    const token = req.cookies.accessToken

    if(!token){
        return res.status(401).json({success: false, message: "you are not auth"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            return res.status(401).json({success:false, message:"token is invalid"})
        }

        req.user = user
        
        // Check if this is a user route (like /users/:id) where we need to verify ownership
        // For other routes (like /itinerary/:id, /booking/:id), let the controller handle ownership
        const isUserRoute = req.path.startsWith('/users/') || req.path.startsWith('/api/v1/users/');
        
        if(req.params.id && isUserRoute){
            // Only check ownership for user routes
            if(req.user.id === req.params.id || req.user.role === 'admin' ){
                next()
            }else{
               return res.status(403).json({success:false, message:"you are not authorized"})
            }
        } else {
            // For other routes, just verify authentication - let controllers handle authorization
            next()
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    const token = req.cookies.accessToken

    if(!token){
        return res.status(401).json({success: false, message: "you are not auth"})
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            return res.status(401).json({success:false, message:"token is invalid"})
        }

        req.user = user
        if(req.user.role === 'admin' ){
            next()
        }else{
           return res.status(403).json({success:false, message:"you are not authorized. Admin access required."})
        }
    })
}