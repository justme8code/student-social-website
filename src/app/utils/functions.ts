import {Load, makeRequest} from "@/app/utils/axios";
import {AUTH_URL} from "@/app/utils/api_endpoints";

export const handleLogout = () => {
    const {status}:Load<never>= makeRequest(`${AUTH_URL}/logout`,{
        method: "POST",
    })
    localStorage.removeItem("student-s-logged-in-user");
    localStorage.removeItem("student-s-user");

}
