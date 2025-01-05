'use client';
import React, { useState } from "react";
import { IconButton } from "@/app/components/buttons/IconButton";
import { DialogDescription, DialogTitle } from "@/components/ui/dialog";
import useUserStore from "@/app/store/store";
import { BASE_URL, USER_URL } from "@/app/utils/api_endpoints";
import { useRouter } from "next/navigation";
import { showToast } from "@/hooks/show-toast";
import {CheckCircle, Edit2Icon, UserPlus2Icon, XCircle} from "lucide-react";
import { ProfileAvatar } from "@/app/components/ProfileAvatar";
import { changeFile } from "@/app/utils/file-handler";
import { makeRequest } from "@/app/utils/axios";
import {Navbar2} from "@/app/layout/Navbar2";
import {CustomButton} from "@/app/components/buttons/CustomButton";
import {FollowButton} from "@/app/components/buttons/FollowButton";

export default function EditProfilePage() {

    return (
        <>
            <Navbar2 className={"bg-white"}>
                 <FollowButton following={true} />
            </Navbar2>
        </>
    );
}
