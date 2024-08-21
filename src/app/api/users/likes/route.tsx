import Connect from "@/db/db";
import likes from "@/models/likedModel";



export async function POST (req:Request ){
    try {
    await Connect()
    const {userId, postId } = await req.json()
    const likeRes = await likes.create({ userId, postId })        
      return Response.json({success : true , message : "liked added", likeRes })      
    } catch (error) {
        console.log(error);
        
    }
}
