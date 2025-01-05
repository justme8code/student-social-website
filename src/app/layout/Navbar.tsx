'use client';
import { ProfileAvatar } from "@/app/components/ProfileAvatar";
import useUserStore from "@/app/store/store";
import {AUTH_URL, IMAGE_URL} from "@/app/utils/api_endpoints";
import SideBar from "@/app/layout/SideBar";
import {SidebarMenu} from "@/app/layout/SidebarMenu";
import {LogOutIcon, SearchIcon, Settings, Settings2, TrendingUp, User2Icon, Users, Video} from "lucide-react";
import {Load, makeRequest} from "@/app/utils/axios";
import {usePathname, useRouter} from "next/navigation";
import {SearchBar} from "@/app/components/SearchBar";
import {UserNameComponent} from "@/app/layout/UserNameComponent";
import React from "react";
import {AvartarComponent} from "@/app/components/AvartarComponent";
import {KudosCoin} from "@/app/components/KudosCoin";
import Link from "next/link";
import {handleLogout} from "@/app/utils/functions";

const Navbar = () => {
    const router = useRouter();
    const pathName = usePathname();
    const { user } = useUserStore();

    const isHome =  pathName==="/" ;
    return (
        <>
            {isHome && (
                <nav
                    className=" fixed top-0 w-full p-4  z-20 flex justify-between items-center bg-neutral-50 dark:bg-neutral-900">
                    <p className={"text-purple-600 font-bold"}>studentsocial</p>


                    <div className={"flex justify-between items-center gap-5"}>

                        <div className={"flex items-center gap-2"}>
                            <KudosCoin text={"K"} size={20}/>
                            <p className={"text-xs"}>20k</p>
                        </div>
                        <Link href={"/search"}>
                            <SearchIcon/>
                        </Link>


                        {user &&
                            <SideBar side={"right"} className={"dark:bg-neutral-900 bg-white "} icon={
                                user.profileImageUrl ?
                                    <ProfileAvatar image={`${IMAGE_URL}/profile-images/${user.profileImageUrl}`}
                                                   className={"max-w-12  max-h-12"}/> : <ProfileAvatar
                                        image={``}
                                        className={""}
                                    />
                            }>


                                <>
                                    <SidebarMenu
                                        menuItems={[
                                            {
                                                icon: <User2Icon/>, text: "Profile", onClick: () =>
                                                    router.push(`/profile/${user.username}`)
                                            },
                                            {
                                                icon: <Video/>,
                                                text: "Short Video",
                                                onClick: () => console.log("Short Video Clicked")
                                            },
                                            {
                                                icon: <Users/>,
                                                text: "Create a Tribe",
                                                onClick: () => console.log("Community Clicked")
                                            },
                                            {icon: <LogOutIcon/>, text: "Logout", onClick: () => {
                                                handleLogout();
                                                router.replace("/account");
                                                }}
                                        ]}
                                    />

                                </>
                            </SideBar>
                        }
                    </div>


                </nav>
            )}
        </>
    );
};

export default Navbar;


/*

{/!* Sidebar Toggle Button *!/}
{/!* Mobile Hamburger Icon *!/}

{ user &&
<SideBar side={"right"} className={"dark:bg-neutral-900 bg-white"} icon={
    user.profileImageUrl ? <ProfileAvatar
        image={`${BASE_URL}/resources/images/profile-images/${user.profileImageUrl}`}
        className={"max-w-8 max-h-8"}
    /> : <ProfileAvatar
        image={``}
        className={""}
    />
}>


    <>
        <SidebarMenu
            menuItems={[
                { icon: <User2Icon />, text: "Profile", onClick: () =>
                        router.push(`/profile/${user.username}`)
                },
                { icon: <Video />, text: "Short Video", onClick: () => console.log("Short Video Clicked") },
                { icon: <Users />, text: "Create a Tribe", onClick: () => console.log("Community Clicked") },
                {icon: <LogOutIcon/>, text:"Logout", onClick:()=> handleLogout()}
            ]}
        />

    </>
</SideBar>
}*/
