import Connect from "@/db/db";
import user from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs"




export async function POST (req: Request) {
    
try {

        
    await Connect()
    const {email, password }= await req.json()
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)
    const res = await user.updateOne({email}, {password:hashPassword})

        
    return Response.json({state : true, message:"password updated", res })
    

    
} catch (error) {
    return NextResponse.json({success: false, message :"some error in updating password"})
}    

}