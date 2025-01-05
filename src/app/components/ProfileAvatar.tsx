import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {User2Icon, UserCircle2Icon} from "lucide-react";
import Image from "next/image";

interface ProfileAvatarProps {
    image: string | undefined;
    className?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({image,className}) => {
    return (
<>

        {
            image &&  <Image
            src={image}
            alt={"avatar image"}
            height={24}
            width={24}
            className={` rounded-full object-cover ${className}`}
            priority={true} // If the image is critical for above-the-fold content, set priority to true
        />
        }

    {!image && <UserCircle2Icon/>}
</>

    );
};
