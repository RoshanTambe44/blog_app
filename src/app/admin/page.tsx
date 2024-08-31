'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [allProfile, setallProfile] = useState<profile[]>([])
  const [allPost, setallPost] = useState<post[]>([])

  interface profile{
    username:string,
    _id:string,
    email:string,
    createdAt:string
  }
  interface post{
    _id:string,
    username:string,
    createdAt:string,
    content: {message:string, title:string}
  }

  useEffect(()=>{
    (async()=>{
      const res = await axios.get("api/users/allProfiles");
      setallProfile(res.data.getres)
      
    })()
 },[])
 
 useEffect(()=>{
  (async()=>{
    const res = await axios.get("api/users/post/getpost");
    setallPost(res.data.postData)
    
  })()
},[])

console.log(allPost)
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-blue-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium">Total Posts</h3>
                <p className="text-2xl font-bold">{allPost.length}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium">Total Comments</h3>
                <p className="text-2xl font-bold">456</p>
              </div>
              <div className="bg-yellow-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-medium">Total Users</h3>
                <p className="text-2xl font-bold">{allProfile.length}</p>
              </div>
            </div>
          </div>
        );
      case 'posts':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md h-full ">
            <h1 className="text-3xl font-bold mb-4 h-[10%]">Posts Management</h1>
            <table className="w-full bg-white border h-[10%] border-gray-300 rounded-lg shadow-md ">
            <thead className=''>
                <tr>
                  <th className="border-b px-4 py-2  text-center">Title</th>
                  <th className="border-b px-4 py-2 text-center " >Author</th>
                  <th className="border-b px-4 py-2 text-center">Date</th>
                  <th className="border-b px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
            </table>
            <div className="h-[80%] overflow-scroll no-scrollbar">
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md h-full  ">
              
              <tbody className=' '>
              {allPost.map((post, index)=><tr key={index}>
                  <td className="border-b px-4 py-2">{post.content.title}</td>
                  <td className="border-b px-4 py-2">{post.username}</td>
                  <td className="border-b px-4 py-2">{post.createdAt}</td>
                  <td className="border-b px-4 py-2">
                    <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Edit</button>
                    <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">Delete</button>
                  </td>
                </tr>)}
                {/* Repeat rows as needed */}
              </tbody>
            </table>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">User Management</h1>
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">Name</th>
                  <th className="border-b px-4 py-2 text-left">Email</th>
                  <th className="border-b px-4 py-2 text-left">join</th>
                  <th className="border-b px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProfile.map((profile, index)=><tr key={index}>
                  <td className="border-b px-4 py-2">{profile.username}</td>
                  <td className="border-b px-4 py-2">{profile.email}</td>
                  <td className="border-b px-4 py-2">{profile.createdAt || "old account"}</td>
                  <td className="border-b px-4 py-2">
                    <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Edit</button>
                    <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">Delete</button>
                  </td>
                </tr>)}
                {/* Repeat rows as needed */}
              </tbody>
            </table>
          </div>
        );
      case 'categories':
        return (
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-4">Categories Management</h1>
            <button className="bg-blue-500 text-white py-2 px-4 rounded mb-4 hover:bg-blue-600">Add New Category</button>
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">Name</th>
                  <th className="border-b px-4 py-2 text-left">Description</th>
                  <th className="border-b px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b px-4 py-2">Example Category</td>
                  <td className="border-b px-4 py-2">Category description goes here</td>
                  <td className="border-b px-4 py-2">
                    <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600">Edit</button>
                    <button className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 ml-2">Delete</button>
                  </td>
                </tr>
                {/* Repeat rows as needed */}
              </tbody>
            </table>
          </div>
        );
      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div className="flex h-screen">
      <aside className="w-64 bg-gray-800 text-white h-full p-4">
        <h2 className="text-2xl mb-4">Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <button
                onClick={() => setActiveSection('dashboard')}
                className="block py-2 px-4 mb-2 hover:bg-gray-700 w-full text-left"
              >
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('users')}
                className="block py-2 px-4 mb-2 hover:bg-gray-700 w-full text-left"
              >
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('posts')}
                className="block py-2 px-4 mb-2 hover:bg-gray-700 w-full text-left"
              >
                Posts
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveSection('categories')}
                className="block py-2 px-4 mb-2 hover:bg-gray-700 w-full text-left"
              >
                Categories
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-100">
        {renderContent()}
      </main>
    </div>
  );
}


