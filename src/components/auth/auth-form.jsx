import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { LoginForm } from "@/components/auth/login-form.jsx"
import { SignUpForm } from "@/components/auth/sign-up-form.jsx"
import { Button } from "@/components/ui/button.jsx"

export function AuthForm() {
    const [isLogin, setIsLogin] = useState(true)

    return (
        <div className="relative w-full max-w-md mx-auto p-4">
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={isLogin ? "login" : "signup"}
                    initial={{ opacity: 0, x: isLogin ? 40 : -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLogin ? -40 : 40 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                >
                    {isLogin
                        ? <LoginForm onToggle={() => setIsLogin(false)} />
                        : <SignUpForm onToggle={() => setIsLogin(true)} />}
                </motion.div>
            </AnimatePresence>
        </div>
    )
}