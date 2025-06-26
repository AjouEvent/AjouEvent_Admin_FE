import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Outlet } from "react-router-dom";

export default function MainpageLayout() {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const toggleSidebar = () => setIsCollapsed(prev => !prev);

    return (
        <div className="flex">
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
            <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-0' : 'ml-64'}`}>
                <Outlet />
            </div>
        </div>
    );
}
