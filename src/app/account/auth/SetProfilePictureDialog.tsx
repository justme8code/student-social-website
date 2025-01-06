import { CustomDialog, CustomDialogProps } from "@/app/components/CustomDialog";
import React, {useState } from "react";
import { IconButton } from "@/app/components/buttons/IconButton";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import useUserStore from "@/app/store/store";
import { USER_URL } from "@/app/utils/api_endpoints";
import { useRouter } from "next/navigation";
import {showToast} from "@/hooks/show-toast";
import {CheckCircle, Edit2Icon, XCircle} from "lucide-react";
import {ProfileAvatar} from "@/app/components/ProfileAvatar";
import {changeFile} from "@/app/utils/file-handler";
import {Toaster} from "@/components/ui/toaster";
import {Load, makeRequest} from "@/app/utils/axios";
import {User} from "@/app/config/data_types";

export const SetProfilePictureDialog: React.FC<CustomDialogProps> = ({ open, onClose }) => {
    const { user, setUser} = useUserStore();
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleFileChange = async(event: React.ChangeEvent<HTMLInputElement>) => {
        const data = await changeFile(event)
        setImage(data?.file)
        setImagePreview(data?.previewUrl);
    };

    const handleSubmit = async () => {
        if (loading) return; // Prevent multiple submissions
        setLoading(true);

        if (image && user) {
            const formData = new FormData();
            formData.append("profileImage", image);

            const { error, data, status }:Load<User> = await makeRequest(
                `${USER_URL}/${user.id}/profile-images`,
                {
                    method: "PUT",
                    data: formData,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (status === 200 && data !==null) {
                setUser(data);
                router.replace("/");
            } else {
                showToast("Account status", error?.message || "Could not update profile picture");
            }
        } else {
            showToast("Account status", "No image selected");
        }

        setLoading(false); // Ensure loading is reset
    };


    return (
        <div className={"relative"}>
            {loading && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        className="loader border-t-transparent border-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    <span className="ml-4 text-white font-semibold">Updating profile picture...</span>
                </div>
            )}

            <CustomDialog open={open} onClose={onClose} className={"space-y-4"}>
                {user && <div>{user.username}</div>}
                <div className={""}>
                    <DialogTitle className={"text-2xl font-bold"}>Set up your profile picture</DialogTitle>
                    <DialogDescription
                        className={"text-sm"}>{"Help others easily find you"}</DialogDescription>
                </div>
                <div className="text-center">
                    <div className="flex justify-center items-center space-x-4">
                        {/* Profile Avatar */}
                        <div className="relative">

                            <ProfileAvatar image={imagePreview} className={"w-52 h-52"}/>
                                <Edit2Icon/>

                            {/* File upload icon */}
                            <label htmlFor="picture"
                                   className="absolute bottom-5 right-3 p-2 bg-white rounded-full shadow-lg cursor-pointer">
                                <Edit2Icon/>
                            </label>
                            <input
                                id="picture"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />




                        </div>
                    </div>
                </div>


                <div className="mt-6 flex justify-between space-x-4">
                    {/* Cancel button with an icon */}
                    <IconButton
                        text={"Not now"}
                        type="button"
                        onClick={() => router.replace("/")}
                        className={"text-black"}
                        icon={<XCircle size={24} className="mr-2 text-red-500"/>}

                    />
                    <IconButton
                        text={`${loading?"Saving..":"Save"}`}
                        type="button"
                        className={"text-black"}
                        onClick={() => handleSubmit()}
                        icon={<CheckCircle size={24} className="mr-2 text-green-500"/>}
                        disabled={loading} // Prevent clicking multiple times
                    />


                </div>
            </CustomDialog>
            <Toaster/>
        </div>


)
    ;
};
