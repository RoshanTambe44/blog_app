"use client";
import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";

export default function Post() {
  const contextData = useStore();
  const [chargeGetLikeData, setChargeGetLikeData] = useState<number>();
  const [likedData, setLikedData] = useState<LikeData[]>([]);
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState<commentData[]>([]);
  const [SinglePostData, setSinglePostData] = useState<singlePostData[]>([]);
  const [randomNumber, setrandomNumber] = useState<number>();
  const [postLikeCounts, setpostLikeCounts] = useState<Record<string, number>>({});
  const [postCommentCounts, setpostCommentCounts] = useState<Record<string, number>>({});
  const [chargeLikeCount, setchargeLikeCount] = useState<number>(0);
  const [chargeCommentsCount, setchargeCommentsCount] = useState<number>(0);
  const [token, settoken] = useState(true);
  const router = useRouter();
  const param = useParams();
  const postId: string | string[] = param.postId || '';
  console.log(typeof postId);
  


  interface commentData{
    userName: string;
    commentContent: string 
  }

  interface LikeData {
    postId: string;
    
  }

  interface singlePostData{
    _id:string
    username: string;
    content: {title:string,  message: string};
  }


  interface PostLike {
    _id: string;
    count: number;
  }
  
 console.log("mainDashboard/[postId]")

  useEffect(() => {
    (async () => {
      try {
        const userDataRes = await axios.get("/api/users/me");
        if (userDataRes.data.tokenUserData) {
          contextData.setUsername(
            userDataRes.data.tokenUserData.username
          );
          contextData.setUserId(userDataRes.data.tokenUserData._id);
          contextData.setUserEmail(userDataRes.data.tokenUserData.email);
          settoken(true);
        } else {
          settoken(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  },[contextData]);


 
  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/users/post/getpostlikecount");
      const likeCounts = res.data.getPostLikes.reduce((acc: Record<string, number>, { _id, count }:PostLike) => {
        acc[_id] = count;
        return acc;
      }, {});
      setpostLikeCounts(likeCounts);
    })();
  }, [chargeLikeCount]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/users/post/getpostcommentcount");
      const commentCounts = res.data.getPostCommentRes.reduce(
        (acc: Record<string, number>, { _id, count }:PostLike) => {
          acc[_id] = count;
          return acc;
        },
        {}
      );
      setpostCommentCounts(commentCounts);
    })();
  }, [chargeCommentsCount]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post("/api/users/post/getsinglepost", {
          postId,
        });
        setSinglePostData(res.data.getSinglePosts);
      } catch (error) {
        console.log(error);
      }
    })();
  },[postId]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post("/api/users/likes/getlikedata", {
          userId: contextData.userId,
        });
        setLikedData(res.data.res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [chargeGetLikeData]);

  async function likeHandler(id:any) {
    if (token) {
      if (likedData.some((data) => data.postId === id)) {
        console.log("remove");
        const deleteRes = await axios.post("/api/users/likes/removelike", {
          userId: contextData.userId,
          postId: id,
        });
        setchargeLikeCount(Math.random()) ;
        setChargeGetLikeData(Math.random());
      } else {
        console.log("add");
        const likeRes = await axios.post("/api/users/likes", {
          userId: contextData.userId,
          postId: id,
        });
        setchargeLikeCount(Math.random());
        setChargeGetLikeData(Math.random());
      }
    } else {
      router.push("/register");
    }
  }

  function commentHandler() {
    if (token) {
      if (contextData.commentVisibleId === false) {
        contextData.setCommentVisibleId(true);
      } else {
        contextData.setCommentVisibleId(false);
      }

      setComment("");
    } else {
      router.push("/register");
    }
  }

  async function comentSend(e: any) {
    e.preventDefault();

    try {
      const commentRes = await axios.post("/api/users/comments", {
        userId: contextData.userId,
        userName: contextData.userName,
        postId: postId,
        commentContent: comment,
      });
      setrandomNumber(Math.random());
      setchargeCommentsCount(Math.random());
      setComment("");
    } catch (error) {
      console.log(error);
    }
  }

  function registerHandler(e:any) {
    e.preventDefault();
    router.push("/register");
  }

  function shareHandler() {
    toast.success("Copied");
    navigator.clipboard.writeText(location.href);
  }

  useEffect(() => {
    (async () => {
      const res = await axios.post("/api/users/comments/getcomments", {
        postId,
      });
      setCommentData(res.data.getCommentRes.reverse());
    })();
  }, [chargeCommentsCount]);

  const userName = contextData?.userName || "";
  const firstLatter = userName.charAt(0).toUpperCase();
  const resolvedPostId: string = Array.isArray(postId) ? postId[0] : postId;

  console.log(postLikeCounts);
  

  return (
    <div className="h-[100vh] overflow-hidden">
      <nav className="bg-white shadow-md ">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-blue-500">
            BlogApp
          </a>
          {token ? (
            <div className="flex flex-col items-center justify-between h-10">
              <div className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center  ">
                {firstLatter}
              </div>
              <h1 className="text-xs h-[20%] w-full text-black">
                {userName}
              </h1>
            </div>
          ) : (
            <button
              onClick={(e) => registerHandler(e)}
              className=" p-2 border border-gray-500  rounded-lg hover:text-white hover:bg-slate-700 hover:shadow-lg transition duration-300"
            >
              Register
            </button>
          )}
        </div>
      </nav>

      {/* <!-- Main Content --> */}
      <div className="container  mx-auto px-4 py-6 flex-grow  ">
        <div className="flex flex-col-reverse md:flex-row gap-6 ">
          {/* <!-- Sidebar --> */}
          {token ? (
            <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-md md:w-[20%] ">
            <ul className="md:flex-col flex  items-center md:items-start justify-between  gap-2 md:gap-6">
                  <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/search" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-solid fa-magnifying-glass  md:me-4 "></i> <div className="hidden md:block">Search</div></Link></li>
                  <li className='md:px-4 md:py-2 w-full text-lg  rounded-full'><Link href="/mainDashboard" className="flex items-center justify-center md:justify-start text-center text-gray-400  hover:text-gray-900"><i className="fa-solid fa-house  md:me-4"></i> <div className="hidden md:block">Home</div></Link></li>
                  <li className='md:px-4 md:py-2 w-full text-lgrounded-full'><Link href="/addPost" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-square-plus  md:me-4  "></i> <div className="hidden md:block"> Add</div></Link></li>
                  <li className='md:px-4 md:py-2 w-full text-lg rounded-full'><Link href="/notification" className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"><i className="fa-regular fa-bell  md:me-4 "></i><div className=" hidden md:block">Notifications</div></Link></li>
                  <li className='md:px-4 md:py-2 w-full text-lg  rounded-full' ><Link href={`/yourProfile/${ contextData.userId}`} className=" text-center text-gray-400  hover:text-gray-900 flex items-center justify-center md:justify-start"><i className="fa-regular fa-user   md:me-4 "></i><div className="hidden md:block">Profile</div></Link></li>
              </ul>
            </aside>
          ) : (
            <></>
          )}

          {/* <!-- Main Section --> */}
          <main className="md:col-span-3 space-y-6 h-[79vh] md:w-[80%] ">
            {/* <!-- Global Posts Section --> */}
            <section
              id="global-posts"
              className="bg-white p-6 rounded-lg shadow-md h-full  "
            >
              {SinglePostData.map((post, index) => (
                <div key={index} className="border-b cursor-pointer border-gray-200 p-4 shadow-lg rounded-lg h-full bg-gray-400">
                  <div className="h-[10%]">
                    <div className="flex items-center gap-2">
                      <div className="bg-black rounded-full h-5 w-5 text-white flex items-center justify-center ">
                        {post.username.charAt(0).toUpperCase()}
                      </div>
                      <h1 className="">{post.username}</h1>
                    </div>
                  </div>
                  <h3 className="text-xl h-[10%] font-semibold text-gray-900">
                    {post.content.title}
                  </h3>
                  <p className="text-gray-700 h-[10%] ">
                    {post.content.message}
                  </p>
                  <div className="w-full h-[10%]">
                    <span className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <i
                          onClick={() => {
                            likeHandler(postId);
                          }}
                          className={
                            likedData.some((obj) => obj.postId === post._id)
                              ? "fa-solid fa-heart"
                              : "fa-regular fa-heart"
                          }
                        ></i>{" "}
                        <div className="text-xs font-light">
                          {postLikeCounts[resolvedPostId] || 0}
                        </div>
                      </div>

                      <div className="flex flex-col items-center">
                        <i
                          onClick={() => {
                            commentHandler();
                          }}
                          className="fa-regular fa-comment"
                        ></i>
                        <div className="text-xs font-light">
                          {postCommentCounts[resolvedPostId] || 0}
                        </div>
                      </div>

                      <i
                        onClick={shareHandler}
                        className="fa-regular fa-share-from-square"
                      ></i>
                    </span>
                  </div>

                  {contextData.commentVisibleId ? (
                    <div className="h-[60%]">
                      <div className=" h-[70%] px-2 overflow-scroll no-scrollbar">
                        {commentData.map((data, index) => (
                          <div key={index} className="flex mt-2 flex-col p-2 rounded-lg bg-slate-300">
                            <div className="flex gap-2 items-center">
                              <div className="h-4 w-4 bg-black rounded-full  "></div>
                              <div className="text-sm">{data.userName}</div>
                            </div>

                            <h1 className=" ms-6 text-sm text-gray-500">
                              {data.commentContent}
                            </h1>
                          </div>
                        ))}
                      </div>
                      <div className="flex mt-4 gap-2 w-full h-[20%] ">
                        <input
                          type="text"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="comment"
                          className="bg-transparent border-b border-gray-700 focus:outline-none  p-2 w-[90%] text-black placeholder:text-black"
                        />
                        <button
                          onClick={(e) => comentSend(e)}
                          className="bg-blue-500 w-[10%] text-white border border-blue-950 rounded-lg p-2 hover:bg-blue-300 hover:text-black"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </section>
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
