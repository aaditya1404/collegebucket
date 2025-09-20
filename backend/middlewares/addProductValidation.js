function addProductValidation(req, res, next){
    let { productname, productdesc, productprice, listedByUserId } = req.body;

    try {
        if(!listedByUserId){
            return res.status(401).json({message: "User must be logged in", success: false});
        } else if(!productname){
            return res.status(400).json({message:"Product name is required", success: false});
        } else if(!productdesc){
            return res.status(400).json({message:"Product description is required", success: false});
        } else if(!productprice){
            return res.status(400).json({message:"Product price is required", success: false});
        }
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error", success:false});
    }
}

module.exports = addProductValidation