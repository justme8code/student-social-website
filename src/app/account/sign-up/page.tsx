import {SignInForm} from "@/app/account/auth/SignInForm";
import {SignUpForm} from "@/app/account/auth/SignUpForm";

export default function SignUpPage() {
  return (
      <div className="flex items-center justify-center min-h-screen p-8 bg-white">
        <div className={"space-y-10 w-full"}>
          <div>
            <h1 className={"text-2xl font-bold text-black"}>Sign Up For An Account</h1>
            <p className={"text-xs text-black"}>Sign Up for free and start learning</p>
          </div>
          <SignUpForm/>
        </div>
      </div>
  );
}
