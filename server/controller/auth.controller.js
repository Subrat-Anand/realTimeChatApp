const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const getToken = require('../config/token');

const signUp = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const checkUserByUserName = await User.findOne({ username });
        if (checkUserByUserName) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const checkUserByEmail = await User.findOne({ email });
        if (checkUserByEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashPassword,
            email
        });

        const token = await getToken(user._id);
        res.cookie("token", token, { httpOnly: true, sameSite: "None", secure: true });

        return res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: `Signup error: ${err.message}` });
    }
};

const logIn = async (req, res) => {
    try {
        const { password, email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = await getToken(user._id);
        res.cookie("token", token, { httpOnly: true, sameSite: "None", secure: true });

        return res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: `Login error: ${err.message}` });
    }
};

const logOut = async (req, res)=>{
    try{
        res.clearCookie("token")
        res.status(200).json({
            message: "logout successfully"
        })
    }
    catch(err){
        res.status(500).json({ message: `Login error: ${err.message}` });
    }
}

module.exports = { signUp, logIn, logOut };
