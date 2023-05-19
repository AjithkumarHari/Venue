//Dependencies used
const express = require('express');
const user_route = express();
const userController = require('../controller/userController');
const path=require('path');
const session = require('express-session');
const validate=require('../Authentication/userAuthentication');
const nocache = require('nocache');
user_route.use(nocache());

user_route.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized:true    
    }));

//attaching the static image files
// user_route.use('/images',express.static(path.join(__dirname,"../public/images")))

//view engine
user_route.set('view engine', 'hbs')
user_route.set('views','./views')

//middleware for parsing incoming requests
user_route.use(express.json())
user_route.use(express.urlencoded({ extended: false }))

// user_route.get('/', userController.userPage)
user_route.get('/',validate.isLogout,userController.login)              
user_route.post('/login',userController.login_verify) //verifying the credentials
user_route.get('/homepage',validate.isLogin,userController.userDashboard)  //verifying the credentials
user_route.get('/logout',validate.isLogin,userController.logout)

      
user_route.get('/Signup', userController.signup)
user_route.post('/signup', userController.signup_create)


module.exports = user_route