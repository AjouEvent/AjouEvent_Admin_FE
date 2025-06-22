import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from "@/pages/LoginPage.jsx";
import MemberRolePage from "@/pages/MemberRolePage.jsx";
import BlacklistPage from "@/pages/BlacklistPage.jsx";
import InquiryPage from "@/pages/InquiryPage.jsx";
import MemberPermissionPage from "@/pages/MemberPermissionPage.jsx";
import {Toaster} from "@/components/ui/toaster.jsx";
import PushStatusPage from "@/pages/ChartPages.jsx";
import ClubEventPage from "@/pages/ClubEventPage.jsx";
import MainpageLayout from "@/pages/MainpageLayout.jsx";
import BannerManagePage from "@/pages/BannerManagePage.jsx";

function App() {
    return (
        <Router>
            <Toaster/>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route element={<MainpageLayout />}>
                    <Route path="/banner" element={<BannerManagePage />} />
                    <Route path="/club-event" element={<ClubEventPage />} />
                    <Route path="/member/role" element={<MemberRolePage />} />
                    <Route path="/member/permission" element={<MemberPermissionPage />} />
                    <Route path="/member/blacklist" element={<BlacklistPage />} />
                    <Route path="/inquiry" element={<InquiryPage />} />
                    <Route path="/push" element={<PushStatusPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
