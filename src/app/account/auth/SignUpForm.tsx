'use client';
import { z } from "zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { CustomInput } from "@/app/components/CustomInput";
import { CustomButton } from "@/app/components/buttons/CustomButton";
import { LinkButton } from "@/app/components/buttons/LinkButton";
import { InterestDialog } from "@/app/components/InterestDialog";
import {Load, makeRequest} from "@/app/utils/axios";
import {AUTH_URL} from "@/app/utils/api_endpoints";
import {Toaster} from "@/components/ui/toaster";
import {toast} from "@/hooks/use-toast";
import useUserStore from "@/app/store/store";
import {showToast} from "@/hooks/show-toast";
import {User} from "@/app/config/data_types";
import {useRouter} from "next/navigation";


const formSchema = z.object({
    username: z.string()
        .min(2)
        .max(50)
        .regex(/^[a-zA-Z0-9]+$/, "Username can only contain alphabets and numbers"),
    fullName: z.string().min(2).max(50),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6).max(255),
});

export const SignUpForm = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedInterests, setSelectedInterests] = useState<number[]>([]);
    const [loading, setLoading] = useState(false); // Add loading state
    const {fetchUser} = useUserStore();
    const router = useRouter();


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            fullName: "",
            email: "",
            password: "",
        },
    });

    // Handle interest selection change
    const handleInterestChange = (interestId: number) => {
        setSelectedInterests((prev) =>
            prev.includes(interestId)
                ? prev.filter((item) => item !== interestId)
                : [...prev, interestId]
        );
    };

    // Handle form submission
    async function onSubmit  (values: z.infer<typeof formSchema>) {
        setLoading(true); // Start loading
       try { //setOpenProfilePictureDialog(true)
           const response: Load<string> = await makeRequest<string>(`${AUTH_URL}`, {
               method: "POST",
               data: {
                   username: `@${values.username.toLowerCase()}`,
                   name: values.fullName,
                   email: values.email,
                   password: values.password,
                   preferences: selectedInterests,
               }
           })
           if (response.status === 200) {
               await handleLogin(values);
           } else {
               toast({
                   title: "Account Status",
                   description: `${response.error?.statusCode} ☹️`,
               });
           }
       }catch (error) {
           toast({
               title: "Account Status",
               description: "Creating your account failed ☹️",
           });
           console.error("Error during submission:", error);
       } finally {
           setLoading(false); // End loading
       }
    }

    const handleLogin = async (values: z.infer<typeof formSchema>) => {
        try {
            const { status, data } = await makeRequest<User>(`${AUTH_URL}/login`, {
                method: "POST",
                data: { username: "@" + values.username.toLowerCase(), password: values.password },
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (status === 200 && data !==null) {
                console.log("Login successful:", data);
                localStorage.setItem('student-s-logged-in-user', JSON.stringify({ id: data.id}));
                fetchUser();
                router.replace("/auth/profile");
            } else {
                showToast("Account status", "Creating your account failed ☹️");
            }

        } catch (error) {
            toast({
                title: "Account Status",
                description: "Creating your account failed ☹️",
            });
            console.error("Error during submission:", error);
        }
    };



    return (
        <>
            <div className={"relative text-black"}>
                {loading && (
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
                        <div className="loader border-t-transparent border-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
                        <span className="ml-4 text-white font-semibold">Creating Account...</span>
                    </div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <CustomInput
                                            className={"inset-y-5 bg-transparent"}
                                            field={field}
                                            placeholder="Username"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="fullName"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <CustomInput
                                            className={"bg-transparent"}
                                            field={field}
                                            placeholder="Full name"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <CustomInput
                                            className={"bg-transparent"}
                                            field={field}
                                            placeholder="Email"
                                            type="email"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <CustomInput
                                            className={"bg-transparent"}
                                            field={field}
                                            placeholder="Password"
                                            type="password"
                                        />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <CustomButton
                            text={`What interests you? ${selectedInterests.length}`}
                            type="button"
                            className={"text-sm font-bold bg-gray-200 text-black hover:bg-gray-300 active:bg-gray-300"}
                            onClick={() => setOpenDialog(true)} // Opens the dialog to add more interests
                        />

                        {/* Submit button */}
                        <CustomButton
                            text="Submit"
                            type="submit"
                        />


                        <p className="mt-5 text-sm text-center text-gray-600">
                            {"You've got an account? "}
                            <LinkButton href={"/account/"} text={"Sign In"} />
                        </p>
                    </form>
                </Form>

                {/* Interest Dialog */}
                <InterestDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    selectedInterests={selectedInterests}
                    onInterestChange={handleInterestChange}
                />
                <Toaster />

            </div>

        </>
    );
};
