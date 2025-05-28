import { useState } from "react"
import { signup } from "@/api/auth.js"
import { cn } from "@/lib/utils.js"
import { Button } from "@/components/ui/button.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"

export function SignUpForm({ className, onToggle, ...props }) {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        nickname: "",
    })
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { id, value } = e.target
        setForm((prev) => ({ ...prev, [id]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/

        if (form.password !== form.confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.")
            return
        }

        if (!passwordRegex.test(form.password)) {
            setError("비밀번호는 8자 이상의 영문, 숫자 조합입니다.")
            return
        }

        try {
            const data = await signup({
                email: form.email,
                password: form.password,
                userNickname: form.nickname,
            })
            console.log("회원가입 성공!", data)
            onToggle?.()
        } catch (err) {
            const errorCode = err?.response?.data?.code
            if (errorCode === 400001) {
                setError("이미 사용 중인 이메일입니다.")
            } else {
                setError(err.message)
            }
        }
    }

    return (
        <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">관리자 회원가입</h1>
                <p className="text-sm text-muted-foreground">
                    아주이벤트 관리자 계정을 생성하세요
                </p>
            </div>

            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="nickname">Nickname</Label>
                    <Input
                        id="nickname"
                        type="text"
                        placeholder="관리자 닉네임"
                        value={form.nickname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="example@ajou.ac.kr"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Password 확인</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && (
                    <p className="text-sm text-destructive -mt-2 -mb-8">
                        {error}
                    </p>
                )}
                <Button type="submit" className="w-full">
                    Sign up
                </Button>
            </div>

            <div className="text-center text-sm flex justify-center space-x-2">
                <span>이미 계정이 있으신가요?</span>
                <button
                    type="button"
                    className="underline underline-offset-4"
                    onClick={onToggle}
                >
                    로그인
                </button>
            </div>
        </form>
    )
}
