
import Followers from "@/app/yourProfile/[pofileId]/followers/page";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique:true,
        trim:true,
        lowercase: true
    },

    email : {
        type: String,
        unique: true
    },

    password : {
        type : String,
        trim: true
    },

    verified:{
        type:Boolean,
        default:false
    },
    admin:{
        type:Boolean,
        default:false

    },
    verifiedTocken: String,
    verifiedTockenExpiry: Date
},{timestamps:true})


 const user = mongoose.models.users || mongoose.model("users", userSchema);


 export default user;
