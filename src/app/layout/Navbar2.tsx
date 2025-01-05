import {ReactNode, useEffect, useState} from "react";
import {ArrowLeft} from "lucide-react";

export const Navbar2 = ({ title, children , className}:{title?:string,children?:ReactNode,className?:string}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Simulate a loading effect when toggling
        if (isOpen) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 500); // Simulate a 500ms loading time
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    return (
        <nav className={` bg-white  p-2 fixed top-0 w-full  dark:bg-neutral-900  z-30  ${className}  `}>
            {/* Navbar Container */}
            <div className="flex items-center justify-between">
                {/* Back Arrow */}
                <button
                    className="flex items-center pr-2 "
                    onClick={() => window.history.back()} // This goes back to the previous page
                >
                    <ArrowLeft/>
                   {/* <span className=" ">Back</span>*/}
                </button>

                {/* Navbar Title */}
                <h1 className="text-xl font-semibold">{title}</h1>

                {children}
            </div>


        </nav>
    );



};
