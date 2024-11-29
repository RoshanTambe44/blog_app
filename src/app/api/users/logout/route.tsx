
import { NextRequest, NextResponse } from "next/server";



export async function POST (req: NextRequest ){
    try {

         const response = NextResponse.json({success: true, message: "logout successfully" }) ;
            response.cookies.set("token" , "", { httpOnly :true,  expires: new Date(0)})

              return  response;
         }


     catch (error) {
        NextResponse.json({success: false, message: "some error in logout", error: error})
        
    }
    
        
 
    

    

}
