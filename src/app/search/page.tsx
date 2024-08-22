'use client'

import { useStore } from '@/context/store'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export default function Search() {

    const contextData = useStore();
const [allProfileData, setallProfileData] = useState([])
const [follows, setFollows] = useState([])
const [inp, setInp] = useState('')
const [filteredData, setfilteredData] = useState([])

    useEffect(()=>{
        console.log("first");
        
        (async()=>{
            const userDataRes = await axios.get("api/users/me");
            contextData.value.setUsername(userDataRes.data.tokenUserData.username)
            contextData.value.setUserId(userDataRes.data.tokenUserData._id)
            contextData.value.setUserEmail(userDataRes.data.tokenUserData.email)
            getFollowData(userDataRes.data.tokenUserData.username)
        })()
    },[])



 

     useEffect(()=>{
        (async()=>{
          const res = await axios.get("api/users/allProfiles");
          setallProfileData(res.data.getPostRes)
        })()
     },[])




    async function getFollowData (username){
            const res = await axios.post("api/users/follow/getfollowdata", {followerId:username })
            setFollows(res.data.followDataRes)

         }
 
    function filterProfileHandler (inp) {
        setInp(inp)
       setfilteredData(allProfileData.filter((data)=> data._id.includes(inp)  ))
    }


    async function followHandler( followingUserName ) {
        const res = await axios.post("api/users/follow",{followerId:contextData.value.userName, followingId:followingUserName})  
        getFollowData(contextData.value.userName);
        
     }


    async function unfollowHandler (unfollowingusername){
        const res = await axios.post("api/users/unfollow",{followerId:contextData.value.userName, followingId:unfollowingusername}) 
        getFollowData(contextData.value.userName);
         


    }
    
    const userName = contextData?.value?.userName || "";
    const firstLatter = userName.charAt(0).toUpperCase();




  return (
    <div className='h-[100vh] overflow-hidden'><nav className="bg-white shadow-md " >
    <div   className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-blue-500">Blog App</a>
        <div className="flex flex-col items-center justify-between h-10">
            <div className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center  ">{firstLatter}</div>
            <h1 className="text-xs h-[20%] w-full dark:text-black">{userName}</h1>
        </div>
    </div>
</nav>

{/* <!-- Main Content --> */}
<div className="container  mx-auto px-4 py-6 flex-grow ">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
        {/* <!-- Sidebar --> */}
        <aside className=" md:col-span-1 bg-white p-4 rounded-lg shadow-md ">
            <ul className="md:flex-col flex  items-center md:items-start justify-between gap-2 md:gap-6">
                <li><Link href={`/yourProfile/${ contextData.value.userId}`} className="block text-gray-700 hover:text-blue-500">Your Profile</Link></li>
                <li><Link href="/addPost" className="block text-gray-700 hover:text-blue-500">Add Post</Link></li>
                <li><Link href="/notification" className="block text-gray-700 hover:text-blue-500">Notifications</Link></li>
                <li><Link href="/mainDashboard" className="block text-gray-700 hover:text-blue-500"> Posts</Link></li>
                <li><Link href="/search" className="block text-gray-700 hover:text-blue-500"> Search</Link></li>
            </ul>
        </aside>

        {/* <!-- Main Section --> */}
        <main className="md:col-span-3 space-y-6 h-[79vh]">
            {/* <!-- Global Posts Section --> */}
            <section id="global-posts" className="bg-white p-6 rounded-lg shadow-md h-full ">
              <div className='flex flex-col h-full w-full  rounded-lg'>
                <div className="w-full h-[15%]  ">
                    <input onChange={(e)=>{  filterProfileHandler(e.target.value)}}  className='w-full focus:outline-none p-2 text-gray-600 rounded-full border'  type="text" placeholder='Search' /> 
                </div>
                <div className="w-full h-[85%]">
                <hr className='mb-4' />
                
                <div className="flex w-full h-full flex-col gap-2 overflow-scroll no-scrollbar cursor-pointer">
                {inp ? <> {filteredData.map((data)=> <div className="bg-gray-400 w-full p-2 rounded-lg flex justify-between" key={data._id}>      
                    <div className="flex gap-4">
                    <div className="rounded-full bg-black w-20 h-20 p"><img src="" alt=""  /></div>
                     <div className="w-52 flex flex-col p-2  ">
                        <h1 className="text-xl ">{data._id}</h1> 
                        <div className="w-full flex justify-between">
                        <div className="flex flex-col items-center ">
                                <p className="text-xs">{data.count}</p>
                                <h1 className="text-sm ">Post</h1>
                            </div>
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
                        {data._id === contextData.value.userName ? <></> : <> {follows.some((follow)=>follow.followingId === data._id ) ? <div onClick={()=>unfollowHandler(data._id)} className="py-2 px-4 bg-gray-200 rounded-lg font-light ">Unfollow</div>  : <div onClick={()=>followHandler(data._id)} className="py-2 px-4 bg-blue-500 rounded-lg">Follow</div>} </> }
                    </div>

                    </div> )}</> : <></>}
                </div>
               
                </div>
              </div>
            </section>
        </main>
    </div>
</div></div>
  )
}
