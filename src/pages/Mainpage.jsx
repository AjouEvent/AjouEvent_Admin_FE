// src/pages/MainPage.jsx
import Sidebar from "../components/layout/Sidebar"

export default function MainPage() {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-6 bg-muted overflow-auto">
                <h1 className="text-2xl font-bold mb-4">관리자 대시보드</h1>
                <p>로그인 후 보이는 관리자 메인 페이지입니다.</p>
            </main>
        </div>
    )
}
