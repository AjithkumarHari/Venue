const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

const userRoute = require('./routes/users')      //user Router
const adminRoute = require('./routes/admin')    //Admin Router

//Home Page of User and Admin
app.use('/', userRoute)
app.use('/admin', adminRoute)

//Port Creation
app.listen(PORT, () => { console.log("the port is created"); })
