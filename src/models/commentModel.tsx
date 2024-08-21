import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  postId: {
    type: String,
  },
  userId: {
    type: String,
  },
  userName:{
    type: String,
  },
  commentContent: { type: String },
},{timestamps:true});



const comments = mongoose.models.comments || mongoose.model("comments", commentSchema);
export default comments;