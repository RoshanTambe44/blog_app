"use client";

import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";


export default function Notification() {
  const contextData = useStore()
  const userName = contextData?.userName || "";
    const firstLatter = userName.charAt(0).toUpperCase();
 console.log("notification")
    useEffect(()=>{
     ; (async()=>{
          const userDataRes = await axios.get("api/users/me");
          contextData.setUsername(userDataRes.data.tokenUserData.username)
          contextData.setUserId(userDataRes.data.tokenUserData._id)
          contextData.setUserEmail(userDataRes.data.tokenUserData.email)
  
          
      })();
  },[contextData])

  return (
    <div className="h-[100vh] overflow-hidden">
     <nav className="bg-white shadow-md" >
    <div   className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-500">BlogApp</a>
        <div className="  flex flex-col items-center justify-between h-10 ">
            <div className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center  ">{firstLatter}</div>
            <h1 className="text-xs h-[20%] w-full text-black">{userName}</h1>
        </div>
    </div>
</nav>

      {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="flex flex-col-reverse md:flex-row gap-6 ">
          {/* <!-- Sidebar --> */}
          <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-md md:w-[20%] ">
          <ul className="md:flex-col flex  items-center md:items-start justify-between  gap-2 md:gap-6">
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/search" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-solid fa-magnifying-glass  md:me-4 "></i> <div className="hidden md:block">Search</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/mainDashboard" className="flex items-center justify-center md:justify-start text-center text-gray-400  hover:text-gray-900"><i className="fa-solid fa-house  md:me-4"></i> <div className="hidden md:block">Home</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lgrounded-full'><Link href="/addPost" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-square-plus  md:me-4  "></i> <div className="hidden md:block"> Add</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg rounded-full'><Link href="/notification" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-bell  md:me-4 "></i><div className=" hidden md:block">Notifications</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full' ><Link href={`/yourProfile/${ contextData.userId}`} className=" text-center text-gray-400  hover:text-gray-900 flex items-center justify-center md:justify-start"><i className="fa-regular fa-user   md:me-4 "></i><div className="hidden md:block">Profile</div></Link></li>
            </ul>
          </aside>

          {/* <!-- Main Section --> */}
          <main className="md:col-span-3 space-y-6 h-[79vh] md:w-[80%]">
            {/* <!-- Notifications Section --> */}
            <section
              id="notifications"
              className="bg-white p-6 rounded-lg shadow-md h-full"
            >
              <h2 className="text-2xl font-bold mb-4 text-gray-900 h-[10%]">
                Notifications
              </h2>
              <p className="text-gray-700 h-[90%]">You have no new notifications.</p>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
