import {ReusableAvatarComponent} from "@/app/components/ReusableAvatarComponent";

export const AvatarUsernameComponent = ({username,imageUrl}:{username:string,imageUrl:string}) => {
    return (
        <>
            <div className="flex items-center gap-3">
                <ReusableAvatarComponent imageUrl={imageUrl} alt={username} className={"h-14 w-14"}/>
                <div>
                    <span className="font-semibold text-sm">{username}</span>
                </div>
            </div>

        </>
    );
};