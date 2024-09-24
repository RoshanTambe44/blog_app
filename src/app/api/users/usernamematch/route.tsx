import Connect from "@/db/db";
import user from "@/models/userModel";



export async function POST (req: Request) {
    await Connect()
    const {username} = await req.json()
     
    console.log("username=", username)

    const userNameData = await user.findOne({username},"-password")
    if (userNameData){
        return Response.json({state : false, message:"must have unique username" , userNameData })
    }

    else{ return Response.json({state: true, message:"nice username"}) }

}