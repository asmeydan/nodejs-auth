import express from 'express'
import mongoose from 'mongoose'
import Post from '../models/postModel.js';

const router = express.Router();

router.post("/", async (req, res)=> {
    try {
        const { fullname, text} = req.body
        const createdPost = await Post.create({
            fullname,
            text
        })
        return res.status(201).json(createdPost)

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

router.get("/", async (req, res)=> {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})

export default router