import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId :{
        type: String
    },
    username:{
        type:String
    },
    content:{
        type: Object,
        require:true
    },
    
},{ timestamps: true })


const posts =  mongoose.models.posts || mongoose.model("posts", postSchema );

export default posts;