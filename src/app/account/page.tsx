import {CustomCard} from "@/app/components/CustomCard";
import {SignInForm} from "@/app/account/auth/SignInForm";

export default function SignInPage() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen p-8 bg-white text-black">
                <div className={"space-y-10 w-full"}>
                    <div>
                        <h1 className={"text-2xl font-bold"}>Sign In Your Account</h1>
                        <p className={"text-xs"}>Sign in to interact with others and your friends</p>
                    </div>
                    <SignInForm/>
                </div>
            </div>
        </>
    );
}
