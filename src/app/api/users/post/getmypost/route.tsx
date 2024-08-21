import Connect from "@/db/db";
import posts from "@/models/postModel";




export async function POST(req: Request){
    try {
 
    await Connect();
    const {userId} = await req.json();
    const getMyPosts = await posts.find({userId});
    return Response.json({messages: "successfully get my posts", getMyPosts })
        
    } catch (error) {
        console.log(error)    
    }
       
}