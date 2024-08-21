'use client'

import { useStore } from '@/context/store'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





export default function mainDashboard() {

    console.log("main dashboard component") 
    
    const router = useRouter()
    const contextData = useStore();
    const [postData, setPostData] = useState([])
    const [likedData, setLikedData] = useState([])
    const [chargeGetLikeData, setChargeGetLikeData] = useState()
    const [chargeLikeCount, setchargeLikeCount] = useState()
    const [chargeCommentsCount, setchargeCommentsCount] = useState()
    const [postLikeCounts, setpostLikeCounts] = useState([])
    const [postCommentCounts, setpostCommentCounts] = useState([])



useEffect(()=>{
    console.log("first");
    
    (async()=>{
        const userDataRes = await axios.get("api/users/me");
        console.log(userDataRes.data.tokenUserData)
        contextData.value.setUsername(userDataRes.data.tokenUserData.username)
        contextData.value.setUserId(userDataRes.data.tokenUserData._id)
        contextData.value.setUserEmail(userDataRes.data.tokenUserData.email)
        
    })()
},[])

useEffect(()=>{
    console.log("second")
    console.log(contextData.value.userId)
   ; ( async ()=>{
        try {
            const res = await axios.get("/api/users/post/getpost");
            setPostData(res.data.postData.reverse())
            
            
            } catch (error) {
             console.log(error)
            }
    })();
},[])    

useEffect(()=>{
    
    if (contextData.value.userId) { 
    (async()=>{
        try {
            
            const res = await axios.post("/api/users/likes/getlikedata",{userId : contextData.value.userId});  setLikedData(res.data.res)
            console.log(res.data.res)
    } catch (error) {
        console.log(error)
    }})()}
},[chargeGetLikeData])

useEffect(() => {
 (async () => {
   const res =  await axios.get("/api/users/post/getpostlikecount");
   const likeCounts = res.data.getPostLikes.reduce((acc, { _id, count }) => {
    acc[_id] = count;
    return acc;
  }, {});
   setpostLikeCounts(likeCounts)
   console.log(likeCounts);
   
  })()
}, [chargeLikeCount])

useEffect(() => {
    (async () => {
      const res =  await axios.get("/api/users/post/getpostcommentcount");
      const commentCounts = res.data.getPostCommentRes.reduce((acc, { _id, count }) => {
       acc[_id] = count;
       return acc;
     }, {});
      setpostCommentCounts(commentCounts)
      
     })()
   }, [])


async function likeHandler(id){
    if(likedData.some((data)=> data.postId === id )){
       const deleteRes = await axios.post("/api/users/likes/removelike",{userId : contextData.value.userId, postId:id })
        setChargeGetLikeData(Math.random())
        setchargeLikeCount(Math.random());
    }
    else{
        const likeRes = await axios.post("/api/users/likes", { userId : contextData.value.userId, postId:id  })    
        setChargeGetLikeData(Math.random())
        setchargeLikeCount(Math.random());
    }
}


function commentHandler (id) {
        
   contextData.value.setCommentVisibleId(true)
    

}
 function redirectToPost(id ){

    
    router.push(`mainDashboard/${id}`)
 }

 
function shareHandler(id) {
    toast.success("Copied")
    navigator.clipboard.writeText(`${location.href}/${id}`)
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
                <h2 className="text-2xl font-bold mb-4 text-gray-900 h-[10%]"> Posts</h2>
                <div className="space-y-4 overflow-y-scroll no-scrollbar h-[90%] rounded-lg">
                    {postData.map((post)=><div key={post._id}  className="border-b cursor-pointer border-gray-200 p-4 shadow-lg rounded-lg bg-gray-400"  >
                    
                        <div className=""><div className="flex items-center gap-2"><div className="bg-black rounded-full h-5 w-5 text-white flex items-center justify-center ">{post.username.charAt(0).toUpperCase()}</div><h1 className="">{post.username}</h1></div></div>
                        <h3 className="text-xl font-semibold text-gray-900 mt-5" onClick={()=>{redirectToPost(post._id)}}>{post.content.title}</h3>
                        <p className="text-gray-700 mt-4">{post.content.message}</p>
                        <div className="w-full mt-8"><span className="flex gap-4">
                        <div className="flex flex-col items-center">
                        <i onClick={()=>{likeHandler(post._id); }} className={likedData.some((obj) => obj.postId === post._id)? "fa-solid fa-heart": "fa-regular fa-heart" }></i>
                        <div className="text-xs font-light">{postLikeCounts[post._id] || 0}</div>
                        </div>

                        <div className="flex flex-col items-center">
                        <i onClick={()=>{commentHandler(post._id);redirectToPost(post._id)}} className="fa-regular fa-comment"></i><div className="text-xs font-light">{postCommentCounts[post._id] || 0}</div>
                        </div>
                            


                            <i onClick={()=>shareHandler(post._id)} className="fa-regular fa-share-from-square"></i></span></div>

                           
                    </div>)}
                    
                    {/* <!-- Add more posts as needed --> */}
                </div>
            </section>
        </main>
    </div>
</div>
<ToastContainer/></div>
  )
}
