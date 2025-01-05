'use client';
import { useEffect, useState, useCallback } from "react";
import { Load, makeRequest } from "@/app/utils/axios";
import { PostApiResponse, Post } from "@/app/utils/data-types"; // Assuming `Post` is your post model
import { FeedLoadingUI } from "@/app/components/FeedLoadingUI";
import { PostCard } from "@/app/components/post/PostCard";

export const ListOfPostCard = () => {
    const [content, setContent] = useState<PostApiResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(0); // Default page is 0
    const [pageSize] = useState<number>(10); // Fixed page size
    const [hasMore, setHasMore] = useState<boolean>(true); // Whether there are more posts to load

    // fetchData is now typed to return a PostApiResponse
    const fetchData = useCallback(async (pageNumber: number) => {
        setLoading(true);
        const request: Load<PostApiResponse> = await makeRequest<PostApiResponse>(`/posts?page=${pageNumber}&size=${pageSize}`);

        if (request.data) {
            if (request.data.content.length > 0) {
                setContent((prevContent) => {
                    if (!prevContent) {
                        // If there's no previous content, set the new data
                        return request.data;
                    } else {
                        // Only append posts that haven't been added already
                        const newPosts = request.data.content.filter((newPost) =>
                            !prevContent.content.some((existingPost) => existingPost.id === newPost.id)
                        );

                        // If there are new posts, append them
                        return {
                            ...prevContent,
                            content: [...prevContent.content, ...newPosts],
                        };
                    }
                });
            } else {
                setHasMore(false); // No more posts to load
            }
        }
        setLoading(false);
    }, [pageSize]);

    useEffect(() => {
        fetchData(page); // Initial fetch when the component mounts
    }, [page, fetchData]);

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const bottom = e.target.scrollHeight === e.target.scrollTop + e.target.clientHeight;
        if (bottom && !loading && hasMore) {
            setPage((prevPage) => prevPage + 1); // Increment page by 1
        }
    };

    return (
        <div onScroll={handleScroll} >
            {content ? (
                <>
                    {content.content && content.content.length > 0 ? (
                        <div>
                            {content.content.map((post: Post, index) =>{

                                return  (
                                    <PostCard key={post.id || index} post={post} />

                                );
                            } )}
                        </div>
                    ) : (
                        <p>No posts available.</p>
                    )}
                </>
            ) : (
                // Render 10 loading skeletons
                Array.from({ length: 10 }).map((_, index) => (
                     <div className={"p-6"} key={index}>
                         <FeedLoadingUI  />
                     </div>
                ))
            )}

            {/* Show loading indicator when more posts are being fetched */}
            {loading && <FeedLoadingUI />}
        </div>
    );
};
