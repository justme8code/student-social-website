import { Post } from "@/app/utils/data-types";
import { AvatarUsernameComponent } from "@/app/components/AvatarUsernameComponent";
import { PostReactions } from "@/app/components/post/PostReactions";
import { RESOURCE_URL } from "@/app/utils/api_endpoints";
import TimeAgo from 'timeago-react'; // var TimeAgo = require('timeago-react');
import {ImageComponent} from "@/app/components/ImageComponent";
import {Skeleton} from "@/components/ui/skeleton"; // Import react-timeago

export const PostCard = ({post}:{post:Post}) => {

    //TODO Check vote option for post

    const image = post.imageUrl !==null && (post.imageUrl.endsWith(".jpg") || post.imageUrl.endsWith(".png"));
    return (
        <div className="border-b   border-b-neutral-200 p-4 dark:border-b-neutral-800   bg-transparent space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <AvatarUsernameComponent
                    username={post.user.username}
                    imageUrl={post.imageUrl?`${RESOURCE_URL}/images/profile-images/${post.user.profileImageUrl}`: ""}
                />
                <span className="block text-xs text-gray-500">s/Metaphysics • <TimeAgo datetime={post.createdAt} locale={"en-US"}/></span>
            </div>

            {/* Content */}
            <div className="space-y-2">
            <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-100">{post.title}</h2>
                <p className="text-sm text-neutral-600 dark:text-neutral-300">{post.content}</p>

                {post.imageUrl && image && (
                    <ImageComponent imageUrl={`${RESOURCE_URL}/images/post-images/${post.imageUrl}`} alt={`Image for ${post.title}`} priority={true} className={"rounded-lg"}>
                        <Skeleton className="h-[125px] w-full rounded-xl" />
                    </ImageComponent>
                )}
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
                <PostReactions post={post} />
                <span className="text-sm text-neutral-500 dark:text-neutral-400">

                </span>
            </div>
        </div>
    );
};
