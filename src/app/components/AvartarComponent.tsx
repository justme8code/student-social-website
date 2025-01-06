
import { ProfileAvatar } from "@/app/components/ProfileAvatar";
import useUserStore from "@/app/store/store";
import {IMAGE_URL} from "@/app/utils/api_endpoints";

export const AvartarComponent = ({ retention }: { retention: number }) => {
    const { user } = useUserStore();
    return (
        <div className="flex flex-col gap-2">
            {/* Profile Avatar with Circular Progress */}
            <div className="relative w-16 h-16">
                {/* Background Circle */}
                <div className="w-full h-full rounded-full border-4 border-gray-300"></div>
                {/* Progress Circle */}
                <div
                    className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-purple-700"
                    style={{
                        clipPath: "inset(0 0 0 50%)",
                        transform: `rotate(${3.6 * retention - 90}deg)`, // 3.6° per 1% of retention
                        transformOrigin: "center",
                    }}
                ></div>
                {/* Profile Picture */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <ProfileAvatar image={`${IMAGE_URL}/profile-images/${user.profileImageUrl}`} />
                </div>
            </div>
        </div>
    );
};
