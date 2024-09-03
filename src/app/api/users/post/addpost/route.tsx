import Connect from "@/db/db";
import posts from "@/models/postModel";




export async function POST(req: Request){
    try {
 
    await Connect()
    const reqBody =  await req.json();
    const {username, userId, content ,category} = reqBody
    
    const postData = await posts.create({userId, username, content, category })
    return Response.json({messages: "successfully posted", postData })
        
    } catch (error) {
        console.log(error)    
    }
       
}