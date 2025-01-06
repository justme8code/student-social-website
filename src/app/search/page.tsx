'use client';
import React, { useState } from "react";
import { SearchIcon, XCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Navbar2 } from "@/app/layout/Navbar2";

// Template data for suggestions
const suggestionsData: string[] = [
    "JavaScript",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Python",
    "Django",
    "Java",
    "Spring Boot",
];

export default function SearchPage() {
    const [query, setQuery] = useState<string>(""); // State for the search query
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]); // State for filtered suggestions

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);

        // Filter suggestions based on query
        if (value.trim() === "") {
            setFilteredSuggestions([]);
        } else {
            const filtered = suggestionsData.filter((item) =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion); // Set query to clicked suggestion
        setFilteredSuggestions([]); // Clear suggestions
    };

    return (
        <div className="w-full h-screen dark:bg-neutral-900 flex flex-col items-center p-2">
            {/* Search Bar */}
            <Navbar2>
                <div className="w-full max-w-4xl">
                    <div
                        className="flex flex-col text-black dark:text-white bg-neutral-100 rounded-lg dark:bg-neutral-800 w-full p-2 gap-2 focus-within:ring-purple-500">
                        <div className={"flex gap-2"}>
                            <SearchIcon className={"text-gray-400"} />
                            <input
                                type="text"
                                value={query}
                                onChange={handleInputChange}
                                className={"border-none outline-none w-full bg-transparent text-sm"}
                                placeholder={"Search student social"}
                            />
                            <button onClick={() => setQuery("")}>
                                <XCircleIcon className={"text-gray-400"} />
                            </button>
                        </div>
                    </div>
                </div>
            </Navbar2>

            {/* Suggestions */}
            {filteredSuggestions.length > 0 && (
                <ul className="w-full max-w-4xl mt-2 border-t border-t-neutral-200 dark:border-t-neutral-800 pt-10">
                    <h1 className={"font-bold mt-1"}>Communities</h1>
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    className="h-6 w-6 rounded-full object-cover"
                                    src="https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg"
                                    alt="User Avatar"
                                />
                                <div className={"flex flex-col"}>
                                    <span className="font-semibold text-xs">s/Username</span>
                                    <span className={"text-xs text-neutral-500"}>5k members</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
