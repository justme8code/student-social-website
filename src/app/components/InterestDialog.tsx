import React, { useEffect, useState } from "react";
import { CustomButton } from "@/app/components/buttons/CustomButton";
import {CustomDialog, CustomDialogProps} from "@/app/components/CustomDialog";
import { Load, makeRequest } from "@/app/utils/axios";
import {BASE_URL, USER_URL} from "@/app/utils/api_endpoints";
import {DialogDescription, DialogTitle} from "@/components/ui/dialog";
import useUserStore from "@/app/store/store";

interface InterestDialogProps  extends CustomDialogProps {
    selectedInterests: number[];
    onInterestChange: (interestId: number) => void;
}

interface Preference {
    id: number;
    category: string;
    name: string;
}

export const InterestDialog: React.FC<InterestDialogProps> = ({
                                                                  open,
                                                                  onClose,
                                                                  selectedInterests,
                                                                  onInterestChange,
                                                              }) => {
    const [preferences, setPreferences] = useState<Preference[]>([]);

    useEffect(() => {
        handleFetchPreferences();
    }, []);

    const handleFetchPreferences = async () => {
        const response: Load<Preference[]> = await makeRequest<Preference[]>(
            `${BASE_URL}/preferences`,
            { method: "GET", withCredentials: true },
        );

        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
            setPreferences(response.data);
        } else {
            // Log an error or handle the case where the data isn't an array
            console.error("Preferences data is not an array", response.data);
            setPreferences([]);  // Set an empty array in case of invalid data
        }
    };


    const groupedPreferences = preferences.reduce((acc: Record<string, Preference[]>, preference) => {
        if (!acc[preference.category]) {
            acc[preference.category] = [];
        }
        acc[preference.category].push(preference);
        return acc;
    }, {});



    return (
        <CustomDialog open={open} onClose={onClose} className={"text-black"}>
            <div className="flex flex-col space-y-7 text-black">
                <div className={""}>
                    <DialogTitle className={"text-2xl font-bold"}>What are your Interests?</DialogTitle>
                    <DialogDescription className={"text-sm"}>{"Let's personalizing your experience just to you"}</DialogDescription>
                </div>
                {Array.isArray(preferences) && Object.entries(groupedPreferences).map(([category, interests]) => (
                    <div key={category} className="space-y-2">
                        <h3 className="font-semibold text-xl">{category}</h3>
                        <div className="space-x-2 space-y-2">
                            {interests.map((interest) => (
                                <button
                                    key={interest.id}
                                    onClick={() => onInterestChange(interest.id)}
                                    className={`rounded-full p-2 ${
                                        selectedInterests.includes(interest.id)
                                            ? "bg-purple-500 text-white"
                                            : "bg-gray-200"
                                    }`}
                                >
                                    {interest.name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="">
                <CustomButton
                    text={"Save Interest"}
                    onClick={onClose}
                    className="rounded-full shadow-2xl bg-neutral-800"
                />
            </div>
        </CustomDialog>
    );
};
