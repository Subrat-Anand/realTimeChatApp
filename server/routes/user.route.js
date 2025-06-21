const express = require('express');
const userRouter = express.Router();
const {getCurrentUser, editProfile, getOtherUser, search} = require('../controller/user.controller');
const isAuth = require('../middleware/isAuth');
const upload = require('../middleware/multer');


userRouter.get('/current', isAuth, getCurrentUser);
userRouter.put('/profile', isAuth, upload.single("image"), editProfile)
userRouter.get('/others', isAuth, getOtherUser)
userRouter.get('/search', isAuth, search)

module.exports = userRouter