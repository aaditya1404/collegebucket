function signupValidation(req, res, next) {
    try {
        let { username, email, password } = req.body;
        if (!username) {
            return res.status(500).json({ message: "Username is required", success: false });
        } else if (!email) {
            return res.status(500).json({ message: "Email is required", success: false });
        } else if(!password) {
            return res.status(500).json({ message: "Password is required", success: false });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = signupValidation;