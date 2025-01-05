'use client';
import React, { useState } from "react";
import { IconButton } from "@/app/components/buttons/IconButton";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import useUserStore from "@/app/store/store";
import { BASE_URL, USER_URL } from "@/app/utils/api_endpoints";
import { useRouter } from "next/navigation";
import { showToast } from "@/hooks/show-toast";
import { CheckCircle, Edit2Icon, XCircle } from "lucide-react";
import { ProfileAvatar } from "@/app/components/ProfileAvatar";
import { changeFile } from "@/app/utils/file-handler";
import { makeRequest } from "@/app/utils/axios";
import {Navbar2} from "@/app/layout/Navbar2";

export default function SetProfilePage() {
    const { user, setUser } = useUserStore();
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2MB

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const data = await changeFile(event);
        if (data?.file) {
            if (data.file.size > MAX_IMAGE_SIZE) {
                showToast(
                    "Error",
                    "Image size exceeds 2MB. Please select a smaller image."
                );
                return;
            }
            setImage(data.file);
            setImagePreview(data.previewUrl);
        } else {
            showToast("Error", "Failed to process file. Please try again.");
        }
    };

    const handleSubmit = async () => {
        if (loading) return; // Prevent multiple submissions
        setLoading(true);

        if (image && user) {
            const formData = new FormData();
            formData.append("profileImage", image);

            const { error, data, status } = await makeRequest(
                `${USER_URL}/${user.id}/profile-images`,
                {
                    method: "PUT",
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (status === 200) {
                setUser(data);
                showToast("Success", "Profile picture updated successfully!");
                router.replace("/");
            } else {
                showToast("Error", error?.message || "Failed to update profile picture.");
            }
        } else {
            showToast("Info", "Please select an image before saving.");
        }

        setLoading(false);
    };

    const profileImageUrl = imagePreview
        ? imagePreview
        : user?.profileImageUrl
            ? `${BASE_URL}/resources/images/profile-images/${user.profileImageUrl}`
            : "";

    return (
        <>
        <Navbar2/>
        <div className="relative flex flex-col p-5 space-y-20 justify-between pt-20">

            {loading && (
                <div
                    role="alert"
                    aria-live="assertive"
                    className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50"
                >
                    <div className="loader border-t-transparent border-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    <span className="ml-4 text-white font-semibold">
                        Updating profile picture...
                    </span>
                </div>
            )}

            <div>
                {user && <p className="text-2xl font-bold">{user.username}</p>}
                <h1 className="text-2xl font-bold">Set up your profile picture</h1>
                <p className="text-sm">Help others easily find you</p>
            </div>

            <div className="text-center">
                <div className="flex justify-center items-center space-x-4">
                    <div className="relative">
                        <ProfileAvatar image={profileImageUrl} className="w-28 h-28" />

                        {/* File upload icon */}
                        <label
                            htmlFor="picture"
                            className="absolute bottom-4 -right-2 p-2 bg-white dark:bg-neutral-800 rounded-full shadow-lg cursor-pointer"
                            aria-label="Upload profile picture"
                        >
                            <Edit2Icon />
                        </label>
                        <input
                            id="picture"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            aria-describedby="image-instructions"
                        />
                        <p id="image-instructions" className="sr-only">
                            Upload an image smaller than 2MB. Allowed formats are JPG, PNG, and
                            GIF.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-between space-x-4">
                <IconButton
                    text="Not now"
                    type="button"
                    onClick={() => router.replace("/")}
                    className="text-black"
                    icon={<XCircle size={24} className="mr-2 text-red-500" />}
                />
                <IconButton
                    text={loading ? "Saving.." : "Save"}
                    type="button"
                    className="text-black"
                    onClick={handleSubmit}
                    icon={<CheckCircle size={24} className="mr-2 text-green-500" />}
                    disabled={loading}
                />
            </div>
        </div>
        </>
    );
}
