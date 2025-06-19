import { useState } from "react"
import { login } from "@/api/auth.js"
import { Button } from "@/components/ui/button.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import { cn } from "@/lib/utils.js"
import {useNavigate} from "react-router-dom";

export function LoginForm({ className, onToggle, ...props }) {
  const [form, setForm] = useState({ email: "", password: "" })
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { id, value } = e.target
    setForm((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const res = await login({
        email: form.email,
        password: form.password,
      })

      console.log("로그인 성공!", res.data)
      navigate("/member/role")
    } catch (err) {
      const code = err?.response?.data?.code
      if (code === 404001) {
        setError("존재하지 않는 관리자 계정입니다.")
      } else if (code === 400002) {
        setError("비밀번호가 일치하지 않습니다.")
      } else {
        console.log(err)
        setError("나는 할거 다함 백앤드가 처리못함")
      }
    }
  }

  return (
      <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">관리자 로그인</h1>
          <p className="text-balance text-sm text-muted-foreground">
            아주 이벤트 관리자 계정으로 로그인하기
          </p>
        </div>
        <div className="grid gap-6">
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <button className="ml-auto text-sm underline-offset-4 hover:underline"
              onClick={()=>{setError("그러게 잘 기억했어야지ㅋ")}}>
                비밀번호를 잊으셨나요?
              </button>
            </div>
            <Input
                id="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
            />
          </div>
          {error && <p className="text-sm text-destructive -mt-2 -mb-8">
            {error}
          </p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
          </div>
          <Button variant="outline" className="w-full" onClick={()=> {setError("구현 안했는데?")}}>
            <img
                src="/ajouEvent-logo.svg"
                alt="AjouEvent Logo"
                className="mr-2 h-6 w-6"
            />
            Login with AjouEvent
          </Button>
        </div>
        <div className="text-center text-sm flex justify-center space-x-2">
          <span>아직 관리자가 아니신가요?(?)</span>
          <button type="button" className="underline underline-offset-4" onClick={onToggle}>
            회원가입
          </button>
        </div>
      </form>
  )
}
