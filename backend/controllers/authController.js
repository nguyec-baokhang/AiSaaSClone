const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const asyncHandler = require('express-async-handler');

const loginController = asyncHandler(async(req,res) => {
    try{
        const {username,email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(401).json({message: 'Invalid credentials'})
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch){
            res.status(401).json({message: 'Invalid password'});
        }
        const token = jwt.sign({userId: user._id, email: user.email}, process.env.JWT_ACCESS_SECRET,{
            expiresIn: '1h'
        });
        res.status(200).json({
            message: 'User login',
            token: token,
            user
        });
    }catch(error){
        console.log(error);
        res.status(400).json({ message: 'Authetication failed' });
    }
});

const registerController = asyncHandler(async(req,res) => {
    try{
        const {username,email,password} = req.body;
        const userExist = await User.findOne({email});
        if (userExist){
            return res.status(400).json({ message: 'Used credentials' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username: username,
            email: email,
            password: hashedPassword
        });
        res.status(201).json({message: 'Register successful'});
    }catch(error){
        console.log(error);
        res.status(400).json({ message: 'Register failed' });
    }
});

module.exports = {loginController,registerController};