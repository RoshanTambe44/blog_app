import Connect from "@/db/db";
import posts from "@/models/postModel";
import user from "@/models/userModel";



export async function POST (req:Request ){
    try {
    await Connect()
        const getres = await user.find().select(["_id", "username", "email", "createdAt"] )
        const getPostRes = await posts.aggregate([{ $group :{_id:"$username",  count: {$sum: 1}, userId : {$first:"$_id"}},  }])

      return Response.json({success : true , message : "get profile", getPostRes, getres  })      
    } catch (error) {
        console.log(error);
        
    }
}
