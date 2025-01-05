import Link from "next/link";
import {SearchIcon} from "lucide-react";

export const SearchBar = () => {

    return (
        <>


            {
                <Link href={"/search"}  className="flex  flex-col text-black dark:text-white  shadow-2xl rounded-lg  bg-neutral-200  dark:bg-neutral-800 w-full p-2 gap-2 focus-within:ring-purple-500 dark:focus-within:ring-purple-500">
                    <div  className={"flex gap-2"}>
                        <SearchIcon/>

                        <div   className={" border-none outline-none w-full bg-transparent flex items-center text-gray-500"}>
                            <p className={"text-sm"}>{"Search student social"}</p>
                        </div>

                    </div>


                </Link>
            }

        </>
    );
};