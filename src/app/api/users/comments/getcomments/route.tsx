import Connect from "@/db/db";
import comments from "@/models/commentModel";


export async function POST (req:Request ){
    try {
    await Connect()
    const { postId } = await req.json()
    const getCommentRes = await comments.find({ postId})        
      return Response.json({success : true , message : "comment added", getCommentRes})      
    } catch (error) {
        console.log(error);
        
    }
}