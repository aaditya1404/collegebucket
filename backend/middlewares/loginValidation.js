function loginValidation(req, res, next) {
    try {
        let { email, password } = req.body;
        if (!email && !password) {
            return res.status(500).json({ message: "All the fields are required", success: false })
        }
        else if (!email) {
            return res.status(500).json({ message: "Email is required", success: false });
        } else if (!password) {
            return res.status(500).json({ message: "Password is required", success: false });
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

module.exports = loginValidation;