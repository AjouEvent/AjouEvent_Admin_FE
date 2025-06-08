// src/components/layout/Sidebar.jsx
import { Home, Package } from "lucide-react"  // 아이콘 사용을 위한 import
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 h-screen bg-gray-100 dark:bg-gray-900 p-6">
            <h2 className="text-xl font-bold mb-8">AjouEvent Admin</h2>
            <nav className="flex flex-col gap-4">

                {/* 대시보드 */}
                <Link to="/admin" className="flex items-center gap-2 hover:underline">
                    <Home className="h-5 w-5" />
                    Dashboard
                </Link>
                {/* 사용자 권한 관리 */}
                <Link to="/admin/banner" className="flex items-center gap-2 hover:underline">
                    <Package className="h-5 w-5" />
                    사용자 권한 관리
                </Link>
                {/* 배너 관리 */}
                <Link to="/admin/banner-manage" className="flex items-center gap-2 hover:underline">
                    <Package className="h-5 w-5" />
                    배너 관리
                </Link>

            </nav>
        </aside>
    )
}
