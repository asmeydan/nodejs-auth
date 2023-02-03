import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

export default mongoose.model('Post', postSchema);