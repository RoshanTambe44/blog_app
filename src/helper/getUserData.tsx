import { NextRequest } from "next/server"
import jwt from "jsonwebtoken";



export const getUserData = ( req: NextRequest  ) =>{
    try {
        const token  = req.cookies.get("token")?.value || '';
        const DecodedToken:any = jwt.verify(token , "roshan");
        return DecodedToken.id;
    
    } catch (error) {
        console.log(error)
    }
    


}

