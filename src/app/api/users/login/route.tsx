import Connect from "@/db/db";
import user from "@/models/userModel";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";


export async function POST (req:Request ){
    try {
        await Connect()
        const {email,  password} = await req.json()
    
    if(email.includes('@')){
    const userData = await user.findOne({ email : email } );
    if(!userData){
        
        return Response.json({message: "wrong email"  })
    }
    const validPassword = await bcryptjs.compare(password, userData.password)

    if(!validPassword){
        return Response.json({message:"wrong password"})
    }
    else{ 
        const tokenData = {
            id: userData._id,
            name: userData.username,
            email: userData.email,
            verified: userData.verified,
            admin: userData.admin 

        }
        const response = NextResponse.json({success:true, message :"login success", userData})
        const token = await jwt.sign(tokenData, "roshan", {expiresIn:"1d"});
          response.cookies.set("token", token, {httpOnly:true})
          return response;
     }

    }
    else{

     const userData = await user.findOne({ username : email } );

    if(!userData){
        return Response.json({message: "wrong username"  })
    }
    const validPassword = await bcryptjs.compare(password, userData.password)

    if(!validPassword){
        return Response.json({message:"wrong password"})
    }
    
    else{ 
        const tokenData = {
            id: userData._id,
            name: userData.username,
            email: userData.email,
            verified: userData.verified,
            admin: userData.admin 

        }
        const response = NextResponse.json({success:true, message :"login success", userData})
        const token = await jwt.sign(tokenData, "roshan", {expiresIn:"1d"});
          response.cookies.set("token", token, {httpOnly:true})
          return response;
     }
    }
      
    } catch (error) {
        return NextResponse.json({success:false, message :"login error", error})
        
    }
  
}
