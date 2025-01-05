import {IconButton} from "@/app/components/buttons/IconButton";
import {Earth, MousePointerClick, Users, Video} from "lucide-react";
import React from "react";

export const ProfileBody = () => {
    return (
        <>
            <div className={"flex gap-4 flex-wrap  "}>
                <IconButton icon={<Earth/>} text={"3000 followers"}/>
                <IconButton icon={<Earth/>} text={"200 following"}/>
                <IconButton icon={<Users/>} text={"3 Tribes"}/>
                <IconButton icon={<Video/>} text={"350 Tik-Learn"}/>
                <IconButton icon={<MousePointerClick/>} text={"500 engagement worth"}/>

            </div>
        </>
    );
};