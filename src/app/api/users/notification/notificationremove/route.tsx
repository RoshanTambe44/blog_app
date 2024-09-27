import Connect from "@/db/db";
import notification from "@/models/notificationModel";





export async function POST(req: Request){
    try {
 
    await Connect()
    const {userId, notifications, type }  =  await req.json();
    
    
    const notificationData = await notification.deleteOne({userId, notifications, type  })
    return Response.json({messages: "successfully getting notification  data", notificationData })
        
    } catch (error) {
        console.log(error)    
    }
       
}