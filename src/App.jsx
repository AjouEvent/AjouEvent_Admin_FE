import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthForm } from '@/components/auth-form'
import LoginPage from "@/pages/LoginPage.jsx";
import MainPage from "@/pages/Mainpage.jsx";
import BannerManagePage from "@/pages/BannerManagePage.jsx";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/admin" element={<MainPage />} />
                <Route path="/admin/banner-manage" element={<BannerManagePage />} />
            </Routes>
        </Router>
    )
}

export default App
