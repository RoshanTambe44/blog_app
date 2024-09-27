import Connect from "@/db/db";
import notification from "@/models/notificationModel";





export async function POST(req: Request){
    try {
 
    await Connect()
    const reqBody =  await req.json();
    const {userId, notifications, type} = reqBody
    
    const notificationData = await notification.create({userId, notifications, type})
    return Response.json({messages: "successfully posted", notificationData })
        
    } catch (error) {
        console.log(error)    
    }
       
}