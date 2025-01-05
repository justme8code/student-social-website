import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { SidebarButtonToggle } from './SidebarButtonToggle';
import { SidebarMenu } from './SidebarMenu';

interface SidebarProps {
    children: ReactNode;
    buttonToggleClassName?:string;
    side?: 'left' | 'right';  // New prop to control the side
    icon?: ReactNode;
    className?: string;
}

export const Sidebar = ({ children, side = 'left',buttonToggleClassName ,icon,className}: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);  // Reference for the sidebar
    const buttonRef = useRef<HTMLButtonElement>(null); // Reference for the toggle button

    const toggleSidebar = () => setIsOpen(!isOpen);

    // Close sidebar if user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // If the click is outside of the sidebar and button, close the sidebar
            if (
                sidebarRef.current && !sidebarRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <SidebarButtonToggle
                isOpen={isOpen}
                toggleSidebar={toggleSidebar}
                buttonRef={buttonRef} // Pass the button ref to SidebarButtonToggle
                className={buttonToggleClassName}
                icon={icon}
            />
            {/* Sidebar */}
            <div
                ref={sidebarRef} // Attach the sidebar ref here
                className={`fixed top-0 z-10  ${side === 'left' ? 'left-0' : 'right-0'} w-64   h-full p-4  transform transition-transform ${
                    isOpen ? 'translate-x-0' : side === 'left' ? '-translate-x-full' : 'translate-x-full'
                } md:translate-x-0 ${className}`}
            >
                {children}
            </div>
        </>
    );
};

export default Sidebar;
