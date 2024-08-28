'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for the context value
interface StateContextType {
    userVerificationOtp: string | undefined;
    setUserVerificationOtp: React.Dispatch<React.SetStateAction<string | undefined>>;
    userName: string | undefined;
    setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
    userEmail: string | undefined;
    setUserEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
    userId: string | undefined;
    setUserId: React.Dispatch<React.SetStateAction<string | undefined>>;
    allPosts: any[]; // Replace `any` with the type of your posts
    setAllPosts: React.Dispatch<React.SetStateAction<any[]>>;
    commentVisibleId: boolean;
    setCommentVisibleId: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with the proper type
const StateContext = createContext<StateContextType | undefined>(undefined);

interface StoreProps {
    children: ReactNode;
}

export const Store: React.FC<StoreProps> = ({ children }) => {
    const [userName, setUsername] = useState<string | undefined>();
    const [userVerificationOtp, setUserVerificationOtp] = useState<string | undefined>();
    const [userEmail, setUserEmail] = useState<string | undefined>();
    const [userId, setUserId] = useState<string | undefined>();
    const [allPosts, setAllPosts] = useState<any[]>([]);
    const [commentVisibleId, setCommentVisibleId] = useState<boolean>(false);

    return (
        <StateContext.Provider value={{
            userVerificationOtp, setUserVerificationOtp,
            userName, setUsername,
            userEmail, setUserEmail,
            userId, setUserId,
            allPosts, setAllPosts,
            commentVisibleId, setCommentVisibleId
        }}>
            {children}
        </StateContext.Provider>
    );
}

// Custom hook to use the context
export const useStore = () => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error("useStore must be used within a Store");
    }
    return context;
}
