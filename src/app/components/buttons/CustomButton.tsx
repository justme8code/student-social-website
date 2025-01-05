import {Button} from "@/components/ui/button";
import React from "react";


export interface AppButtonProps{
    text?:string;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "submit" | "reset" | "button" | undefined

}
export const CustomButton:React.FC<AppButtonProps> = ({text,type,onClick,className}) => {
    return (
        <>
            <Button onClick={onClick}
                    type={type}
                    className={`w-full rounded-full bg-purple-600 py-2 px-4 text-md text-white hover:bg-purple-500 active:bg-purple-700 ${className}`}>
                {text}
            </Button>
        </>
    );
};