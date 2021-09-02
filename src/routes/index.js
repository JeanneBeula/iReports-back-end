const express = require ('express');
const userRoute = require ('./user');

const Router = express.Router();
Router.use('/auth', userRoute);

module.exports = Router;
