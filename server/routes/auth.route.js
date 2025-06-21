const express = require('express');
const { signUp, logIn, logOut } = require('../controller/auth.controller');
const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', logIn);
authRouter.post('/logout', logOut);

module.exports = authRouter