"use client";
import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Profile() {
  const router = useRouter()
  const contextData = useStore()
  const userID =  useParams().profileId
  const [posts, setposts] = useState([])
  const [username, setusername] = useState()
  const [likedData, setLikedData] = useState([])
  const [chargeLikeCount, setchargeLikeCount] = useState()
  const [chargeGetLikeData, setChargeGetLikeData] = useState()
  const [postLikeCounts, setpostLikeCounts] = useState([])
  const [postCommentCounts, setpostCommentCounts] = useState([])
  const [chargeCommentsCount, setchargeCommentsCount] = useState()
  console.log("profile/profileId")







  const userName = contextData?.userName || "";
    const firstLatter = userName.charAt(0).toUpperCase();


    useEffect(()=>{
      (async()=>{
          const userDataRes = await axios.get("/api/users/me");
          contextData.setUsername(userDataRes.data.tokenUserData.username)
          contextData.setUserId(userDataRes.data.tokenUserData._id)
          contextData.setUserEmail(userDataRes.data.tokenUserData.email)
         
  
          
      })()
  },[contextData])   
  
  useEffect(()=>{
    (async()=>{
        const res = await axios.post("/api/users/post/getmypost", {userId: userID})
        console.log(res.data.getMyPosts)
        setposts(res.data.getMyPosts)
    })()
  },[userID])

  useEffect(()=>{
    (async()=>{
        const res = await axios.post("/api/users/userinfo", {userId: userID})
        console.log(res)
        setusername(res.data.userInfo.username)
    })()
  },[userID])

 
    useEffect(()=>{
        (async()=>{
            try {
                const res = await axios.post("/api/users/likes/getlikedata",{userId : userID}); 
                setLikedData(res.data.res)
                
            } catch (error) {
            console.log(error)
            }
              
        })()
    },[userID])

    useEffect(() => {
        (async () => {
          const res =  await axios.get("/api/users/post/getpostlikecount");
          const likeCounts = res.data.getPostLikes.reduce((acc, { _id, count }) => {
           acc[_id] = count;
           return acc;
         }, {});
          setpostLikeCounts(likeCounts)
          
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
       }, [chargeCommentsCount])

    async function likeHandler(id){
        if(likedData.some((data)=> data.postId === id )){
           const deleteRes = await axios.post("/api/users/likes/removelike",{userId : userID, postId:id })
            setchargeLikeCount(Math.random());
            setChargeGetLikeData(Math.random())
        }
        else{
            const likeRes = await axios.post("/api/users/likes", { userId : userID, postId:id  })    
            setchargeLikeCount(Math.random());
            setChargeGetLikeData(Math.random())
            
        }
      }

     function redirectToPost(id, type){
      if(type === "title"){
        if(contextData.commentVisibleId ){
            contextData.setCommentVisibleId(false)
        }
    }
    else{
        if(!contextData.commentVisibleId ){
            contextData.setCommentVisibleId(true)
        }
    }
        router.push(`${location.origin}/mainDashboard/${id}`)

     }

     function shareHandler(id) {
        toast.success("Copied")
        navigator.clipboard.writeText(`${location.origin}/mainDashboard/${id}`)
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
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full' ><Link href={`/yourProfile/${ contextData.userId}`} className=" text-center text-gray-400  hover:text-gray-900 flex items-center justify-center md:justify-start"><i className="fa-regular fa-user   md:me-4 "></i><div className="hidden md:block">Profile</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lgrounded-full'><Link href="/addPost" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-square-plus  md:me-4  "></i> <div className="hidden md:block"> Add</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg rounded-full'><Link href="/notification" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-bell  md:me-4 "></i><div className=" hidden md:block">Notifications</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/mainDashboard" className="flex items-center justify-center md:justify-start text-center text-gray-400  hover:text-gray-900"><i className="fa-solid fa-house  md:me-4"></i> <div className="hidden md:block">Home</div></Link></li>
                <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/search" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-solid fa-magnifying-glass  md:me-4 "></i> <div className="hidden md:block">Search</div></Link></li>
            </ul>
          </aside>

          {/* <!-- Main Section --> */}
          <main className="md:col-span-3 space-y-6  h-[79vh]">
            {/* <!-- Profile Section --> */}
            <section id="profile" className="bg-white p-6 rounded-lg shadow-md h-full">
              <div className="h-full ">
                <div className="h-[10%] flex justify-between items-center font-bold mb-4 text-gray-900 "><h1 className="text-2xl ">{username}</h1> </div>
                <div className="h-[25%] flex items-center justify-between   ">
                  <div className="ms-8 h-28 rounded-full bg-gray-500 w-28 "></div>
                  <div className="me-40 flex justify-center items-center gap-10">
                    
                  <div className="w-30 flex flex-col-reverse" >
                    <h1 className="font-bold text-xl text-center text-black ">post</h1>
                    <h1 className="text-gray-600 text-center">{posts.length}</h1>
                  </div> 
                  <div className="w-30 flex flex-col-reverse" >
                    <h1 onClick={()=>router.push(`${location.pathname}/followers`)} className="font-bold text-xl text-center text-black cursor-pointer ">Followers</h1>
                    <h1 className="text-gray-600 text-center">500</h1>
                  </div> 
                  <div className="w-30 flex flex-col-reverse" >
                    <h1 onClick={()=>router.push(`${location.pathname}/followings`)} className="font-bold text-xl text-center text-black cursor-pointer ">Followings</h1>
                    <h1 className="text-gray-600 text-center">1</h1>
                  </div> 
                </div>
                </div>
                
               <div className="h-[60%] mt-4 flex flex-col gap-4 overflow-y-scroll no-scrollbar rounded-lg"> 
                {posts.map((post, index)=> <div key={index} className="border-b border-gray-200 p-4 shadow-lg rounded-lg bg-gray-400">
                  <h1 onClick={()=>{redirectToPost(post._id, "title")}}  className="text-xl cursor-pointer font-semibold text-gray-900 mt-5">{post.content.title}</h1>
                  <h1 className="text-gray-700 mt-4">{post.content.message}</h1>
                  <div className="w-full mt-8">
                    <span className="flex gap-4 cursor-pointer">
                    <div className="flex flex-col items-center ">
                    <i onClick={()=>likeHandler(post._id)} className={likedData.some((obj) => obj.postId === post._id)? "fa-solid fa-heart": "fa-regular fa-heart" } ></i> 
                    <div className="text-xs font-light">{postLikeCounts[post._id] || 0}</div>
                    </div>
                    
                    <div className="flex flex-col items-center">
                    <i onClick={()=>{redirectToPost(post._id, "comment")}} className=" fa-regular fa-comment"></i>
                    <div className="text-xs font-light">{postCommentCounts[post._id] || 0}</div>
                    </div>

                  <i onClick={()=>shareHandler(post._id)} className="fa-regular fa-share-from-square"></i>
                  </span>
                  </div>
               </div>)}
               </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}
