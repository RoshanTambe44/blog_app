import Connect from "@/db/db";
import follows from "@/models/followModel";



export async function POST (req:Request ){
    try {
    await Connect()
    const {followerId, followingId } = await req.json()
    const unfollowRes = await follows.deleteOne({ followerId, followingId})        
      return Response.json({success : true , message : "unfollow successfully", unfollowRes})      
    } catch (error) {
        console.log(error);
        return  Response.json({success : false , message : "unfollow issue", error}) 
    }
}