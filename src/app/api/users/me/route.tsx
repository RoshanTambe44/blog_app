import Connect from "@/db/db";
import { getUserData } from "@/helper/getUserData";
import user from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";


export async function GET (req:NextRequest) {
    await Connect()
    try {
        
       const userId = await getUserData(req);
       
       const tokenUserData = await user.findOne({_id: userId}).select("-password");
        
        return NextResponse.json({success:true, message:"successfully get data from token", tokenUserData })

    } catch (error) {
        return NextResponse.json({success:false, message:"some issue in me route", error })
    }
}