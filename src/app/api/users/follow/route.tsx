import Connect from "@/db/db";
import follows from "@/models/followModel";



export async function POST (req:Request ){
    try {
    await Connect()
    const {followerId, followingId } = await req.json()
    const followRes = await follows.create({ followerId, followingId})        
      return Response.json({success : true , message : "follow successfully", followRes})      
    } catch (error) {
        console.log(error);
        return  Response.json({success : false , message : "follow issue", error}) 
    }
}