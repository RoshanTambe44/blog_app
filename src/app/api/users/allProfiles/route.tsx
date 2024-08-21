import Connect from "@/db/db";
import posts from "@/models/postModel";
import user from "@/models/userModel";



export async function GET (req:Request ){
    try {
    await Connect()
        const getres = await user.find().select(["_id", "username"] )
        const getPostRes = await posts.aggregate([{ $group :{_id:"$username", count: {$sum: 1}},  }])

      return Response.json({success : true , message : "get profile", getPostRes })      
    } catch (error) {
        console.log(error);
        
    }
}
