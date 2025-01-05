import {useState} from "react";
import {UpvoteSvgComponent} from "@/app/components/buttons/UpvoteSvgComponent";
import {DownvoteSvgComponent} from "@/app/components/buttons/DownvoteSvgComponent";

export const VoteComponent = () => {
    const [vote,setVote]=useState<boolean|null>(null);
    return (
        <>
            <button className="flex items-center gap-1" onClick={() => setVote(true)}>
                {/* Upvote Icon */}
                <UpvoteSvgComponent fill={vote !== null && vote ? "#a855f7" : undefined}
                                    className={vote !== null && vote ? "text-purple-500" : ""}/>
                <p>3</p>
            </button>

            <button className="flex items-center gap-1" onClick={() => setVote(false)}>
                {/* Downvote Icon */}
                <DownvoteSvgComponent fill={vote !== null && !vote ? "#ef4444" : undefined}
                                      className={vote !== null && !vote ? "text-red-500" : ""}/>
            </button>
        </>
    );
};