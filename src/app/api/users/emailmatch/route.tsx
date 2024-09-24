import Connect from "@/db/db";
import user from "@/models/userModel";



export async function POST (req: Request) {
    await Connect()
    const {email} = await req.json()
   

    const emailData = await user.findOne({email})
    if (emailData){
        return Response.json({state : false, message:"email already in use" })
    }

    else{ return Response.json({state: true, message:"email"}) }

}