import Link from "next/link";
import {AppButtonProps} from "@/app/components/buttons/CustomButton";

export interface StyledLinkButtonProps extends AppButtonProps {
    href:string;
}
export const StyledLinkButton:React.FC<StyledLinkButtonProps>= ({href,text,className}) => {
    return (
        <>
            <Link href={href} className={`w-full rounded-full py-2 px-4 text-md   hover:bg-purple-500 active:bg-purple-700   bg-white dark:bg-neutral-950 dark:text-white  text-black ${className}`}>
                {text}
            </Link>
        </>
    );
};