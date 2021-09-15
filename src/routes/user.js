const express = require ('express');
const userController = require ('../controllers/userController');
const userValidation = require('../middleware/userValidations')


const router = express.Router();

router.post('/signUp',userValidation, userController.registerUser)

module.exports = router ;
