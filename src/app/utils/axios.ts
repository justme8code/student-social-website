import axios, {AxiosError, AxiosRequestConfig} from 'axios';
import {BASE_URL} from "@/app/utils/api_endpoints";

// Interface for error message returned by the Spring Boot server
export interface ErrorSeverMessage {
    message: string;
    statusCode: number;
    timestamp: Date;
}

// Your interface for response
export  interface Load<T> {
    data: T | null;
    error: null | ErrorSeverMessage;
    status: number;
}

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    withCredentials: true,
    headers : {
        "Content-Type": "application/json",
    }
});
// Add a request interceptor to include the token
axiosInstance.interceptors.request.use((config) => {

    const token = getCookie("student-s-cookie"); // Your cookie name
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(token);
    return config;
}, (error) => {
    return Promise.reject(error);
});




// Make the fetchData function more flexible by accepting method and data
export const makeRequest = async <T>(url: string, options: AxiosRequestConfig = {}) => {
    try {
        const response = await axiosInstance({
            url,
            method: options.method || 'GET', // Allow method like GET, POST, PUT, etc.
            ...options,

        });

        const loadData: Load<T> = {
            data: response.data,
            error: null,
            status: response.status,
        };

        return loadData;
    } catch (err) {

        console.log(err);
        const error = err as AxiosError<ErrorSeverMessage>; // Cast the error to AxiosError with your ErrorSeverMessage type

        let errorMessage: null |ErrorSeverMessage =  null;

        if (error.response) {
            // If the server responded with an error
            // This is the ErrorSeverMessage from Spring Boot
            errorMessage = JSON.parse(JSON.stringify(error.response.data));
        }

        const errorResponse: Load<T> = {
            data: null,
            error: errorMessage, // This could be either a string or ErrorSeverMessage
            status: error.response?.status || 500,
        };

        return errorResponse;
    }
};

export const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split('; ').reduce((acc, cookie) => {
        const [key, value] = cookie.split('=');
        acc[key] = value;
        return acc;
    }, {} as Record<string, string>);

    return cookies[name] || null;
};

