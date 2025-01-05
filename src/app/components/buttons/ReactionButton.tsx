import {IconButton, IconButtonProps} from "@/app/components/buttons/IconButton";

export const ReactionButton:React.FC<IconButtonProps> = ({icon,text,onClick,className}) => {
    return (
        <>
            <IconButton icon={icon} text={text} className={` items-center bg-transparent  hover:bg-transparent dark:bg-transparent  text-xs   justify-center ${className}`} onClick={onClick}/>
        </>
    );
};