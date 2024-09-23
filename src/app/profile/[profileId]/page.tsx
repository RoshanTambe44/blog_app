"use client";
import { useStore } from "@/context/store";
import axios from "axios";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from 'moment'


export default function Profile() {
  const router = useRouter();
  const contextData = useStore();
  const userID = useParams().profileId;
  const [posts, setposts] = useState<postdata[]>([]);
  const [username, setusername] = useState();
  const [likedData, setLikedData] = useState<likeData[]>([]);
  const [chargeLikeCount, setchargeLikeCount] = useState<number>(0);
  const [chargeGetLikeData, setChargeGetLikeData] = useState<number>(0);
  const [followings, setFollowings] = useState<string[]>([]);
  const [followers, setFollowers] = useState<string[]>([]);
  const [postLikeCounts, setpostLikeCounts] = useState<Record<string, number>>(
    {}
  );
  const [postCommentCounts, setpostCommentCounts] = useState<
    Record<string, number>
  >({});
  const [chargeCommentsCount, setchargeCommentsCount] = useState<number>(0);
  console.log("profile/profileId");

  const userName = contextData?.userName || "";
  const firstLatter = userName.charAt(0).toUpperCase();

  useEffect(() => {
    (async () => {
      const userDataRes = await axios.get("/api/users/me");
      contextData.setUsername(userDataRes.data.tokenUserData.username);
      contextData.setUserId(userDataRes.data.tokenUserData._id);
      contextData.setUserEmail(userDataRes.data.tokenUserData.email);
      

    })();
  }, [contextData]);

  interface postdata {
    _id: string;
    username: string;
    userId: string;
    content: { message: string; title: string };
    createdAt:Date
  }
  interface PostLike {
    _id: string;
    count: number;
  }
  interface likeData {
    postId: string;
  }

  useEffect(() => {
    (async () => {
      const res = await axios.post("/api/users/post/getmypost", {
        userId: userID,
      });
      console.log(res.data.getMyPosts);
      setposts(res.data.getMyPosts);
    })();
  }, [userID]);


  useEffect(() => {
    (async () => {
      console.log(userID)

      const res = await axios.post("/api/users/userinfo", { userId: userID });
      console.log(res);
      setusername(res.data.userInfo.username);
      getFollowingsCount(res.data.userInfo.username);
      getFollowersCount(res.data.userInfo.username)
    })();
  }, [userID]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.post("/api/users/likes/getlikedata", {
          userId: userID,
        });
        setLikedData(res.data.res);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [chargeGetLikeData]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/api/users/post/getpostlikecount");
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
      const res = await axios.get("/api/users/post/getpostcommentcount");
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

  async function getFollowingsCount(userId: string) {
    const res = await axios.post("/api/users/follow/getfollowercount", {
      followerId: userId,
    });
    console.log(res)
    setFollowings(res.data.followerCountRes);
  }

  async function getFollowersCount(userId: string) {

    const res = await axios.post("/api/users/follow/getfollowingcount", {
      followingId: userId,
    });

    console.log(res)

    setFollowers(res.data.followingCountRes);
  }

  async function likeHandler(id: string) {
    if (likedData.some((data) => data.postId === id)) {
      const deleteRes = await axios.post("/api/users/likes/removelike", {
        userId: userID,
        postId: id,
      });
      setchargeLikeCount(Math.random());
      setChargeGetLikeData(Math.random());
    } else {
      const likeRes = await axios.post("/api/users/likes", {
        userId: userID,
        postId: id,
      });
      setchargeLikeCount(Math.random());
      setChargeGetLikeData(Math.random());
    }
  }

  function redirectToPost(id: string, type: string) {
    if (type === "title") {
      if (contextData.commentVisibleId) {
        contextData.setCommentVisibleId(false);
      }
    } else {
      if (!contextData.commentVisibleId) {
        contextData.setCommentVisibleId(true);
      }
    }
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
        <div className="flex flex-col-reverse md:flex-row gap-6  ">
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
                  <h1 className="text-2xl ">{username}</h1>{" "}
                </div>
                <div className="h-[25%] flex items-center justify-between   ">
                  <div className="md:ms-8 md:h-28 rounded-full bg-gray-500 w-24 h-24 md:w-28 "></div>
                  <div className="md:me-40 flex flex-col gap-4 ">
                    <div className="w-full flex justify-center items-center md:gap-10 gap-5">
                      <div className="w-30 flex flex-col-reverse">
                        <h1 className="font-bold md:text-xl text-sm text-center text-black ">
                          post
                        </h1>
                        <h1 className="text-gray-600 text-center">
                          {posts.length}
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
                    <div className="w-full flex justify-start items-center gap-4">
                      <button className="bg-blue-500 py-2 px-4 md:px-8 text-sm   rounded-xl hover:bg-blue-400 hover:text-gray-900 shadow-lg  hover:-translate-y-1 transition duration-300   ">
                        Follow
                      </button>
                      <button onClick={()=>{shareProfile(userID)}} className="bg-blue-500 py-2 px-4 md:px-8 text-sm rounded-xl  hover:bg-blue-400 hover:text-gray-900 shadow-lg  hover:-translate-y-1 transition duration-300 ">
                        Share
                      </button>
                    </div>
                  </div>
                </div>

                <div className="h-[60%] mt-4 flex flex-col gap-4 overflow-y-scroll no-scrollbar rounded-lg">
                  {posts.map((post, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 p-4 shadow-lg rounded-lg bg-gray-400"
                    >
                      <h1
                        onClick={() => {
                          redirectToPost(post._id, "title");
                        }}
                        className="text-xl cursor-pointer font-semibold text-gray-900 mt-5  "
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
                                redirectToPost(post._id, "comment");
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
                        <div className="text-xs">{moment(post.createdAt).fromNow()}</div>
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
