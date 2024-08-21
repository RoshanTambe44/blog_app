import Connect from "@/db/db";
import comments from "@/models/commentModel";


export async function POST (req:Request ){
    try {
    await Connect()
    const {userId, postId, userName, commentContent } = await req.json()
    const commentRes = await comments.create({ userId, userName, postId, commentContent })        
      return Response.json({success : true , message : "comment added", commentRes})      
    } catch (error) {
        console.log(error);
        return Response.json({success : false , message : "comment issue", error}) 
    }
}
