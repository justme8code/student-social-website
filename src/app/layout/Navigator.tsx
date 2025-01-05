import React from "react";
import {usePathname, useRouter} from "next/navigation";
import { motion } from "framer-motion";

interface NavigatorProps {
    children: React.ReactNode;
}


export const Navigator: React.FC<NavigatorProps> = ({ children }) => {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname} // Unique key for transitions
            initial={{ opacity: 0 }} // Start invisible
            animate={{ opacity: 1 }} // Fully visible
            exit={{ opacity: 0 }} // Fade out
            transition={{
                type: "tween",
                duration: 0.2, // Smooth and quick
                ease: "easeOut", // Natural fade-in
            }}
            className="fixed inset-0  z-50 shadow-lg overflow-auto"
        >
            {children}
        </motion.div>
    );
};


