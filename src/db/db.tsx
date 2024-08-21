
import mongoose from "mongoose";



export default async function Connect() {
 

    try {
      const db = await mongoose.connect("mongodb+srv://roshantambe130:IqFXueAPN4ZXLKUh@cluster0.n0yvx9s.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0")
      
        
        console.log("conection success")
    


        
    } catch (error) {
        console.log(error)
    }
}
