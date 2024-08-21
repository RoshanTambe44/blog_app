import Connect from "@/db/db";
import posts from "@/models/postModel";




export async function POST(req: Request){
    try {
 
    await Connect()
    const reqBody =  await req.json();
    const {username, userId, content } = reqBody
    
    const postData = await posts.create({userId, username, content })
    return Response.json({messages: "successfully posted", postData })
        
    } catch (error) {
        console.log(error)    
    }
       
}