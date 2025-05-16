import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthForm } from '@/components/auth-form'
import LoginPage from "@/pages/LoginPage.jsx";
// import { AuthorityPage } from '@/pages/AuthorityPage'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                {/*<Route path="/authority" element={<AuthorityPage />} />*/}
            </Routes>
        </Router>
    )
}

export default App
