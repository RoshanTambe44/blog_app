import mongoose from "mongoose";

const notiSchema = new mongoose.Schema({
    userId :{
        type: String
    },
    notifications:{
        type:Object
    },
    type:{
        type: String
    }
    
},{timestamps: true})


const notification =  mongoose.models.notifications || mongoose.model("notifications", notiSchema );

export default notification;