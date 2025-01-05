import React from "react";
import { BASE_URL } from "@/app/utils/api_endpoints";
import { ProfileAvatar } from "@/app/components/ProfileAvatar";
import useUserStore from "@/app/store/store";

import { IconButton } from "@/app/components/buttons/IconButton";
import { KudosCoin } from "@/app/components/KudosCoin";
import {CustomButton} from "@/app/components/buttons/CustomButton";
import {StyledLinkButton} from "@/app/components/buttons/StyledLinkButton";
import {ModeToggle} from "@/app/components/ModeToggle";

interface SidebarMenuProps {
    menuItems?: { icon: React.ReactNode; text: string; onClick?: () => void }[];
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({ menuItems }) => {
    const { user } = useUserStore();

    return (
        <>
            {user && (
                <div className="flex flex-col justify-between space-y-5 h-full z-50">
                    <div className={"space-y-5"}>    {/* User Info Section */}
                        <div className="space-y-10">
                            <div className="flex flex-col items-center space-y-3">
                                <ProfileAvatar
                                    className="w-20 h-20"
                                    image={`${BASE_URL}/resources/images/profile-images/${user.profileImageUrl}`}
                                />
                                <p className="text-lg font-bold">{user.username}</p>
                            </div>

                            {/* Coins and Stats */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center space-x-2">
                                    <KudosCoin size={30}/>
                                    <p className="font-bold ">3000</p>
                                </div>
                                <div className="flex flex-col items-center">
                                    <p className="text-gray-600">30</p>
                                    <span className="text-sm text-gray-400">Communities</span>
                                </div>
                            </div>
                        </div>

                        {/* Menu Items */}
                        <div className="flex flex-col space-y-5 justify-between ">
                            {menuItems?.map((item, index) => (
                                <IconButton
                                    key={index}
                                    icon={item.icon}
                                    text={item.text}
                                    onClick={item.onClick}
                                    className="justify-start items-center bg-transparent active:bg-neutral-500 dark:bg-transparent dark:text-white"
                                />
                            ))}

                        </div>
                    </div>
                    <div className={"mt-4"}>
                        <ModeToggle/>
                    </div>
                    <StyledLinkButton href={"#"} text={"Settings"}
                                      className={"w-fit bg-transparent dark:bg-transparent"}/>

                </div>
            )}
        </>
    );

};
