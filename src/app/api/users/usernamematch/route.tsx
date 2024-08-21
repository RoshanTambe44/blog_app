import Connect from "@/db/db";
import user from "@/models/userModel";



export async function POST (req: Request) {
    await Connect()
    const reqBody = await req.json()
    const {username} = reqBody;
    console.log(username)

    const userNameData = await user.findOne({username})
    console.log(userNameData)
    if (userNameData){
        console.log("must have unique username ")
        return Response.json({state : false})
    }

    else{ return Response.json({state: true}) }

}