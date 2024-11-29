import Connect from "@/db/db";
import likes from "@/models/likedModel";




export async function POST(){
    try {
 
    await Connect();
    const getPostLikes = await likes.aggregate([ {$group:{_id:"$postId", count: {$sum: 1}}}]);
    return Response.json({messages: "successfully get each post likes", getPostLikes })
        
    } catch (error) {
        console.log(error)    
    }
       
}