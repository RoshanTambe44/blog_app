import Connect from "@/db/db";
import notification from "@/models/notificationModel";





export async function POST(req: Request){
    try {
 
    await Connect()
    const {userId} =  await req.json();
    
    
    const notificationData = await notification.find({userId})
    return Response.json({messages: "successfully getting notification  data", notificationData })
        
    } catch (error) {
        console.log(error)    
    }
       
}