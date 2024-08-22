"use client";

import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";


export default function Notification() {
  const contextData = useStore()
  const userName = contextData?.value?.userName || "";
    const firstLatter = userName.charAt(0).toUpperCase();

    useEffect(()=>{
     ; (async()=>{
          const userDataRes = await axios.get("api/users/me");
          contextData.value.setUsername(userDataRes.data.tokenUserData.username)
          contextData.value.setUserId(userDataRes.data.tokenUserData._id)
          contextData.value.setUserEmail(userDataRes.data.tokenUserData.email)
  
          
      })();
  },[])

  return (
    <div className="h-[100vh] overflow-hidden">
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
      <div className="container mx-auto px-4 py-6 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* <!-- Sidebar --> */}
          <aside className="md:col-span-1  bg-white p-4 rounded-lg shadow-md">
          <ul className=" md:flex-col flex  items-center md:items-start justify-between gap-2 md:gap-6">
                <li><Link href={`/yourProfile/${ contextData.value.userId}`} className="block text-gray-700 hover:text-blue-500">Your Profile</Link></li>
                <li><Link href="/addPost" className="block text-gray-700 hover:text-blue-500">Add Post</Link></li>
                <li><Link href="/notification" className="block text-gray-700 hover:text-blue-500">Notifications</Link></li>
                <li><Link href="/mainDashboard" className="block text-gray-700 hover:text-blue-500"> Posts</Link></li>
                <li><Link href="/search" className="block text-gray-700 hover:text-blue-500"> Search</Link></li>
            </ul>
          </aside>

          {/* <!-- Main Section --> */}
          <main className="md:col-span-3 space-y-6 h-[79vh]">
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