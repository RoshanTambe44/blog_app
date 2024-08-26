import Connect from "@/db/db";
import follows from "@/models/followModel";



export async function POST (req:Request ){
    try {
    await Connect()
    const {followerId } = await req.json()
    const followerCountRes = await follows.find({ followerId })        
      return Response.json({success : true , message : "GET follower count successfully", followerCountRes})      
    } catch (error) {
        console.log(error);
        return  Response.json({success : false , message : "follower count issue", error}) 
    }
}