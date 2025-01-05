'use client';
import { motion } from "motion/react"

import React, {useEffect, useRef, useState} from "react";
import { NavbarComponent } from "@/app/components/layout/NavbarComponent";
import { ShortCard } from "@/app/components/short/ShortCard";
import { FeedTextCard } from "@/app/components/feed/FeedTextCard";
import {ArrowUpIcon, PenBoxIcon, TrendingDown} from "lucide-react";
import { Button } from "@headlessui/react";
import {TrendingComponent} from "@/app/components/common/TrendingComponent";
import {Search} from "@/app/components/common/Search";
import {SearchBar} from "@/app/components/common/SearchBar";
import {IconButton} from "@/app/components/common/buttons/IconButton";

export default function FeedsPage() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    // Track the previous scroll position
    const [lastScrollPosition, setLastScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPosition = window.scrollY;

            if (currentScrollPosition > 10) {
                // User is scrolling down
                setIsNavbarVisible(false);
            } else {
                // User is scrolling up
                setIsNavbarVisible(true);
            }

            setLastScrollPosition(currentScrollPosition);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollPosition]);

    return (
        <div className="relative">
            {/* Navbar */}
            {/* Navbar with Framer Motion */}
            <motion.div

                initial={{y: 0}} // Start position
                animate={{y: isNavbarVisible ? 1 : -81}} // Animate to hide/show
                transition={{duration: 0.5, ease: "easeInOut",}} // Smooth transition


                className="fixed top-0 left-0 w-full z-50 "

            >
                <NavbarComponent showStreak={isNavbarVisible}/>

            </motion.div>

            {!isNavbarVisible && <TrendingComponent/>}


            <div className={`fixed  bottom-20  right-2 z-50 `}>

                <div className={"bg-neutral-200  dark:bg-neutral-800  p-4 flex flex-col gap-10 justify-center shadow-2xl rounded-full"}>

                    <IconButton icon={<PenBoxIcon/>} className={""}/>
                </div>

            </div>
            {/* Feed Content */}
            <div className={`${isNavbarVisible ? "pt-48" : "pt-20"} pb-36   overflow-y-scroll`}>
                <FeedTextCard/>
                <FeedTextCard/>
                <FeedTextCard/>
                <FeedTextCard/>
            </div>

        </div>

    );
}