import Connect from "@/db/db";
import user from "@/models/userModel";



export async function POST (req: Request) {
    await Connect()
    const {username} = await req.json()
     
    console.log("username=", username)

    const userNameData = await user.findOne({username})
    console.log("res=",userNameData)
    if (userNameData){
        console.log("must have unique username ")
        return Response.json({state : false})
    }

    else{ return Response.json({state: true, message:"can't find it"}) }

}