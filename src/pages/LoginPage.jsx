import { LoginForm } from "@/components/auth/login-form.jsx"
import { GalleryVerticalEnd } from "lucide-react"
import {SignUpForm} from "@/components/auth/sign-up-form.jsx";
import {AuthForm} from "@/components/auth/auth-form.jsx";

export default function LoginPage() {
    return (
        <div className="grid min-h-screen lg:grid-cols-2">
            {/* 왼쪽 영역 */}
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="https://www.ajouevent.com/" className="flex items-center gap-2">
                        <img
                            src="/ajouEvent-logo.svg"
                            alt="AjouEvent Logo"
                            className="mr-2 h-9 w-9"
                        />
                        <span className="text-xl font-semibold">
                            AJOU EVENT
                        </span>
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <AuthForm />
                    </div>
                </div>
            </div>

            {/* 오른쪽 이미지 영역 */}
            <div className="relative hidden bg-muted lg:block">
                <img
                    src="/placeholder.svg"
                    alt="Login Illustration"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}
