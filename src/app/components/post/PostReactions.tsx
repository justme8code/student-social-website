'use client';

import { useState, useEffect } from "react";
import { UpVoteButton } from "../buttons/UpVoteButton";
import { DownVoteButton } from "@/app/components/buttons/DownVoteButton";
import { ReactionButton } from "@/app/components/buttons/ReactionButton";
import { MessageCircleIcon, ShareIcon, TimerIcon } from "lucide-react";
import { Post } from "@/app/utils/data-types";
import {VotePostComponent} from "@/app/components/post/VotePostComponent"; // Assuming you have an API utility to handle requests

const st = "flex items-center rounded-full ring-1 ring-neutral-200 px-1 dark:ring-neutral-800 justify-center";

export const PostReactions = ({ post }: { post: Post }) => {
    const [showComments, setShowComments] = useState(false);

    return (
        <div className={"flex justify-between w-full"}>
            <div className={"flex gap-3 items-center"}>
                <div className={`${st} `}>
                    <VotePostComponent post={post}/>
                </div>
                <ReactionButton icon={<MessageCircleIcon size={18} />} text={`${post.commentCount}`} onClick={() => setShowComments(!showComments)} className={`${st} `} />
            </div>
            <div className={"flex gap-2 items-center"}>
                <ReactionButton icon={<TimerIcon size={18} />} text={"23s"} />
                <ReactionButton icon={<ShareIcon size={18} />} text={"4k"} />
            </div>
        </div>
    );
};
