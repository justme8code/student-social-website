import React, {ReactNode, Ref} from 'react';
import {PanelRight} from "lucide-react";

interface SidebarButtonToggleProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    buttonRef: Ref<HTMLButtonElement>; // Accept the ref
    className?: string;
    icon?: ReactNode;
    buttonToggleClassName?:string;
}

export const SidebarButtonToggle: React.FC<SidebarButtonToggleProps> = ({ isOpen, toggleSidebar, buttonRef,className,icon }) => {
    return (
        <button

            ref={buttonRef} // Attach the ref to the button
            onClick={toggleSidebar}
            className={` ${className}`}
        >
            {/*{isOpen ? 'Close' : 'Open'}*/}
            {icon?icon:<PanelRight/>}
        </button>
    );
};
