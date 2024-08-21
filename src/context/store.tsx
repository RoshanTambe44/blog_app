'use client'
import { createContext, useContext, useState } from "react";





    
const stateContext = createContext();

export const Store = ({children,}:{children: React.ReactNode;})=> 
   {
   
    const [userName, setUsername] = useState()
    const [userVerificationOtp, setUserVerificationOtp] = useState()
    const [userEmail, setUserEmail] = useState()
    const [userId, setUserId] = useState()
    const [allPosts, setAllPosts] = useState()
    const [commentVisibleId, setCommentVisibleId] = useState(false)

   
    
    return (
      <html lang="en">
        <stateContext.Provider value={{value : {userVerificationOtp, setUserVerificationOtp, userName, setUsername, userEmail, setUserEmail, userId, setUserId, allPosts, setAllPosts, commentVisibleId, setCommentVisibleId}} } >
        <body >{children}</body>
        </stateContext.Provider >
  
      </html>
    );
  }

export const useStore = () => useContext(stateContext)
  

 