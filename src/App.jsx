import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from "@/pages/LoginPage.jsx";
import MemberRolePage from "@/pages/MemberRolePage.jsx";
import BlacklistPage from "@/pages/BlacklistPage.jsx";
import InquiryPage from "@/pages/InquiryPage.jsx";
import MemberPermissionPage from "@/pages/MemberPermissionPage.jsx";
import {Toaster} from "@/components/ui/toaster.jsx";
import PushStatusPage from "@/pages/ChartPages.jsx";
import ClubEventPage from "@/pages/ClubEventPage.jsx";
import MainPage from "@/pages/Mainpage.jsx";
import BannerManagePage from "@/pages/BannerManagePage.jsx";
import Sidebar from "@/components/layout/Sidebar.jsx";

function App() {
    return (
        <Router>
            <Toaster/>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/member/role" element={<MemberRolePage />} />
                <Route path="/member/permission" element={<MemberPermissionPage />} />
                <Route path="/member/blacklist" element={<BlacklistPage />} />
                <Route path="/inquiry" element={<InquiryPage />} />
                <Route path="/push" element={<PushStatusPage />} />
                <Route path="/club-event" element={<ClubEventPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/admin/banner" element={<MemberRolePage />} />
                <Route path="/admin/banner-manage" element={<BannerManagePage />} />
                {/*<Route path="/push/1" element={<ChartBarInteractive />} />*/}
                {/*<Route path="/push/2" element={<ChartPieDonutText />} />*/}
                {/*<Route path="/push/3" element={<Component />} />*/}
                {/*<Route path="/push/4" element={<ChartBarMultiple />} />*/}
                {/*<Route path="/push/5" element={<CircleChart />} />*/}
                {/*<Route path="/push/6" element={<HexagonChart />} />*/}
                
            </Routes>
        </Router>
    )
}

export default App
