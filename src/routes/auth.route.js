const router = require('express').Router();
const { asyncHandler } = require('../middlewares/asyncHandler');
const checkEmail = require('../middlewares/checkEmail');
const { signup: signupValidator, signin: signinValidator } = require('../validators/auth');
const authController = require('../controllers/auth.controller');


router.route('/signup')
    .post(signupValidator, asyncHandler(checkEmail), asyncHandler(authController.signup));

router.route('/signin')
    .post(asyncHandler(authController.signin));

router.route('/list')
    .get(asyncHandler(authController.listUser));

router.route('/deleteUser/:id')
    .delete(asyncHandler(authController.deleteUser));

router.route('/user/:id')
    .get(asyncHandler(authController.getUserById));

router.route('/updateuser')
    .put(asyncHandler(authController.updateUserById));

module.exports = router;