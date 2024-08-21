import Connect from "@/db/db";
import follows from "@/models/followModel";
import { NextRequest } from "next/server";



export async function POST ( req:NextRequest){
    try {
    await Connect()
        const { followerId } = await req.json();
    const followDataRes = await follows.find({followerId})        
      return Response.json({success : true , message : "followData successfully fetch", followDataRes})      
    } catch (error) {
        console.log(error);
        return  Response.json({success : false , message : "followData fetch issue", error}) 
    }
}