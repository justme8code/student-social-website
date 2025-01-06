'use client';
import {UpVoteButton} from "@/app/components/buttons/UpVoteButton";
import {DownVoteButton} from "@/app/components/buttons/DownVoteButton";
import {useEffect, useState} from "react";
import useUserStore from "@/app/store/store";
import {Load, makeRequest} from "@/app/utils/axios";
import {Post} from "@/app/utils/data-types";

const st = "flex items-center rounded-full ring-1 ring-neutral-200 px-1 dark:ring-neutral-800 justify-center";

export const VotePostComponent = ({post}:{post:Post}) => {
    const [upvoteCount, setUpvoteCount] = useState<number | null>(null);
    const [downvoteCount, setDownvoteCount] = useState<number | null>(null);
    const [v,setV] = useState<string| null>("NOVOTE");
    const {user} = useUserStore();

    useEffect(() => {
        if(post){
            setV(post.currentUserVoteOnPost);
            setUpvoteCount(post.totalUpvotes);
            setDownvoteCount(post.totalDownvotes);
        }
    },[post])

    const handleVote = async (voteType: "UPVOTE" | "DOWNVOTE" | "NOVOTE") => {
        const previousVote = v;
        const previousUpvotes = upvoteCount;
        const previousDownvotes = downvoteCount;
        // Optimistically update vote counts
        if (voteType === "UPVOTE") {
            if (v === "UPVOTE") {
                // Undo UPVOTE
                setUpvoteCount((prev) => (prev ?? 0) - 1);
                setV("NOVOTE");
            } else {
                // Apply UPVOTE
                setUpvoteCount((prev) => (prev ?? 0) + 1);
                if (v === "DOWNVOTE") {
                    setDownvoteCount((prev) => (prev ?? 0) - 1);
                }
                setV("UPVOTE");
            }
        } else if (voteType === "DOWNVOTE") {
            if (v === "DOWNVOTE") {
                // Undo DOWNVOTE
                setDownvoteCount((prev) => (prev ?? 0) - 1);
                setV("NOVOTE");
            } else {
                // Apply DOWNVOTE
                setDownvoteCount((prev) => (prev ?? 0) + 1);
                if (v === "UPVOTE") {
                    setUpvoteCount((prev) => (prev ?? 0) - 1);
                }
                setV("DOWNVOTE");
            }
        } else {
            // Undo any vote
            if (v === "UPVOTE") {
                setUpvoteCount((prev) => (prev ?? 0) - 1);
            } else if (v === "DOWNVOTE") {
                setDownvoteCount((prev) => (prev ?? 0) - 1);
            }
            setV("NOVOTE");
        }

        // Sync with the server
        try {
            const response:Load<string> = await makeRequest(
                `/posts/${post.id}/votes?userId=${user.id}&voteType=${voteType}`,
                { method: "POST" }
            );

            if (response.status === 200 && response.data) {
                // Reconcile optimistic UI updates with server response
                const currentUserVoteOnPost = response.data;
                setV(currentUserVoteOnPost);
            }else{
                setV(previousVote);
                setUpvoteCount(previousUpvotes)
                setDownvoteCount(previousDownvotes)
            }
        } catch (error) {
            console.error("Error casting vote:", error);
            setV(previousVote);
            setUpvoteCount(previousUpvotes)
            setDownvoteCount(previousDownvotes)
        }
    };


    return (
        <>
            <UpVoteButton
                onClick={() => handleVote(v === "UPVOTE" ? "NOVOTE" : "UPVOTE")}
                text={`${upvoteCount}`}
                vote={v === "UPVOTE"}
            />
            <DownVoteButton
                onClick={() => handleVote(v === "DOWNVOTE" ? "NOVOTE" : "DOWNVOTE")}
                text={`${downvoteCount}`}
                vote={v === "DOWNVOTE"}
            />

        </>
    );
};