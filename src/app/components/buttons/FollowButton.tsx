
import React from "react";
import {CustomButton} from "@/app/components/buttons/CustomButton";

interface FollowButtonProps {
    following:boolean;
    onClick?: () => void;
}
export const FollowButton:React.FC<FollowButtonProps> =  ({following,onClick}) => {
    return (
        <>
            <CustomButton text={`${following?"following":"follow"}`} className={"max-w-20 bg-transparent ring-1 ring-neutral-500 text-black dark:text-white"} onClick={onClick}/>
        </>
    );
};