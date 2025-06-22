import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, Users, Shield, Image, Bell, HelpCircle, Settings, Search, MoreHorizontal, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CiViewTable } from "react-icons/ci";

export function Sidebar({ isCollapsed, toggleSidebar }) {
    const location = useLocation();

    const menu = [
        { section: "General", items: [
                { to: "/banner", icon: <LayoutDashboard size={15} />, label: "배너 관리" },
                { to: "/club-event", icon: <ClipboardList size={15} />, label: "클럽 이벤트" },
            ]},
        { section: "멤버 관리", items: [
                { to: "/member/role", icon: <Shield size={15} />, label: "역할 관리" },
                { to: "/member/permission", icon: <Users size={15} />, label: "권한 관리" },
                { to: "/member/blacklist", icon: <Users size={15} />, label: "블랙리스트" },
            ]},
        { section: "시스템", items: [
                { to: "/inquiry", icon: <ClipboardList size={15} />, label: "CS 문의" },
                { to: "/push", icon: <Bell size={15} />, label: "푸쉬 알림" },
            ]}
    ];

    return (
        <motion.div
            animate={{ width: isCollapsed ? 64 : 256 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 h-screen bg-white border-r shadow-sm flex flex-col justify-between p-4 z-50 overflow-hidden"
        >
            <div>
                <div className={`flex items-center mb-6 ${isCollapsed ? "justify-end" : "justify-between"} ${isCollapsed ? "mt-2" : "mt-0"}`}>
                    {!isCollapsed && (
                        <div className="text-xl font-bold overflow-hidden whitespace-nowrap">
                            관리 페이지
                        </div>
                    )}
                    <button onClick={() => toggleSidebar()}>
                        {isCollapsed ? <CiViewTable size={20} /> : <CiViewTable size={16} />}
                    </button>
                </div>
                {!isCollapsed && (
                    <div>
                        {menu.map((group, idx) => (
                            <div key={idx} className="mb-4">
                                <p className="text-xs text-muted-foreground font-semibold mb-1 overflow-hidden whitespace-nowrap">
                                    {group.section}
                                </p>
                                <div className="space-y-1">
                                    {group.items.map((item) => (
                                        <Link
                                            key={item.to}
                                            to={item.to}
                                            className={`flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition ${location.pathname.startsWith(item.to) ? "bg-gray-200 font-semibold" : ""}`}
                                        >
                                            {item.icon}
                                            <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
                                        </Link>
                                    ))}
                                </div>
                                <Separator className="my-2" />
                            </div>
                        ))}
                    </div>
                )}
            </div>



            {!isCollapsed && (

                <div>
                    <SidebarLink to="/settings" icon={<Settings size={18} />}>Settings</SidebarLink>
                    <SidebarLink to="/help" icon={<HelpCircle size={18} />}>Help</SidebarLink>
                    <SidebarLink to="/search" icon={<Search size={18} />}>Search</SidebarLink>

                    <div className="flex items-center gap-3 mt-5">
                        <div className="w-10 h-10 rounded-full bg-gray-300" />
                        <div>
                            <p className="font-medium">Admin User</p>
                            <p className="text-xs text-muted-foreground">admin@example.com</p>
                        </div>
                        <MoreHorizontal className="ml-auto" size={16} />
                    </div>
                </div>

            )}
        </motion.div>
    );

}

function SidebarLink({ to, icon, children }) {
    return (
        <Link to={to} className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 transition">
            {icon}
            <span>{children}</span>
        </Link>
    );
}
