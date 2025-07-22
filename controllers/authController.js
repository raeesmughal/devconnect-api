
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRE = process.env.JWT_EXPIRE;


const signup = async (req, res, next) => {
    try {
        const { name, age, role, username, email, password } = req.body;

        if (!name || !age || !role || !username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'all credentials are required',
            })
        }


        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: 'email already exists',
            })
        }


        const hashPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, age, role, username, password: hashPassword, email });
        await user.save();

        return res.status(200).json({
            success: true,
            message: 'user registered successfully',
        })


    } catch (er) {
        next(er)
    }
}





const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'email and password both are required for logging in',
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({
                success: false,
                message: 'user not found',
            })
        }


        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            res.status(400).json({
                success: false,
                message: 'incorrect password',
            })
        }


        const payload = { email: user.email };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRE })

        res.status(200).json({
            success: true,
            token,
        });

    } catch (er) {
        next(er)
    }
}




const getProfile = async (req, res, next) => {
    try {
        const email = req.email;

        const user = await User.findOne({ email }).select('-password');

        res.status(200).json({
            success: true,
            user: user,
        })

    } catch (er) {
        next(er)
    }
}


module.exports = {
    signup,
    login,
    getProfile,
}