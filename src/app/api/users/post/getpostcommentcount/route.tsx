import Connect from "@/db/db";
import comments from "@/models/commentModel";





export async function GET(req: Request){
    try {
 
    await Connect();
    const getPostCommentRes = await comments.aggregate([ {$group:{_id:"$postId", count: {$sum: 1}}}]);
    return Response.json({messages: "successfully get each post Comments counts", getPostCommentRes })
        
    } catch (error) {
        console.log(error)    
    }
       
}