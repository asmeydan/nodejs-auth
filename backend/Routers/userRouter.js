import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

router.post("/signup", async (req, res)=> {
    try {
        console.log(req.body)
        const { fullname, password, phoneNumber, email} = req.body

        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({ message: 'User already exists'})
        }
        const hashedPassword = await bcrypt.hash(password, 10) 

        const createdUser = await User.create({
            fullname,
            email,
            password:hashedPassword,
            phoneNumber
        })

        const token = jwt.sign({id: createdUser._id}, `${process.env.JWT_KEY}`, {expiresIn: '1h'})

        return res.status(201).json({createdUser, token})
    }
    catch(error) {
        console.log(error)
        return res.json({ message: "create user failed" })
    }
})

router.post("/signin", async (req, res)=> {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({ message: "user does not exist"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect) {
            return res.status(400).json({message: "wrong password"})
        }
        const token = jwt.sign({id: user._id}, `${process.env.JWT_KEY}`, {expiresIn: '1h'})
        return res.status(200).json({user, token})
    }
    catch(error) {
        return res.status(400).json({message: error.message})
    } 
})

export default router