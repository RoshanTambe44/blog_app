"use client";
import { useStore } from "@/context/store";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";



export default function Followings() {
  const router = useRouter()
  const contextData = useStore()
  const [followings, setFollowings] = useState([])
const [follows, setFollows] = useState([])


console.log(follows,followings);



  const userName = contextData?.value?.userName || "";
    const firstLatter = userName.charAt(0).toUpperCase();


    useEffect(()=>{
      (async()=>{
          const userDataRes = await axios.get("/api/users/me");
          contextData.value.setUsername(userDataRes.data.tokenUserData.username)
          contextData.value.setUserId(userDataRes.data.tokenUserData._id)
          contextData.value.setUserEmail(userDataRes.data.tokenUserData.email)
          getFollowings(userDataRes.data.tokenUserData.username)
          getFollowData(userDataRes.data.tokenUserData.username)
          
      })()
  },[])    

  async function getFollowings (userId){
  
    const res = await axios.post("/api/users/follow/getfollowercount", {followerId:userId})
    setFollowings(res.data.followerCountRes)

  }


  async function followHandler( followingUserName ) {
    const res = await axios.post("/api/users/follow",{followerId:contextData.value.userName, followingId:followingUserName})  
    getFollowData(contextData.value.userName);
    
 }


async function unfollowHandler (unfollowingusername){
    const res = await axios.post("/api/users/unfollow",{followerId:contextData.value.userName, followingId:unfollowingusername}) 
    getFollowData(contextData.value.userName);
     


}


async function getFollowData (username){
  console.log(username);
  (userName)
  const res = await axios.post("/api/users/follow/getfollowdata", {followerId:username })
  setFollows(res.data.followDataRes)

}

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
          <ul className="md:flex-col flex  items-center md:items-start justify-between  gap-2 md:gap-6">
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full' ><Link href={`/yourProfile/${ contextData.value.userId}`} className=" text-center text-gray-400  hover:text-gray-900 flex items-center justify-center md:justify-start"><i className="fa-regular fa-user   md:me-4 "></i><div className="hidden md:block">Profile</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lgrounded-full'><Link href="/addPost" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-square-plus  md:me-4  "></i> <div className="hidden md:block"> Add</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg rounded-full'><Link href="/notification" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-bell  md:me-4 "></i><div className=" hidden md:block">Notifications</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/mainDashboard" className="flex items-center justify-center md:justify-start text-center text-gray-400  hover:text-gray-900"><i className="fa-solid fa-house  md:me-4"></i> <div className="hidden md:block">Home</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/search" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-solid fa-magnifying-glass  md:me-4 "></i> <div className="hidden md:block">Search</div></Link></li>
            </ul>
          </aside>

          {/* <!-- Main Section --> */}
          <main className="md:col-span-3 space-y-6  h-[79vh]">
            {/* <!-- Profile Section --> */}
            <section id="profile" className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col gap-4  ">
                <div className="w-full"><h1 className="text-2xl text-black ">Followings</h1></div>
                <hr/>
                <div className="flex flex-col gap-2 overflow-scroll no-scrollbar">
                   {followings.map((data)=> <div className="bg-gray-600 w-full p-2 rounded-lg flex 
                justify-between">      
                    
                    <div className="flex gap-4">
                    <div className="rounded-full bg-black w-20 h-20 p"><Image src="" alt=""  /></div>
                     <div className="w-40 flex items-center p-2  ">
                        <h1 className="text-xl ">{data.followingId}</h1>
                    </div>  
                    </div>
                    <div className="flex gap-8 items-center cursor-pointer ">
                        <div className="py-2 px-4 bg-blue-500 rounded-lg">share</div>
                        {follows.some((follow)=>follow.followingId === data.followingId ) ? <div onClick={()=>unfollowHandler(data.followingId)} className="py-2 px-4 bg-gray-200 rounded-lg font-light ">Unfollow</div>  : <div onClick={()=>followHandler(data.followingId)} className="py-2 px-4 bg-blue-500 rounded-lg">Follow</div>}
                    </div>

                    </div>)}
                    
                </div>
                

            </section>
          </main>
        </div>
      </div>
    </div>
  );
}