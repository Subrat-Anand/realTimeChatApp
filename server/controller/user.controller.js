const User = require("../models/userModel");
const uploadOnCloudinary = require("./cloudinary");

const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId; // Make sure req.userId is set by isAuth middleware
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            });
        }

        return res.status(200).json(user);  // ✅ fixed typo here
    } catch (err) {
        return res.status(500).json({
            message: `Current user error: ${err}`
        });
    }
};


const editProfile = async(req, res)=>{
    try{
        const {name} = req.body
        let image;
        
        if(req.file){
            image = await uploadOnCloudinary(req.file.path)
        }

        const user = await User.findByIdAndUpdate(req.userId, {
            image,
            name
        },{new: true})

        if(!user){
            return res.status(400).json({
                message: "user not exist"
            })
        }

        return res.status(200).json(user)
    }
    catch(err){
        return res.status(500).json({
            message: `Profile user error: ${err}`
        });
    }
}

const getOtherUser = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(400).json({ message: "User ID not found in request." });
        }

        const users = await User.find({
            _id: { $ne: req.userId }
        }).select("-password");

        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({
            message: `Get user error: ${err.message}`
        });
    }
};

const search = async (req, res)=>{
    try{
        const {query} = req.query
        const loggedInUser = req.userId

        if(!query){
            return res.status(400).json({
                message: "query is required"
            })
        }

        const users = await User.find({
            _id:{$ne: loggedInUser},
            $or:[
                {name: {$regex: query, $options: "i"}},
                {username: {$regex: query, $options: "i"}}
            ]
        })

        return res.status(200).json(users)
    }
    catch(err){
        return res.status(500).json({
            message: `serch users error: ${err.message}`
        });
    }
}

module.exports = { getCurrentUser, editProfile, getOtherUser, search };
