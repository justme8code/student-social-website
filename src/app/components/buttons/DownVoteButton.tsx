import {ReactionButton} from "@/app/components/buttons/ReactionButton";
import {DownvoteSvgComponent} from "@/app/components/buttons/DownvoteSvgComponent";
import {VoteProps} from "@/app/components/buttons/UpVoteButton";

export const DownVoteButton:React.FC<VoteProps> = ({onClick,text,vote}) => {

    return (
        <>
            <ReactionButton icon={<DownvoteSvgComponent fill={vote ? "#ef4444" : undefined}
                                                        className={vote ? "text-red-500" : ""}/> } text={text} onClick={onClick}/>

        </>
    );
};