import Connect from "@/db/db";
import user from "@/models/userModel";

export async function POST(req:Request) {
        
    try {
        await Connect();
        const {email} = await req.json();
        console.log(email)
        await user.findOneAndUpdate({email : email},{verified : true})
    
    return Response.json({success:true, message:"successfully verify" })

    } catch (error) {
        return Response.json({success:false, error}) 
    }     
}