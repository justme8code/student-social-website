
import Link from "next/link";
import {AppButtonProps} from "@/app/components/buttons/CustomButton";

export interface LinkButtonProps extends AppButtonProps {
     href:string;
}
export const LinkButton:React.FC<LinkButtonProps> = ({href,text,className}) => {
    return (
        <>
            <Link href={href} className={`text-purple-600 hover:underline font-bold ${className}`}>
                {text}
            </Link>
        </>
    );
};