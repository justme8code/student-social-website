'use client';

import {BellIcon, HomeIcon, PlusIcon, Telescope, UserCircle2, VideoIcon} from "lucide-react";
import { FaRobot } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import { BottomNavButton } from "@/app/layout/BottomNavButton";

const style = "w-6 h-6";

export default function BottomNav() {
    const pathName = usePathname();

    if (pathName === "/account" || pathName === "/account/sign-up") {
        return null;
    }

    return (
        <div className="fixed bottom-0 w-full bg-white dark:bg-neutral-900">
            <div className="flex items-center justify-between px-4 py-3">
                <BottomNavButton
                    icon={<HomeIcon className={style} />}
                    href="/"
                    text="Home"
                    currentPathName={pathName}
                />
                <BottomNavButton
                    icon={<VideoIcon className={style} />}
                    href="/tik-learn"
                    text="Tik-learn"
                    currentPathName={pathName}
                />
                <BottomNavButton
                    icon={<PlusIcon className={style} />}
                    text="Create"
                    currentPathName={pathName}
                    href={"/posts/create"}
                />
                <BottomNavButton
                    icon={<Telescope className={style} />}
                    href="/explore"
                    text="Explore"
                    currentPathName={pathName}
                />
                <BottomNavButton
                    icon={<BellIcon className={style} />}
                    href="/inbox"
                    text="Inbox"
                    currentPathName={pathName}
                />
            </div>


        </div>
    );
}
