'use client';
import useUserStore from "@/app/store/store";
import React, {useEffect} from "react";
import {TrendingUp} from "lucide-react";

export const UserNameComponent = () => {
    const {user,fetchUser} = useUserStore();

    useEffect(() => {
         if(!user){
            fetchUser()
         }
    }, [fetchUser, user])
    return (
        <>

            <div className={"flex  flex-col"}>
                <div className={"flex items-center"}>
                    <p className={"text-lg"}>Hi {user?.username}</p>
                </div>


                <p className="text-xs ">{"It's a beautiful day to learn"}</p>

            </div>
        </>
    );
};