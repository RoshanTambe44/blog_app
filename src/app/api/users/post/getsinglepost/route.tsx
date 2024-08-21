import Connect from "@/db/db";
import posts from "@/models/postModel";




export async function POST(req: Request){
    try {
 
    await Connect();
    const{postId} = await req.json();
    console.log(postId)
    const getSinglePosts = await posts.find({_id:postId});
    return Response.json({messages: "successfully get single posts", getSinglePosts })
        
    } catch (error) {
        console.log(error)    
    }
       
}