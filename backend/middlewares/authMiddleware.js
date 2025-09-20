const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next){
    const token = req.cookies.token;
    if(!token){
        return res.status(500).json({message:"User not logged in", success: false})
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid or expire token", success: false});
    }
}

module.exports = authMiddleware;