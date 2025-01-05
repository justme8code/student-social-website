'use client';
import { ProfileAvatar } from "@/app/components/ProfileAvatar";
import { CustomButton } from "@/app/components/buttons/CustomButton";
import React from "react";
import useUserStore from "@/app/store/store";
import { BASE_URL, IMAGE_URL, RESOURCE_URL } from "@/app/utils/api_endpoints";
import { StyledLinkButton } from "@/app/components/buttons/StyledLinkButton";
import { usePathname } from "next/navigation";
import {FollowButton} from "@/app/components/buttons/FollowButton";

export const ProfileHeader = () => {
    const pathname = usePathname();
    const { user, setUser } = useUserStore();

    // Extract username from the pathname, assuming the format is '/profile/@username'
    const usernameFromPath = pathname.split('/').pop();

    const showEditButton = user && usernameFromPath && user.username === usernameFromPath;
    const following = user && usernameFromPath && user.username === usernameFromPath;
    return (
        <>
            <div className={"bg-gray-200 dark:bg-neutral-900 p-6 "}>
                <div className="pb-5">
                    {user && user.profileImageUrl && (
                        <ProfileAvatar image={`${IMAGE_URL}/profile-images/${user.profileImageUrl}`} className="w-28 h-28 " />
                    )}
                </div>

                {showEditButton && (
                    <StyledLinkButton
                        text={"Edit"}
                        className={"max-w-16 bg-white dark:bg-neutral-950 dark:text-white text-black"}
                        href={"/settings/profile"}
                    />
                )}

                {
                    !showEditButton && <FollowButton following={true}/>
                }
            </div>
        </>
    );
};
