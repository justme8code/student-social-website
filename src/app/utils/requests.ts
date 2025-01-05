import { Load, makeRequest } from "@/app/utils/axios";

export const makePutRequest = async <T>(
    url: string,
    content: unknown,
    headers: Record<string, string> = {}
): Promise<Load<T>> => {
    const { status, data, error }: Load<T> = await makeRequest<T>(url, {
        method: "PUT",
        headers:headers,
        data:content,
    });

    return { status, data, error }; // Return destructured properties
};
