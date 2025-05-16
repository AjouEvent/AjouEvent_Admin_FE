import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App /> {/* ✅ 앱 전체를 App 컴포넌트로 구성 */}
    </React.StrictMode>,
)
