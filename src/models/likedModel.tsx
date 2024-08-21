import mongoose from "mongoose";

const likedSchema = new mongoose.Schema({
    postId :{
        type:String
    } ,
    userId:{
        type:String
    }
})

const likes = mongoose.models.likes || mongoose.model("likes", likedSchema);

export default likes;


