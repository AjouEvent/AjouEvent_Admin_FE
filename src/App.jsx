import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from "@/pages/LoginPage.jsx";
import MemberRolePage from "@/pages/MemberRolePage.jsx";
import BlacklistPage from "@/pages/BlacklistPage.jsx";
import InquiryPage from "@/pages/InquiryPage.jsx";
import MemberPermissionPage from "@/pages/MemberPermissionPage.jsx";
import {Toaster} from "@/components/ui/toaster.jsx";

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
            </Routes>
        </Router>
    )
}

export default App
