import Connect from "@/db/db";
import likes from "@/models/likedModel";



export async function POST (req:Request ){
    try {
    await Connect()
    const {userId} = await req.json();
    const res = await likes.find({userId}) ;   
      return Response.json({success:true , message:"get likes data successfully" , res})
    } catch (error) {
        console.log(error);
        
    }
}
