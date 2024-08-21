import Connect from "@/db/db"
import user from "@/models/userModel"
import bcryptjs from "bcryptjs"


export async function POST(req:Request) {
  await Connect()
  const reqBody =  await req.json()
  const {username, email, password, otp} = reqBody
  //HASH password
  const salt = await bcryptjs.genSalt(10)
  const hashPassword = await bcryptjs.hash(password, salt)
  const data = await user.create({username, email, password: hashPassword, otp })
  console.log(data)

  return Response.json({message :"success", data })
}


