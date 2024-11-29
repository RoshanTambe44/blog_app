"use client";
import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

export default function YourProfile() {
  const router = useRouter();
  const contextData = useStore();
  const [myPosts, setmyPosts] = useState<postdata[]>([]);
  const [likedData, setLikedData] = useState<likeData[]>([]);
  const [postLikeCounts, setpostLikeCounts] = useState<Record<string, number>>(
    {}
  );
  const [postCommentCounts, setpostCommentCounts] = useState<
    Record<string, number>
  >({});
  const [chargeGetLikeData, setChargeGetLikeData] = useState<number>();
  const [chargeCommentsCount, setchargeCommentsCount] = useState();
  const [chargeLikeCount, setchargeLikeCount] = useState<number>();
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);

  console.log("your profile");

  interface PostLike {
    _id: string;
    count: number;
  }

  interface likeData {
    postId: string;
  }

  interface postdata {
    _id: string;
    username: string;
    userId: string;
    content: { message: string; title: string };
    createdAt: Date;
  }

  const userName = contextData?.userName || "";
  const firstLatter = userName.charAt(0).toUpperCase();

  useEffect(() => {
    (async () => {
      const userDataRes = await axios.post("/api/users/me");
      contextData.setUsername(userDataRes.data.tokenUserData.username);
      contextData.setUserId(userDataRes.data.tokenUserData._id);
      contextData.setUserEmail(userDataRes.data.tokenUserData.email);
      getMyPosts(userDataRes.data.tokenUserData._id);
      getMyLikes(userDataRes.data.tokenUserData._id);
      getFollowingsCount(userDataRes.data.tokenUserData.username);
      getFollowersCount(userDataRes.data.tokenUserData.username);
    })();
  }, [contextData]);

  async function getMyPosts(userid: string | undefined) {
    try {
      const myData = await axios.post("/api/users/post/getmypost", {
        userId: userid,
      });
      setmyPosts(myData.data.getMyPosts.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  async function getMyLikes(userid: string | undefined) {
    try {
      const res = await axios.post("/api/users/likes/getlikedata", {
        userId: userid,
      });
      setLikedData(res.data.res);
    } catch (error) {
      console.log(error);
    }
  }

  async function getFollowingsCount(userId: string | undefined) {
    const res = await axios.post("/api/users/follow/getfollowercount", {
      followerId: userId,
    });
    setFollowings(res.data.followerCountRes);
  }

  async function getFollowersCount(userId: string | undefined) {

    const res = await axios.post("/api/users/follow/getfollowingcount", {
      followingId: userId,
    });
    setFollowers(res.data.followingCountRes);
  }

  useEffect(() => {
    (async () => {
      const res = await axios.post("/api/users/post/getpostlikecount");
      const likeCounts = res.data.getPostLikes.reduce(
        (acc: Record<string, number>, { _id, count }: PostLike) => {
          acc[_id] = count;
          return acc;
        },
        {}
      );
      setpostLikeCounts(likeCounts);
    })();
  }, [chargeLikeCount]);

  useEffect(() => {
    (async () => {
      const res = await axios.post("/api/users/post/getpostcommentcount");
      const commentCounts = res.data.getPostCommentRes.reduce(
        (acc: Record<string, number>, { _id, count }: PostLike) => {
          acc[_id] = count;
          return acc;
        },
        {}
      );
      setpostCommentCounts(commentCounts);
    })();
  }, [chargeCommentsCount]);

  async function likeHandler(id: string) {
    if (likedData.some((data) => data.postId === id)) {
      const deleteRes = await axios.post("/api/users/likes/removelike", {
        userId: contextData.userId,
        postId: id,
      });
      setchargeLikeCount(Math.random());
      setChargeGetLikeData(Math.random());
      getMyLikes(contextData.userId);
    } else {
      const likeRes = await axios.post("/api/users/likes", {
        userId: contextData.userId,
        postId: id,
      });
      setchargeLikeCount(Math.random());
      setChargeGetLikeData(Math.random());
      getMyLikes(contextData.userId);
    }
  }

  async function logoutHandler() {
    try {
      const res = await axios.post("/api/users/logout");
      router.push("/login");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  function redirectToPost(id: string) {
    router.push(`${location.origin}/mainDashboard/${id}`);
  }

  function shareHandler(id: string) {
    toast.success("Copied");
    navigator.clipboard.writeText(`${location.origin}/mainDashboard/${id}`);
  }

  function shareProfile (id:any){
    toast.success("Copied")
    navigator.clipboard.writeText(`${location.origin}/profile/${id}`) 
  }

  return (
    <div className="h-[100vh] overflow-hidden">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className="text-2xl font-bold text-blue-500">
            BlogApp
          </a>
          <div className="  flex flex-col items-center justify-between h-10 ">
            <div className="bg-red-500 h-8 w-8 rounded-full flex items-center justify-center  ">
              {firstLatter}
            </div>
            <h1 className="text-xs h-[20%] w-full text-black">{userName}</h1>
          </div>
        </div>
      </nav>

      {/* <!-- Main Content --> */}
      <div className="container mx-auto px-4 py-6 flex-grow  ">
        <div className="flex flex-col-reverse md:flex-row gap-6 ">
          {/* <!-- Sidebar --> */}
          <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-md md:w-[20%] ">
            <ul className="md:flex-col flex  items-center md:items-start justify-between  gap-2 md:gap-6">
              <li className="md:px-4 md:py-2 w-full text-lg  rounded-full">
                <Link
                  href="/search"
                  className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"
                >
                  <i className="fa-solid fa-magnifying-glass  md:me-4 "></i>{" "}
                  <div className="hidden md:block">Search</div>
                </Link>
              </li>
              <li className="md:px-4 md:py-2 w-full text-lg  rounded-full">
                <Link
                  href="/mainDashboard"
                  className="flex items-center justify-center md:justify-start text-center text-gray-400  hover:text-gray-900"
                >
                  <i className="fa-solid fa-house  md:me-4"></i>{" "}
                  <div className="hidden md:block">Home</div>
                </Link>
              </li>
              <li className="md:px-4 md:py-2 w-full text-lgrounded-full">
                <Link
                  href="/addPost"
                  className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"
                >
                  <i className="fa-regular fa-square-plus  md:me-4  "></i>{" "}
                  <div className="hidden md:block"> Add</div>
                </Link>
              </li>
              <li className="md:px-4 md:py-2 w-full text-lg rounded-full">
                <Link
                  href="/notification"
                  className="flex items-center text-center justify-center md:justify-start text-gray-400  hover:text-gray-900"
                >
                  <i className="fa-regular fa-bell  md:me-4 "></i>
                  <div className=" hidden md:block">Notifications</div>
                </Link>
              </li>
              <li className="md:px-4 md:py-2 w-full text-lg  rounded-full">
                <Link
                  href={`/yourProfile/${contextData.userId}`}
                  className=" text-center text-gray-400  hover:text-gray-900 flex items-center justify-center md:justify-start"
                >
                  <i className="fa-regular fa-user   md:me-4 "></i>
                  <div className="hidden md:block">Profile</div>
                </Link>
              </li>
            </ul>
          </aside>

          {/* <!-- Main Section --> */}
          <main className="md:col-span-3 space-y-6  h-[79vh] md:w-[80%]">
            {/* <!-- Profile Section --> */}
            <section
              id="profile"
              className="bg-white p-6 rounded-lg shadow-md h-full"
            >
              <div className="h-full ">
                <div className="h-[10%] flex justify-between items-center font-bold mb-4 text-gray-900 ">
                  <h1 className="text-2xl ">{contextData.userName}</h1>{" "}
                  <button
                    onClick={logoutHandler}
                    className="p-2 border border-gray-500 text-gray-500 rounded-lg hover:text-white hover:bg-slate-700 hover:shadow-lg transition duration-300"
                  >
                    Logout
                  </button>
                </div>
                <div className="h-[25%] flex items-center justify-between   ">
                  <div className="md:ms-8 md:h-28 rounded-full bg-gray-500 w-24 h-24 md:w-28 "></div>
                  <div className="md:me-40 flex flex-col gap-4 ">
                    <div className="md:me-40 flex justify-center items-center md:gap-10 gap-5">
                      <div className="w-30 flex flex-col-reverse">
                        <h1 className="font-bold md:text-xl text-sm text-center text-black ">
                          post
                        </h1>
                        <h1 className="text-gray-600 text-center">
                          {myPosts.length}
                        </h1>
                      </div>
                      <div className="w-30 flex flex-col-reverse">
                        <h1
                          onClick={() =>
                            router.push(`${location.pathname}/followers`)
                          }
                          className="font-bold md:text-xl text-sm text-center text-black cursor-pointer "
                        >
                          Followers
                        </h1>
                        <h1 className="text-gray-600 text-center">{followers.length}</h1>
                      </div>
                      <div className="w-30 flex flex-col-reverse">
                        <h1
                          onClick={() =>
                            router.push(`${location.pathname}/followings`)
                          }
                          className="font-bold md:text-xl text-sm text-center text-black cursor-pointer "
                        >
                          Followings
                        </h1>
                        <h1 className="text-gray-600 text-center">{followings.length}</h1>
                      </div>
                    </div>
                    <div className="w-full ">
                      
                      <button onClick={()=>shareProfile(contextData.userId)} className="bg-blue-500 py-2 px-4 md:px-8 rounded-xl  hover:bg-blue-400 hover:text-gray-900 shadow-lg  hover:-translate-y-1 transition duration-300 ">
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-[60%] mt-4 flex flex-col gap-4 overflow-y-scroll no-scrollbar rounded-lg">
                  {myPosts.map((post, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 p-4 shadow-lg rounded-lg bg-gray-400"
                    >
                      <h1
                        onClick={() => {
                          redirectToPost(post._id);
                        }}
                        className="text-xl cursor-pointer font-semibold text-gray-900 mt-5"
                      >
                        {post.content.title}
                      </h1>
                      <h1 className="text-gray-700 mt-4">
                        {post.content.message}
                      </h1>
                      <div className="w-full mt-8 flex justify-between">
                        <span className="flex gap-4 cursor-pointer">
                          <div className="flex flex-col items-center ">
                            <i
                              onClick={() => likeHandler(post._id)}
                              className={
                                likedData.some((obj) => obj.postId === post._id)
                                  ? "fa-solid fa-heart"
                                  : "fa-regular fa-heart"
                              }
                            ></i>
                            <div className="text-xs font-light">
                              {postLikeCounts[post._id] || 0}
                            </div>
                          </div>

                          <div className="flex flex-col items-center">
                            <i
                              onClick={() => {
                                redirectToPost(post._id);
                              }}
                              className=" fa-regular fa-comment"
                            ></i>
                            <div className="text-xs font-light">
                              {postCommentCounts[post._id] || 0}
                            </div>
                          </div>

                          <i
                            onClick={() => shareHandler(post._id)}
                            className="fa-regular fa-share-from-square"
                          ></i>
                        </span>
                        <div className="text-xs">
                          {moment(post.createdAt).fromNow()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
