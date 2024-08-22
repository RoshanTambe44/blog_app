import Connect from "@/db/db";
import user from "@/models/userModel";





export async function POST(req: Request){
    try {
 
    await Connect()
    const reqBody =  await req.json();
    const { userId } = reqBody
    
    const userInfo = await user.findOne({_id:userId }).select(["-password", "-email"])
    return Response.json({success: true, messages: "successfully get user info", userInfo })
        
    } catch (error) {
        console.log(error)    
        return Response.json({ success: false,  messages: "issue in getting user info", error })
    }
       
}