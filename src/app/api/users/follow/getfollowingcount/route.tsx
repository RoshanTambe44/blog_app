import Connect from "@/db/db";
import follows from "@/models/followModel";



export async function POST (req:Request ){
    try {
    await Connect()
    const {followingId } = await req.json()
    const followingCountRes = await follows.find({ followingId })        
      return Response.json({success : true , message : "GET following count successfully", followingCountRes})      
    } catch (error) {
        console.log(error);
        return  Response.json({success : false , message : "following count issue", error}) 
    }
}