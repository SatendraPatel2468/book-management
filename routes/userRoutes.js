const express = require('express')
const userRouter = express.Router()
const User = require('../models/user')
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');

//Register
userRouter.post('/register', asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email: email })
    if (userExist) {
        throw new Error('User Exist');
    }
    const userCreated = await User.create({ name, email, password })

    res.json({
        _id: userCreated.id,
        name: userCreated.name,
        password: userCreated.password,
        email: userCreated.email,
        token: generateToken(userCreated._id),
    });

}));


//Login
userRouter.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.ispasswordMatch(password))) {
        res.status(200);

        res.json({
            _id: user.id,
            name: user.name,
            password: user.password,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Something is wrong')
    }
}));

//Update user
userRouter.put('/update', (req, res) => {
    res.send('Uploading user')
})


//Delete user
userRouter.delete('/:id', (req, res) => {
    res.send('Deleting user')
})


//Fetch user
userRouter.get('/', (req, res) => {
    res.send('fetching user')
})

module.exports = userRouter
