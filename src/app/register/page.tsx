'use client'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import emailjs from "@emailjs/browser";
import { useStore } from '@/context/store';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Register() {
  const [username, setUsername]   = useState()
  const [email, setEmail]   = useState()
  const [password, setPassword]   = useState()
  const [check, setCheck]   = useState("")
  const [conformPass, setConformPass]   = useState()
  const [userNameState, setUserNameState]   = useState({data:{state:true}})
  const [emailCheck, setEmailCheck]   = useState({data:{message:""}})
 const [passwordEye1, setpasswordEye1] = useState(true)
 const [passwordEye2, setpasswordEye2] = useState(true)
  const contextData = useStore()
  console.log("register");
  
  
  
  
  

    

useEffect(()=>{userNameChack()},[])


async function userNameChack ()  {setUserNameState(  await axios.post('/api/users/usernamematch', {username})); }

useEffect(()=>{emailCheckFunc()},[])

async function emailCheckFunc ()  {  setEmailCheck ( await axios.post("/api/users/login", {email})) ; }


useEffect(() => {
  if (userNameState.data.state === true &&
      emailCheck.data.message === "wrong email" &&
      password &&
      password === conformPass) {
    setCheck("done");
  }
}, [userNameState.data.state, emailCheck.data.message, password, conformPass]);


  async function handler(){

    try {

      if(userNameState.data.state == true){
        if(emailCheck.data.message == "wrong email"){
          if(password){
            if(password == conformPass ) {
              const otp = Math. floor(Math. random() * (9999 - 1000 + 1)) + 1000 
              
              contextData.setUserVerificationOtp(otp)
              contextData.setUserEmail(email)
              
              

             await axios.post('/api/users/register', {username, email, password, otp} )
            // const emailRes = await axios.post('/api/send', {username, email, otp})
            emailjs.send("service_vdesto2","template_rcrfsba",{
              firstName: username,
              otp: otp,
              email: email,
              }, "3sJfA_4kKZEYfux4h");

              console.log("succefully add data"    );
           }
            else{ toast.error("Password not match") }   
        }
        }
      }  
    } catch (error) {
      console.log(error)
    }
    
  }
  
function passwordEye() {


  if(passwordEye1){
    setpasswordEye1(false)
  }
  else{setpasswordEye1(true)}

}
  
function conformPasswordEye() {

  if(passwordEye2){
    setpasswordEye2(false)
  }
  else{setpasswordEye2(true)}


  
}






  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen dark:bg-black">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md dark:bg-gray-700">
    <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center dark:text-white">Register</h2>
    <form action="/register" method="POST">
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400">Username</label>
            <input type="text" id="username" onChange={(e)=> setUsername(e.target.value)} name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required/>
            {username ? <> {userNameState.data.state === true ? <p className='text-sm ps-1 text-green-500' >Nice username</p>: <p className='text-sm ps-1 text-red-500' >Username must be uniqe</p>}</> : <></> }
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400">Email</label>
            <input type="email" id="email" onChange={(e)=> setEmail(e.target.value)} name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          {emailCheck.data.message == "wrong password"  ? <p className='text-sm ps-1 text-red-500' >Email already in use.</p>: <></>}
        </div>
        <div className="mb-4">
            <label htmlFor="password"  className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400">Password <span className='cursor-pointer ms-2' onClick={passwordEye} ><i className={passwordEye1 ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span></label>
            <input type={passwordEye1 ? "password": "text"} id="password" onChange={(e)=> setPassword(e.target.value)} name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="mb-6">
            <label htmlFor="password_confirmation" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400">Confirm Password <span className="cursor-pointer ms-2" onClick={conformPasswordEye}><i className={passwordEye2 ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span> </label>
            <input type={passwordEye2 ? "password": "text"} id="password_confirmation" onChange={(e)=> setConformPass(e.target.value)} name="password_confirmation"  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
        </div>
        <div className="flex items-center gap-2 ">
            {check === "done" ? <Link href='/emailVerification'  onClick={()=>handler()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</Link> : <div  onClick={()=>handler()} className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Register</div>  }
            <Link href='/login' className="  underline text-blue-500 cursor-pointer"> If you have already an Account</Link>
        </div>
        
    </form>
</div>
<ToastContainer/>
</div>
  )
}
