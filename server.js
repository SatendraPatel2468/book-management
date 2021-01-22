const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const User = require('./models/user')
const error = require('./middlewares/errorMiddleWareHandlers')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoutes')
const bookRoute = require('./routes/bookRoute')


//DOTENV
dotenv.config()

const dbConnect = require("./config/fbConn")

//DB Connect
dbConnect()

//Passing body data
app.use(express.json())

//User Routes
app.use('/api/users', userRoute)

//Book ROutes
app.use('/api/books', bookRoute)


//ERROR middleware
app.use(error.errorMiddleWareHandler)






app.listen(port, (req, res) => {
    console.log('Server is running')
})

