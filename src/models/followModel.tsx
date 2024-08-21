import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    followerId :{
        type:String
    },
    followingId:{
        type:String
    }
    
},{timestamps:true})

const follows = mongoose.models.follows || mongoose.model("follows", followSchema)


export default follows;