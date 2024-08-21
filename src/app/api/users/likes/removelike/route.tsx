import Connect from "@/db/db";
import likes from "@/models/likedModel";



export async function POST (req:Request ){
    try {
    await Connect()
    const {userId, postId } = await req.json()
    const deleteRes = await likes.deleteOne({ postId, userId })        
      return Response.json({success : true , message : "document deleted", deleteRes })      
    } catch (error) {
        console.log(error);
        
    }
}