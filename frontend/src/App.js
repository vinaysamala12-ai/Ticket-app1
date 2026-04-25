import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import CreateTicket from './pages/CreateTicket'

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/create" element={<CreateTicket />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App