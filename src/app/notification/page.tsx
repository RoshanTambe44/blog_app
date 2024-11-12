"use client";

import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import { comment } from "postcss";
import React, { useEffect, useState } from "react";
import moment from 'moment'




export default function Notification() {
  const contextData = useStore()
  const [notificationData, setNotificationData] = useState<noti[]>([])

interface noti {
  userid : string | undefined,
  type : string | undefined,
  createdAt : string
  notifications : {userId:string, comment: string, post: string }
}

  const userName = contextData?.userName || "";
    const firstLatter = userName.charAt(0).toUpperCase();
 console.log("notification")
    useEffect(()=>{
     ; (async()=>{
          const userDataRes = await axios.post("api/users/me");
          contextData.setUsername(userDataRes.data.tokenUserData.username)
          contextData.setUserId(userDataRes.data.tokenUserData._id)
          contextData.setUserEmail(userDataRes.data.tokenUserData.email)
          getNotiData(userDataRes.data.tokenUserData.username)
          
      })();
  },[contextData])


 async function getNotiData(userId:any) {
   const res =await axios.post("/api/users/notification/notificationget", {userId})
   setNotificationData(res.data.notificationData)
   console.log(res);
   
  }



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
              <div className="text-gray-700 h-[90%]">
              {notificationData.map((data)=><><div className={data.type === "follow" ? "p-2 border-b-[1px] flex justify-between" : " hidden p-2 border-b-[1px]" }><h1 className="w-56"><b>{data.notifications.userId}</b> following you.</h1><h1 className="text-xs" >{ moment(data.createdAt).fromNow() }</h1> </div>
              <div className={data.type === "like" ? "p-2 border-b-[1px] flex justify-between " : "hidden p-2 border-b-[1px] " }><h1 className="w-56 md:w-auto text-sm md:text-[16px]"><b>{data.notifications.userId}</b> liked your post <b>{data.notifications.post}</b>.</h1><h1 className="text-xs" >{ moment(data.createdAt).fromNow() }</h1>  </div>
              <div className={data.type === "comment" ? "p-2 border-b-[1px] flex justify-between" : "hidden p-2 border-b-[1px]" }><h1 className="w-56 md:w-auto text-sm md:text-[16px]"><b>{data.notifications.userId}</b> commented <b>{data.notifications.comment}</b> to your post <b>{data.notifications.post}</b>.</h1> <h1 className="text-xs" >{ moment(data.createdAt).fromNow() }</h1> </div></>)}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

