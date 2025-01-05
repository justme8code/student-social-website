'use client';
import {ReactNode, useEffect} from "react";
import useUserStore from "@/app/store/store";
import {AnimatePresence} from "framer-motion";
import {usePathname, useRouter} from "next/navigation";
import {Navigator} from "@/app/layout/Navigator";
import {handleLogout} from "@/app/utils/functions";

export const App = ({children}:{children:ReactNode}) => {
    const {user, fetchUser } = useUserStore();
    /*const router = useRouter();

    useEffect(() => {
        // Fetch user data on app load
        if(!user){
            handleLogout();
            router.replace("/account");
        }else{
            fetchUser();
        }

    }, [fetchUser, router, user]);*/

    const pathname = usePathname(); // Get the current route path

    return (
        <>
            <AnimatePresence mode="wait">
                <Navigator key={pathname}>
                    {children}
                </Navigator>
            </AnimatePresence>
        </>
    );
};


