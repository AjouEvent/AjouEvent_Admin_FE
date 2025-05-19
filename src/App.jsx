import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthForm } from '@/components/auth-form'
import LoginPage from "@/pages/LoginPage.jsx";
import MainPage from "@/pages/Mainpage.jsx";
// import { AuthorityPage } from '@/pages/AuthorityPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                {<Route path="/admin" element={<MainPage />} />}
            </Routes>
        </Router>
    )
}

export default App
