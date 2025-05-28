import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthForm } from '@/components/auth/auth-form.jsx'
import LoginPage from "@/pages/LoginPage.jsx";
import MemberRolePage from "@/pages/MemberRolePage.jsx";
import BlacklistPage from "@/pages/BlacklistPage.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/member/role" element={<MemberRolePage />} />
                <Route path="/member/blacklist" element={<BlacklistPage />} />
            </Routes>
        </Router>
    )
}

export default App
