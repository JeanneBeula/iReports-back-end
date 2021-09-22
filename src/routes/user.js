const express = require ('express');
const userController = require ('../controllers/userController');
const {signUpValidation,loginValidator} = require('../middleware/userValidations')

const router = express.Router();
// const {signUpValidation,loginValidator} = userValidation;
router.post('/signUp', signUpValidation, userController.registerUser)
router.post('/signIn', loginValidator, userController.signIn)
router.get('/getUser', userController.getUsers)

module.exports = router ;
