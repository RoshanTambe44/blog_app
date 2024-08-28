'use client'
import { useStore } from '@/context/store'
import axios from 'axios'
import JoditEditor from 'jodit-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function AddPost() {
    const contextData = useStore()

    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [category, setCategory] = useState('');
    const userName = contextData?.userName || "";
    const firstLatter = userName.charAt(0).toUpperCase();


    useEffect(()=>{
        (async()=>{
            try {
                const userDataRes = await axios.get("api/users/me");
            contextData.setUsername(userDataRes.data.tokenUserData.username)
            contextData.setUserId(userDataRes.data.tokenUserData._id)
            contextData.setUserEmail(userDataRes.data.tokenUserData.email)
            } catch (error) {
                console.log(error)
            }
    
            
        })()
    })

    async function postHandler (e :any){
        e.preventDefault()
        try {

           if(title){
           if(title.length > 5 ){
            if(message){
                if(contextData.userId){
                    const res = await axios.post('/api/users/post/addpost', {userId:contextData.userId, username:contextData.userName,  content: {title, message }})
                    toast.success("Post Uploded")
                setTitle("")
                setMessage("")
                }
                
                else{}

            }
            else{
                toast.error("Add Content")
            }
           }
           else{toast.error("Subject must have more than 5 charactors  ")}

           }
           else{
            toast.error("Add Subject")
           }
           
        } catch (error) {
            console.log(error);
            
        }
    }
    
  return (
    <div className='h-[100vh] overflow-hidden'><nav className="bg-white shadow-md" >
    <div   className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-500">BlogApp</a>
        <div className="  flex flex-col items-center justify-between h-10 ">
            <div className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center  ">{firstLatter}</div>
            <h1 className="text-xs h-[20%] w-full">{userName}</h1>
        </div>
    </div>
</nav>

{/* <!-- Main Content --> */}
<div className="container mx-auto px-4 py-6 flex-grow">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* <!-- Sidebar --> */}
        <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-md">
        <ul className="md:flex-col flex  items-center md:items-start justify-between  gap-2 md:gap-6">
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full' ><Link href={`/yourProfile/${ contextData.userId}`} className=" text-center text-gray-400  hover:text-gray-900 flex items-center justify-center md:justify-start"><i className="fa-regular fa-user   md:me-4 "></i><div className="hidden md:block">Profile</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lgrounded-full'><Link href="/addPost" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-square-plus  md:me-4  "></i> <div className="hidden md:block"> Add</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg rounded-full'><Link href="/notification" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-bell  md:me-4 "></i><div className=" hidden md:block">Notifications</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/mainDashboard" className="flex items-center justify-center md:justify-start text-center text-gray-400  hover:text-gray-900"><i className="fa-solid fa-house  md:me-4"></i> <div className="hidden md:block">Home</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/search" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-solid fa-magnifying-glass  md:me-4 "></i> <div className="hidden md:block">Search</div></Link></li>
            </ul>
        </aside>

        {/* <!-- Main Section --> */}
        <main className="md:col-span-3 space-y-6 h-[79vh]">
           {/* <!-- Add Post Section --> */}
    <section id="add-post" className="bg-white p-6 rounded-lg shadow-md h-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-900  h-[10%]">Add Post</h2>
        <form action="/add-post" className=' overflow-y-scroll no-scrollbar h-[90%] ' method="POST">
            <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
                
                <input type="text" id="title" value={title} onChange={(e)=>setTitle(e.target.value)} name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>

            <div className="mb-4">
                <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
                <JoditEditor id ="content" name="content" value={message} onChange={(e)=>setMessage(e)} className="shadow appearance-none border rounded w-full  text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required ></JoditEditor>
               
            </div>
            <div className="mb-4">
                 <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
            <input type="text" id="category" value={category} onChange={(e)=>setCategory(e.target.value)} name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <button type="submit"  onClick={(e)=>postHandler(e)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Post</button>
        </form>
    </section>
        
        </main>
    </div>
</div>
<ToastContainer/></div>


  )
}
