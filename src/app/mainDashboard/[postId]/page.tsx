"use client";
import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";

export default function post(req: NextRequest) {
  const contextData = useStore();
  const [chargeGetLikeData, setChargeGetLikeData] = useState();
  const [likedData, setLikedData] = useState([]);
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [SinglePostData, setSinglePostData] = useState([]);
  const [randomNumber, setrandomNumber] = useState();
  const [postLikeCounts, setpostLikeCounts] = useState([]);
  const [postCommentCounts, setpostCommentCounts] = useState([]);
  const [chargeLikeCount, setchargeLikeCount] = useState();
  const [chargeCommentsCount, setchargeCommentsCount] = useState();
  const [token, settoken] = useState(true);
  const router = useRouter();
  const param = useParams();
  const postId = param.postId || 0;

  useEffect(() => {
    (async () => {
      try {
        const userDataRes = await axios.get("/api/users/me");
        console.log(userDataRes);
        if (userDataRes.data.tokenUserData) {
          contextData.value.setUsername(
            userDataRes.data.tokenUserData.username
          );
          contextData.value.setUserId(userDataRes.data.tokenUserData._id);
          contextData.value.setUserEmail(userDataRes.data.tokenUserData.email);
          settoken(true);
        } else {
          settoken(false);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/users/post/getpostlikecount");
      const likeCounts = res.data.getPostLikes.reduce((acc, { _id, count }) => {
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
        (acc, { _id, count }) => {
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
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post("/api/users/likes/getlikedata", {
          userId: contextData.value.userId,
        });
        setLikedData(res.data.res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [chargeGetLikeData]);

  async function likeHandler(id) {
    if (token) {
      if (likedData.some((data) => data.postId === id)) {
        console.log("remove");
        const deleteRes = await axios.post("/api/users/likes/removelike", {
          userId: contextData.value.userId,
          postId: id,
        });
        console.log(deleteRes);
        setchargeLikeCount(Math.random());
        setChargeGetLikeData(Math.random());
      } else {
        console.log("add");
        const likeRes = await axios.post("/api/users/likes", {
          userId: contextData.value.userId,
          postId: id,
        });
        setchargeLikeCount(Math.random());
        setChargeGetLikeData(Math.random());
        console.log(likeRes);
      }
    } else {
      router.push("/register");
    }
  }

  function commentHandler() {
    if (token) {
      if (contextData.value.commentVisibleId === false) {
        contextData.value.setCommentVisibleId(true);
      } else {
        contextData.value.setCommentVisibleId(false);
      }

      setComment("");
    } else {
      router.push("/register");
    }
  }

  async function comentSend(e) {
    e.preventDefault();

    try {
      const commentRes = await axios.post("/api/users/comments", {
        userId: contextData.value.userId,
        userName: contextData.value.userName,
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

  function registerHandler(e) {
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
  }, [randomNumber]);

  const userName = contextData?.value?.userName || "";
  const firstLatter = userName.charAt(0).toUpperCase();

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
              <h1 className="text-xs h-[20%] w-full dark:text-black">
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 ">
          {/* <!-- Sidebar --> */}
          {token ? (
            <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-md ">
              <ul className="md:flex-col flex  items-center md:items-start justify-between gap-2 md:gap-6">
                <li>
                  <Link
                    href={`/yourProfile/${contextData.value.userId}`}
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    Your Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/addPost"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    Add Post
                  </Link>
                </li>
                <li>
                  <Link
                    href="/notification"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link
                    href="/mainDashboard"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    {" "}
                    Posts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="block text-gray-700 hover:text-blue-500"
                  >
                    {" "}
                    Search
                  </Link>
                </li>
              </ul>
            </aside>
          ) : (
            <></>
          )}

          {/* <!-- Main Section --> */}
          <main className="md:col-span-3 space-y-6 h-[79vh] ">
            {/* <!-- Global Posts Section --> */}
            <section
              id="global-posts"
              className="bg-white p-6 rounded-lg shadow-md h-full  "
            >
              {SinglePostData.map((post) => (
                <div className="border-b cursor-pointer border-gray-200 p-4 shadow-lg rounded-lg h-full bg-gray-400">
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
                          {postLikeCounts[postId] || 0}
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
                          {postCommentCounts[postId] || 0}
                        </div>
                      </div>

                      <i
                        onClick={shareHandler}
                        className="fa-regular fa-share-from-square"
                      ></i>
                    </span>
                  </div>

                  {contextData.value.commentVisibleId ? (
                    <div className="h-[60%]">
                      <div className=" h-[70%] px-2 overflow-scroll no-scrollbar">
                        {commentData.map((data) => (
                          <div className="flex mt-2 flex-col p-2 rounded-lg bg-slate-300">
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
