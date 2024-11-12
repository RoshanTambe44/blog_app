"use client";
import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";



export default function Followings() {
  const router = useRouter()
  const contextData = useStore()
  const userID = useParams().profileId;
  const [followings, setFollowings] = useState<FollowingData[]>([])
const [follows, setFollows] = useState<Follows[]>([])


console.log("followings");

interface FollowingData {
  followingId:string
}
interface Follows {
  followingId:string
}


  const userName = contextData?.userName || "";
    const firstLatter = userName.charAt(0).toUpperCase();


    useEffect(()=>{
      (async()=>{
          const userDataRes = await axios.post("/api/users/me");
          contextData.setUsername(userDataRes.data.tokenUserData.username)
          contextData.setUserId(userDataRes.data.tokenUserData._id)
          contextData.setUserEmail(userDataRes.data.tokenUserData.email)
          getFollowData(userDataRes.data.tokenUserData.username);
          
          
      })()
  },[])  
  
  
  useEffect(() => {
    (async () => {
      const res = await axios.post("/api/users/userinfo", { userId: userID });
      getFollowings(res.data.userInfo.username)
      
      
    })();
  }, [userID]);

  async function getFollowings (userId: string | undefined){
  
    const res = await axios.post("/api/users/follow/getfollowercount", {followerId:userId})
    setFollowings(res.data.followerCountRes)

  }


  async function followHandler( followingUserName:string ) {
    const res = await axios.post("/api/users/follow",{followerId:contextData.userName, followingId:followingUserName})  
    getFollowData(contextData.userName);
    
 }


async function unfollowHandler (unfollowingusername:string){
    const res = await axios.post("/api/users/unfollow",{followerId:contextData.userName, followingId:unfollowingusername}) 
    getFollowData(contextData.userName);
     


}
 console.log(followings, contextData.userName);
 

async function getFollowData (username: string | undefined){
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
            <h1 className="text-xs h-[20%] w-full text-black">{userName}</h1>
        </div>
    </div>
</nav>

      {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-6 flex-grow  ">
        <div className="flex flex-col-reverse md:flex-row gap-6  ">
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
          <main className="md:col-span-3 space-y-6  h-[79vh] md:w-[80%]">
            {/* <!-- Profile Section --> */}
            <section id="profile" className="bg-white p-6 rounded-lg shadow-md h-full flex flex-col gap-4  ">
                <div className="w-full"><h1 className="text-2xl text-black ">Followings</h1></div>
                <hr/>
                <div className="flex flex-col gap-2 overflow-scroll no-scrollbar">
                   {followings.map((data, index)=> <div key={index} className="bg-gray-600 w-full p-2 rounded-lg flex 
                justify-between">      
                    
                    <div className="flex gap-4">
                    <div className="rounded-full bg-black md:w-20 md:h-20 w-10 h-10 p"></div>
                     <div className="md:w-40 flex items-center p-2  ">
                        <h1 className="text-sm md:text-xl ">{data.followingId}</h1>
                    </div>  
                    </div>
                    <div className="flex md:gap-8 gap-4 items-center cursor-pointer ">
                        <div className="md:py-2 md:px-4 py-1 px-2 bg-blue-500 rounded-lg font-semibold">share</div>
                        {data.followingId === contextData.userName ? <></>:<>{follows.some((follow)=>follow.followingId === data.followingId ) ? <div onClick={()=>unfollowHandler(data.followingId)} className="md:py-2 md:px-4 py-1 px-2 bg-gray-200 rounded-lg text-gray-500 font-semibold">Unfollow</div>  : <div onClick={()=>followHandler(data.followingId)} className="md:py-2  md:px-4 px-2 py-1 bg-blue-500 rounded-lg font-semibold">Follow</div>}</>}
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