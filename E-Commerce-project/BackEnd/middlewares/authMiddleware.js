const jwtService = require('jsonwebtoken');

exports.jwtMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwtService.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.userID = decoded.id; 
        next();
    });
};  


exports.resetPasswordMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            console.log("hello")
            return res.status(401).json({ message: "no token provided" });
        }
        const decodedToken = jwtService.verify(token, process.env.JWT_RESET_KEY);
        req.codeForgetPassword = decodedToken.code
        next();
    }
    catch (error) {
        return res.status(401).json("error"+error);
    }
}
