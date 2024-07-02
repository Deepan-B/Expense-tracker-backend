export const verifyAdmin = async (req, res, next) => {
    if (req.body.email === "Admin@gmail.com" && req.body.password === "12345678") {
        next();
    }
    else {
        return res.status(403).json({message: "you are not an admin to access this api request"})
    }
};

