'use client'
import { useStore } from '@/context/store';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Login() {
   const route = useRouter();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [emailPass, setEmailPass] = useState('');
    const [passwordEye1, setpasswordEye1] = useState(true)


    const contextData = useStore();


   async function loginHandler(e){
    e.preventDefault();
     try {
       const res = await axios.post("/api/users/login", {email, password } )
       
       if(res.data.success){
        contextData.value.setUserId(res.data.userData._id)
        contextData.value.setUsername(res.data.userData.username)
          route.push('/mainDashboard')
       }
       else{
        setEmailPass(res.data.message)
        toast.error(res.data.message)
        
       }
          
     } catch (error) {
        console.log(error);
        
     }
   }

   function passwordEye() {


    if(passwordEye1){
      setpasswordEye1(false)
    }
    else{setpasswordEye1(true)}
  
  }



  return (
    <div className='bg-gray-100 flex items-center justify-center min-h-screen dark:bg-black'>
       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md dark:bg-slate-700  ">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 text-center dark:text-white">Login</h2>
        <form action="/login" method="POST">
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400">Email</label>
                <input type="email" onChange={(e)=>setEmail(e.target.value)} id="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />{emailPass === "wrong email" ?<h1 className="text-red-500 text-sm">wrong email</h1>:<></>}
            </div>
            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 dark:text-gray-400">Password <span className='cursor-pointer ms-2' onClick={passwordEye} ><i className={passwordEye1 ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"}></i></span></label>
                <input type={passwordEye1 ? "password": "text"} id="password" onChange={(e)=>setPassword(e.target.value)} name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />{emailPass === "wrong password" ? <h1 className="text-red-500 text-sm">wrong pawwsord</h1>:<></>}
            </div>
            <div className="flex items-center gap-2">
             <button  type="submit" onClick={(e)=>loginHandler(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Login</button><Link href='/register' className=" underline text-blue-500 cursor-pointer">If you dont have Account</Link>
            </div>
        </form>
    </div>
    <ToastContainer/>
    </div>
  )
}
