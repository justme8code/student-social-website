import Link from "next/link";
import React, { ReactNode } from "react";

interface BottomNavButtonProps {
    icon: ReactNode;
    href: string;
    text?: string;
    currentPathName?: string;
}


export const BottomNavButton: React.FC<BottomNavButtonProps> = ({ icon, href, text, currentPathName}) => {
    const isActive = href === currentPathName;

    return (
       <>
           <Link
               href={href}
               className={`flex flex-col items-center`}
           >
               {React.cloneElement(icon as React.ReactElement, {
                  className:` ${isActive?"dark:text-white text-black":"text-gray-400"}  `
               })}

               <p className={`text-xs text-gray-600 ${isActive ? " dark:text-white text-black font-bold":""} `}>{text}</p>
           </Link>


       </>
    );
};
