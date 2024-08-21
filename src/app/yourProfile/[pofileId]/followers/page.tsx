"use client";
import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



export default function Followers() {
  const router = useRouter()
  const contextData = useStore()


  const userName = contextData?.value?.userName || "";
    const firstLatter = userName.charAt(0).toUpperCase();


    useEffect(()=>{
      (async()=>{
          const userDataRes = await axios.get("/api/users/me");
          contextData.value.setUsername(userDataRes.data.tokenUserData.username)
          contextData.value.setUserId(userDataRes.data.tokenUserData._id)
          contextData.value.setUserEmail(userDataRes.data.tokenUserData.email)
  
          
      })()
  },[])    

















  return (
    <div className="h-[100vh] overflow-hidden" >
      <nav className="bg-white shadow-md" >
    <div   className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-500">BlogApp</a>
        <div className="  flex flex-col items-center justify-between h-10 ">
            <div className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center  ">{firstLatter}</div>
            <h1 className="text-xs h-[20%] w-full">{userName}</h1>
        </div>
    </div>
</nav>

      {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-6 flex-grow  ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          {/* <!-- Sidebar --> */}
          <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-md">
          <ul className="md:flex-col flex  items-center md:items-start justify-between gap-2 md:gap-6">
                <li><Link href="/yourProfile" className="block text-gray-700 hover:text-blue-500">Your Profile</Link></li>
                <li><Link href="/addPost" className="block text-gray-700 hover:text-blue-500">Add Post</Link></li>
                <li><Link href="/notification" className="block text-gray-700 hover:text-blue-500">Notifications</Link></li>
                <li><Link href="/mainDashboard" className="block text-gray-700 hover:text-blue-500"> Posts</Link></li>
            </ul>
          </aside>

          {/* <!-- Main Section --> */}
          <main className="md:col-span-3 space-y-6  h-[79vh]">
            {/* <!-- Profile Section --> */}
            <section id="profile" className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col gap-4  ">
                <div className="w-full"><h1 className="text-2xl text-black ">Followers</h1></div>
                <hr/>
                <div className="flex flex-col gap-2 overflow-scroll no-scrollbar">
                    <div className="bg-gray-600 w-full p-2 rounded-lg flex 
                justify-between">      
                    
                    <div className="flex gap-4">
                    <div className="rounded-full bg-black w-20 h-20 p"><img src="" alt=""  /></div>
                     <div className="w-40 flex flex-col p-2  ">
                        <h1 className="text-xl ">Roshan</h1>
                        <div className="w-full flex justify-between">
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">45</p>
                                <h1 className="text-sm ">Followers</h1>
                            </div>
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">1</p>
                                <h1 className="text-sm ">Followings</h1>
                            </div>
                        </div>                    

                    </div>  
                    </div>
                    <div className="flex gap-8 items-center cursor-pointer ">
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">share</div>
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">Follow</div>
                    </div>

                    </div>
                    <div className="bg-gray-600 w-full p-2 rounded-lg flex 
                justify-between">      
                    
                    <div className="flex gap-4">
                    <div className="rounded-full bg-black w-20 h-20 p"><img src="" alt=""  /></div>
                     <div className="w-40 flex flex-col p-2  ">
                        <h1 className="text-xl ">Roshan</h1>
                        <div className="w-full flex justify-between">
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">45</p>
                                <h1 className="text-sm ">Followers</h1>
                            </div>
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">1</p>
                                <h1 className="text-sm ">Followings</h1>
                            </div>
                        </div>                    

                    </div>  
                    </div>
                    <div className="flex gap-8 items-center cursor-pointer ">
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">share</div>
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">Follow</div>
                    </div>

                    </div>
                    <div className="bg-gray-600 w-full p-2 rounded-lg flex 
                justify-between">      
                    
                    <div className="flex gap-4">
                    <div className="rounded-full bg-black w-20 h-20 p"><img src="" alt=""  /></div>
                     <div className="w-40 flex flex-col p-2  ">
                        <h1 className="text-xl ">Roshan</h1>
                        <div className="w-full flex justify-between">
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">45</p>
                                <h1 className="text-sm ">Followers</h1>
                            </div>
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">1</p>
                                <h1 className="text-sm ">Followings</h1>
                            </div>
                        </div>                    

                    </div>  
                    </div>
                    <div className="flex gap-8 items-center cursor-pointer ">
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">share</div>
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">Follow</div>
                    </div>

                    </div>
                    <div className="bg-gray-600 w-full p-2 rounded-lg flex 
                justify-between">      
                    
                    <div className="flex gap-4">
                    <div className="rounded-full bg-black w-20 h-20 p"><img src="" alt=""  /></div>
                     <div className="w-40 flex flex-col p-2  ">
                        <h1 className="text-xl ">Roshan</h1>
                        <div className="w-full flex justify-between">
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">45</p>
                                <h1 className="text-sm ">Followers</h1>
                            </div>
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">1</p>
                                <h1 className="text-sm ">Followings</h1>
                            </div>
                        </div>                    

                    </div>  
                    </div>
                    <div className="flex gap-8 items-center cursor-pointer ">
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">share</div>
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">Follow</div>
                    </div>

                    </div>
                    <div className="bg-gray-600 w-full p-2 rounded-lg flex 
                justify-between">      
                    
                    <div className="flex gap-4">
                    <div className="rounded-full bg-black w-20 h-20 p"><img src="" alt=""  /></div>
                     <div className="w-40 flex flex-col p-2  ">
                        <h1 className="text-xl ">Roshan</h1>
                        <div className="w-full flex justify-between">
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">45</p>
                                <h1 className="text-sm ">Followers</h1>
                            </div>
                            <div className="flex flex-col items-center ">
                                <p className="text-xs">1</p>
                                <h1 className="text-sm ">Followings</h1>
                            </div>
                        </div>                    

                    </div>  
                    </div>
                    <div className="flex gap-8 items-center cursor-pointer ">
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">share</div>
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">Follow</div>
                    </div>

                    </div>
                </div>
                

            </section>
          </main>
        </div>
      </div>
    </div>
  );
}