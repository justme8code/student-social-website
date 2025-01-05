type Post = {
    id: number;
    title:string,
    content:string,
    imageUrl:string,
    createdAt:string,
    user:User,
    commentCount:number,
    totalUpvotes: number,
    totalDownvotes: number,
    currentUserVoteOnPost: "UPVOTE"|"DOWNVOTE"|"NOVOTE"|null
}

type User = {
    id: string,
    name: string,
    username: string,
    profileImageUrl: string,
}

type PostApiResponse = {
    content: Post[];
    pageNumber: number;
    pageSize: number;
    totalElements: number;
};


export type { User , Post, PostApiResponse };