import {Badge, Timer} from "lucide-react";
import {KudosCoin} from "@/app/components/KudosCoin";
import React from "react";
import useUserStore from "@/app/store/store";

export const ProfileInfo = () => {
    const {user} = useUserStore();
    return (
        <>
            <div className={"space-y-2  "}>
                {user && user.username && <div className={"flex space-x-3"}>
                    <p className={"text-2xl font-bold"}>{user.username}

                    </p>
                    <div className={"flex space-x-2 items-center"}>
                        <Badge color={"blue"}/>
                        <p className={"text-xs"}>Mentor</p>
                    </div>
                </div>}
                <div className={"flex gap-5"}>
                    <div className={"flex items-center gap-2"}>
                        <KudosCoin size={24}/>
                        <p className={"text-xs"}>3000 Kudos</p>
                    </div>

                    <div className={"flex items-center gap-2"}>
                        <Timer/>
                        <p className={"text-xs"}>

                            Won 319 Timer Questions</p>
                    </div>
                </div>
            </div>
        </>
    );
};