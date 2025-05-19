// src/components/layout/Sidebar.jsx
import { Home, Package } from "lucide-react"  // 아이콘 사용을 위한 import

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h2 className="text-xl font-bold mb-8">AjouEvent Admin</h2>
            <nav className="flex flex-col gap-4">
                {/* 각 링크는 react-router-dom과 연결될 예정 */}
                <a href="/admin" className="flex items-center gap-2 hover:underline">
                    <Home className="h-5 w-5" />
                    Dashboard
                </a>
                <a href="/admin/banner" className="flex items-center gap-2 hover:underline">
                    <Package className="h-5 w-5" />
                    배너 관리
                </a>
            </nav>
        </aside>
    )
}
