import Image from "next/image";
import React from "react";
import {User2Icon, UserCircle2Icon} from "lucide-react";
import {ImageComponent} from "@/app/components/ImageComponent";

export interface ReusableAvatarProps {
    imageUrl?: string;
    alt: string;
    className?: string;
}
export const ReusableAvatarComponent:React.FC<ReusableAvatarProps> = ({imageUrl,alt,className}) => {
    return (
        <>
            {
                imageUrl? <ImageComponent imageUrl={`${imageUrl}`} alt={`${alt}`} priority={true} height={24} width={24} className={"rounded-full"} >
                    <UserCircle2Icon size={20}/>
                </ImageComponent>: <User2Icon size={20} className={` rounded-full`} />

            }

        </>
    );
};