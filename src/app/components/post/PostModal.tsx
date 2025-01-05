'use client';

import { CustomDialog, CustomDialogProps } from "@/app/components/CustomDialog";
import { ImageIcon, TimerIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import {getImagePreview} from "@/app/utils/file-handler";
import useUserStore from "@/app/store/store";
import {makeRequest} from "@/app/utils/axios";
import {BASE_URL, USER_URL} from "@/app/utils/api_endpoints";
import {useRouter} from "next/navigation";


type PostModalProps = CustomDialogProps;

export const PostModal: React.FC<PostModalProps> = ({ open, onClose }) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [postTitle, setPostTitle] = useState<string>("");
    const [postBody, setPostBody] = useState<string>("");
    const {user} = useUserStore();
    const router = useRouter();

    // Timer state management
    const [timerMenuVisible, setTimerMenuVisible] = useState(false);
    const [selectedTime, setSelectedTime] = useState(0); // Default time is 1 minute

    const handleInput = () => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto"; // Reset height to calculate new height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set new height
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const previewUrl = await getImagePreview(file);
                setImagePreview(previewUrl);
            } catch (error) {
                console.error("Error processing image:", error);
            }
        }
    };

    const handlePostSubmit = async () => {
        const imageFile = fileInputRef.current?.files?.[0];
        if (!postTitle || !postBody) {
            alert("Please fill in all fields.");
            return;
        }

        const formData = new FormData();
        formData.append("post",new Blob([JSON.stringify({ title: postTitle, content: postBody })],{type: "application/json"}));
        if (imageFile) {
            formData.append("image", imageFile);
        }

         if(user && user.id){
             try {
                 const response = await makeRequest(`${USER_URL}/${user.id}/posts`, {
                     method: "POST",
                     data: formData,
                     headers: {"Content-Type": "multipart/form-data"}
                 });

                 if (response.status === 201) {
                     alert("Post submitted successfully!");
                     router.push("/");
                 } else {
                     console.error("Error submitting post:", response);
                     alert("Something went wrong!");
                 }
             } catch (error) {
                 console.error("Network error:", error);
             }
         }
    };


    const handleRemoveImage = () => {
        setImagePreview(null); // Clear the image preview
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Reset file input so it can be used again
        }
    };

    // Timer menu functions
    const incrementTime = () => {
        if (selectedTime < 5) {
            setSelectedTime(selectedTime + 1);
        }
    };

    const decrementTime = () => {
        if (selectedTime > 0) {
            setSelectedTime(selectedTime - 1);
        }
    };

    const toggleTimerMenu = () => {
        setTimerMenuVisible(!timerMenuVisible); // Toggle the timer menu visibility
    };

    return (
        <CustomDialog
            open={open}
            onClose={onClose}
            className="flex flex-col justify-between h-full shadow-md   p-5 dark:bg-neutral-900"
        >
            {/* Header */}
            <main>
                <div className="text-xl font-semibold pb-4 border-b border-gray-200 dark:border-b-neutral-800">
                    Create a Post
                </div>
                {/* Input Fields */}
                <div className="flex flex-col space-y-2 mt-4">
                    {/* Title Input */}
                    <input
                        value={postTitle}
                        className="w-full text-lg p-3 outline-none bg-transparent dark:text-white"
                        maxLength={200}
                        placeholder="Title"
                        onChange={event => setPostTitle(event.target.value)}
                    />
                    {/* Body Textarea */}
                    <textarea
                        value={postBody}
                        ref={textareaRef}
                        placeholder="Write your post here..."
                        className="w-full p-3 text-sm resize-none overflow-hidden outline-none bg-transparent dark:text-white"
                        onInput={handleInput}
                        style={{ height: "auto", maxHeight: "50vh" }}
                        onChange={event => setPostBody(event.target.value)}
                    />
                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="relative w-24 h-24 mt-2">
                            <img
                                src={imagePreview}
                                alt="Image Preview"
                                className="w-full h-full rounded-md object-cover"
                            />
                            {/* Close button on top of the image */}
                            <button
                                onClick={handleRemoveImage}
                                className="absolute top-0 right-0 p-1 bg-white bg-opacity-70 rounded-full text-gray-600 hover:bg-gray-200 dark:bg-neutral-800 dark:text-white"
                                aria-label="Remove Image"
                            >
                                ✕
                            </button>
                        </div>
                    )}
                    {/* File Input for Image Upload */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />
                    {/* Timer Info */}
                    {selectedTime > 0 && (
                        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                            <p>This question would be answered within {selectedTime} minute{selectedTime > 1 ? "s" : ""}.</p>
                        </div>
                    )}
                </div>

            </main>

            {/* Footer */}
            <section className="flex justify-end items-center gap-4 mt-6">
                {/* Icons */}
                <button
                    onClick={() => fileInputRef.current?.click()} // Trigger the file input click when button is clicked
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
                    aria-label="Add Image"
                >
                    <ImageIcon className="w-6 h-6 text-gray-600 dark:text-white" />
                </button>

                {/* Timer Icon and Menu */}
                <button
                    onClick={toggleTimerMenu}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition"
                    aria-label="Set Timer"
                >
                    <TimerIcon className="w-6 h-6 text-gray-600 dark:text-white" />
                </button>

                {/* Timer Pop-up Menu */}
                {timerMenuVisible && (
                    <div className="absolute bottom-20  right-16  mt-2 p-4 bg-white shadow-md rounded-md dark:bg-neutral-800 dark:text-white">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={decrementTime}
                                className="px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                            >
                                -
                            </button>
                            <span className="text-lg">{selectedTime} min</span>
                            <button
                                onClick={incrementTime}
                                className="px-2 py-1 bg-gray-100 rounded-full hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
                            >
                                +
                            </button>
                        </div>
                    </div>
                )}

                {/* Submit Button */}
                <button className="px-5 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition dark:bg-purple-600 dark:hover:bg-purple-700" onClick={event => handlePostSubmit()}>
                    Post
                </button>
            </section>
        </CustomDialog>
    );
};
