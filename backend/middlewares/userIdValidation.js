function userIdValidation(req, res, next){
    const userId = req.params.id;
    try {    
        if(userId === undefined || userId === "" || typeof userId === 'undefined') {
            return res.json({message:"User Id is required", success: false});
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = userIdValidation;