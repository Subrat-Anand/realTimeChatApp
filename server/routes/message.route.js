const express = require('express');
const messageRoute = express.Router();
const isAuth = require('../middleware/isAuth');
const upload = require('../middleware/multer');
const {sendMessage, getMessages} = require('../controller/message.controller')

messageRoute.post('/send/:receiver', isAuth, upload.single("image"), sendMessage)
messageRoute.get('/get/:receiver', isAuth, getMessages)

module.exports = messageRoute