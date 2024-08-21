import Connect from "@/db/db";
import posts from "@/models/postModel";




export async function GET(req: Request){
    try {
 
    await Connect();
    const postData = await posts.find();
    return Response.json({messages: "successfully get posts", postData })
        
    } catch (error) {
        console.log(error)    
    }
       
}