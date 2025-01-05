
import {JSX} from "react";
import {AppButtonProps} from "@/app/components/buttons/CustomButton";


export interface IconButtonProps extends AppButtonProps {
    icon:JSX.Element;
}
export const IconButton:React.FC<IconButtonProps> = ({icon,text,onClick,className,disabled}) => {
    return (
        <>
            <button onClick={onClick} className={`flex  rounded-full  p-2 space-x-2  text-black items-center bg-gray-300 dark:bg-neutral-800 dark:text-gray-400 hover:bg-gray-400 ${className}`} disabled={disabled}>
                {icon}
                {text && <span>{text}</span>}
            </button>
        </>
    );
};