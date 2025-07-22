const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(400).json({
                success: false,
                message: 'token not found',
            })
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token,JWT_SECRET);
        req.email = decoded.email;
        next()

    } catch (er) {
        res.status(400).json({
            success: false,
            message: 'invalid token',
        })
    }
}




module.exports = authMiddleware;