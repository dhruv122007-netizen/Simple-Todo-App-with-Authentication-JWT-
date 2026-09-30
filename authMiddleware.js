const jwt = require("jsonwebtoken")

function authMiddleware(req, res, next) {
     const token = req.headers.token;
    
        if(!token) {
            res.status(403).json({
                Msg: "Incorrect Credentials"
            })
            return;
        }
    
        const decoded = jwt.verify(token, "Dhruv1207");
        const username = decoded.username;
    
        if(!username) {
            res.status(403).json({
                Msg: "Malformed Token"
            })
            return;
        }

        req.username = username;

        next();
    
}

module.exports = authMiddleware
