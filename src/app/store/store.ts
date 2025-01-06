import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {Load, makeRequest} from "../utils/axios";
import { USER_URL } from "@/app/utils/api_endpoints";
import { User } from "@/app/config/data_types";

interface UserState {
    user: User; // Holds the user object
    fetchUser: () => Promise<void>; // Method to fetch user data
    setUser: (user: User) => void; // Method to set user manually
}

const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user:{}, // Default state
            fetchUser: async () => {
                // Retrieve id or username from localStorage
                const loggedInUser = localStorage.getItem("student-s-logged-in-user");
                                if (!loggedInUser) {
                                    console.error("User not logged in.........................");
                                    return;
                                }
                                const { id } = JSON.parse(loggedInUser);
                                try {
                                    // Fetch user data using the id or username from localStorage
                                    const response:Load<User> = await makeRequest(`${USER_URL}/${id}`, {
                                        method: "GET",
                                    });
                                    if(response.data){
                                        const user = response.data;
                                        set({ user });
                                    }


                                } catch (error) {
                                    console.error("Failed to fetch user data:", error);
                                }
            },
            setUser: (user: User) => {
                set({ user }); // Correctly updates the `user` state
            },
        }),
        {
            name: "student-s-user", // Key for localStorage (only for Zustand state)
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useUserStore;
