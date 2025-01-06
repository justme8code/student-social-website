"use client"

import { z } from "zod"
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {CustomInput} from "@/app/components/CustomInput";
import {CustomButton} from "@/app/components/buttons/CustomButton";
import {LinkButton} from "@/app/components/buttons/LinkButton";
import {makeRequest} from "@/app/utils/axios";
import {User} from "@/app/config/data_types";
import {AUTH_URL} from "@/app/utils/api_endpoints";
import {showToast} from "@/hooks/show-toast";
import {toast} from "@/hooks/use-toast";
import useUserStore from "@/app/store/store";
import {useRouter} from "next/navigation";
import {Toaster} from "@/components/ui/toaster";

const formSchema = z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(6).max(255),

})



export const SignInForm= () => {
    const {fetchUser} = useUserStore();
    const [loading, setLoading] = useState(false); // Add loading state
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    })


    const handleLogin = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const { status, data, error } = await makeRequest<User>(`${AUTH_URL}/login`, {
                method: "POST",
                data: {
                    username: "@" + values.username.toLowerCase(),
                    password: values.password
                }
                // Remove headers and withCredentials as they're now set in axios instance
            });

            if (status === 200 && data !==null) {
                localStorage.setItem('student-s-logged-in-user', JSON.stringify({ id: data.id }));
                await fetchUser();
                router.replace("/");
            } else {
                showToast("Account status", `${error?.message || 'Login failed'} ☹️`);
            }
        } catch (error) {
            showToast("Account Status", "Login into your account failed ☹️");
            console.error("Error Logging In:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && (
                <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="loader border-t-transparent border-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                    <span className="ml-4 text-white font-semibold">Login in account...</span>
                </div>
            )}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <CustomInput
                                        className={"bg-transparent"}
                                        field={field}// Pass the field props to CustomInput
                                        placeholder="Enter username"
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />



                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <CustomInput
                                        className={"bg-transparent"}
                                        field={field}// Pass the field props to CustomInput
                                        placeholder="Enter password"
                                        type="password"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Minimum 6 characters.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <CustomButton text={"Sign In"} type={"submit"}/>
                    <p className="mt-5 text-sm text-center text-gray-600">
                        Don't have an account?{" "}
                        <LinkButton href={"/account/sign-up"} text={"Sign Up"} />
                    </p>
                </form>
            </Form>
            <Toaster/>
        </>
    );

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {


        handleLogin(values);


    }
};