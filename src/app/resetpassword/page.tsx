'use client'
import { useStore } from '@/context/store'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'




export default function EmailVerifiaction({}) {

const contextData = useStore()
const route = useRouter()
const [resetPassword, setResetPassword] = useState<any>()
const [conformResetPassword, setConformResetPassword] = useState<any>()
const [passwordEye1, setpasswordEye1] = useState(true)
const [passwordEye2, setpasswordEye2] = useState(true)

async function resetPassHandler(e: any ){
  e.preventDefault()
  if(resetPassword === conformResetPassword){
    console.log(conformResetPassword, contextData.userEmail)
    const res = await axios.post("/api/users/changepassword", { password: conformResetPassword , email: contextData.userEmail })
    toast.success("password changed")
    setTimeout(()=>{route.push("/login")}, 3000)
    
  }
  else{
    toast.error("password not match")
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
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center dark:text-white">Reset Paasword</h2>
        <form action="/verify-email" method="POST">
            <div className="mb-4">
                <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2  dark:text-gray-400 ">Enter Reset Password <span className='cursor-pointer ms-2' onClick={passwordEye} ><i className={passwordEye1 ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span></label>
                <input type={passwordEye1 ? "password": "text"} id="otp" name="otp" onChange={(e)=>setResetPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
                

            </div>
            <div className="mb-4">
                <label htmlFor="otp" className="block text-gray-700 text-sm font-bold mb-2  dark:text-gray-400 ">Enter Conform Reset Password <span className="cursor-pointer ms-2" onClick={conformPasswordEye}><i className={passwordEye2 ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span></label>
                <input type={passwordEye2 ? "password": "text"} id="otp" name="otp" onChange={(e)=>setConformResetPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />

            </div>
            <div className="flex items-center justify-between">
                <button  onClick={(e)=>resetPassHandler(e)}  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Reset</button> 
            </div>
        </form>
    </div>
    <ToastContainer/>
    </div>
  )
}
