import {ReactionButton} from "@/app/components/buttons/ReactionButton";
import {UpvoteSvgComponent} from "@/app/components/buttons/UpvoteSvgComponent";

export interface VoteProps {
    onClick: () => void;
    vote: boolean | null;
    text?:string;
}
export const UpVoteButton:React.FC<VoteProps> = ({onClick,vote,text}) => {

    return (
        <>
            <ReactionButton icon={ <UpvoteSvgComponent fill={vote? "#a855f7" : undefined}
                                                       className={vote? "text-purple-500" : ""}/>} text={text} onClick={onClick}/>


        </>
    );
};